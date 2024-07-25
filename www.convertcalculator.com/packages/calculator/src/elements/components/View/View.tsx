import React from 'react';

import { CalculatorSettings } from '@cc/types';

import { useFeatureFlags, useIsEditing } from '../../../CalculatorState';
import CalculatorItems from '../../../components/CalculatorItems';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';

import EditorViewBreakIndicator from './EditorViewBreakIndicator';
import StyledViewWrapper from './StyledViewWrapper';

type ViewProps = {
  element: ViewElement;
  isHidden: boolean;
  itemChildren?: any[];
  settings: CalculatorSettings;
  treeRenderer: React.JSX.Element;
};

export type ViewElement = {
  type: 'view';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  view: {};
};

const View = (props: ViewProps) => {
  const { element, isHidden, itemChildren = [], treeRenderer } = props;

  const { dataAsPropsRefactor } = useFeatureFlags();
  const isEditing = useIsEditing();

  // with the dataAsPropsRefactor the children are not passed as props but inside the element
  // @ts-ignore
  const children = dataAsPropsRefactor ? element.children : itemChildren;

  return (
    <>
      <ElementStyleWrapper
        collection="elements"
        element={element}
        isHidden={isHidden}
        styledItem={StyledViewWrapper}
      >
        {dataAsPropsRefactor ? (
          treeRenderer
        ) : (
          <CalculatorItems {...props} items={children} />
        )}
      </ElementStyleWrapper>
      {Boolean(isEditing) && <EditorViewBreakIndicator />}
    </>
  );
};

export default View;
