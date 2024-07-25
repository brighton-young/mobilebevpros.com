import { useEffect } from 'react';

import toString from 'lodash/toString';

import type { CalculatorContent } from '@cc/db';

type UseCustomScripts = (props: {
  calculator: CalculatorContent;
  isProduction: boolean;
}) => void;

const useCustomScripts: UseCustomScripts = ({ calculator, isProduction }) => {
  const { shouldPermitJavaScriptAccess, customCSSCode, customJavaScriptCode } =
    calculator;

  const shouldAddCSSCode = !!customCSSCode;
  const shouldAddJSCode =
    isProduction && shouldPermitJavaScriptAccess && !!customJavaScriptCode;

  useEffect(() => {
    if (!shouldAddCSSCode) return undefined;

    const style = document.createElement('style');

    style.id = 'cc-custom-css';
    style.appendChild(
      document.createTextNode(
        isProduction ? customCSSCode : scopeCustomCSS(customCSSCode),
      ),
    );

    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);

    return () => {
      style.parentNode.removeChild(style);
    };
  }, [shouldAddCSSCode]);

  useEffect(() => {
    if (!shouldAddJSCode) return;

    try {
      // eslint-disable-next-line consistent-return, no-new-func
      return Function(
        `"use strict";
          return (function() {
            try {
              window.addEventListener("ccloaded", (event) => {
                const ccInstance = window.cc.getInstance(event.detail.calculatorId);

                if (ccInstance) {
                  ${toString(customJavaScriptCode)}
                }
              })
            } catch (err) {
              console.error(err);
            }
          })()`,
      )();
    } catch (err) {
      console.error(err);
    }
  }, []);
};

// this will be removed once we have a new editor
// where styles are isolated (e.g. framed)
const scopeCustomCSS = (css: string): string => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);

  const rules = Array.from(sheet.cssRules).map((rule) => {
    if (
      rule.cssText.startsWith('.cc ') ||
      rule.cssText.startsWith('.cc{') ||
      rule.cssText.includes('html ') ||
      rule.cssText.includes('html{') ||
      rule.cssText.includes('body ') ||
      rule.cssText.includes('body{') ||
      rule.cssText.includes('@media ')
    ) {
      return rule.cssText;
    }
    return `.cc ${rule.cssText}`;
  });

  return rules.join('\n');
};

export default useCustomScripts;
