import styled from 'styled-components';

import { colors } from '../../styles';

type FieldErrorProps = {
  isVisible: boolean;
};

const FieldError = styled.div<FieldErrorProps>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  color: ${colors.alertColor};
  display: ${(props) => {
    return props.isVisible ? 'block' : 'none';
  }};
  font-size: 0.75rem;
  margin-top: 0rem;
  margin-bottom: 1rem;
`;

export default FieldError;
