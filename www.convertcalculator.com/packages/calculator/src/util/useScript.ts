import { useEffect, useState } from 'react';

type UseScript = (options: {
  id: string;
  src: string;
  shouldLoad?: boolean;
}) => boolean;

const useScript: UseScript = ({ id, shouldLoad = true, src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = (ev) => {
    setIsLoaded(true);

    // eslint-disable-next-line no-param-reassign
    ev.target.dataset.loaded = true;
  };

  useEffect(() => {
    if (!shouldLoad) return;

    const existingScript = document.getElementById(id);

    if (existingScript) {
      if (existingScript.dataset.loaded) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', onLoad);
      }
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.id = id;
      document.body.appendChild(script);

      script.addEventListener('load', onLoad);
    }
  }, [shouldLoad]);

  return isLoaded;
};

export default useScript;
