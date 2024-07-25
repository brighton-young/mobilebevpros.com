import { StyleInputType } from '../../styles/inputType';

export const fileQuickStylesDefinitions = {
  fileBackgroundColor: StyleInputType.COLOR,
  fileTextColor: StyleInputType.COLOR,
  fileFontSize: StyleInputType.SIZE_WITH_UNIT,
  fileFontWeight: StyleInputType.FONT_WEIGHT,
  filePadding: StyleInputType.PADDING,
  fileIconColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
