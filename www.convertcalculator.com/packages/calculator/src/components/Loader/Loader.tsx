import React from 'react';

import styled from 'styled-components';

import Spinner from '../Spinner';

type LoaderProps = {
  size: 'small' | 'normal';
};

const LoaderWrapper = styled.div<LoaderProps>`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(props) => {
    if (props.size === 'small') return '8rem';

    return '16rem';
  }};
`;

const Loader: React.FC<LoaderProps> = (props) => {
  const { size = 'normal' } = props;

  return (
    <LoaderWrapper size={size}>
      <div>
        <Spinner />
      </div>
    </LoaderWrapper>
  );
};

export default Loader;
