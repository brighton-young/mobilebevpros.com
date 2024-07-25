import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import {
    useCalculatorId,
    useIsProduction
} from '../CalculatorState';

const useRemoveUpload = () => {
    const calculatorId = useCalculatorId();
    const isProduction = useIsProduction();

    return (payload) => {
        return fetchJson({
            url: getWebsiteUrl({
                slug: '/api/embed/remove-upload/'
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

export default useRemoveUpload;