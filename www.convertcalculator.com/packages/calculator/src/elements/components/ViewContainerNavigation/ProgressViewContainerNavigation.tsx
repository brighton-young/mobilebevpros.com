import { useViewContainerProgress } from '../../../CalculatorState';
import SegmentedProgressBar from '../ProgressBar/SegmentedProgressBar';
import StyledProgressBar from '../ProgressBar/StyledProgressBar';
import StyledProgressContainer from '../ProgressBar/StyledProgressContainer';

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
  progressBarGap?: number;
}

const ProgressViewContainerNavigation = ({
  viewContainerId,
  progressBarGap,
}: Props) => {
  const { value, max } = useViewContainerProgress(viewContainerId);

  if (progressBarGap) {
    return (
      <SegmentedProgressBar value={value} max={max} gap={progressBarGap} />
    );
  }

  return (
    <div className="cc__view-navigation cc__view-navigation-progress">
      <StyledProgressContainer>
        <StyledProgressBar value={value} max={max} />
      </StyledProgressContainer>
    </div>
  );
};

export default ProgressViewContainerNavigation;
