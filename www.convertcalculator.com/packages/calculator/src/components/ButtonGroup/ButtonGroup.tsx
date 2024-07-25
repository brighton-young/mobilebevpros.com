import React from 'react';

import classNames from 'classnames';

import getFormattedNumber from '../../util/getFormattedNumber';
import Tooltip from '../Tooltip';

import {
  StyledButtonGroupButton,
  StyledButtonGroupContainer,
  StyledFirstButton,
  StyledLabelValue,
  StyledLastButton,
  StyledNormalButton,
} from './StyledButtonGroup';

type Props = {
  gutters: number;
  options: {
    _id: string;
    label: string;
    value: string;
    tooltipText?: string | null;
  }[];
  selectedId: string;
  numberFormatting?: string;
  handleChange: (newOptionId: string) => void;
  shouldShowValue?: boolean;
  prefix?: string | null;
  postfix?: string | null;
  hasTooltips?: boolean;
  cannotDeselect?: boolean;
};

const ButtonGroup = ({
  gutters,
  options,
  selectedId,
  numberFormatting,
  handleChange,
  shouldShowValue,
  prefix,
  postfix,
  hasTooltips,
  cannotDeselect,
}: Props) => {
  // only add the StyledButtonGroupContainer if there are gutters
  // else we want to be able to set flex setting using custom css on the ElementClassNameWrapper
  const ButtonGroupContainerComponent =
    gutters > 0 ? StyledButtonGroupContainer : React.Fragment;

  return (
    <ButtonGroupContainerComponent
      {...(gutters > 0 ? { gutters: gutters || 0 } : {})}
    >
      {options.map((option, index) => {
        const isSelected = option._id === selectedId;

        const getButtonComponent = () => {
          if (gutters > 0) {
            return StyledButtonGroupButton;
          }

          if (index === 0) return StyledFirstButton;
          if (index === options.length - 1) return StyledLastButton;
          return StyledNormalButton;
        };

        const ButtonComponent = getButtonComponent();

        return (
          <ButtonComponent
            className={classNames('cc__buttonGroup-question-button', {
              'is-selected': isSelected,
            })}
            checked={isSelected}
            key={option._id}
            onClick={(ev) => {
              if (cannotDeselect && isSelected) {
                return;
              }

              ev.stopPropagation();
              handleChange(option._id);
            }}
          >
            {option.label || `Option #${index + 1}`}
            {shouldShowValue && (
              <StyledLabelValue>
                {' '}
                ({prefix}
                {getFormattedNumber(numberFormatting, option.value)}
                {postfix})
              </StyledLabelValue>
            )}
            {hasTooltips && option.tooltipText && (
              <>
                {' '}
                <Tooltip
                  position="top"
                  colorTone={isSelected ? 'dark' : 'light'}
                >
                  {option.tooltipText}
                </Tooltip>
              </>
            )}
          </ButtonComponent>
        );
      })}
    </ButtonGroupContainerComponent>
  );
};

export default ButtonGroup;
