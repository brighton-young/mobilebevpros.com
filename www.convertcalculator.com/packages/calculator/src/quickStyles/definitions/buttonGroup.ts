import { StyleInputType } from '../../styles/inputType';

export const buttonGroupQuickStylesDefinitions = {
  buttonGroupUnselectedBackgroundColor: StyleInputType.COLOR,
  buttonGroupUnselectedTextColor: StyleInputType.COLOR,
  buttonGroupUnselectedBorder: StyleInputType.BORDER,
  buttonGroupUnselectedBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonGroupUnselectedShadow: StyleInputType.SHADOW,

  buttonGroupSelectedBackgroundColor: StyleInputType.COLOR,
  buttonGroupSelectedTextColor: StyleInputType.COLOR,
  buttonGroupSelectedBorder: StyleInputType.BORDER,
  buttonGroupSelectedBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonGroupSelectedShadow: StyleInputType.SHADOW,

  buttonGroupPadding: StyleInputType.PADDING,

  buttonGroupHoverBackgroundColor: StyleInputType.COLOR,
  buttonGroupHoverTextColor: StyleInputType.COLOR,
  buttonGroupHoverBorder: StyleInputType.BORDER,
  buttonGroupHoverBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  buttonGroupHoverShadow: StyleInputType.SHADOW,
} satisfies Record<string, StyleInputType>;
