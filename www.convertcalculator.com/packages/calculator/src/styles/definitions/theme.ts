import { StyleInputType } from '../inputType';

export const themeStylesDefinitions = {
  backgroundColor: StyleInputType.COLOR,
  fontFamily: StyleInputType.FONT_FAMILY,
  fontSize: StyleInputType.SIZE_WITH_UNIT,
  fontWeight: StyleInputType.FONT_WEIGHT,
  fontStyle: StyleInputType.FONT_STYLE,
  height: StyleInputType.SIZE_WITH_UNIT,
  lineHeight: StyleInputType.SIZE_WITH_UNIT,
  maxWidth: StyleInputType.SIZE_WITH_UNIT,
  neutralColor: StyleInputType.COLOR,
  primaryColor: StyleInputType.COLOR,
  spacing: StyleInputType.SPACING,
  textColor: StyleInputType.COLOR,
  textAlign: StyleInputType.TEXT_ALIGN,
} satisfies Record<string, StyleInputType>;
