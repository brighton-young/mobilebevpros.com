import { StyleInputType } from '../../styles/inputType';

export const textQuickStylesDefinitions = {
  textFontFamily: StyleInputType.FONT_FAMILY,
  textFontSize: StyleInputType.SIZE_WITH_UNIT,
  textFontWeight: StyleInputType.FONT_WEIGHT,
  textLineHeight: StyleInputType.SIZE_WITH_UNIT,
  textTextColor: StyleInputType.COLOR,
  textTextAlign: StyleInputType.TEXT_ALIGN,
  textTextTransform: StyleInputType.TEXT_TRANSFORM,
  textFontStyle: StyleInputType.FONT_STYLE,
} satisfies Record<string, StyleInputType>;
