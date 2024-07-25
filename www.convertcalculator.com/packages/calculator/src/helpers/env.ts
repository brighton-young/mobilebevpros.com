// TODO: this should all be moved to a better `env` module in the root of the project

import getIsFramed from '../util/getIsFramed';

type GetUrl = (options: { slug: string }) => string;

export const getScriptsUrl: GetUrl = ({ slug }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const slugWithoutSlash = slug[0] === '/' ? slug.slice(1) : slug;

  return `${baseUrl}/scripts/${slugWithoutSlash}`;
};

export const getSiteUrl: GetUrl = ({ slug }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const slugWithoutSlash = slug[0] === '/' ? slug.slice(1) : slug;

  return `${baseUrl}/${slugWithoutSlash}`;
};

export const getClientSearchParams = (): string | undefined => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser || !window) return undefined;

  const isFramed = getIsFramed();

  // If Framed, get url from query parameter as set in <CalculatorPage />
  if (isFramed) {
    const framedUrlParams = new URLSearchParams(window.location.search);

    const url = framedUrlParams.get('url');

    const newUrl = new URL(url);

    return newUrl.search;
  }

  return window.location.search;
};

export const getClientHref = (): string => {
  const isFramed = window.parent !== window;

  if (isFramed) {
    try {
      return window.parent.location.href;
    } catch (err) {
      return window.location.href;
    }
  }

  return window.location.href;
};
