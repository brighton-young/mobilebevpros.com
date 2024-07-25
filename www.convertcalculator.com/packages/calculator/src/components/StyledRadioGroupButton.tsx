import React from 'react';

import styled from 'styled-components';

import { colors } from '../styles';
import { getBorderCSS } from '../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../styles/utils/getBorderRadiusCSS';
import { getBoxShadowCSS } from '../styles/utils/getBoxShadowCSS';
import { getSpacingCSS } from '../styles/utils/getSpacingCSS';

import Icon from './Icon';
import Button from './StyledButton';

const StyledComponent = styled(Button)<{
  checked: boolean;
  isEditing?: boolean;
}>`
  position: relative;
  padding: 1.25rem 1rem;
  text-align: left;
  ${({ theme, checked }) => {
    return `

    background-color: ${
      checked
        ? theme.radioGroupSelectedBackgroundColor ||
          theme.buttonBackgroundColor ||
          theme.primaryColor ||
          colors['gray-700']
        : theme.radioGroupUnselectedBackgroundColor || colors['gray-300']
    };
    
    color: ${
      !checked
        ? theme.radioGroupUnselectedTextColor || colors['gray-700']
        : theme.radioGroupSelectedTextColor
    };
    
    ${
      checked
        ? getBoxShadowCSS(theme.radioGroupSelectedShadow)
        : getBoxShadowCSS(theme.radioGroupUnselectedShadow)
    };
    
    ${
      checked
        ? getBorderCSS(theme.radioGroupSelectedBorder)
        : getBorderCSS(theme.radioGroupUnselectedBorder)
    };
    
    ${
      checked
        ? getBorderRadiusCSS(theme.radioGroupSelectedBorderRadius)
        : getBorderRadiusCSS(theme.radioGroupUnselectedBorderRadius)
    };
    
    ${getSpacingCSS(theme.radioGroupPadding)}

    &:hover {
      background-color: ${theme.radioGroupHoverBackgroundColor || ''};
      color: ${theme.radioGroupHoverTextColor || ''};
      ${getBorderCSS(theme.radioGroupHoverBorder)}
      ${getBorderRadiusCSS(theme.radioGroupHoverBorderRadius)}

      ${getBoxShadowCSS(theme.radioGroupHoverShadow)};
    }
  `;
  }}
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  border-radius: 9999px;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: ${colors['gray-300']};
  padding: 0.115rem;
`;

const StyledRadioGroupButton = ({ children, checked, ...props }) => {
  const foo = (
    <StyledComponent {...props} checked={checked}>
      {children}

      {checked && (
        <CheckIconWrapper>
          <Icon name="check" width="16px" height="16px" />
        </CheckIconWrapper>
      )}
    </StyledComponent>
  );

  return foo;
};

export default StyledRadioGroupButton;
