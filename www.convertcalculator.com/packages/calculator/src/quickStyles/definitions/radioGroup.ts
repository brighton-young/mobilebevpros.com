import { StyleInputType } from '../../styles/inputType';

export const radioGroupQuickStylesDefinitions = {
  radioGroupUnselectedBackgroundColor: StyleInputType.COLOR,
  radioGroupUnselectedTextColor: StyleInputType.COLOR,
  radioGroupUnselectedBorder: StyleInputType.BORDER,
  radioGroupUnselectedBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  radioGroupUnselectedShadow: StyleInputType.SHADOW,

  radioGroupSelectedBackgroundColor: StyleInputType.COLOR,
  radioGroupSelectedTextColor: StyleInputType.COLOR,
  radioGroupSelectedBorder: StyleInputType.BORDER,
  radioGroupSelectedBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  radioGroupSelectedShadow: StyleInputType.SHADOW,

  radioGroupPadding: StyleInputType.PADDING,

  radioGroupHoverBackgroundColor: StyleInputType.COLOR,
  radioGroupHoverTextColor: StyleInputType.COLOR,
  radioGroupHoverBorder: StyleInputType.BORDER,
  radioGroupHoverBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  radioGroupHoverShadow: StyleInputType.SHADOW,
} satisfies Record<string, StyleInputType>;
