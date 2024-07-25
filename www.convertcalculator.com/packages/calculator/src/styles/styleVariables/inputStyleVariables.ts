import { getFontFamily, getStyle, getStyleWithUnit } from '..';
import getSpacing from '../utils/getSpacing';

export const getBoxShadow = (theme, prefix = '') => {
  const hasShadow = getStyle({ theme, property: 'shadow', prefix });

  if (!hasShadow) return '';

  const shadowStyle = getStyle({ theme, property: 'shadowStyle', prefix });
  const shadowX = getStyle({ theme, property: 'shadowX', prefix });
  const shadowY = getStyle({ theme, property: 'shadowY', prefix });
  const shadowBlur = getStyle({ theme, property: 'shadowBlur', prefix });
  const shadowSpread = getStyle({
    theme,
    property: 'shadowSpread',
    prefix,
  });
  const shadowColor = getStyle({
    theme,
    property: 'shadowColor',
    prefix,
  });

  if (shadowStyle === 'inset') {
    return [
      shadowStyle,
      ...(shadowX && [`${shadowX}px`]),
      ...(shadowY && [`${shadowY}px`]),
      ...(shadowBlur && [`${shadowBlur}px`]),
      ...(shadowSpread && [`${shadowSpread}px`]),
      shadowColor,
    ].join(' ');
  }

  return [
    ...(shadowX && [`${shadowX}px`]),
    ...(shadowY && [`${shadowY}px`]),
    ...(shadowBlur && [`${shadowBlur}px`]),
    ...(shadowSpread && [`${shadowSpread}px`]),
    shadowColor,
  ].join(' ');
};

const getInputStyleVariables = (theme) => {
  const inputHasBorder = theme.border;
  const inputHasHover = theme.hover;
  const inputHoverHasBorder = inputHasHover && theme.hoverBorder;
  const inputHasFocus = theme.focus;
  const inputFocusHasBorder = inputHasFocus && theme.focusBorder;

  return {
    fontFamily: getFontFamily({ theme }) || 'inherit',
    fontSize: getStyleWithUnit({ theme, property: 'fontSize' }) || 'inherit',
    fontWeight: theme.fontWeight,
    lineHeight: getStyleWithUnit({
      theme,
      property: 'lineHeight',
      fallback: '1.5',
    }),
    textAlign: theme.textAlign,
    textTransform: theme.textTransform,
    fontStyle: theme.fontStyle,
    placeholderTextColor: theme.placeholderTextColor,

    marginTop: getSpacing('marginTop', [theme, theme.spacing]),
    marginRight: getSpacing('marginRight', [theme, theme.spacing]),
    marginBottom: getSpacing('marginBottom', [theme, theme.spacing]),
    marginLeft: getSpacing('marginLeft', [theme, theme.spacing]),
    paddingTop: getSpacing('paddingTop', [theme, theme.spacing]),
    paddingRight: getSpacing('paddingRight', [theme, theme.spacing]),
    paddingBottom: getSpacing('paddingBottom', [theme, theme.spacing]),
    paddingLeft: getSpacing('paddingLeft', [theme, theme.spacing]),

    backgroundColor: theme.backgroundColor,
    textColor: theme.textColor,
    borderRadius: getStyleWithUnit({ theme, property: 'borderRadius' }),
    borderStyle: inputHasBorder ? theme.borderStyle : '',
    borderWidth: inputHasBorder
      ? getStyleWithUnit({ theme, property: 'borderWidth' })
      : 0,
    borderColor: inputHasBorder ? theme.borderColor : '',
    boxShadow: getBoxShadow(theme),

    ...(inputHasHover && {
      hoverBackgroundColor: theme.hoverBackgroundColor,
      hoverTextColor: theme.hoverTextColor,
      hoverBorderRadius: getStyleWithUnit({
        theme,
        property: 'hoverBorderRadius',
      }),
      hoverBoxShadow: getBoxShadow(theme, 'hover'),
      ...(inputHoverHasBorder && {
        hoverBorderStyle: theme.hoverBorderStyle,
        hoverBorderWidth: getStyleWithUnit({
          theme,
          property: 'hoverBorderWidth',
        }),

        hoverBorderColor: theme.hoverBorderColor,
      }),
    }),

    ...(inputHasFocus && {
      focusBackgroundColor: theme.focusBackgroundColor,
      focusTextColor: theme.focusTextColor,
      focusBorderRadius: getStyleWithUnit({
        theme,
        property: 'focusBorderRadius',
      }),
      focusBoxShadow: getBoxShadow(theme, 'focus'),
      ...(inputFocusHasBorder && {
        focusBorderStyle: theme.focusBorderStyle,
        focusBorderWidth: getStyleWithUnit({
          theme,
          property: 'focusBorderWidth',
        }),
        focusBorderColor: theme.focusBorderColor,
      }),
    }),
  };
};

export default getInputStyleVariables;
