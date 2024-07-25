// FF: placesViaGeoapify: Remove this hook when flag is removed
import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { useCalculatorId, useIsProduction } from '../CalculatorState';

const useFetchPlaceDetails = () => {
  const calculatorId = useCalculatorId();
  const isProduction = useIsProduction();

  return async (payload) => {
    return fetchJson({
      url: getWebsiteUrl({ slug: '/api/embed/get-place-details/' }),
      method: 'POST',
      data: {
        ...payload,
        calculatorId,
        isProduction,
      },
    });
  };
};

export default useFetchPlaceDetails;
