import styled from 'styled-components';

import StyledButton, {
  getReadableColor,
} from '../../../../components/StyledButton/StyledButton';
import { colors } from '../../../../styles';

const StyledButtonButton = styled(StyledButton)`
  ${({ isEditing, theme }) => {
    return `
    pointer-events: ${isEditing ? 'none' : 'inherit'};
    text-decoration: none !important;

    &:hover {
      color: ${theme.buttonHoverTextColor} !important;
      text-decoration: none !important;
    }

    &:visited,
    &:active,
    &:focus {
      text-decoration: none !important;
    }
  `;
  }}
`;

export default StyledButtonButton;
