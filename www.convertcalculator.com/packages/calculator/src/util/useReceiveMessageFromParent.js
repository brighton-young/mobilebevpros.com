import {
    useEffect
} from 'react';

const useReceiveMessageFromParent = ({
    calculatorId,
    onReceiveMessage
}) => {
    const handleReceiveEvent = (ev) => {
        const {
            data = {}
        } = ev;

        const {
            calculatorId: eventCalculatorId,
            payload,
            type
        } = data;

        if (eventCalculatorId !== calculatorId) return;

        onReceiveMessage({
            type,
            payload
        });
    };

    useEffect(() => {
        window.addEventListener('message', handleReceiveEvent);

        return () => {
            return window.removeEventListener('message', handleReceiveEvent);
        };
    });
};

export default useReceiveMessageFromParent;