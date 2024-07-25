import React, { useRef } from 'react';

import { dequal } from 'dequal';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import type { Element } from '@cc/db';
import usePrevious from '@cc/shared/hooks/usePrevious';
import { CalculatorSettings } from '@cc/types';

import { useFeatureFlags } from '../../../../CalculatorState';
import CalculatorItems from '../../../../components/CalculatorItems/CalculatorItems';
import TreeRenderer from '../../../../components/TreeRenderer';

import StyledFadeTransitionAnimation from './StyledFadeTransitionAnimation';
import StyledHeightTransitionAnimation from './StyledHeightTransitionAnimation';
import StyledSlideInBottomTransitionAnimation from './StyledSlideInBottomTransitionAnimation';
import StyledSlideInLeftTransitionAnimation from './StyledSlideInLeftTransitionAnimation';
import StyledSlideInRightTransitionAnimation from './StyledSlideInRightTransitionAnimation';
import StyledSlideInTopTransitionAnimation from './StyledSlideInTopTransitionAnimation';

const transitionAnimationComponentMap = {
  FADE: StyledFadeTransitionAnimation,
  HEIGHT: StyledHeightTransitionAnimation,
  SLIDE_IN_TOP: StyledSlideInTopTransitionAnimation,
  SLIDE_IN_BOTTOM: StyledSlideInBottomTransitionAnimation,
  SLIDE_IN_LEFT: StyledSlideInLeftTransitionAnimation,
  SLIDE_IN_RIGHT: StyledSlideInRightTransitionAnimation,
} satisfies Record<string, React.FC>;

type Props = {
  selectedIndexOfViewContainer: number;
  navigableViews: any;
  transitionAnimation: keyof typeof transitionAnimationComponentMap;
  transitionDuration?: number;
  addFadeToAnimation?: boolean;
  element: Element;
  isHidden: boolean;
  itemChildren: any[];
  settings: CalculatorSettings;
  treeRenderer: React.JSX.Element;
};

const AnimatedViewContainerContent = ({
  selectedIndexOfViewContainer,
  navigableViews,
  transitionAnimation,
  transitionDuration = 600,
  addFadeToAnimation = true,
  itemChildren,
  ...props
}: Props) => {
  const activeView = navigableViews[selectedIndexOfViewContainer];
  const children = [
    itemChildren.find((child) => {
      return child.itemId === activeView.itemId;
    }),
  ];

  const previousSelectedIndexOfViewContainer = usePrevious(
    selectedIndexOfViewContainer,
  );
  const navigationDirection =
    selectedIndexOfViewContainer < previousSelectedIndexOfViewContainer
      ? 'BACKWARD'
      : 'FORWARD';

  const nodeRef = useRef(null);

  const { dataAsPropsRefactor } = useFeatureFlags();

  const TransitionAnimationComponent =
    transitionAnimationComponentMap[transitionAnimation];

  if (itemChildren.length === 0) {
    return null;
  }

  return (
    <div
      className={`${
        transitionAnimation !== 'FADE' ? 'overflow-hidden' : ''
      } direction-${navigationDirection}`}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          classNames="view"
          addEndListener={(done) => {
            nodeRef.current.addEventListener('transitionend', done, false);
          }}
          key={navigableViews[selectedIndexOfViewContainer]?.itemId}
          keyName={navigableViews[selectedIndexOfViewContainer]?.itemId}
          nodeRef={nodeRef}
        >
          <TransitionAnimationComponent
            ref={nodeRef}
            transitionDuration={transitionDuration}
            addFadeToAnimation={addFadeToAnimation}
          >
            <>
              {dataAsPropsRefactor ? (
                <TreeRenderer
                  items={children}
                  treePath={[]}
                  settings={props.settings}
                />
              ) : (
                <CalculatorItems {...props} items={children} />
              )}
            </>
          </TransitionAnimationComponent>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

// memo is needed to make the FORWARD/BACKWARD transsition animation work
const AnimatedViewContainerContentMemo = React.memo(
  AnimatedViewContainerContent,
  dequal,
);

export default AnimatedViewContainerContentMemo;
