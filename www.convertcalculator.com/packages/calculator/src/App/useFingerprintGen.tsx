import { useMemo } from 'react';

import getRandomSecret from '@cc/shared/utils/getRandomSecret';

const useFingerprintGen = () => {
  const isBrowser = typeof window === 'undefined';

  const fingerprint = useMemo(() => {
    if (!isBrowser) return getRandomSecret();

    try {
      const existingFingerprint = window.localStorage.getItem('ccFp');

      if (existingFingerprint) return existingFingerprint;

      const newFingerprint = getRandomSecret();

      window.localStorage.setItem('ccFp', newFingerprint);

      return fingerprint;
    } catch (err) {
      return getRandomSecret();
    }
  }, [isBrowser]);

  return fingerprint;
};

export default useFingerprintGen;
