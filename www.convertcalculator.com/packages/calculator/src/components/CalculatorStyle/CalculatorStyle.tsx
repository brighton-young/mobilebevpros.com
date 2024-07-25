import React, { useEffect, useState } from 'react';

import styled, { createGlobalStyle, css } from 'styled-components';

import { useShowErrors } from '../../CalculatorState';
import { colors, leading } from '../../styles';
import getCalculatorStyleVariables from '../../styles/styleVariables/calculatorStyleVariables';
import useStyles from '../../styles/useStyles';
import { CalculatorThemeProvider } from '../CalculatorThemeProvider';

const GlobalStyle = createGlobalStyle<{
  embedType: 'inPage' | 'framed' | 'standalone';
}>`
  body {
    margin: 0;
    padding: 0;
  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 

    font-family: ${({ embedType }) => {
      if (embedType === 'inPage') return undefined;

      return "'system-ui',  sans-serif";
    }};

    
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
    border-width: 0
  }

  progress,
  sub,
  sup {
    vertical-align: baseline
  }

  [type=button],
  [type=reset],
  [type=submit],
  button {
    -webkit-appearance: button
  }

  p {
    line-height: ${leading.normal};
    margin: 0 0 0.5rem 0;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

const CalculatorContainer = styled.div<{
  showErrors: boolean;
  styles: Record<string, any>;
}>`
  margin-left: auto;
  margin-right: auto;

  ${({ showErrors }) => {
    return css`
      animation: ${showErrors &&
      'animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both'};
    `;
  }}

  ${({ styles }) => {
    return css`
      --theme-text-color: ${styles.textColor};
      --theme-primary-color: ${styles.primaryColor};
      --theme-neutral-color: ${styles.neutralColor};

      --range-result-color: ${styles.textColor};
      --range-thumb-color: ${styles.textColor || colors['gray-700']};
      --range-track-color: ${styles.neutralColor};
      --range-active-track-color: ${styles.primaryColor};
      --range-track-end-color: var(--range-track-color);
      --range-ms-track-fill-upper: var(--range-track-color);
      --range-track-start-color: var(--range-active-track-color);
      --range-ms-track-fill-lower: var(--range-active-track-color);

      font-family: ${styles.fontFamily};
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      color: ${styles.textColor};
      text-align: ${styles.textAlign};
      text-transform: ${styles.textTransform};
      font-style: ${styles.fontStyle};

      p {
        line-height: ${styles.lineHeight};
        font-style: ${styles.fontStyle};
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: ${styles.headingFontFamily};
        font-weight: ${styles.headingFontWeight};
        color: ${styles.headingTextColor};
        text-align: ${styles.headingTextAlign};
        text-transform: ${styles.headingTextTransform};
        font-style: ${styles.headingFontStyle};
        margin: ${styles.headingMargin};
      }

      h1 {
        font-size: ${styles.headingOneFontSize};
        font-weight: ${styles.headingOneFontWeight};
        line-height: ${styles.headingOneLineHeight};
      }

      h2 {
        font-size: ${styles.headingTwoFontSize};
        font-weight: ${styles.headingTwoFontWeight};
        line-height: ${styles.headingTwoLineHeight};
      }

      h3 {
        font-size: ${styles.headingThreeFontSize};
        font-weight: ${styles.headingThreeFontWeight};
        line-height: ${styles.headingThreeLineHeight};
      }

      h4 {
        font-size: ${styles.headingFourFontSize};
        font-weight: ${styles.headingFourFontWeight};
        line-height: ${styles.headingFourLineHeight};
      }

      h5 {
        font-size: ${styles.headingFiveFontSize};
        font-weight: ${styles.headingFiveFontWeight};
        line-height: ${styles.headingFiveLineHeight};
      }

      h6 {
        font-size: ${styles.headingSixFontSize};
        font-weight: ${styles.headingSixFontWeight};
        line-height: ${styles.headingSixLineHeight};
      }

      background-color: ${styles.backgroundColor};

      max-width: ${styles.maxWidth};

      height: ${styles.height};
      overflow: ${styles.overflow};

      padding-top: ${styles.paddingTop};
      padding-right: ${styles.paddingRight};
      padding-bottom: ${styles.paddingBottom};
      padding-left: ${styles.paddingLeft};
    `;
  }}
`;

type CalculatorStyleProps = {
  children: React.ReactNode;
  canvasRef: React.RefObject<HTMLDivElement>;
  className?: string;
  embedType?: 'inPage' | 'framed' | 'standalone';
};

const CalculatorStyle = ({
  children,
  canvasRef,
  className,
  embedType,
}: CalculatorStyleProps) => {
  const showErrors = useShowErrors();
  const styles = useStyles({ getVariables: getCalculatorStyleVariables });

  const [showErrorsAnimation, setShowErrorsAnimation] = useState(false);

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';

    if (!isBrowser || !showErrors) return;

    setShowErrorsAnimation(true);

    window.setTimeout(() => {
      setShowErrorsAnimation(false);
    }, 820);
  }, [showErrors]);

  return (
    <>
      <CalculatorThemeProvider>
        <GlobalStyle embedType={embedType} />
        <CalculatorContainer
          showErrors={showErrorsAnimation}
          ref={canvasRef}
          className={className}
          styles={styles}
        >
          {children}
        </CalculatorContainer>
      </CalculatorThemeProvider>
    </>
  );
};

export default CalculatorStyle;
