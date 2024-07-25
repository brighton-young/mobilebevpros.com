import styled from 'styled-components';

import { colors } from '../../styles';

type LabelProps = {
  isInvalid: boolean;
};

const Label = styled.div<LabelProps>`
  color: ${(props) => {
    return props.isInvalid ? colors.alertColor : undefined;
  }};
  display: block;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.8rem;
`;

export default Label;
