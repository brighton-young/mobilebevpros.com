import lowerCase from 'lodash/lowerCase';
import lowerFirst from 'lodash/lowerFirst';
import upperFirst from 'lodash/upperFirst';
import readableColor from 'polished/lib/color/readableColor';
import { css } from 'styled-components';

import hexAToRGBA from './utils/hexAToRGBA';

export const colors = {
  transparent: 'transparent',

  white: '#fefefe',
  offwhite: '#f5f5f5',
  black: '#0a0a0a',

  lightGray: '#f4f4f4',
  mediumGray: '#cbcbcb',
  darkGray: '#636363',

  'gray-100': '#f7fafc',
  'gray-200': '#edf2f7',
  'gray-300': '#e2e8f0',
  'gray-400': '#cbd5e0',
  'gray-500': '#a0aec0',
  'gray-600': '#718096',
  'gray-700': '#4a5568',
  'gray-800': '#2d3748',
  'gray-900': '#1a202c',

  linkColor: '#2e43cc',
  primaryColor: '#1779ba',
  secondaryColor: '#767676',
  successColor: '#3adb76',
  warningColor: '#ffae00',
  alertColor: '#cc4b37',
};

export const borderRadius = {
  none: '0',
  sm: '.125em',
  default: '.25em',
  lg: '.5em',
  full: '9999px',
};

export const leading = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  loose: 2,
};

export const media = {
  smallOnly: (...args) => {
    return css`
      @media (max-width: 639px) {
        ${css(...args)};
      }
    `;
  },
  mediumOnly: (...args) => {
    return css`
      @media (min-width: 640px and max-width: 1023px) {
        ${css(...args)};
      }
    `;
  },
  mediumUp: (...args) => {
    return css`
      @media (min-width: 640px) {
        ${css(...args)};
      }
    `;
  },
  largeOnly: (...args) => {
    return css`
      @media (min-width: 1024px and max-width: 1199px) {
        ${css(...args)};
      }
    `;
  },
  largeUp: (...args) => {
    return css`
      @media (min-width: 1024px) {
        ${css(...args)};
      }
    `;
  },
  xLargeOnly: (...args) => {
    return css`
      @media (min-width: 1200px and max-width: 1439px) {
        ${css(...args)};
      }
    `;
  },
  xLargeUp: (...args) => {
    return css`
      @media (min-width: 1200px and max-width: 1439px) {
        ${css(...args)};
      }
    `;
  },
  xxLargeOnly: (...args) => {
    return css`
      @media (min-width: 1440px) {
        ${css(...args)};
      }
    `;
  },
};

export const shadows = {
  default: '0 2px 4px 0 rgba(0,0,0,0.10)',
  md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
  lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
  inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  outline: '0 0 0 3px rgba(52,144,220,0.5)',
  none: 'none',
};

export const textSizes = {
  xs: '.75em', // 12px
  sm: '.875em', // 14px
  base: '1em', // 16px
  lg: '1.125em', // 18px
  xl: '1.25em', // 20px
  '2xl': '1.5em', // 24px
  '3xl': '1.875em', // 30px
  '4xl': '2.25em', // 36px
  '5xl': '3em', // 48px
};

export const getRule = (rule, prefix) => {
  if (!prefix) return rule;

  return `${prefix}${upperFirst(rule)}`;
};

export const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const getFontFamily = ({
  fallback = '',
  theme,
  prefix,
  isImportant,
}) => {
  const fontFamily = theme[getRule('fontFamily', prefix)];

  if (fontFamily === 'system-ui') return systemFont;

  if (!fontFamily) return fallback;

  return `${fontFamily}${isImportant ? ' !important' : ''}`;
};

export const getStyle = ({
  theme,
  prefix,
  property,
  fallback = '',
  isImportant,
}) => {
  const style = theme[getRule(property, prefix)];

  if (!style && style !== 0) return fallback;

  return `${style}${isImportant ? ' !important' : ''}`;
};

export const getStyleWithUnit = ({
  theme,
  prefix,
  property,
  fallback = '',
  isImportant,
}) => {
  const style = theme[getRule(property, prefix)];
  const propertyUnit = theme[getRule(`${property}Unit`, prefix)];

  if (!style && style !== 0) return fallback;

  return `${style}${propertyUnit}${isImportant ? ' !important' : ''}`;
};

export const getReadableColor = ({
  color = '',
  colorIfLight = colors.black,
  colorIfDark = colors.white,
}) => {
  const rgba = hexAToRGBA(color);

  return readableColor(rgba, colorIfLight, colorIfDark);
};

export const getStyleKeyWithoutPrefix = (key, prefix) => {
  return lowerFirst(key.replace(prefix, ''));
};

export const disabledBorderStyleKeys = [
  'buttonBorder',
  'inputBorder',
  'inputHoverBorder',
  'inputFocusBorder',
];
// filter out border styles when border is turned off
export const isDisabledBorderStyleKey = (key, styles) => {
  let isDisabled = false;

  if (lowerCase(key).includes('radius')) {
    return isDisabled;
  }

  disabledBorderStyleKeys.forEach((disabledKey) => {
    if (key.startsWith(disabledKey) && !styles[disabledKey]) {
      isDisabled = true;
    }
  });

  return isDisabled;
};

export const disabledShadowStyleKeys = [
  'buttonShadow',
  'inputShadow',
  'inputHoverShadow',
  'inputFocusShadow',
];
// filter out shadow styles when shadow is turned off
export const isDisabledShadowStyleKey = (key, styles) => {
  let isDisabled = false;

  disabledShadowStyleKeys.forEach((disabledKey) => {
    if (key.startsWith(disabledKey) && !styles[disabledKey]) {
      isDisabled = true;
    }
  });

  return isDisabled;
};

export const isRadiusUnitWithoutRadius = (key, styles, prefix) => {
  if (!key.includes('RadiusUnit')) return false;

  const radiusKey = prefix
    ? `${prefix}${upperFirst(key.replace('Unit', ''))}`
    : key.replace('Unit', '');

  const radiusValue = styles[radiusKey];

  return !radiusValue;
};

export const isFontSizeUnitWithoutFontSize = (key, styles, prefix) => {
  if (!key.includes('FontSizeUnit') && !key.includes('fontSizeUnit')) {
    return false;
  }

  const fontSizeKey = prefix
    ? `${prefix}${upperFirst(key.replace('Unit', ''))}`
    : key.replace('Unit', '');

  const fontSizeValue = styles[fontSizeKey];

  return !fontSizeValue;
};

const isDisabledStyleRule = (key, styles, prefix) => {
  if (isDisabledBorderStyleKey(key, styles)) return true;
  if (isDisabledShadowStyleKey(key, styles)) return true;
  if (isRadiusUnitWithoutRadius(key, styles, prefix)) return true;
  if (isFontSizeUnitWithoutFontSize(key, styles, prefix)) return true;

  return false;
};

export const getStyleKeys = (styles = {}, prefix = '') => {
  const styleObject = {};

  Object.entries(styles).forEach(([key, value]) => {
    if (isDisabledStyleRule(key, styles)) return;

    if (!prefix) {
      styleObject[lowerFirst(key)] = value;
      return;
    }

    if (!key.startsWith(prefix)) return;

    const keyWithoutPrefix = getStyleKeyWithoutPrefix(key, prefix);

    if (isDisabledStyleRule(keyWithoutPrefix, styles, prefix)) return;

    styleObject[keyWithoutPrefix] = value;
  });

  return styleObject;
};

// adds style rules that need to be enabled when certain style rules exist
// button, shadow, hoverShadow, focusShadow
export const getDependentStyles = (key) => {
  const dependentStyles = {};

  if (lowerCase(key).includes('border') && key !== 'borderRadius') {
    dependentStyles.border = true;
  }

  if (
    lowerCase(key).includes('shadow') &&
    !lowerCase(key).includes('hover') &&
    !lowerCase(key).includes('focus')
  ) {
    dependentStyles.shadow = true;
  }

  if (key.startsWith('hover') && lowerCase(key).includes('shadow')) {
    dependentStyles.hoverShadow = true;
  }

  if (key.startsWith('focus') && lowerCase(key).includes('shadow')) {
    dependentStyles.focusShadow = true;
  }

  if (key.startsWith('hover')) {
    dependentStyles.hover = true;
  }

  if (key.startsWith('focus')) {
    dependentStyles.focus = true;
  }

  return dependentStyles;
};

export const getQuickStyleVariables = (quickStyles = {}, prefix = '') => {
  const styleObject = {};

  Object.entries(quickStyles).forEach(([key, { value, enabled }]) => {
    if (!enabled) return;

    if (!prefix) {
      styleObject[lowerFirst(key)] = value;

      const dependentStyles = getDependentStyles(lowerFirst(key));
      Object.entries(dependentStyles).forEach(([dependentKey, v]) => {
        styleObject[dependentKey] = v;
      });

      return;
    }

    if (!key.startsWith(prefix)) return;

    styleObject[getStyleKeyWithoutPrefix(key, prefix)] = value;

    const dependentStyles = getDependentStyles(
      getStyleKeyWithoutPrefix(key, prefix),
    );
    Object.entries(dependentStyles).forEach(([dependentKey, v]) => {
      styleObject[dependentKey] = v;
    });
  });

  return styleObject;
};
