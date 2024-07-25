// this helper uses covertLegacyStyles and adds some more rules specific to quickstyles

import { quickStylesDefinitions } from '../quickStyles/definitions';

import { convertLegacyStyles } from './convertLegacyStyles';

type DefinitionType = typeof quickStylesDefinitions;

const convertLegacySpacingQuickStyles = (styles, legacyPrefix) => {
  const spacing: {
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  } = {};

  const paddingPrefix = legacyPrefix ? `${legacyPrefix}Padding` : 'padding';
  const marginPrefix = legacyPrefix ? `${legacyPrefix}Margin` : 'margin';

  if (styles[`${paddingPrefix}Top`]) {
    spacing.paddingTop = styles[`${paddingPrefix}Top`];
  }
  if (styles[`${paddingPrefix}Bottom`]) {
    spacing.paddingBottom = styles[`${paddingPrefix}Bottom`];
  }
  if (styles[`${paddingPrefix}Left`]) {
    spacing.paddingLeft = styles[`${paddingPrefix}Left`];
  }
  if (styles[`${paddingPrefix}Right`]) {
    spacing.paddingRight = styles[`${paddingPrefix}Right`];
  }

  if (styles[`${marginPrefix}Top`]) {
    spacing.marginTop = styles[`${marginPrefix}Top`];
  }
  if (styles[`${marginPrefix}Bottom`]) {
    spacing.marginBottom = styles[`${marginPrefix}Bottom`];
  }
  if (styles[`${marginPrefix}Left`]) {
    spacing.marginLeft = styles[`${marginPrefix}Left`];
  }
  if (styles[`${marginPrefix}Right`]) {
    spacing.marginRight = styles[`${marginPrefix}Right`];
  }

  return spacing;
};

export const convertLegacyQuickStyles = (
  styles: { [key: string]: any },
  definitions: DefinitionType,
) => {
  const appendedStyles = { ...styles };
  // if any border styles are definied in the legacy format we need to set border=true so
  Object.entries(styles).forEach(([key]) => {
    if (
      ['buttonBorderStyle', 'buttonBorderWidth', 'buttonBorderColor'].includes(
        key,
      )
    ) {
      if (
        appendedStyles.buttonBorder === undefined &&
        styles.buttonBorder === undefined
      ) {
        appendedStyles.buttonBorder = true;
      }
    }

    if (
      [
        'buttonShadowStyle',
        'buttonShadowX',
        'buttonShadowY',
        'buttonShadowBlur',
        'buttonShadowSpread',
      ].includes(key)
    ) {
      if (
        appendedStyles.buttonShadow === undefined &&
        styles.buttonShadow === undefined
      ) {
        appendedStyles.buttonShadow = true;
      }
    }

    if (
      ['inputBorderStyle', 'inputBorderWidth', 'inputBorderColor'].includes(key)
    ) {
      if (
        appendedStyles.inputBorder === undefined &&
        styles.inputBorder === undefined
      ) {
        appendedStyles.inputBorder = true;
      }
    }

    if (
      [
        'inputHoverBorderStyle',
        'inputHoverBorderWidth',
        'inputHoverBorderColor',
      ].includes(key)
    ) {
      if (
        appendedStyles.inputHoverBorder === undefined &&
        styles.inputHoverBorder === undefined
      ) {
        appendedStyles.inputHoverBorder = true;
      }
    }

    if (
      [
        'inputFocusBorderStyle',
        'inputFocusBorderWidth',
        'inputFocusBorderColor',
      ].includes(key)
    ) {
      if (
        appendedStyles.inputFocusBorder === undefined &&
        styles.inputFocusBorder === undefined
      ) {
        appendedStyles.inputFocusBorder = true;
      }
    }

    if (
      [
        'inputShadowStyle',
        'inputShadowX',
        'inputShadowY',
        'inputShadowBlur',
        'inputShadowSpread',
      ].includes(key)
    ) {
      if (
        appendedStyles.inputShadow === undefined &&
        styles.inputShadow === undefined
      ) {
        appendedStyles.inputShadow = true;
      }
    }

    if (
      [
        'inputHoverShadowStyle',
        'inputHoverShadowX',
        'inputHoverShadowY',
        'inputHoverShadowBlur',
        'inputHoverShadowSpread',
      ].includes(key)
    ) {
      if (
        appendedStyles.inputHoverShadow === undefined &&
        styles.inputHoverShadow === undefined
      ) {
        appendedStyles.inputHoverShadow = true;
      }
    }

    if (
      [
        'inputFocusShadowStyle',
        'inputFocusShadowX',
        'inputFocusShadowY',
        'inputFocusShadowBlur',
        'inputFocusShadowSpread',
      ].includes(key)
    ) {
      if (
        appendedStyles.inputFocusShadow === undefined &&
        styles.inputFocusShadow === undefined
      ) {
        appendedStyles.inputFocusShadow = true;
      }
    }
  });

  const newStyles = convertLegacyStyles(appendedStyles, definitions);

  const spacing = convertLegacySpacingQuickStyles(styles, '');
  if (Object.keys(spacing).length) {
    newStyles.spacing = spacing;
  }

  const buttonSpacing = convertLegacySpacingQuickStyles(styles, 'button');
  if (Object.keys(buttonSpacing).length) {
    newStyles.buttonSpacing = buttonSpacing;
  }

  const inputSpacing = convertLegacySpacingQuickStyles(styles, 'input');
  if (Object.keys(inputSpacing).length) {
    newStyles.inputSpacing = inputSpacing;
  }

  return newStyles;
};
