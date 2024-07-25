import React from 'react';

import styled from 'styled-components';

const StyledInputIconWrapper = styled.span`
  cursor: default;
  pointer-events: none;
  position: absolute;
  line-height: 1;
  text-align: center;
  top: 0;
  left: 0;
  right: auto;
  height: 100%;
  width: 42px;
  ${({ theme }) => {
    return `
        color: ${theme.inputIconColor || theme.inputPlaceholderTextColor};
        `;
  }}
`;

const StyledInputIconPositioner = styled.div`
  left: 0;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
  margin-top: -0.5em;
`;

type Props = {
  icon: React.ReactNode;
};

const InputIcon = ({ icon }: Props) => {
  return (
    <StyledInputIconWrapper>
      <StyledInputIconPositioner className="material-symbols-outlined">
        {icon}
      </StyledInputIconPositioner>
    </StyledInputIconWrapper>
  );
};

export default InputIcon;
