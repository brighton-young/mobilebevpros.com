import React from 'react';

import { StyledBasicTabItem } from './StyledBasicTabItem';
import { StyledBasicTabList } from './StyledBasicTabList';

type Props = {
  options: { viewId: string; label: string }[];
  selectedViewId: string;
  handleChange: (newOptionId: string) => void;
  direction: 'HORIZONTAL' | 'VERTICAL';
};

export const BasicTabsViewContainerNavigation = ({
  options,
  selectedViewId,
  handleChange,
  direction,
}: Props) => {
  return (
    <StyledBasicTabList direction={direction}>
      {options.map((item) => {
        return (
          <StyledBasicTabItem
            key={item.viewId}
            isSelected={item.viewId === selectedViewId}
            onClick={() => {
              handleChange(item.viewId);
            }}
          >
            {item.label}
          </StyledBasicTabItem>
        );
      })}
    </StyledBasicTabList>
  );
};
