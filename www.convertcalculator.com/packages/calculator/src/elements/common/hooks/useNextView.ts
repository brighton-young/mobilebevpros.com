import { useRecoilCallback } from 'recoil';

import isValidState from '../../../recoil/isValidState';
import selectedViewState from '../../../recoil/selectedViewState';
import showErrorsState from '../../../recoil/showErrorsState';

type UseNextView = () => {
  handleNextView: () => void;
};

const useNextView: UseNextView = () => {
  const handleNextView = useRecoilCallback(({ set, snapshot }) => {
    return () => {
      const isValid = snapshot.getLoadable(isValidState).contents;
      const selectedView = snapshot.getLoadable(selectedViewState).contents;

      set(showErrorsState, false);

      if (isValid) {
        set(selectedViewState, selectedView + 1);
      } else {
        set(showErrorsState, true);
      }
    };
  }, []);

  return { handleNextView };
};

export default useNextView;
