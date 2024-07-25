import {
    useCalculatorId,
    useCalculatorProp,
    useIsDebugging,
    useIsEditing,
    useIsProduction,
} from '../CalculatorState';
import triggerEvent from '../util/triggerEvent';

const useTrackExternalEvent = () => {
    const calculatorId = useCalculatorId();
    const isDebugging = useIsDebugging();
    const isEditing = useIsEditing();
    const isProduction = useIsProduction();
    const shouldPermitExternalEventTracking = useCalculatorProp(
        'shouldPermitExternalEventTracking',
    );

    return (name, properties) => {
        if (isEditing) return;
        if (!shouldPermitExternalEventTracking) return;

        if (isDebugging) {
            console.log('📊 External Tracking: ', {
                name,
                properties
            });

            return;
        }

        if (!isProduction) return;

        triggerEvent({
            calculatorId,
            type: 'trackExternalEvent',
            payload: {
                name,
                properties,
            },
        });
    };
};

export default useTrackExternalEvent;