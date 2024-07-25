import { useRef } from 'react';

import { dequal } from 'dequal';

const useDeepCompareMemoize = <T>(value: T) => {
  const ref = useRef<T>();

  if (!dequal(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export default useDeepCompareMemoize;
