import { useEffect } from 'react';

const useEventListener = (
  name: string,
  callback: (event: CustomEvent) => void,
) => {
  useEffect(() => {
    window.addEventListener(name, callback);

    return () => {
      window.removeEventListener(name, callback);
    };
  }, [name]);
};

export default useEventListener;
