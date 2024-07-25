import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import {
    useCalculatorId,
    useIsProduction
} from '../CalculatorState';

const useCreateUpload = () => {
    const calculatorId = useCalculatorId();
    const isProduction = useIsProduction();

    return async (payload) => {
        return fetchJson({
            url: getWebsiteUrl({
                slug: '/api/embed/create-upload/'
            }),
            method: 'POST',
            data: {
                ...payload,
                calculatorId,
                isProduction,
            },
        });
    };
};

export default useCreateUpload;