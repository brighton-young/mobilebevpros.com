import { StyleInputType } from '../../styles/inputType';

export const tabsQuickStylesDefinitions = {
  tabGroupGutter: StyleInputType.SIZE,

  tabBorder: StyleInputType.BORDER,
  tabBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  tabShadow: StyleInputType.SHADOW,

  tabPadding: StyleInputType.PADDING,
  tabUnselectedBackgroundColor: StyleInputType.COLOR,
  tabUnselectedTextColor: StyleInputType.COLOR,

  tabSelectedBackgroundColor: StyleInputType.COLOR,
  tabSelectedTextColor: StyleInputType.COLOR,

  tabHoverBackgroundColor: StyleInputType.COLOR,
  tabHoverTextColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
