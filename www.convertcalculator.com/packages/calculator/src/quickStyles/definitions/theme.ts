import { StyleInputType } from '../../styles/inputType';

export const themeQuickStylesDefinitions = {
  textColor: StyleInputType.COLOR,
  primaryColor: StyleInputType.COLOR,
  neutralColor: StyleInputType.COLOR,
  fontFamily: StyleInputType.FONT_FAMILY,
  fontSize: StyleInputType.SIZE_WITH_UNIT,
  fontWeight: StyleInputType.FONT_WEIGHT,
  lineHeight: StyleInputType.SIZE_WITH_UNIT,
  textAlign: StyleInputType.TEXT_ALIGN,
  textTransform: StyleInputType.TEXT_TRANSFORM,
  fontStyle: StyleInputType.FONT_STYLE,
  backgroundColor: StyleInputType.COLOR,
  maxWidth: StyleInputType.SIZE_WITH_UNIT,
  height: StyleInputType.SIZE_WITH_UNIT,

  spacing: StyleInputType.SPACING,
} satisfies Record<string, StyleInputType>;
