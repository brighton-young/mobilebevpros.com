import React from 'react';

import styled from 'styled-components';

import { colors } from '../styles';

type StyledViewProps = {
  isEditing: boolean;
  hasChildren: boolean;
};

const StyledView = styled.div<StyledViewProps>`
  width: 100%;
  height: 100%;
  border: ${({ isEditing }) => {
    return isEditing && `1px dashed ${colors.darkGray}`;
  }};
  min-height: ${({ isEditing, hasChildren }) => {
    return isEditing && !hasChildren && '10rem';
  }};
`;

type ViewProps = {
  children: React.ReactNode;
  isActive: boolean;
  isLast: boolean;
  isEditing: boolean;
  isLiveMode: boolean;
  hasChildren: boolean;
};

const View: React.FC<ViewProps> = ({
  children,
  isActive,
  isLast,
  isEditing,
  hasChildren,
  isLiveMode,
}) => {
  // Don't render inactive views for performance sake of large calculators
  const shouldRender = (isEditing && !isLiveMode) || isActive;

  if (!shouldRender) return false;

  return (
    <>
      <StyledView isEditing={isEditing} hasChildren={hasChildren}>
        {children}
      </StyledView>

      {isEditing && !isLiveMode && !isLast && (
        <div className="gap-2 flex justify-center mt-16 mb-12">
          <div
            className="ml-12 flex-grow"
            style={{
              borderTop: `1px dashed ${colors.darkGray}`,
            }}
          />
          <div
            className="flex-shrink transform -translate-y-2/4 text-sm font-medium"
            style={{
              color: colors.darkGray,
            }}
          >
            View break
          </div>
          <div
            className="mr-12 flex-grow"
            style={{
              borderTop: `1px dashed ${colors.darkGray}`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default View;
