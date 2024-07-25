import { useEffect } from 'react';

import { useSetCanvasWidth } from '../CalculatorState';
import triggerEvent from '../util/triggerEvent';

const useResizeDetector = ({
  calculatorEl,
  calculatorId,
}: {
  calculatorEl: HTMLDivElement;
  calculatorId: string;
}) => {
  const setCanvasWidth = useSetCanvasWidth();

  useEffect(() => {
    if (!calculatorEl) return undefined;

    // On initalization, emit the height of the calculator
    let height = calculatorEl.clientHeight;
    triggerEvent({
      calculatorId,
      type: 'resize',
      payload: { height },
      options: {
        triggerInPage: false,
        triggerFramed: true,
      },
    });

    // On initialization, set the canvas width
    let width = calculatorEl.clientWidth;
    setCanvasWidth(width);

    // When we detect a height change, emit the new height
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        const newHeight = calculatorEl.clientHeight;

        if (newHeight && height !== newHeight) {
          height = newHeight;

          triggerEvent({
            calculatorId,
            type: 'resize',
            payload: { height },
            options: {
              triggerInPage: false,
              triggerFramed: true,
            },
          });
        }

        const newWidth = calculatorEl.clientWidth;

        if (newWidth && width !== newWidth) {
          width = newWidth;

          setCanvasWidth(width);
        }
      });
    });

    resizeObserver.observe(calculatorEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculatorEl, calculatorId, setCanvasWidth]);
};

export default useResizeDetector;
