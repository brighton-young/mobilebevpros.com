// this helper converts the legacy styles to the new format and adds typings

import { quickStylesDefinitions } from '../quickStyles/definitions';
import { stylesDefinitions } from '../styles/definitions';
import { StyleInputType, StyleInputTypeMap } from '../styles/inputType';

type StyleDefinitions = Partial<
  typeof stylesDefinitions & typeof quickStylesDefinitions
>;

const convertStyle = (
  inputType: StyleInputType,
  value,
  key: string,
  allStyles: { [key: string]: any },
): StyleInputTypeMap[StyleInputType] => {
  switch (inputType) {
    case StyleInputType.SIZE_WITH_UNIT:
      if (
        value &&
        typeof value === 'object' &&
        'size' in value &&
        'unit' in value
      ) {
        return value;
      }
      return {
        size: parseFloat(value),
        unit: allStyles[`${key}Unit`] || 'px',
      };
    case StyleInputType.BORDER:
      if (typeof value === 'object') {
        return value;
      }

      if (typeof value === 'boolean' && value === true) {
        return {
          width: {
            size: allStyles[`${key}Width`],
            unit: allStyles[`${key}WidthUnit`] || 'px',
          },
          style: allStyles[`${key}Style`] || 'solid',
          color: allStyles[`${key}Color`] || 'black',
        };
      }

      // also enable the border if the border radius is set
      if (
        typeof value === 'boolean' &&
        value === false &&
        allStyles[`${key}Radius`]
      ) {
        return {
          width: {
            size: 0,
            unit: 'px',
          },
          style: 'none',
          color: undefined,
        };
      }

      return undefined;
    case StyleInputType.SHADOW:
      if (typeof value === 'object') {
        return value;
      }
      if (typeof value === 'boolean' && value === true) {
        return {
          x: allStyles[`${key}X`],
          y: allStyles[`${key}Y`],
          style: allStyles[`${key}Style`] || 'outset',
          color: allStyles[`${key}Color`] || 'black',
          blur: allStyles[`${key}Blur`],
          spread: allStyles[`${key}Spread`],
        };
      }
      return undefined;
    default:
      return value;
  }
};

export const convertLegacyStyles = (
  styles: { [key: string]: any },
  definitions: StyleDefinitions,
  excludeUndefinedStyled = false,
) => {
  const newStyles: Partial<{
    [key in keyof StyleDefinitions]: StyleInputTypeMap[StyleDefinitions[key]];
  }> = {};

  Object.entries(styles).forEach(([key, value]) => {
    if (key in definitions && value !== undefined) {
      const inputType: StyleInputType = definitions[key];
      const convertedStyle = convertStyle(inputType, value, key, styles);
      if (excludeUndefinedStyled) {
        if (convertedStyle !== undefined) {
          newStyles[key] = convertedStyle;
        }
      } else {
        newStyles[key] = convertedStyle;
      }
    }

    // there are 3 old legacy styles (not in quickstyles) that need a custom conversion
    if (key === 'linkIsBold' && styles.linkIsBold) {
      newStyles.linkFontWeight = '700';
    }
    if (key === 'linkIsItalic' && styles.linkIsItalic) {
      newStyles.linkFontStyle = 'italic';
    }
    if (key === 'linkIsUnderlined' && styles.linkIsUnderlined) {
      newStyles.linkTextDecoration = 'underline';
    }
    if (key === 'linkFontItalic' && styles.linkFontItalic) {
      newStyles.linkFontStyle = 'italic';
    }
    if (key === 'linkTextUnderline' && styles.linkTextUnderline) {
      newStyles.linkTextDecoration = 'underline';
    }
  });

  return newStyles;
};
