import React from 'react';

import StyledInputWrapper from '../../../../../components/Input/StyledInputWrapper';
import { defaultCountries } from '../../data/countryData';
import { usePhoneInput, UsePhoneInputConfig } from '../../hooks/usePhoneInput';
import { CountryIso2 } from '../../types';
import { CountrySelector } from '../CountrySelector/CountrySelector';

import StyledCountrySelectorPositioner from './StyledCountrySelectorPositioner';
import StyledCountrySelectorWrapper from './StyledCountrySelectorWrapper';
import StyledPhoneInput from './StyledPhoneInput';

export interface PhoneInputProps extends Omit<UsePhoneInputConfig, 'onChange'> {
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];

  onChange?: (phone: string, country: CountryIso2) => void;

  name: string;
  showCountrySelect?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  placeholder,
  onChange,
  value,
  countries = defaultCountries,
  name,
  defaultCountry,
  ...usePhoneInputConfig
}) => {
  const { phone, inputRef, country, setCountry, handlePhoneValueChange } =
    usePhoneInput({
      value,
      countries,
      ...usePhoneInputConfig,
      onChange: (data) => {
        onChange?.(data.phone, data.country);
      },
      defaultCountry,
    });

  return (
    <StyledInputWrapper>
      <StyledPhoneInput
        className="cc__phone-question-input"
        onChange={handlePhoneValueChange}
        value={phone}
        type="tel"
        ref={inputRef}
        name={name}
        placeholder={placeholder}
      />

      <StyledCountrySelectorWrapper>
        <StyledCountrySelectorPositioner>
          <CountrySelector
            onSelect={(_country) => {
              return setCountry(_country.iso2);
            }}
            selectedCountry={country}
            countries={countries}
          />
        </StyledCountrySelectorPositioner>
      </StyledCountrySelectorWrapper>
    </StyledInputWrapper>
  );
};
