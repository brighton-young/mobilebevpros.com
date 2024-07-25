import { atom } from 'recoil';

import { featureFlags } from '@cc/shared/enums/featureFlags';

type FeatureFlagKeys = keyof typeof featureFlags;
type FeatureFlagState = Record<FeatureFlagKeys, boolean>;

const featureFlagsState = atom<FeatureFlagState>({
  key: 'featureFlagsState',
  default: Object.fromEntries(
    Object.keys(featureFlags).map((key: FeatureFlagKeys) => {
      return [key, false];
    }),
  ) as FeatureFlagState,
});

export default featureFlagsState;
