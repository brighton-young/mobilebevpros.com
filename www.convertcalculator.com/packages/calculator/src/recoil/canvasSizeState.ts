import { selector } from 'recoil';

import canvasWidthState from './canvasWidthState';

type CanvasSize = {
  size: 'mobile' | 'tablet' | 'desktop' | 'extraLarge';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const getSize = (width) => {
  if (width < 577) return 'mobile';
  if (width < 769) return 'tablet';
  if (width < 993) return 'desktop';

  return 'extraLarge';
};

const canvasSizeState = selector<CanvasSize>({
  key: 'canvasSizeState',
  get: ({ get }) => {
    const canvasWidth = get(canvasWidthState);

    const size = getSize(canvasWidth);

    return {
      size,
      isMobile: size === 'mobile',
      isTablet: size === 'tablet',
      isDesktop: size === 'desktop',
    };
  },
});

export default canvasSizeState;
