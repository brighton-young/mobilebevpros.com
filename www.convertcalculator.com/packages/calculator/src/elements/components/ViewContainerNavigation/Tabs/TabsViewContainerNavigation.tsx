import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import {
  useIsUploading,
  useSelectedIndexOfViewContainer,
} from '../../../../CalculatorState';
import navigableViewState from '../../../../recoil/navigableViewState';
import useHandleNavigateViewContainerNavigation from '../useHandleNavigateViewContainerNavigation';

import { BasicTabsViewContainerNavigation } from './BasicTabsViewContainerNavigation';
import { SegmentedTabsViewContainerNavigation } from './SegmentedTabsViewContainerNavigation';
import { UnderlinedTabsViewContainerNavigation } from './UnderlinedTabsViewContainerNavigation';

const tabsVariantComponentMap = {
  BASIC: BasicTabsViewContainerNavigation,
  UNDERLINED: UnderlinedTabsViewContainerNavigation,
  SEGMENTED: SegmentedTabsViewContainerNavigation,
} satisfies Record<string, React.FC>;

interface Props {
  viewContainerId: string;
  tabsVariant: keyof typeof tabsVariantComponentMap;
  direction: 'HORIZONTAL' | 'VERTICAL';
}

const TabsViewContainerNavigation = ({
  viewContainerId,
  tabsVariant,
  direction,
}: Props) => {
  let selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const isUploading = useIsUploading();

  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  // the navigableViews can change based on formula logic but this does not adjust the max selectedIndexOfViewContainer
  // therefor check if the selectedIndexOfViewContainer is still in bounds, else show the first view item
  if (selectedViewIndex >= navigableViews.length) {
    selectedViewIndex = 0;
  }

  const handleNavigateView = useHandleNavigateViewContainerNavigation({
    viewContainerId,
  });

  const options = navigableViews.map((view, index) => {
    return {
      label: view.viewTitle || `View #${index}`,
      viewId: view.itemId,
    };
  });

  const selectedViewId = navigableViews[selectedViewIndex]?.itemId;

  const handleChange = useCallback(
    (newOptionId) => {
      if (isUploading) return;
      const index = navigableViews.findIndex((element) => {
        return element.itemId === newOptionId;
      });
      handleNavigateView(index);
    },
    [handleNavigateView, isUploading, navigableViews],
  );

  const TabsVariantNavigationComponent =
    tabsVariantComponentMap[tabsVariant || 'BASIC'];

  return (
    <TabsVariantNavigationComponent
      options={options}
      handleChange={handleChange}
      selectedViewId={selectedViewId}
      direction={direction}
    />
  );
};

export default TabsViewContainerNavigation;
