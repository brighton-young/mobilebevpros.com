import styled from 'styled-components';

type HorizontalRuleProps = {
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
};

const HorizontalRule = styled.div<HorizontalRuleProps>`
  border-bottom: ${(props) => {
    return `${props.borderWidth}px ${props.borderStyle} ${props.borderColor}`;
  }};
  display: block;
  height: 1px;
  margin: 0rem !important;
`;

export default HorizontalRule;
