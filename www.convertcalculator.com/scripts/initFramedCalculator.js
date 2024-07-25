import {
    handleCCEvent
} from '@cc/calculator';

const initFramedCalculator = ({
    calculatorId,
    el
}) => {
    const iFrame = document.createElement('iframe');
    iFrame.className = 'calculator-frame';
    iFrame.id = `calculator-frame-${calculatorId}`;
    iFrame.sandbox =
        'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox';
    iFrame.title = 'Calculator Frame';
    iFrame.style = 'border:none;';
    iFrame.width = '100%';
    iFrame.height = '16rem';

    const rootUrl = process.env.NEXT_PUBLIC_BASE_URL;
    iFrame.src = `${rootUrl}/embed/${calculatorId}?url=${encodeURIComponent(
    window.location.href,
  )}&framed=1`;

    if (el.firstChild) {
        el.removeChild(el.firstChild);
    }

    el.appendChild(iFrame);

    const ccEventListener = (ev) => {
        const {
            data = {}
        } = ev;

        const {
            calculatorId: eventCalculatorId,
            payload,
            type
        } = data;

        if (eventCalculatorId !== calculatorId) return;

        handleCCEvent({
            calculatorId,
            payload,
            type,
            context: {
                parentWindow: window,
                calculatorContainer: iFrame
            },
        });
    };

    window.addEventListener('message', ccEventListener);
};

export default initFramedCalculator;