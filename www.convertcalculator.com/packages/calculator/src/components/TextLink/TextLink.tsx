import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../styles';

type TextLinkProps = {
  children: React.ReactNode;
  component?: React.ElementType;
};

const TextLink: React.FC<TextLinkProps> = (props) => {
  const { children, component = 'a', ...restProps } = props;

  const Link = styled(component)`
    appearance: none;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    color: ${colors.darkGray};

    &:hover {
      text-decoration: underline;
    }
  `;

  return <Link {...restProps}>{children}</Link>;
};

export default TextLink;
