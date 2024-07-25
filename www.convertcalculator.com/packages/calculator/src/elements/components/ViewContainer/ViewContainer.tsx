import React, { RefObject, useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import { CalculatorSettings } from '@cc/types';

import {
  useFeatureFlags,
  useIsLiveMode,
  useSelectedIndexOfViewContainer,
} from '../../../CalculatorState';
import CalculatorItems from '../../../components/CalculatorItems/CalculatorItems';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import TreeRenderer from '../../../components/TreeRenderer';
import navigableViewState from '../../../recoil/navigableViewState';
import useSetFormulaContext from '../../../recoil/useSetFormulaContext';
import { type ViewElement } from '../View/View';

import AnimatedViewContainerContent from './AnimatedViewContainerContent/AnimatedViewContainerContent';

type ViewContainerProps = {
  element: ViewContainerElement;
  isHidden: boolean;
  itemChildren?: any[];
  settings: CalculatorSettings;
  treeRenderer: React.JSX.Element;
};

const isEmbededInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const isTopVisible = (containerTopRef: RefObject<HTMLDivElement>) => {
  if (!containerTopRef.current) return false;
  const rect = containerTopRef.current.getBoundingClientRect();

  return rect.top >= 0 && rect.top <= window.innerHeight;
};

export type ViewContainerElement = {
  type: 'viewContainer';
  _id: string;
  reference: string;
  collection: 'elements';
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  viewContainer: {
    transitionAnimation:
      | 'NONE'
      | 'FADE'
      | 'HEIGHT'
      | 'SLIDE_IN_TOP'
      | 'SLIDE_IN_BOTTOM'
      | 'SLIDE_IN_LEFT'
      | 'SLIDE_IN_RIGHT';
    transitionDuration: number;
    addFadeToAnimation: boolean;
    disableScrollToTop?: boolean;
  };
  children: ViewElement[];
};

const ViewContainer: React.FC<ViewContainerProps> = (props) => {
  const { element, isHidden, settings, itemChildren = [] } = props;

  const containerTopRef = useRef<HTMLDivElement>(null);

  const viewContainerId = props.element._id;
  let selectedIndexOfViewContainer =
    useSelectedIndexOfViewContainer(viewContainerId);

  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  // the navigableViews can change based on formula logic but this does not adjust the max selectedIndexOfViewContainer
  // therefor check if the selectedIndexOfViewContainer is still in bounds, else show the first view item
  if (selectedIndexOfViewContainer >= navigableViews.length) {
    selectedIndexOfViewContainer = 0;
  }

  const { dataAsPropsRefactor } = useFeatureFlags();

  const setFormulaContext = useSetFormulaContext();

  const isLiveMode = useIsLiveMode();

  useEffect(() => {
    setFormulaContext({
      [`${element.reference}_count`]: {
        value: navigableViews.length,
        type: 'context',
      },
      [`${element.reference}_view`]: {
        value: selectedIndexOfViewContainer + 1,
        type: 'context',
      },
    });
  }, [
    element.reference,
    selectedIndexOfViewContainer,
    navigableViews,
    setFormulaContext,
  ]);

  // when navigating to views in the view container this effect will scroll
  // to the top of the view container if the top is not in the viewport
  const initialRender = useRef(true);
  useEffect(() => {
    if (element.viewContainer.disableScrollToTop === true) return;

    // do not scroll to top on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (settings.isEditing && !isLiveMode) return;
    // we cannot determine if the top is visible when embedded in an iframe
    // so always scroll to the top
    if (isEmbededInIframe() || !isTopVisible(containerTopRef)) {
      setTimeout(() => {
        containerTopRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [selectedIndexOfViewContainer]);

  // with the dataAsPropsRefactor the children are not passed as props but inside the element
  // @ts-ignore
  const elementChildren = dataAsPropsRefactor ? element.children : itemChildren;

  let children: any[] = [];
  // when in edit mode, show all items
  if (settings.isEditing && !isLiveMode) {
    children = elementChildren;
  } else if (navigableViews[selectedIndexOfViewContainer]) {
    const activeView = navigableViews[selectedIndexOfViewContainer];
    children = [
      elementChildren.find((child) => {
        return child.itemId === activeView.itemId;
      }),
    ];
  }

  const isAnimated =
    element.viewContainer.transitionAnimation &&
    element.viewContainer.transitionAnimation !== 'NONE' &&
    (!settings.isEditing || isLiveMode);

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
    >
      <div ref={containerTopRef}></div>
      {isAnimated ? (
        <AnimatedViewContainerContent
          selectedIndexOfViewContainer={selectedIndexOfViewContainer}
          navigableViews={navigableViews}
          transitionDuration={element.viewContainer.transitionDuration}
          addFadeToAnimation={element.viewContainer.addFadeToAnimation}
          transitionAnimation={
            element.viewContainer.transitionAnimation === 'NONE'
              ? undefined
              : element.viewContainer.transitionAnimation
          }
          itemChildren={children}
          {...props}
        />
      ) : (
        <>
          {dataAsPropsRefactor ? (
            <TreeRenderer items={children} treePath={[]} settings={settings} />
          ) : (
            <CalculatorItems {...props} items={children} />
          )}
        </>
      )}
    </ElementStyleWrapper>
  );
};

export default ViewContainer;
