import React, { useEffect, useState } from 'react';

import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import Callout from '../components/Callout';
import fetchJson from '../util/fetchJson';

type DisabledBoundaryProps = {
  children: React.ReactNode;
  calculatorId: string;
  checkIsDisabled: boolean;
};

const useIsDisabled = (calculatorId: string, check: boolean): boolean => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!check) {
      return;
    }

    const getIsDisabled = async () => {
      const url = new URL(
        getWebsiteUrl({
          slug: '/api/embed/disabled',
        }),
      );

      url.searchParams.append('calculatorId', calculatorId!);

      const disabled = await fetchJson<boolean>({
        url: url.toString(),
        method: 'GET',
      });

      setIsDisabled(disabled);
    };

    getIsDisabled();
  }, [calculatorId]);

  return isDisabled;
};

const DisabledBoundary: React.FC<DisabledBoundaryProps> = ({
  children,
  calculatorId,
  checkIsDisabled,
}) => {
  const isDisabled = useIsDisabled(calculatorId, checkIsDisabled);

  if (checkIsDisabled && isDisabled) {
    return <Callout variant="alert">Calculator is disabled</Callout>;
  }

  return children;
};

export default DisabledBoundary;
