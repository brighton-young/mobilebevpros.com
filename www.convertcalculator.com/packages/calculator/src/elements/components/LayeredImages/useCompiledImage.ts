import { MutableRefObject, useState } from 'react';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';

import { useFeatureFlags } from '../../../CalculatorState';

const useCompiledImageNew = (
  parent: MutableRefObject<HTMLElement | null>,
): string | null => {
  const [compiledImage, setCompiledImage] = useState<string | null>(null);

  // we do not need this hook, but otherwise we break the hook rules once
  // the feature flag is changed. CHANGE to useEffect once FF waitForCompiledImage is removed
  useEffectDeepCompare(() => {
    if (!parent.current) return undefined;

    const observer = new MutationObserver(async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const imageEls = Array.from(parent.current.querySelectorAll('img'));

      const loadedImages = await Promise.all(
        imageEls.map((imageEl) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const element = imageEl;

            if (element.dataset.isLoaded === 'true') {
              resolve(element);
            } else {
              element.onload = () => {
                element.dataset.isLoaded = 'true';
                resolve(element);
              };
            }
          });
        }),
      );

      ctx.canvas.width = parent.current.offsetWidth * 2;
      ctx.canvas.height = parent.current.offsetHeight * 2;

      loadedImages.forEach((loadedImage) => {
        if (loadedImage.dataset.isVisible === 'true') {
          ctx.drawImage(loadedImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
        }
      });

      const compiledImageDataUrl = canvas.toDataURL('image/png');

      const isEmpty = compiledImageDataUrl === 'data:,';

      if (!isEmpty) {
        setCompiledImage(compiledImageDataUrl);
      }
    });

    if (parent) {
      observer.observe(parent.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [parent.current]);

  return compiledImage;
};

const useCompiledImageOld = (
  imageWrapperRef: MutableRefObject<HTMLElement>,
  deps: any[] = [],
): string | null => {
  const [compiledImage, setCompiledImage] = useState<string | null>(null);

  useEffectDeepCompare(() => {
    if (!imageWrapperRef.current) return undefined;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = imageWrapperRef.current.offsetWidth * 2;
    ctx.canvas.height = imageWrapperRef.current.offsetHeight * 2;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const imageEls = imageWrapperRef.current.querySelectorAll('img');

    imageEls.forEach((imageEl) => {
      if (imageEl.dataset.isVisible === 'true') {
        ctx.drawImage(imageEl, 0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    });

    const compiledImageDataUrl = canvas.toDataURL('image/png');

    const isEmpty = compiledImageDataUrl === 'data:,';

    if (!isEmpty) {
      setCompiledImage(compiledImageDataUrl);
    }

    return () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }, deps);

  return compiledImage;
};

// FF waitForCompiledImage: remove wrapper and old useCompiledImageOld hook
export const useCompiledImage = (
  parent: MutableRefObject<HTMLElement | null>,
  deps: any[],
): string | null => {
  const { waitForCompiledImage = false } = useFeatureFlags();
  const hook = waitForCompiledImage ? useCompiledImageNew : useCompiledImageOld;
  return hook(parent, deps);
};
