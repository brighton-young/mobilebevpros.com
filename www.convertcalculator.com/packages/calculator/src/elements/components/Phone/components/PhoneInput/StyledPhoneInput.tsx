import styled from 'styled-components';

import StyledInput from '../../../../../components/Input/StyledInput';

const StyledPhoneInput = styled(StyledInput)`
  ${({ theme, $showInputIcon }) => {
    return `
        ${`padding-left: ${
          (theme.inputSpacing.paddingLeft ?? 0) + ($showInputIcon ? 30 : 0) + 48
        }px;`}
  `;
  }}
`;

export default StyledPhoneInput;
