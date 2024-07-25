import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const StyledIconButton = styled.button`
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  background: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  user-select: none;
`;

type IconButtonProps = {
  children: React.ReactNode;
  className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <StyledIconButton {...restProps} className={`cc__icon-button ${className}`}>
      {children}
    </StyledIconButton>
  );
};

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
