import { StyleInputType } from '../../styles/inputType';

export const progressBarQuickStylesDefinitions = {
  progressBarTrackColor: StyleInputType.COLOR,
  progressBarActiveTrackColor: StyleInputType.COLOR,
  progressBarHeight: StyleInputType.SIZE_WITH_UNIT,
  progressBarBorderRadius: StyleInputType.SIZE_WITH_UNIT,
} satisfies Record<string, StyleInputType>;
