import transparentize from 'polished/lib/color/transparentize';
import styled from 'styled-components';

import { borderRadius, colors, shadows } from '../../styles';

type CalloutProps = {
  variant?: 'link' | 'primary' | 'secondary' | 'success' | 'warning' | 'alert';
};

const Callout = styled.div<CalloutProps>`
  border-radius: ${borderRadius.default};
  background: ${(props) => {
    if (!props.variant) return colors.lightGray;

    return transparentize(0.3, colors[`${props.variant}Color`]);
  }};

  color: ${(props) => {
    return props.variant ? colors.white : colors.darkGray;
  }};

  * {
    color: ${(props) => {
      return props.variant ? colors.white : colors.darkGray;
    }};
  }
  padding: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${shadows.default};
`;

export default Callout;
