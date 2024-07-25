import { StyleInputType } from '../../styles/inputType';

export const containerQuickStylesDefinitions = {
  containerAlignItems: StyleInputType.FLEX_ALIGN_ITEMS,
  containerBackgroundColor: StyleInputType.COLOR,
  containerBorder: StyleInputType.BORDER,
  containerBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  containerDisplay: StyleInputType.DISPLAY,
  containerHeight: StyleInputType.SIZE_WITH_UNIT,
  containerGap: StyleInputType.SIZE_WITH_UNIT,
  containerJustifyContent: StyleInputType.FLEX_JUSTIFY_CONTENT,
  containerMaxWidth: StyleInputType.SIZE_WITH_UNIT,
  containerMinHeight: StyleInputType.SIZE_WITH_UNIT,
  containerSpacing: StyleInputType.SPACING,
  containerTextColor: StyleInputType.COLOR,
  containerWidth: StyleInputType.SIZE_WITH_UNIT,
  containerShadow: StyleInputType.SHADOW,
  containerFlexGrow: StyleInputType.SIZE,
  containerFlexShrink: StyleInputType.SIZE,
  containerFlexBasis: StyleInputType.SIZE_WITH_UNIT,
} satisfies Record<string, StyleInputType>;
