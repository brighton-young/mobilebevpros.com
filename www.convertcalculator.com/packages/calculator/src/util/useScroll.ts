import { useEffect, useRef, useState } from 'react';

import getScrollParent from './getScrollParent';

type UseScroll = (parent: HTMLElement) => {
  x: number;
  y: number;
};

const useScroll: UseScroll = (parent) => {
  const eventListenerAdded = useRef(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleSetScroll = () => {
    const scrollableParent = getScrollParent(parent);

    const {
      scrollTop = 0,
      scrollLeft = 0,
      scrollX = 0,
      scrollY = 0,
    } = scrollableParent || {};

    setX(scrollLeft || scrollX);
    setY(scrollTop || scrollY);
  };

  useEffect(() => {
    const scrollableParent = getScrollParent(parent);

    if (!scrollableParent) return undefined;

    if (parent && !eventListenerAdded.current) {
      scrollableParent.addEventListener('scroll', handleSetScroll);
      eventListenerAdded.current = true;
    }

    return () => {
      if (
        scrollableParent &&
        typeof scrollableParent.removeEventListener === 'function'
      ) {
        scrollableParent.removeEventListener('scroll', handleSetScroll);
        eventListenerAdded.current = false;
      }
    };
  }, [parent]);

  return { x, y };
};

export default useScroll;
