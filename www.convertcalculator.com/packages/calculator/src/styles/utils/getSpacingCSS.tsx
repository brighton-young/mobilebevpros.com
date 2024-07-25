import { Spacing } from '../inputType';

export const getSpacingCSS = (value?: Spacing) => {
  let css = '';
  if (value?.marginLeft !== undefined) {
    css += `margin-left: ${value.marginLeft}px;`;
  }
  if (value?.marginRight !== undefined) {
    css += `margin-right: ${value.marginRight}px;`;
  }
  if (value?.marginTop !== undefined) {
    css += `margin-top: ${value.marginTop}px;`;
  }
  if (value?.marginBottom !== undefined) {
    css += `margin-bottom: ${value.marginBottom}px;`;
  }
  if (value?.paddingLeft !== undefined) {
    css += `padding-left: ${value.paddingLeft}px;`;
  }
  if (value?.paddingRight !== undefined) {
    css += `padding-right: ${value.paddingRight}px;`;
  }
  if (value?.paddingTop !== undefined) {
    css += `padding-top: ${value.paddingTop}px;`;
  }
  if (value?.paddingBottom !== undefined) {
    css += `padding-bottom: ${value.paddingBottom}px;`;
  }

  return css;
};
