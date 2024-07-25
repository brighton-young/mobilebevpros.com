import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import isLiveModeState from '../../recoil/isLiveModeState';

type Props = {
  isLiveMode: boolean;
};

const IsLiveModeRecoilSyncer = ({ isLiveMode }: Props) => {
  const setIsLiveMode = useSetRecoilState(isLiveModeState);

  useEffect(() => {
    setIsLiveMode(isLiveMode);
  }, [isLiveMode]);

  return null;
};

export default IsLiveModeRecoilSyncer;
