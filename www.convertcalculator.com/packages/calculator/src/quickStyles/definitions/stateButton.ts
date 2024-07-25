import { StyleInputType } from '../../styles/inputType';

export const stateButtonQuickStylesDefinitions = {
  stateButtonPadding: StyleInputType.PADDING,

  stateButtonBackgroundColor: StyleInputType.COLOR,
  stateButtonTextColor: StyleInputType.COLOR,
  stateButtonBorder: StyleInputType.BORDER,
  stateButtonBorderRadius: StyleInputType.SIZE_WITH_UNIT,

  stateButtonActiveBackgroundColor: StyleInputType.COLOR,
  stateButtonActiveTextColor: StyleInputType.COLOR,
  stateButtonActiveBorder: StyleInputType.BORDER,
  stateButtonActiveBorderRadius: StyleInputType.SIZE_WITH_UNIT,

  stateButtonHoverBackgroundColor: StyleInputType.COLOR,
  stateButtonHoverTextColor: StyleInputType.COLOR,
  stateButtonHoverBorder: StyleInputType.BORDER,
  stateButtonHoverBorderRadius: StyleInputType.SIZE_WITH_UNIT,
} satisfies Record<string, StyleInputType>;
