import { useEffect } from 'react';

import handleCCEvent from '../util/handleCCEvent';

const useEventTriggerer = ({
  calculatorContainer,
  embedType,
}: {
  calculatorContainer: HTMLDivElement;
  embedType: 'inPage' | 'framed' | 'standalone';
}) => {
  useEffect(() => {
    // On Framed embeds, we handle ccEvent listening via `initFramedCalculator.js`, so should be triggered here
    if (embedType === 'framed') return undefined;

    const handleCCEventListener = (ev) => {
      const { calculatorId: calculatorIdInEvent, type, payload } = ev.detail;

      handleCCEvent({
        calculatorId: calculatorIdInEvent,
        type,
        payload,
        context: {
          parentWindow: window,
          calculatorContainer,
        },
      });
    };

    window.addEventListener('ccEvent', handleCCEventListener);

    return () => {
      window.removeEventListener('ccEvent', handleCCEventListener);
    };
  }, [embedType]);
};

export default useEventTriggerer;
