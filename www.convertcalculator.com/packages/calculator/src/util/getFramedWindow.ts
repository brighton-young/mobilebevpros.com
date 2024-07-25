import getCurrentFrameElement from './getCurrentFrameElement';

/**
 * Get the framed window if it's framed or the normal window
 * @returns {object} Window object
 */
const getFramedWindow = (): Window => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser || !window) return undefined;

  const isFramed = getCurrentFrameElement();

  if (!isFramed) return window;

  return window.parent;
};

export default getFramedWindow;
