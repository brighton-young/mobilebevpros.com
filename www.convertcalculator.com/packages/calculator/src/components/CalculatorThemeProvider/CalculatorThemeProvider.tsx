import React from 'react';

import merge from 'lodash/merge';
import { ThemeProvider } from 'styled-components';

import {
  useCalculatorQuickStyles,
  useCalculatorStyles,
  useFeatureFlags,
} from '../../CalculatorState';
import { quickStylesDefinitions } from '../../quickStyles/definitions';
import { stylesDefinitions } from '../../styles/definitions';
import { convertLegacyStyles } from '../../util/convertLegacyStyles';

interface Props {
  children: React.ReactNode;
}

const CalculatorThemeProvider = ({ children }: Props) => {
  const styles = useCalculatorStyles();
  const convertedStyles = convertLegacyStyles(styles, stylesDefinitions, true);

  const quickStyles = useCalculatorQuickStyles() || {};

  const flattenedQuickStyles = {};
  Object.entries(quickStyles).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  const convertedQuickStyles = convertLegacyStyles(
    flattenedQuickStyles,
    quickStylesDefinitions,
  );

  return (
    <ThemeProvider
      theme={(outerTheme) => {
        return merge({}, outerTheme, convertedStyles);
      }}
    >
      <ThemeProvider
        theme={(outerTheme) => {
          return merge({}, outerTheme, convertedQuickStyles);
        }}
      >
        {children}
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default CalculatorThemeProvider;
