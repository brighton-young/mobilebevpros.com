import {
  ButtonActionsEnum,
  ButtonActionsProperties,
} from '@cc/shared/enums/button-actions';

import featureFlagsState from '../../recoil/featureFlagsState';
import formulasState from '../../recoil/formulasState';

import addProductToSnipcart from './addProductToSnipcart';
import linkToExternalPage from './linkToExternalPage';
import setInput from './setInput';
import setViewToNext from './setViewToNext';
import setViewToPrevious from './setViewToPrevious';
import triggerEvent from '../../util/triggerEvent';
import calculatorIdState from '../../recoil/calculatorIdState';

const doClientActions = (recoilProps, { jsApi, tracker }) => {
  return async ({ element, settings }) => {
    const clientSideActions = element.button.actions.filter(({ type }) => {
      return ButtonActionsProperties[type]?.side === 'client';
    });

    const { snapshot } = recoilProps;

    const outputs = await snapshot.getPromise(formulasState);
    const flags = await snapshot.getPromise(featureFlagsState);

    // FF: optionalActionExecutionLogic: Remove this conditional filter when done
    const clientSideActionsThatShouldExecute =
      flags.optionalActionExecutionLogic
        ? clientSideActions.filter(
            ({ _id: actionId, shouldAddExecutionLogic }) => {
              const ref = `${element.reference}-${actionId}-EF`;
              const shouldExecute =
                !shouldAddExecutionLogic || !!outputs[ref]?.result;

              return shouldExecute;
            },
          )
        : clientSideActions;

    const results = clientSideActionsThatShouldExecute.map(async (action) => {
      if (action.type === ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE) {
        // TODO: this is a hack ensure all client actions are run
        // before the page possibly navigates away
        if (action.linkToExternalPage?.shouldOpenInNewTab) {
          return linkToExternalPage({
            action,
            recoilProps,
            jsApi,
            tracker,
          });
        }
      }

      if (action.type === ButtonActionsEnum.NAVIGATE_TO_NEXT_VIEW) {
        return setViewToNext({ recoilProps });
      }

      if (action.type === ButtonActionsEnum.NAVIGATE_TO_PREVIOUS_VIEW) {
        return setViewToPrevious({ recoilProps });
      }

      if (action.type === ButtonActionsEnum.SET_INPUT) {
        return setInput({
          properties: action[ButtonActionsEnum.SET_INPUT],
          recoilProps,
        });
      }

      if (action.type === ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART) {
        return addProductToSnipcart({
          element,
          properties: action[ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART],
          recoilProps,
          settings,
        });
      }

      if (action.type === ButtonActionsEnum.NAVIGATE) {
        const calculatorId = await snapshot.getPromise(calculatorIdState);
        const formulaResults = await snapshot.getPromise(formulasState);

        const { shouldOpenInNewTab } = action[ButtonActionsEnum.NAVIGATE];

        const result = formulaResults[`${element.reference}-NAVIGATE_URL`];

        if (!result) {
          console.error(
            `navigate link result is not defined: ${element.reference}-NAVIGATE_URL`,
          );
          return 0;
        }

        const { result: link, error } = result;

        if (error !== null) {
          console.error(`navigate link error: ${error}`);
          return 0;
        }

        if (typeof link !== 'string') {
          console.error(`navigate link result is not a string: ${link}`);
          return 0;
        }

        const payload = { linkUrl: link, shouldOpenInNewTab };

        jsApi.onLinkToExternalPage(payload);
        tracker.onLinkToExternalPage(payload);

        triggerEvent({
          calculatorId,
          type: ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE,
          payload,
        });
        return 1;
      }

      return 0;
    });

    await Promise.all(results);

    // TODO: see above. this is all hacky
    // find first redirect action that doesn't open in new tab
    // we can only do this once so the fist one wins
    const redirectAction = element.button.actions.find((action) => {
      return (
        action.type === ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE &&
        !action.linkToExternalPage?.shouldOpenInNewTab
      );
    });

    if (redirectAction) {
      await linkToExternalPage({
        action: redirectAction,
        recoilProps,
        jsApi,
        tracker,
      });
    }
  };
};

export default doClientActions;
