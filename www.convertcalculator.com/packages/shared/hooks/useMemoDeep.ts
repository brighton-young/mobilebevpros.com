import { DependencyList, useMemo } from 'react';

import useDeepCompareMemoize from './useDeepCompareMemoize';

const useMemoDeep = <T>(fn: () => T, deps: DependencyList = []): T => {
  return useMemo<T>(fn, [useDeepCompareMemoize(deps)]);
};

export default useMemoDeep;
