import React from 'react';

import styled from 'styled-components';

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
`;

const StyledRadioGroup = ({ children }) => {
  return <StyledComponent>{children}</StyledComponent>;
};

export default StyledRadioGroup;
