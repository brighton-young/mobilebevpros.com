import type { CompanySuggestion } from '@cc/api/embed/kvk';
import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { useCalculatorId } from '../CalculatorState';

const useFetchChamberOfCommerce = () => {
  const calculatorId = useCalculatorId();

  return async (payload): Promise<CompanySuggestion[]> => {
    return fetchJson({
      url: getWebsiteUrl({ slug: '/api/embed/get-company-suggestions/' }),
      method: 'GET',
      params: {
        ...payload,
        calculatorId,
      },
    });
  };
};

export default useFetchChamberOfCommerce;
