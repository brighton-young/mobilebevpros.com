import { StyleInputType } from '../../styles/inputType';

export const headingQuickStylesDefinitions = {
  headingFontFamily: StyleInputType.FONT_FAMILY,
  headingFontWeight: StyleInputType.FONT_WEIGHT,
  headingTextColor: StyleInputType.COLOR,
  headingTextAlign: StyleInputType.TEXT_ALIGN,
  headingTextTransform: StyleInputType.TEXT_TRANSFORM,
  headingFontStyle: StyleInputType.FONT_STYLE,

  headingOneFontSize: StyleInputType.SIZE_WITH_UNIT,
  headingOneFontWeight: StyleInputType.FONT_WEIGHT,
  headingOneLineHeight: StyleInputType.SIZE_WITH_UNIT,

  headingTwoFontSize: StyleInputType.SIZE_WITH_UNIT,
  headingTwoFontWeight: StyleInputType.FONT_WEIGHT,
  headingTwoLineHeight: StyleInputType.SIZE_WITH_UNIT,

  headingThreeFontSize: StyleInputType.SIZE_WITH_UNIT,
  headingThreeFontWeight: StyleInputType.FONT_WEIGHT,
  headingThreeLineHeight: StyleInputType.SIZE_WITH_UNIT,

  headingFourFontSize: StyleInputType.SIZE_WITH_UNIT,
  headingFourFontWeight: StyleInputType.FONT_WEIGHT,
  headingFourLineHeight: StyleInputType.SIZE_WITH_UNIT,

  headingFiveFontSize: StyleInputType.SIZE_WITH_UNIT,
  headingFiveFontWeight: StyleInputType.FONT_WEIGHT,
  headingFiveLineHeight: StyleInputType.SIZE_WITH_UNIT,
} satisfies Record<string, StyleInputType>;
