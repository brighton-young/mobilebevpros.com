import { useEffect, useState } from 'react';

import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import { CalculatorData, EmbedType } from '../types';

const useFetchData = ({
  calculatorId,
  dataFromProps,
  embedType,
}: {
  calculatorId: string;
  dataFromProps?: CalculatorData;
  embedType: EmbedType;
}) => {
  const [dataFromFetch, setDataFromFetch] = useState<CalculatorData>(undefined);
  const [isLoading, setIsLoading] = useState(!dataFromProps);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (embedType !== 'inPage' || !!dataFromProps) return;

    (async () => {
      try {
        const result = await fetchJson<CalculatorData>({
          url: getWebsiteUrl({
            slug: `/api/embed/get-data/?calculatorId=${calculatorId}`,
          }),
          method: 'GET',
        });

        setDataFromFetch(result);

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, [calculatorId, embedType]);

  const data = dataFromProps || dataFromFetch;

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
