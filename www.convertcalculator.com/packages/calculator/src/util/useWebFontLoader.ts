import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getFontLoaderLink from '@cc/shared/utils/getFontLoaderLink';

import { useCalculator } from '../CalculatorState';

const useWebFontLoader = () => {
  const calculator = useCalculator();

  useEffectDeepCompare(() => {
    const googleFontUrl = getFontLoaderLink(calculator);

    if (!googleFontUrl) return undefined;

    const link = document.getElementById('fontloader');

    // already injected, probably by the Frame/Page
    if (link !== null) return undefined;

    const element = document.createElement('link');
    element.id = 'fontloader';
    element.rel = 'stylesheet';
    element.href = googleFontUrl;

    window.requestAnimationFrame(() => {
      document.head.appendChild(element);
    });

    return () => {
      try {
        document.head.removeChild(element);
      } catch (error) {
        // element is not a child of document.head
        // do nothing
      }
    };
  }, [calculator]);
};

export default useWebFontLoader;
