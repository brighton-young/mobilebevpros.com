import { DependencyList, EffectCallback, useEffect } from 'react';

import useDeepCompareMemoize from './useDeepCompareMemoize';

const useEffectDeepCompare = (
  fn: EffectCallback,
  deps: DependencyList = [],
) => {
  useEffect(fn, [useDeepCompareMemoize(deps)]);
};

export default useEffectDeepCompare;
