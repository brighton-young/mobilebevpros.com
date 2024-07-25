import { useRecoilCallback } from 'recoil';

import validateViewContainerView from './validateViewContainerView';

// Use this hook to validate the children of a view container view.
// This hook returns a callback function that does the validation.
// The usage of this hook does not cause a re-render.

const useValidateViewContainerView = () => {
  return useRecoilCallback(({ snapshot }) => {
    return ({ itemId }: { itemId: string }) => {
      return validateViewContainerView(snapshot, itemId);
    };
  }, []);
};

export default useValidateViewContainerView;
