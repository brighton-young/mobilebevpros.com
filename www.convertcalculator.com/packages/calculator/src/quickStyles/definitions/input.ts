import { StyleInputType } from '../../styles/inputType';

export const inputQuickStylesDefinitions = {
  inputFontFamily: StyleInputType.FONT_FAMILY,
  inputFontSize: StyleInputType.SIZE_WITH_UNIT,
  inputFontWeight: StyleInputType.FONT_WEIGHT,
  inputLineHeight: StyleInputType.SIZE_WITH_UNIT,
  inputTextAlign: StyleInputType.TEXT_ALIGN,
  inputTextTransform: StyleInputType.TEXT_TRANSFORM,
  inputFontStyle: StyleInputType.FONT_STYLE,
  inputPlaceholderTextColor: StyleInputType.COLOR,

  inputSpacing: StyleInputType.SPACING,

  inputBackgroundColor: StyleInputType.COLOR,
  inputTextColor: StyleInputType.COLOR,

  inputBorder: StyleInputType.BORDER,
  inputBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  inputShadow: StyleInputType.SHADOW,

  inputHoverBackgroundColor: StyleInputType.COLOR,
  inputHoverTextColor: StyleInputType.COLOR,

  inputHoverBorder: StyleInputType.BORDER,
  inputHoverBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  inputHoverShadow: StyleInputType.SHADOW,

  inputFocusBackgroundColor: StyleInputType.COLOR,
  inputFocusTextColor: StyleInputType.COLOR,
  inputFocusBorder: StyleInputType.BORDER,
  inputFocusBorderRadius: StyleInputType.SIZE_WITH_UNIT,
  inputFocusShadow: StyleInputType.SHADOW,

  inputHeight: StyleInputType.SIZE_WITH_UNIT,

  inputIconColor: StyleInputType.COLOR,
} satisfies Record<string, StyleInputType>;
