import { StyleInputType } from '../inputType';

export const labelStylesDefinitions = {
  labelFontSize: StyleInputType.SIZE_WITH_UNIT,
  labelFontWeight: StyleInputType.FONT_WEIGHT,
  labelLineHeight: StyleInputType.SIZE_WITH_UNIT,
  labelTextColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
