import { FontFamily } from '../inputType';

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const getFontFamilyCSS = (value?: FontFamily) => {
  if (!value) return '';
  if (value === 'system-ui') return `font-family: ${systemFont};`;

  return `font-family: ${value};`;
};
