import { StyleInputType } from '../inputType';

export const linkStylesDefinitions = {
  linkColor: StyleInputType.COLOR,
  linkFontWeight: StyleInputType.FONT_WEIGHT,
  linkFontStyle: StyleInputType.FONT_STYLE,
  linkTextDecoration: StyleInputType.TEXT_DECORATION,
} satisfies Record<string, StyleInputType>;
