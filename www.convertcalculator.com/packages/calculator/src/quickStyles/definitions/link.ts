import { StyleInputType } from '../../styles/inputType';

export const linkQuickStylesDefinitions = {
  linkFontFamily: StyleInputType.FONT_FAMILY,
  linkTextColor: StyleInputType.COLOR,
  linkFontSize: StyleInputType.SIZE_WITH_UNIT,
  linkFontWeight: StyleInputType.FONT_WEIGHT,
  linkFontStyle: StyleInputType.FONT_STYLE,
  linkTextDecoration: StyleInputType.TEXT_DECORATION,
  linkHoverTextColor: StyleInputType.COLOR,
  linkHoverFontWeight: StyleInputType.FONT_WEIGHT,
  linkHoverFontStyle: StyleInputType.FONT_STYLE,
  linkHoverTextDecoration: StyleInputType.TEXT_DECORATION,
} satisfies Record<string, StyleInputType>;
