import { CalculatorSettings } from '@cc/types';

import { useIsLiveMode, useIsUploading } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import HorizontalRule from '../../../components/HorizontalRule';
import { colors } from '../../../styles';
import getButtonStyleVariables from '../../../styles/styleVariables/buttonStyleVariables';
import useStyles from '../../../styles/useStyles';
import Button from '../../common/components/Button';
import useNextView from '../../common/hooks/useNextView';

type ViewBreakProps = {
  element: ViewBreakElement;
  isHidden: boolean;
  settings: CalculatorSettings;
};

export type ViewBreakElement = {
  type: 'viewBreak';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  viewBreak: {
    buttonText: string;
    shouldShowButton: boolean;
  };
};

const ViewBreak = ({ element, isHidden, settings }: ViewBreakProps) => {
  const { viewBreak } = element;

  const isLiveMode = useIsLiveMode();
  const isUploading = useIsUploading();
  const { handleNextView } = useNextView();

  const buttonStyles = useStyles({
    prefix: 'button',
    getVariables: getButtonStyleVariables,
  });

  if (!viewBreak.shouldShowButton && (!settings.isEditing || isLiveMode)) {
    return null;
  }

  if (!viewBreak.shouldShowButton && settings.isEditing && !isLiveMode) {
    return (
      <div>
        <HorizontalRule
          borderWidth={2}
          borderStyle="dashed"
          borderColor={colors.mediumGray}
        />
      </div>
    );
  }

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
    >
      <ElementClassNameWrapper element={element}>
        <Button
          className="cc__viewBreak-element-button"
          onClick={() => {
            if (settings.isEditing && !isLiveMode) return;

            handleNextView();
          }}
          styles={buttonStyles}
          disabled={isUploading}
        >
          {viewBreak.buttonText} →
        </Button>
      </ElementClassNameWrapper>
    </ElementStyleWrapper>
  );
};

export default ViewBreak;
