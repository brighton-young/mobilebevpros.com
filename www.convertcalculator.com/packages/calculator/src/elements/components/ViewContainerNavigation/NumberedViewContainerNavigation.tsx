import React from 'react';

import DotsViewContainerNavigation from './DotsViewContainerNavigation';

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
}

const NumberedViewContainerNavigation = (props: Props) => {
  return <DotsViewContainerNavigation isNumbered={true} {...props} />;
};

export default NumberedViewContainerNavigation;
