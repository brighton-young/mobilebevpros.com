const getIsFramed = (): boolean => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return false;

  const params = new URLSearchParams(window.location.search);

  return Boolean(params.get('framed'));
};

export default getIsFramed;
