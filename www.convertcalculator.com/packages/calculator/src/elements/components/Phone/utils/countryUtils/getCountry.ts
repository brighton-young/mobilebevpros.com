import { CountryData, ParsedCountry } from '../../types';

import { parseCountry } from './parseCountry';

const constructFieldNotSupportedErrorMessage = (field: keyof ParsedCountry) => {
  return `Field "${field}" is not supported`;
};

export const getCountry = ({
  value,
  field,
  countries,
}: {
  value: CountryData[number];
  field: keyof ParsedCountry;
  countries: CountryData[];
}): ParsedCountry | undefined => {
  if (['regions', 'priority'].includes(field)) {
    throw new Error(constructFieldNotSupportedErrorMessage(field));
  }
  const country = countries.find((country) => {
    const parsedCountry = parseCountry(country);
    return value === parsedCountry[field];
  });

  if (!country) return undefined;
  return parseCountry(country);
};
