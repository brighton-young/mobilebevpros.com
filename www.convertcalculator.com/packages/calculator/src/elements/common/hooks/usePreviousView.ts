import { useRecoilCallback } from 'recoil';

import selectedViewState from '../../../recoil/selectedViewState';

type UsePreviousView = () => {
  handlePreviousView: () => void;
};

const usePreviousView: UsePreviousView = () => {
  const handlePreviousView = useRecoilCallback(({ set, snapshot }) => {
    return () => {
      const selectedView = snapshot.getLoadable(selectedViewState).contents;

      if (selectedView === 0) return;

      set(selectedViewState, selectedView - 1);
    };
  }, []);

  return { handlePreviousView };
};

export default usePreviousView;
