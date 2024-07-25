import fetchJson from '@cc/shared/utils/fetchJson';

import {
    useCalculatorId,
    useFingerprint,
    useIsProduction,
} from '../CalculatorState';
import {
    getSiteUrl
} from '../helpers';

const useCheckoutWithStripe = () => {
    const calculatorId = useCalculatorId();
    const fingerprint = useFingerprint();
    const isProduction = useIsProduction();

    return async (payload) => {
        return fetchJson({
            url: getSiteUrl({
                slug: '/api/embed/checkout-with-stripe/'
            }),
            method: 'POST',
            data: {
                ...payload,
                calculatorId,
                fingerprint,
                isProduction,
            },
        });
    };
};

export default useCheckoutWithStripe;