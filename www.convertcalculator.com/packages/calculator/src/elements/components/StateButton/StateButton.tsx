import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { prefixElementStyles } from '../../../util/prefixElementStyles';

import { StyledStateButton } from './StyledStateButton';
import { StyledStateButtonWrapper } from './StyledStateButtonWrapper';
import { StyledStateLink } from './StyledStateLink';

type StateButtonProps = {
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: StateButtonElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type StateButtonElement = {
  type: 'stateButton';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  stateButton: {
    activeButtonText?: string;
    buttonText?: string;
    defaultValue?: boolean;
    displayType?: string;
    style?: {
      alignment?: string;
    };
  };
};

const StateButton = ({
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: StateButtonProps) => {
  const { stateButton } = question;
  const { messages } = settings;

  const handleChange = () => {
    const newValue = !valueObject.value;

    onValueChange(question.reference, {
      label: newValue ? 'Yes' : 'No',
      value: newValue ? 1 : 0,
      error:
        !newValue && question.isRequired ? messages.switchRequired : undefined,
    });
  };

  const Action =
    stateButton.displayType === 'textLink'
      ? StyledStateLink
      : StyledStateButton;

  const title = valueObject.value
    ? stateButton.activeButtonText || stateButton.buttonText
    : stateButton.buttonText;

  const flattenedQuickStyles = {};
  Object.entries(question.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  const prefixedStyles = prefixElementStyles(
    question.stateButton.style,
    'stateButton',
  );

  return (
    <ElementThemeProvider
      elementStyles={prefixedStyles}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="questions"
        element={question}
        isHidden={isHidden}
      >
        <ElementTitleWrapper collection="questions" element={question}>
          <ElementClassNameWrapper element={question}>
            <StyledStateButtonWrapper alignment={stateButton.style.alignment}>
              <Action
                className="cc__button cc__state-button"
                isEditing={settings.isEditing}
                onClick={settings.isEditing ? undefined : handleChange}
                checked={!!valueObject.value}
                alignment={question.stateButton.style?.alignment}
              >
                {title}
              </Action>
            </StyledStateButtonWrapper>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default StateButton;
