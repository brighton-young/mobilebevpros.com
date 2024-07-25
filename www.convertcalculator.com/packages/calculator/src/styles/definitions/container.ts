import { StyleInputType } from '../inputType';

export const containerStylesDefinitions = {
  containerAlignItems: StyleInputType.FLEX_ALIGN_ITEMS,
  containerBackgroundColor: StyleInputType.COLOR,
  containerBorder: StyleInputType.BORDER,
  containerBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  containerDisplay: StyleInputType.DISPLAY,
  containerFlexDirection: StyleInputType.FLEX_DIRECTION,
  containerFlexWrap: StyleInputType.FLEX_WRAP,
  containerHeight: StyleInputType.SIZE_WITH_UNIT,
  containerGap: StyleInputType.SIZE_WITH_UNIT,
  containerJustifyContent: StyleInputType.FLEX_JUSTIFY_CONTENT,
  containerMaxWidth: StyleInputType.SIZE_WITH_UNIT,
  containerMinHeight: StyleInputType.SIZE_WITH_UNIT,
  containerShowBackgroundImage: StyleInputType.BOOLEAN,
  containerBackgroundImage: StyleInputType.IMAGE,
  containerSpacing: StyleInputType.SPACING,
  containerTextColor: StyleInputType.COLOR,
  containerWidth: StyleInputType.SIZE_WITH_UNIT,
} satisfies Record<string, StyleInputType>;
