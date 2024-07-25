import getRootWindow from './getRootWindow';

const getQueryParams = (paramsToFind: string[]) => {
  // Use Root Window to get params from Client's Website
  const rootWindow = getRootWindow();
  if (!rootWindow) return [];

  const urlParams = new URLSearchParams(rootWindow.location.search);

  const cookieValues = document.cookie.split('; ');
  const cookies = cookieValues.reduce((acc, cookie) => {
    const cookieArr = cookie.split('=');
    const key = cookieArr[0];
    const value = cookieArr[1];

    return { ...acc, [key]: value };
  }, {});

  return paramsToFind
    .map((param) => {
      const cookie = cookies[param];
      const urlParam = urlParams.get(param);

      const paramValue = cookie || urlParam;

      if (!paramValue) return undefined;

      return { name: param, value: paramValue };
    })
    .filter((param) => {
      return !!param;
    });
};

export default getQueryParams;
