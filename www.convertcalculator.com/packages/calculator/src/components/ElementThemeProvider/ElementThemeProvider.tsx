import React from 'react';

import merge from 'lodash/merge';
import { ThemeProvider } from 'styled-components';

import { useFeatureFlags } from '../../CalculatorState';
import { quickStylesDefinitions } from '../../quickStyles/definitions';
import { stylesDefinitions } from '../../styles/definitions';
import { convertLegacyQuickStyles } from '../../util/convertLegacyQuickStyles';
import { convertLegacyStyles } from '../../util/convertLegacyStyles';

interface Props {
  children: React.ReactNode;
  elementStyles: Partial<typeof stylesDefinitions>;
  elementQuickStyles: Partial<typeof quickStylesDefinitions>;
}

const ElementThemeProvider = ({
  children,
  elementStyles = {},
  elementQuickStyles = {},
}: Props) => {
  const styles = convertLegacyStyles(elementStyles, stylesDefinitions, true);
  const quickStyles = convertLegacyQuickStyles(
    elementQuickStyles,
    quickStylesDefinitions,
  );

  return (
    <ThemeProvider
      theme={(outerTheme) => {
        return merge({}, outerTheme, styles);
      }}
    >
      <ThemeProvider
        theme={(outerTheme) => {
          return merge({}, outerTheme, quickStyles);
        }}
      >
        {children}
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default ElementThemeProvider;
