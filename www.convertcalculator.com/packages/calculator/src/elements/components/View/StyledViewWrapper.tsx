import styled, { css } from 'styled-components';

import { colors } from '../../../styles';

const StyledViewWrapper = styled.div<{
  hasChildren: boolean;
  isEditing: boolean;
}>`
  ${({ hasChildren, isEditing }) => {
    return (
      isEditing &&
      !hasChildren &&
      css`
        min-height: 5rem;
        border: 1px dashed ${colors.darkGray};
      `
    );
  }}
`;

export default StyledViewWrapper;
