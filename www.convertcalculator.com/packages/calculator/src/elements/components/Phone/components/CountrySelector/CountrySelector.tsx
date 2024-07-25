import React, { useMemo, useRef, useState } from 'react';

import { defaultCountries } from '../../data/countryData';
import { CountryData, CountryIso2 } from '../../types';
import { getCountry } from '../../utils';
import { FlagEmoji } from '../FlagEmoji/FlagEmoji';

import {
  CountrySelectorDropdown,
  CountrySelectorDropdownProps,
} from './CountrySelectorDropdown';
import StyledButtonContent from './StyledButtonContent';
import StyledCountrySelector from './StyledCountrySelector';
import StyledCountrySelectorButton from './StyledCountrySelectorButton';
import StyledDropDownArrow from './StyledDropDownArrow';

export interface CountrySelectorStyleProps {}

type RenderButtonWrapperRootProps = {
  // Omit the event argument to prevent errors on event mistype
  onClick: () => void;
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onKeyDown'
  | 'onMouseDown'
  | 'title'
  | 'disabled'
  | 'role'
  | 'aria-label'
  | 'aria-haspopup'
  | 'aria-expanded'
>;

export interface CountrySelectorProps extends CountrySelectorStyleProps {
  selectedCountry: CountryIso2;
  onSelect?: CountrySelectorDropdownProps['onSelect'];
  countries?: CountryData[];
  renderButtonWrapper?: (props: {
    children: React.ReactNode;
    rootProps: RenderButtonWrapperRootProps;
  }) => React.ReactNode;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelect,
  countries = defaultCountries,
  renderButtonWrapper,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const fullSelectedCountry = useMemo(() => {
    if (!selectedCountry) return undefined;
    return getCountry({
      value: selectedCountry,
      field: 'iso2',
      countries,
    });
  }, [countries, selectedCountry]);

  const countrySelectorRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!e.key) return;

    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      setShowDropdown(true);
    }
  };

  const renderSelectorButton = () => {
    const rootProps: RenderButtonWrapperRootProps = {
      title: fullSelectedCountry?.name,
      onClick: () => {
        return setShowDropdown((v) => {
          return !v;
        });
      },
      // Need this to close dropdown on selector button click
      // https://stackoverflow.com/a/28963938
      onMouseDown: (e) => {
        return e.preventDefault();
      },
      onKeyDown: handleKeyDown,
      role: 'combobox',
      'aria-label': 'Country selector',
      'aria-haspopup': 'listbox',
      'aria-expanded': showDropdown,
    };

    const buttonContent = (
      <StyledButtonContent>
        <FlagEmoji
          iso2={selectedCountry}
          style={{
            visibility: selectedCountry ? 'visible' : 'hidden',
          }}
        />
        <StyledDropDownArrow />
      </StyledButtonContent>
    );
    if (renderButtonWrapper) {
      return renderButtonWrapper({
        children: buttonContent,
        rootProps,
      });
    }
    return (
      <StyledCountrySelectorButton
        {...rootProps}
        type="button"
        data-country={selectedCountry}
      >
        {buttonContent}
      </StyledCountrySelectorButton>
    );
  };

  return (
    <StyledCountrySelector ref={countrySelectorRef}>
      {renderSelectorButton()}
      <CountrySelectorDropdown
        show={showDropdown}
        countries={countries}
        onSelect={(country) => {
          setShowDropdown(false);
          onSelect?.(country);
        }}
        selectedCountry={selectedCountry}
        onClose={() => {
          setShowDropdown(false);
        }}
      />
    </StyledCountrySelector>
  );
};
