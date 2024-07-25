import { StyleInputType } from '../../styles/inputType';

export const tooltipQuickStylesDefinitions = {
  tooltipPadding: StyleInputType.PADDING,
  tooltipBackgroundColor: StyleInputType.COLOR,

  tooltipFontFamily: StyleInputType.FONT_FAMILY,
  tooltipFontSize: StyleInputType.SIZE_WITH_UNIT,
  tooltipFontWeight: StyleInputType.FONT_WEIGHT,
  tooltipTextColor: StyleInputType.COLOR,

  tooltipButtonBackgroundColor: StyleInputType.COLOR,
  tooltipButtonTextColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
