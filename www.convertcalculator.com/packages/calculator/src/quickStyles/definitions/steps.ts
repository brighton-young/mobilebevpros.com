import { StyleInputType } from '../../styles/inputType';

export const stepsQuickStylesDefinitions = {
  stepsBarTrackColor: StyleInputType.COLOR,
  stepsBarCompletedTrackColor: StyleInputType.COLOR,
  stepsBubbleBackgroundColor: StyleInputType.COLOR,
  stepsBubbleTextColor: StyleInputType.COLOR,
  stepsBubbleCompletedBackgroundColor: StyleInputType.COLOR,
  stepsBubbleCompletedTextColor: StyleInputType.COLOR,
  stepsBubbleActiveBackgroundColor: StyleInputType.COLOR,
  stepsBubbleActiveTextColor: StyleInputType.COLOR,
  stepsBubbleActiveBorderColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
