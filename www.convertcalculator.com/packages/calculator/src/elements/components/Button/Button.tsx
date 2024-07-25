import React, { useState } from 'react';

import { useRecoilCallback } from 'recoil';

// import type { ButtonElement } from '@cc/db';
import {
  ButtonActionsEnum,
  ButtonActionsProperties,
} from '@cc/shared/enums/button-actions';
import { CalculatorFormData, CalculatorSettings } from '@cc/types';

import { useTrigger, type Action } from '../../../Actions/Actions';
import {
  useIsEditing,
  useIsLiveMode,
  useIsUploading,
} from '../../../CalculatorState';
import Callout from '../../../components/Callout';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import Icon from '../../../components/Icon';
import { useJsApi } from '../../../components/JsApi';
import Modal from '../../../components/Modal';
import { useTracker } from '../../../components/Tracker';
import doClientActions from '../../../effects/doClientActions';
import doServerActions from '../../../effects/doServerActions';
import triggerButtonClick from '../../../effects/triggerButtonClick';
import calculatorState from '../../../recoil/calculatorState';
import featureFlagsState from '../../../recoil/featureFlagsState';
import isValidState from '../../../recoil/isValidState';
import navigableViewState from '../../../recoil/navigableViewState';
import resetFileFieldsState from '../../../recoil/resetFileFieldsState';
import selectedIndexOfViewContainerState from '../../../recoil/selectedIndexOfViewContainerState';
import showErrorsState from '../../../recoil/showErrorsState';
import { colors } from '../../../styles';
import findParentViewContainer from '../../../util/findParentViewContainer';
import { prefixElementStyles } from '../../../util/prefixElementStyles';
import validateViewContainerView from '../../../util/validateViewContainerView';

import CheckoutWithStripe from './components/CheckoutWithStripe';
import StyledActionInner from './components/StyledActionInner';
import StyledButtonButton from './components/StyledButtonButton';
import StyledButtonLink from './components/StyledButtonLink';
import StyledButtonWrapper from './components/StyledButtonWrapper';
import StyledIconWrapper from './components/StyledIconWrapper';
import StyledRefreshButton from './components/StyledRefreshButton';

export type ButtonElement = {
  _id: string;
  type: 'button';
  reference: string;
  button: {
    actions: {
      _id: string;
      type: string;
      shouldAddExecutionLogic: boolean;
      executionFormula?: string;

      sendDataToEmail?: {
        email: string;
        message: string;
        subject: string;
      };
      sendDataToHubspot?: {
        mergeFields?: Record<string, any>;
      };
      sendDataToGoogleSheets?: {
        mergeFields?: Record<string, any>;
        spreadsheetId?: string;
        worksheetId?: string;
      };
      sendDataToMailchimp?: {
        listId?: string;
        mergeFields: Record<string, any>;
      };
      sendDataToWebhook?: {
        urls: string[];
        mergeFields: Record<string, any>;
      };
      sendSubmissionEmail?: {
        message?: string;
        replyTo?: string;
        reportFields?: string[];
        sendToEmails?: string[];
        subject?: string;
      };
      setState?: {
        inputId?: string;
        formulaId?: string;
      };
      updateTable?: {
        mergeFields?: Record<string, any>;
        tableId?: string;
        updateType: 'addRow' | 'updateRow' | 'removeRow';
        matchFields?: Record<string, any>;
      };
    }[];
    buttonText?: string;
    buttonIcon?: string;
    displayType?: 'button' | 'textLink';
    iconPlacement?: 'left' | 'right';
    responseMessage?: string;
    shouldBypassValidation?: boolean;
    style?: {
      alignment?: 'left' | 'center' | 'right' | 'full';
      backgroundColor?: string;
      border?: boolean;
      borderStyle?: '' | 'none' | 'solid' | 'dashed' | 'dotted';
      borderWidth?: number;
      borderWidthUnit?: 'px' | 'rem' | '%';
      borderColor?: string;
      borderRadius?: number;
      borderRadiusUnit?: 'px' | 'rem' | '%';
      shadow?: boolean;
      shadowStyle?: 'outset' | 'inset';
      shadowColor?: string;
      shadowX?: number;
      shadowY?: number;
      shadowBlur?: number;
      shadowSpread?: number;
      textColor?: string;
    };
  };
};

export type ButtonProps = {
  settings: CalculatorSettings;
  element: ButtonElement;
  isHidden: boolean;
};

const MaterialIcon = ({ icon }) => {
  return (
    <StyledIconWrapper className="material-symbols-outlined">
      {icon}
    </StyledIconWrapper>
  );
};

const checkIfValid = ({ snapshot, buttonId }) => {
  // FF: viewContainer
  // check if the view container feature is activated
  const featureFlags = snapshot.getLoadable(featureFlagsState).contents;

  if (featureFlags.viewContainer) {
    // determine if this button is a child of a view container
    const calculator = snapshot.getLoadable(calculatorState).contents;

    const parentViewContainer = findParentViewContainer({
      items: calculator.items,
      itemId: buttonId,
    });
    if (parentViewContainer) {
      const viewContainerId = parentViewContainer.itemId;

      const currentViewIndex = snapshot.getLoadable(
        selectedIndexOfViewContainerState(viewContainerId),
      ).contents;
      const navigableViews = snapshot.getLoadable(
        navigableViewState(viewContainerId),
      ).contents;

      return validateViewContainerView(
        snapshot,
        navigableViews[currentViewIndex].itemId,
      );
    }
  }

  // the button is not inside a view container, so use the default validation
  return snapshot.getLoadable(isValidState).contents;
};

const Button: React.FC<ButtonProps> = ({ settings, element, isHidden }) => {
  const { button } = element;
  const {
    actions,
    buttonIcon,
    buttonText,
    displayType,
    iconPlacement = 'left',
    responseMessage,
    shouldBypassValidation,
    style,
  } = button;

  const [isDoingActions, setIsDoingActions] = useState(false);
  const [hasCompletedActions, setHasCompletedActions] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const isUploading = useIsUploading();
  const resetFileFields = resetFileFieldsState();

  const ActionComponent =
    displayType === 'textLink' ? StyledButtonLink : StyledButtonButton;

  const hasServerSideActions = !!actions.find(({ type }) => {
    return ButtonActionsProperties[type]?.side === 'server';
  });

  const checkoutWithStripeAction = actions.find(({ type }) => {
    return ButtonActionsEnum.CHECKOUT_WITH_STRIPE === type;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const jsApi = useJsApi();
  const tracker = useTracker();

  const handleValidate = useRecoilCallback(({ set, snapshot }) => {
    return (callback: (err: string, result: string) => void) => {
      const isValid =
        shouldBypassValidation ||
        checkIfValid({ snapshot, buttonId: element._id });

      set(showErrorsState, false);

      if (isValid) {
        callback(undefined, 'OK');
      } else {
        set(showErrorsState, true);

        callback('error', undefined);
      }
    };
  }, []);

  const handleDoActions = useRecoilCallback(
    (recoilProps) => {
      return async (formData?: CalculatorFormData) => {
        if (hasServerSideActions) {
          try {
            setIsDoingActions(true);

            await doServerActions(recoilProps, {
              jsApi,
              tracker,
            })({
              element,
              formData,
            });

            setStatus('success');
            setMessage(responseMessage || 'Submitted successfully');
          } catch (err) {
            setStatus('alert');
            setMessage(err.message);

            throw new Error(err);
          } finally {
            setIsDoingActions(false);
            setHasCompletedActions(true);
          }
        }

        await doClientActions(recoilProps, { jsApi, tracker })({
          element,
          settings,
        });

        triggerButtonClick(recoilProps)({
          element,
        });
      };
    },
    [hasServerSideActions, responseMessage],
  );

  const isDisabled = isDoingActions || isUploading;

  const flattenedQuickStyles = {};
  Object.entries(element.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  const prefixedStyles = prefixElementStyles(element.button.style, 'button');
  const isEditing = useIsEditing();
  const isLiveMode = useIsLiveMode();

  const trigger = useTrigger();

  const [newStyleActionsToTrigger, setNewStyleActionsToTrigger] = useState<
    any[]
  >([]);

  return (
    <ElementThemeProvider
      elementStyles={prefixedStyles}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="elements"
        element={element}
        isHidden={isHidden}
      >
        <ElementClassNameWrapper element={element}>
          {!hasCompletedActions && (
            <StyledButtonWrapper alignment={style.alignment}>
              <ActionComponent
                as={hasServerSideActions ? 'a' : 'button'}
                href={
                  hasServerSideActions
                    ? 'https://www.convertcalculator.com'
                    : undefined
                }
                className="cc__button"
                isEditing={settings.isEditing && !isLiveMode}
                alignment={element.button.style?.alignment}
                onClick={(ev) => {
                  ev.preventDefault();

                  if (isEditing && !isLiveMode) return;

                  handleValidate(async (err) => {
                    if (!err) {
                      if (checkoutWithStripeAction) {
                        setIsModalOpen(true);
                      } else {
                        await handleDoActions();
                      }
                    }
                  });

                  type ActionType =
                    ButtonProps['element']['button']['actions'][number]['type'];

                  // we can slowly migrate to the new style actions
                  // by filtering out the old style actions by adding the type
                  // in the `ACTIONS_TO_FILTER` array, we need to implement the action handler
                  // in `src/Actions` as well as remove the old style implementation
                  const ACTIONS_TO_FILTER: ActionType[] = [
                    'viewContainerNavigation',
                  ];

                  const newStyleActions = actions.filter(({ type }) => {
                    return ACTIONS_TO_FILTER.includes(type);
                  }) as Action[];

                  if (!checkoutWithStripeAction) {
                    trigger(newStyleActions);
                  } else {
                    setIsModalOpen(true);
                    setNewStyleActionsToTrigger(newStyleActions);
                  }
                }}
                disabled={isDisabled}
              >
                <StyledActionInner>
                  {buttonIcon && iconPlacement === 'left' && (
                    <MaterialIcon icon={buttonIcon} />
                  )}
                  {isDoingActions ? 'Loading...' : buttonText}
                  {buttonIcon && iconPlacement === 'right' && (
                    <MaterialIcon icon={buttonIcon} />
                  )}
                </StyledActionInner>
              </ActionComponent>

              {checkoutWithStripeAction && isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                  title={
                    checkoutWithStripeAction[
                      ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                    ].title
                  }
                  subtitle={
                    checkoutWithStripeAction[
                      ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                    ].description
                  }
                  settings={settings}
                >
                  <CheckoutWithStripe
                    buttonText={buttonText}
                    currency={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].currency
                    }
                    formulaId={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].formulaId
                    }
                    isSubscription={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].isSubscription
                    }
                    subscriptionInterval={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].subscriptionInterval
                    }
                    onCheckoutError={() => {
                      // no-op
                    }}
                    onCheckoutSuccess={async (data) => {
                      await trigger(newStyleActionsToTrigger);
                      await handleDoActions(data);
                    }}
                    paymentMethodTypes={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].paymentMethodTypes
                    }
                    settings={settings}
                    shouldCaptureBillingAddress={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].shouldCaptureBillingAddress
                    }
                    shouldCaptureZipCode={
                      checkoutWithStripeAction[
                        ButtonActionsEnum.CHECKOUT_WITH_STRIPE
                      ].shouldCaptureZipCode
                    }
                  />
                </Modal>
              )}
            </StyledButtonWrapper>
          )}

          {hasCompletedActions && status && message && (
            <Callout
              className={`cc__callout ${status} cc__submission-response cc__submission-response-${status}`}
              variant={status}
            >
              {message}

              <StyledRefreshButton
                onClick={() => {
                  setHasCompletedActions(false);
                  setStatus('');
                  resetFileFields();
                }}
              >
                <Icon
                  name="refresh"
                  width="16px"
                  height="16px"
                  stroke={colors.white}
                />
              </StyledRefreshButton>
            </Callout>
          )}
        </ElementClassNameWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default Button;
