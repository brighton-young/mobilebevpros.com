import type { CompanyDetails } from '@cc/api/embed/kvk';
import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { useCalculatorId } from '../CalculatorState';

const useFetchCompanyDetails = () => {
  const calculatorId = useCalculatorId();

  return async (kvkNummer: string): Promise<CompanyDetails> => {
    return fetchJson({
      url: getWebsiteUrl({ slug: '/api/embed/get-company-details/' }),
      method: 'GET',
      params: {
        kvkNummer,
        calculatorId,
      },
    });
  };
};

export default useFetchCompanyDetails;
