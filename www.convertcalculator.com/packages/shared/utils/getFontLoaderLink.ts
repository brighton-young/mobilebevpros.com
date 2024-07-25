import get from 'lodash/get';
import uniq from 'lodash/uniq';

import { quickStylesDefinitions } from '@cc/calculator/src/quickStyles/definitions';
import { StyleInputType } from '@cc/calculator/src/styles/inputType';

import WebFontsEnum from '../enums/fonts';

const webFonts = Object.values(WebFontsEnum);

const getQuickStyleFonts = (quickStyles = {}) => {
  return Object.entries(quickStyles)
    .filter(([key, rule]) => {
      if (
        key in quickStylesDefinitions &&
        quickStylesDefinitions[key] === StyleInputType.FONT_FAMILY
      ) {
        // @ts-ignore
        return Boolean(rule?.enabled && rule?.value);
      }
      return false;
    })
    .map(([_, rule]) => {
      // @ts-ignore
      return rule.value;
    });
};

const getFonts = (calculator) => {
  const { formulas, elements, questions } = calculator.contents;

  const allElements = [...elements, ...formulas, ...questions];

  const elementStyleFonts = allElements.map((e) => {
    if (
      get(e, 'button.buttonIcon') ||
      get(e, 'button.showInputIcon') ||
      get(e, 'showInputIcon')
    )
      return 'Material Symbols Outlined';

    return (
      get(e, 'formula.resultStyle.fontFamily') ||
      get(e, 'heading.style.fontFamily') ||
      get(e, 'text.style.fontFamily')
    );
  });

  const elementQuickStyleFonts = allElements
    .map((e) => {
      return getQuickStyleFonts(e.quickStyles);
    })
    .flat();
  return uniq(
    [
      calculator.style.fontFamily,
      calculator.style.headingFontFamily,
      calculator.style.inputFontFamily,
      ...getQuickStyleFonts(calculator.quickStyles),
      ...elementStyleFonts,
      ...elementQuickStyleFonts,
    ].filter((f) => {
      return !!f;
    }),
  );
};

const getFontLoaderLink = (calculator) => {
  const fonts = getFonts(calculator);

  const filteredFonts = [
    ...fonts.filter((font) => {
      return !!font && webFonts.includes(font);
    }),
  ];

  if (filteredFonts.length === 0) return undefined;

  return `https://fonts.googleapis.com/css?family=${filteredFonts
    .map((font) => {
      return `${font}:100,200,300,400,500,600,700,800,900`;
    })
    .join('|')}`;
};

// TODO: this system can probably be done better in general
// todo is here to trace back to how fonts are loaded
export default getFontLoaderLink;
