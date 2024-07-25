import numberFormatter from 'number-formatter';

const decimalPlaces = (num: number) => {
  const match = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  if (!match) {
    return 0;
  }

  return Math.max(
    0,
    (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0),
  );
};

const getFormattedNumber = (
  formatting: string = '',
  result: string | number = undefined,
  origDecimals: number = undefined,
) => {
  // FIXME: Used isNumberLike function before. Don't know why I changed it.
  // If it's causing issues with customers we know what to do
  if (typeof result !== 'number') return result;
  // if (!isNumberLike(result)) return result;

  let decimals = 0;

  if (typeof origDecimals === 'number') {
    decimals = origDecimals;
  } else {
    decimals = decimalPlaces(result);
  }

  decimals = parseInt(decimals, 10);

  if (decimals === 0) {
    const formattedNumber = numberFormatter(formatting, result);

    if (!formattedNumber) return '';
    if (typeof formattedNumber === 'number') return String(formattedNumber);

    return formattedNumber.slice(0, -3);
  }

  let formattedDecimals = '';
  for (let i = 0; i < decimals; i += 1) {
    formattedDecimals += '0';
  }

  const newFormatting = formatting.slice(0, -2) + formattedDecimals;

  return numberFormatter(newFormatting, result);
};

export default getFormattedNumber;
