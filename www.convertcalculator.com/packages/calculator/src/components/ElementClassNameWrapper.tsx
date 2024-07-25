import React from 'react';

import { CalculatorElementsCollection } from '@cc/shared/enums/calculator-elements';

import { AnyElement } from '../types';

type ElementClassNameWrapperProps = {
  children: React.ReactNode;
  element: AnyElement;
};

const ElementClassNameWrapper: React.FC<ElementClassNameWrapperProps> = ({
  children,
  element,
}) => {
  return (
    <div
      className={`cc__${element.type}-${CalculatorElementsCollection[
        element.type
      ].slice(0, -1)}`}
    >
      {children}
    </div>
  );
};

export default ElementClassNameWrapper;
