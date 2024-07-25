import { Shadow } from '../inputType';

const getCSSContent = (value: Omit<Shadow, 'extraShadows'>) => {
  const { style = '', x = 0, y = 0, blur = 0, spread = 0, color } = value || {};

  return `${
    style === 'inset' ? 'inset ' : ''
  }${x}px ${y}px ${blur}px ${spread}px ${color || ''}`;
};

export const getBoxShadowCSS = (value: Shadow) => {
  if (!value) {
    return '';
  }

  return `box-shadow: ${getCSSContent(value)}${
    value.extraShadows
      ?.map((shadow) => {
        return `, ${getCSSContent(shadow)}`;
      })
      .join('') || ''
  };`;
};
