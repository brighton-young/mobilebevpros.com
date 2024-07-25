import React from 'react';

import EditingError from '../../common/components/EditingError';

import StyledSegmentedProgressBarSegment from './StyledSegmentedProgressBarSegment';
import StyledProgressContainer from './StyledSegmentedProgressContainer';

type Props = {
  value: number;
  max: number;
  gap: number;
};

const SegmentedProgressBar = ({ value, max, gap }: Props) => {
  // If the max is exorbitantly high, we don't want to render a lot of div elements for each segment.
  if (max > 100) {
    return (
      <EditingError>
        The max value cannot be greater than 100 for a progress bar with a gap.
      </EditingError>
    );
  }

  return (
    <StyledProgressContainer gap={gap}>
      {[...Array(max)].map((_, index) => {
        return (
          <StyledSegmentedProgressBarSegment
            key={index}
            active={index < value}
          />
        );
      })}
    </StyledProgressContainer>
  );
};

export default SegmentedProgressBar;
