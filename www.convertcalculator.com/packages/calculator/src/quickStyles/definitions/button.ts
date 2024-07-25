import { StyleInputType } from '../../styles/inputType';

export const buttonQuickStylesDefinitions = {
  buttonBackgroundColor: StyleInputType.COLOR,
  buttonTextColor: StyleInputType.COLOR,
  buttonFontSize: StyleInputType.SIZE_WITH_UNIT,
  buttonFontWeight: StyleInputType.FONT_WEIGHT,
  buttonBorder: StyleInputType.BORDER,
  buttonBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonShadow: StyleInputType.SHADOW,
  buttonHoverBackgroundColor: StyleInputType.COLOR,
  buttonHoverTextColor: StyleInputType.COLOR,
  buttonHoverBorder: StyleInputType.BORDER,
  buttonHoverBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonSpacing: StyleInputType.SPACING,
} satisfies Record<string, StyleInputType>;
