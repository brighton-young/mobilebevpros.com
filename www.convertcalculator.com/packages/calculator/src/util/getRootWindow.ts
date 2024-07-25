const getRootWindowWithException = (): Window => {
  const isFramed = window.parent !== window;

  const isDoubleFramed =
    window.parent && window.parent.parent !== window.parent;

  if (isDoubleFramed) return window.parent.parent;
  if (isFramed) return window.parent;

  return window;
};

const getRootWindow = (): Window => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser || !window) return undefined;

  const rootWindow = getRootWindowWithException();

  try {
    // eslint-disable-next-line no-unused-expressions
    rootWindow.document;

    return rootWindow;
  } catch (err) {
    return window;
  }
};
export default getRootWindow;
