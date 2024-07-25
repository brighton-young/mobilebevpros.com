import { StyleInputType } from '../inputType';

export const buttonStylesDefinitions = {
  buttonBackgroundColor: StyleInputType.COLOR,
  buttonBorder: StyleInputType.BORDER,
  buttonBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonFontFamily: StyleInputType.FONT_FAMILY,
  buttonFontSize: StyleInputType.SIZE_WITH_UNIT,
  buttonFontWeight: StyleInputType.FONT_WEIGHT,
  buttonLineHeight: StyleInputType.SIZE_WITH_UNIT,
  buttonShadow: StyleInputType.SHADOW,
  buttonSpacing: StyleInputType.SPACING,
  buttonTextColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
