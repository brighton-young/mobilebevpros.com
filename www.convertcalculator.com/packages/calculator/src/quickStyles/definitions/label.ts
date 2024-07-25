import { StyleInputType } from '../../styles/inputType';

export const labelQuickStylesDefinitions = {
  labelFontSize: StyleInputType.SIZE_WITH_UNIT,
  labelFontWeight: StyleInputType.FONT_WEIGHT,
  labelLineHeight: StyleInputType.SIZE_WITH_UNIT,
  labelTextColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
