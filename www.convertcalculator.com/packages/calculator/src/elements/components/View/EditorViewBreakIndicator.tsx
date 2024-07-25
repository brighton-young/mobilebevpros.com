import React from 'react';

import styled from 'styled-components';

import { colors } from '../../../styles';

// this is a hack to hide the last view break indicator
// if it's the last view item in the view container is not know in the view component
const StyledContainer = styled.div`
  .cc__viewContainer-element-wrapper &:last-child {
    display: none;
  }
`;

const EditorViewBreakIndicator = () => {
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

export default EditorViewBreakIndicator;
