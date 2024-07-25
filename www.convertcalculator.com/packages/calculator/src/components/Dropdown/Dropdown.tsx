import React, { useEffect, useState } from 'react';

import omit from 'lodash/omit';
import styled from 'styled-components';

import { colors } from '../../styles';
import DropdownOptions from '../DropdownOptions';
import FloatingBox from '../FloatingBox';
import Icon from '../Icon';
import IconButton from '../IconButton';

import StyledDropdownContainer from './StyledDropdownContainer';
import StyledDropdownTrigger from './StyledDropdownTrigger';
import StyledNakedInput from './StyledNakedInput';

const StyledPlaceholder = styled.span`
  color: ${colors.mediumGray};
`;

const StyledClearButton = styled(IconButton)`
  float: right;
  line-height: 1.5rem;
  margin-right: 0.5rem;
`;

type DropdownProps = {
  isClearable?: boolean;
  isSearcheable?: boolean;
  name: string;
  onChange: (name: string, value: string) => void;
  onClear?: () => void;
  options: {
    _id: string;
    label: string;
    keywords?: string;
    image?: string;
  }[];
  placeholder?: string;
  showImages?: boolean;
  value: {
    _id: string;
    label: string;
    keywords?: string;
    image?: string;
  };
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    isClearable = false,
    isSearcheable = false,
    name,
    onChange,
    onClear,
    options = [],
    placeholder,
    showImages = false,
    value,
  } = props;

  const [shouldShowOptions, setShouldShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find((o) => {
    return o._id === value._id;
  });

  useEffect(() => {
    if (!selectedOption) return;

    setSearchQuery(selectedOption.label);
  }, [value]);

  const handleClear = (ev) => {
    ev.stopPropagation();

    setSearchQuery('');
    if (typeof onClear === 'function') onClear();
  };

  const handleSearchChange = (ev) => {
    const { value: newSearchQuery } = ev.target;

    setShouldShowOptions(true);
    setSearchQuery(newSearchQuery);
  };

  const handleSelectOption = (option) => {
    if (option === undefined) return;

    setShouldShowOptions(false);

    if (option._id === value._id) return;

    onChange(name, option._id);
  };

  const filteredOptions = options.filter((option) => {
    if (!isSearcheable) return true;

    return [option.label, ...(option.keywords || '').split(',')].reduce(
      (found, keyword) => {
        if (found) return true;

        return keyword.toLowerCase().includes(searchQuery.toLowerCase());
      },
      false,
    );
  });

  return (
    <StyledDropdownContainer>
      <StyledDropdownTrigger
        as="div"
        {...omit(props, ['onChange', 'onClear', 'onSelect', 'options'])}
        onClick={(ev) => {
          ev.stopPropagation();
          setShouldShowOptions(!shouldShowOptions);
        }}
      >
        {!isSearcheable && selectedOption && (
          <span>{selectedOption.label}</span>
        )}
        {!isSearcheable && !selectedOption && (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        )}
        {isSearcheable && (
          <StyledNakedInput
            type="text"
            placeholder={placeholder}
            onChange={handleSearchChange}
            value={searchQuery}
          />
        )}
        &nbsp;
        {isClearable && (
          <StyledClearButton type="button" onClick={handleClear}>
            <Icon name="x" width="16px" height="16px" />
          </StyledClearButton>
        )}
      </StyledDropdownTrigger>

      <FloatingBox
        isOpen={shouldShowOptions}
        onClose={() => {
          setShouldShowOptions(false);
        }}
        position={isSearcheable ? 'below' : 'inside'}
      >
        <DropdownOptions
          isOpen={shouldShowOptions}
          options={filteredOptions}
          onSelectOption={handleSelectOption}
          selectedOption={value._id}
          showImages={showImages}
        />
      </FloatingBox>
    </StyledDropdownContainer>
  );
};

export default Dropdown;
