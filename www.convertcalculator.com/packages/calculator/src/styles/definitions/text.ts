import { StyleInputType } from '../inputType';

export const textStylesDefinitions = {
  textFontFamily: StyleInputType.FONT_FAMILY,
  textFontSize: StyleInputType.SIZE_WITH_UNIT,
  textFontWeight: StyleInputType.FONT_WEIGHT,
  textLineHeight: StyleInputType.SIZE_WITH_UNIT,
  textTextColor: StyleInputType.COLOR,
  textTextAlign: StyleInputType.TEXT_ALIGN,
  textFontStyle: StyleInputType.FONT_STYLE,
} satisfies Record<string, StyleInputType>;
