import React from 'react';

import styled from 'styled-components';

import { colors } from '../../../../styles';

type Props = {
  options: { viewId: string; label: string }[];
  selectedViewId: string;
  handleChange: (newOptionId: string) => void;
};

const TabContainer = styled.div`
  display: inline-block;
`;

const Underline = styled.div`
  height: 2px;

  ${({ theme }) => {
    return `
      background-color: ${
        theme.tabUnselectedBackgroundColor || colors['gray-300']
      };
    `;
  }}
`;

const ActiveLine = styled.div<{ width: number; offset: number }>`
  height: 2px;

  ${({ theme }) => {
    return `
      background-color: ${
        theme.tabSelectedBackgroundColor ||
        theme.primaryColor ||
        colors['gray-700']
      };
    `;
  }}

  width: ${(props) => {
    return `${props.width}px`;
  }};
  transform: translateX(
    ${(props) => {
      return `${props.offset}px`;
    }}
  );
  transition: all 350ms cubic-bezier(0.15, 0.3, 0.25, 1);
`;

const TabList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: inline-block;

  .cc ol& {
    margin-bottom: 0;
    padding-left: 0;
    list-style-type: none;
  }
`;
const TabItem = styled.li`
  display: inline-block;
  padding: 8px 20px;
  cursor: pointer;
  &.is-active {
  }
`;

export const UnderlinedTabsViewContainerNavigation = ({
  options,
  selectedViewId,
  handleChange,
}: Props) => {
  const activeRef = React.createRef<HTMLLIElement>();
  const none = React.createRef<HTMLLIElement>();

  const [offset, setOffset] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const activeElement = activeRef.current;
    setOffset(activeElement?.offsetLeft);
    setWidth(activeElement?.clientWidth);
  }, [selectedViewId, activeRef]);

  return (
    <TabContainer>
      <TabList>
        {options.map((item) => {
          return (
            <TabItem
              key={item.viewId}
              ref={selectedViewId === item.viewId ? activeRef : none}
              onClick={() => {
                handleChange(item.viewId);
              }}
            >
              {item.label}
            </TabItem>
          );
        })}
      </TabList>
      <Underline>
        <ActiveLine width={width} offset={offset} />
      </Underline>
    </TabContainer>
  );
};
