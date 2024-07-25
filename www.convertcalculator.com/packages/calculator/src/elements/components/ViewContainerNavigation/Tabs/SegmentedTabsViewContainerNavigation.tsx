import React from 'react';

import styled from 'styled-components';

import { getReadableColor } from '../../../../components/StyledButton/StyledButton';
import { colors } from '../../../../styles';
import { getBorderRadiusCSS } from '../../../../styles/utils/getBorderRadiusCSS';
import { getSpacingCSS } from '../../../../styles/utils/getSpacingCSS';

type Props = {
  options: { viewId: string; label: string }[];
  selectedViewId: string;
  handleChange: (newOptionId: string) => void;
};

const TabContainer = styled.div`
  position: relative;
  display: inline-block;

  border-radius: 4px;

  ${({ theme }) => {
    return `
      background-color: ${
        theme.tabUnselectedBackgroundColor || colors['gray-300']
      };
     ${getBorderRadiusCSS(theme.tabBorderRadius)};
    `;
  }}
`;

const SelectedBackground = styled.div<{ width: number; offset: number }>`
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;

  border-radius: 4px;

  ${({ theme }) => {
    return `
      background-color: ${
        theme.tabSelectedBackgroundColor ||
        theme.primaryColor ||
        colors['gray-700']
      };
      ${getBorderRadiusCSS(theme.tabBorderRadius)};
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

const TabSpacing = styled.div`
  ${({ theme }) => {
    return `
        margin: ${theme.tabGroupGutter ?? 4}px;
    `;
  }}

  position: relative;
`;

const TabList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: inline-block;
  z-index: 10;

  .cc ol& {
    margin-bottom: 0;
    padding-left: 0;
    list-style-type: none;
  }
`;
const TabItem = styled.li<{
  isSelected: boolean;
}>`
  display: inline-block;
  padding: 8px 20px;
  cursor: pointer;
  ${({ theme, isSelected }) => {
    const unselectedBackgroundColor =
      theme.tabUnselectedBackgroundColor || colors['gray-300'];

    const selectedBackgroundColor =
      theme.tabSelectedBackgroundColor ||
      theme.primaryColor ||
      colors['gray-700'];

    const selectedTextColor =
      theme.tabSelectedTextColor ||
      getReadableColor({
        color: selectedBackgroundColor,
      });
    const unselectedTextColor =
      theme.tabUnselectedTextColor ||
      // eslint-disable-next-line no-undef
      getReadableColor({
        color: unselectedBackgroundColor,
      });

    return `

 
    color: ${isSelected ? selectedTextColor : unselectedTextColor};

    ${getSpacingCSS(theme.tabPadding)}

    &:hover {
      color: ${theme.tabHoverTextColor};
    }

    transition: color 150ms;
  `;
  }}
`;

export const SegmentedTabsViewContainerNavigation = ({
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
      <TabSpacing>
        <TabList>
          {options.map((item) => {
            return (
              <TabItem
                key={item.viewId}
                ref={selectedViewId === item.viewId ? activeRef : none}
                onClick={() => {
                  handleChange(item.viewId);
                }}
                isSelected={selectedViewId === item.viewId}
              >
                {item.label}
              </TabItem>
            );
          })}
        </TabList>

        <SelectedBackground width={width} offset={offset} />
      </TabSpacing>
    </TabContainer>
  );
};
