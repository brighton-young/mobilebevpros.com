import getRootWindow from './getRootWindow';

const getParentWindow = (): Window => {
  const parentWindow = window.parent;

  try {
    // eslint-disable-next-line no-unused-expressions
    parentWindow.document;

    return parentWindow;
  } catch (err) {
    return window;
  }
};

const getCurrentFrameElement = (): HTMLIFrameElement | undefined => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser || !window) return undefined;

  const rootWindow = getRootWindow();
  const parentWindow = getParentWindow();

  const framesInRoot = rootWindow.document.querySelectorAll<HTMLIFrameElement>(
    'iframe.calculator-frame',
  );
  const framesInParent =
    parentWindow.document.querySelectorAll<HTMLIFrameElement>(
      'iframe.calculator-frame',
    );

  const foundInRoot = Array.from(framesInRoot).find((frame) => {
    return frame.contentWindow === window;
  });
  const foundInParent = Array.from(framesInParent).find((frame) => {
    return frame.contentWindow === window;
  });

  return foundInRoot || foundInParent;
};

export default getCurrentFrameElement;
