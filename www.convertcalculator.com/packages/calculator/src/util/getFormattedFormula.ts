import getFormattedNumber from './getFormattedNumber';

const getFormattedFormula = ({
  result,
  decimals,
  formatting,
  prefix,
  postfix,
}: {
  result: number | string | [] | Object;
  decimals?: number;
  formatting?: string;
  prefix?: string;
  postfix?: string;
}) => {
  const isMatrix =
    Array.isArray(result) && result.length > 0 && Array.isArray(result[0]);

  if (isMatrix) return 'Table';

  if (typeof result === 'undefined' || result === null) return '...';
  if (result === 0) return `${prefix || ''}0${postfix || ''}`;

  if (typeof result === 'number' || typeof result === 'string') {
    const formattedResult = getFormattedNumber(formatting, result, decimals);

    return `${prefix || ''}${formattedResult}${postfix || ''}`;
  }

  if (Array.isArray(result)) return 'List';
  if (typeof result === 'object') return 'Object';

  return '...';
};

export default getFormattedFormula;
