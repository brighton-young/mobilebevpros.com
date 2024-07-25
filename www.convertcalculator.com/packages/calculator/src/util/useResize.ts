import { useEffect, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

type UseResize = (customResizeFunction?: () => void) => Size;

const useResize: UseResize = (customResizeFunction) => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const isBrowser = typeof window !== 'undefined';

  const standardResizeFunction = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const resizeFunction =
    typeof customResizeFunction === 'function'
      ? customResizeFunction
      : standardResizeFunction;

  useEffect(() => {
    if (!isBrowser) return undefined;

    resizeFunction();

    window.addEventListener('resize', resizeFunction);

    return () => {
      window.removeEventListener('resize', resizeFunction);
    };
  }, [isBrowser]);

  return size;
};

export default useResize;
