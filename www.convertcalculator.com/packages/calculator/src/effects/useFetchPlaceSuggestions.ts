import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import {
  useCalculatorId,
  useFeatureFlags,
  useIsProduction,
} from '../CalculatorState';

const useFetchPlaceSuggestions = () => {
  const calculatorId = useCalculatorId();
  const isProduction = useIsProduction();
  const { placesViaGeoapify } = useFeatureFlags();

  return async (payload) => {
    return fetchJson({
      url: getWebsiteUrl({ slug: '/api/embed/get-place-suggestions/' }),
      method: 'POST',
      data: {
        ...payload,
        calculatorId,
        isProduction,
        useGeoapify: placesViaGeoapify, // FF: placesViaGeoapify: Remove this prop when removing flag
      },
    });
  };
};

export default useFetchPlaceSuggestions;
