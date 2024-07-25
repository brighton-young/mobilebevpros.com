import { useState } from 'react';

interface UseHistoryStateConfig<T> {
  onChange: (data: T) => void;
}

export const usePhoneState = <T extends Record<string, unknown> | string>(
  initialValue: T | (() => T),
  config?: UseHistoryStateConfig<T>,
) => {
  const { onChange } = {
    ...config,
  };

  const [state, _setState] = useState(initialValue);

  const setState = (value: T) => {
    if (
      // compare entries if passed value is object
      (typeof value === 'object' &&
        Object.entries(value).toString() ===
          Object.entries(state).toString()) ||
      value === state
    ) {
      return;
    }

    _setState(value);
    onChange?.(value);
  };

  return [state, setState] as const;
};
