import React from 'react';

import { useIsEditing } from '../../../CalculatorState';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';

import ArrowsViewContainerNavigation from './ArrowsViewContainerNavigation';
import ArrowsWithCounterViewContainerNavigation from './ArrowsWithCounterViewContainerNavigation';
import CounterViewContainerNavigation from './CounterViewContainerNavigation';
import DotsViewContainerNavigation from './DotsViewContainerNavigation';
import NumberedViewContainerNavigation from './NumberedViewContainerNavigation';
import ProgressViewContainerNavigation from './ProgressViewContainerNavigation';
import StepsViewContainerNavigation from './Steps/StepsViewContainerNavigation';
import TabsViewContainerNavigation from './Tabs/TabsViewContainerNavigation';

type ViewContainerNavigationProps = {
  element: ViewNavigationElement;
  isHidden: boolean;
};

export type ViewNavigationElement = {
  type: 'viewNavigation';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  viewNavigation: {};
};

const navigationComponentMap = {
  ARROWS: ArrowsViewContainerNavigation,
  DOTS: DotsViewContainerNavigation,
  NUMBERS: NumberedViewContainerNavigation,
  COUNTER: CounterViewContainerNavigation,
  ARROWS_COUNTER: ArrowsWithCounterViewContainerNavigation,
  PROGRESS_BAR: ProgressViewContainerNavigation,
  TABS: TabsViewContainerNavigation,
  STEPS: StepsViewContainerNavigation,
} satisfies Record<string, React.FC>;

const ViewContainerNavigation = (props: ViewContainerNavigationProps) => {
  const { element, isHidden } = props;

  const isEditing = useIsEditing();

  const { viewContainerId } = element.viewNavigation;

  const NavigationComponent =
    navigationComponentMap[element.viewNavigation.displayType];

  const flattenedQuickStyles = {};
  Object.entries(element.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  return (
    <ElementThemeProvider
      elementStyles={{}}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="elements"
        element={element}
        isEditing={isEditing}
        isHidden={isHidden}
      >
        <NavigationComponent
          allowUserNavigation={element.viewNavigation.allowUserNavigation}
          viewContainerId={viewContainerId}
          progressBarGap={element.viewNavigation.progressBarGap}
          stepsShowTitles={element.viewNavigation.stepsShowTitles}
          stepsShowNumbers={element.viewNavigation.stepsShowNumbers}
          tabsVariant={element.viewNavigation.tabsVariant}
          direction={element.viewNavigation.direction}
        />
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default ViewContainerNavigation;
