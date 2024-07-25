import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import convertImageUrl from '@cc/shared/utils/convertImageUrl';

import { getSiteUrl } from '../../helpers';
import { colors } from '../../styles';
import useDimensions from '../../util/useDimensions';

const Options = styled.ul`
  width: 100%;
  margin: 0 !important;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

type OptionProps = {
  isSmall: boolean;
  hasImage: boolean;
  isFocused: boolean;
  isSelected: boolean;
};

const Option = styled.li<OptionProps>`
  display: flex;
  flex-wrap: ${({ isSmall }) => {
    return isSmall ? 'wrap' : 'nowrap';
  }};
  align-items: center;
  text-align: left;
  color: ${colors['gray-700']};
  cursor: pointer;
  user-select: none;

  ${(props) => {
    const { hasImage, isFocused, isSelected, isSmall } = props;

    const getPadding = () => {
      if (isSmall && hasImage) return '1rem 0.5rem';
      if (isSelected) return '0.5rem';

      return '0.5rem 0.5rem 0.5rem 1.5rem';
    };

    return `
      font-weight: ${isSelected ? 'bold' : 'normal'};
      padding: ${getPadding()};
      border-left: ${
        isSelected && hasImage && isSmall
          ? `2px solid ${colors.mediumGray}`
          : 'none'
      };
      background: ${isFocused ? colors['gray-100'] : 'transparent'};
      line-height: ${hasImage && !isSmall ? '10rem' : '1rem'};
    `;
  }};
`;

type OptionSelectedProps = {
  isSmall: boolean;
  hasImage: boolean;
};

const OptionSelected = styled.div<OptionSelectedProps>`
  width: 1rem;

  ${({ isSmall, hasImage }) => {
    if (!isSmall || !hasImage) return false;

    return `
      display: none;
    `;
  }};
`;

type OptionImageProps = {
  imageUrl: string;
  isSmall: boolean;
};

const OptionImage = styled.div<OptionImageProps>`
  background-image: url('${(props) => {
    return props.imageUrl;
  }}');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 10rem;
  width: 10rem;
  display: inline-block;
  margin: 0 1rem;

  ${({ isSmall }) => {
    if (!isSmall) return false;

    return `
      margin: 0 auto;
    `;
  }};
`;

type OptionLabelProps = {
  isSmall: boolean;
  hasImage: boolean;
};

const OptionLabel = styled.div<OptionLabelProps>`
  ${({ isSmall, hasImage }) => {
    if (!isSmall || !hasImage) {
      return `
      line-height: 1.5rem;
      flex-shrink: 1;
    `;
    }

    return `
      width: 100%;
      flex-basis: 100%;
      text-align: center;
    `;
  }};
`;

type DropdownOption = {
  _id: string;
  image?: string;
  label: string;
};

type DropdownOptionsProps = {
  isOpen: boolean;
  onSelectOption: (option: DropdownOption) => void;
  options: DropdownOption[];
  selectedOption?: string; // _id of the selected option
  showImages: boolean;
};

const DropdownOptions: React.FC<DropdownOptionsProps> = ({
  isOpen,
  onSelectOption,
  options = [],
  selectedOption,
  showImages,
}) => {
  const [wrapperComponent, { isSmall }] = useDimensions();
  const optionsComponent = useRef(null);

  const [focusedOption, setFocusedOption] = useState(undefined);

  const handleKeyDown = (ev) => {
    const { key } = ev;

    if (key === 'Enter') {
      const currentOption = options.find((option) => {
        return option._id === focusedOption;
      });

      onSelectOption(currentOption);

      return;
    }

    if (key !== 'ArrowUp' && key !== 'ArrowDown') return;

    ev.preventDefault();

    const getIndex = (childKey) => {
      const currentIndex = options.findIndex((option) => {
        return option._id === focusedOption;
      });

      if (childKey === 'ArrowUp') {
        if (currentIndex < 1) {
          return 0;
        }

        return currentIndex - 1;
      }

      if (currentIndex > options.length - 2) {
        return options.length - 1;
      }

      return currentIndex + 1;
    };

    const newIndex = getIndex(key);

    const newOption = options[newIndex];

    if (optionsComponent.current && newOption) {
      const currentOptionEl = optionsComponent.current.children[newIndex];

      if (!currentOptionEl) return;
      const currentOptionOffset = currentOptionEl.offsetTop;
      optionsComponent.current.scrollTop = currentOptionOffset;
    }

    setFocusedOption(newOption ? newOption._id : undefined);
  };

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedOption, isOpen, options]);

  return (
    <div ref={wrapperComponent}>
      <Options
        classNames="cc__dropdown-options"
        ref={optionsComponent}
        onMouseLeave={() => {
          setFocusedOption(undefined);
        }}
      >
        {options.map((option) => {
          const isFocused = focusedOption && focusedOption === option._id;
          const isSelected = selectedOption && selectedOption === option._id;

          return (
            <Option
              className={classNames('cc__dropdown-option', {
                'is-focused': isFocused,
                'is-selected': isSelected,
              })}
              hasImage={showImages}
              key={option._id}
              onClick={(ev) => {
                ev.stopPropagation();

                onSelectOption(option);
              }}
              isFocused={isFocused}
              isSelected={isSelected}
              isSmall={isSmall}
              onMouseEnter={() => {
                setFocusedOption(option._id);
              }}
            >
              {selectedOption && selectedOption === option._id && (
                <OptionSelected isSmall={isSmall} hasImage={showImages}>
                  ✓
                </OptionSelected>
              )}
              {showImages && (
                <OptionImage
                  imageUrl={
                    convertImageUrl(option.image) ||
                    getSiteUrl({ slug: '/img/image-placeholder.svg' })
                  }
                  isSmall={isSmall}
                  className="cc__dropdown-option--image"
                />
              )}
              <OptionLabel
                isSmall={isSmall}
                hasImage={showImages}
                className="cc__dropdown-option--label"
              >
                {option.label}
              </OptionLabel>
            </Option>
          );
        })}
      </Options>
    </div>
  );
};

export default DropdownOptions;
