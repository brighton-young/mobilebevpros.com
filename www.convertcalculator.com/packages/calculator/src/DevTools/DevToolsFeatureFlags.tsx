import { useFeatureFlags, useSetFeatureFlag } from '../CalculatorState';

const DevToolsFeatureFlags = () => {
  const featureFlags = useFeatureFlags();
  const setFeatureFlag = useSetFeatureFlag();

  const handleToggleFlag = () => {};
  return (
    <div>
      FeatureFlags
      {Object.entries(featureFlags).map(([key, value]) => {
        return (
          <div key={key}>
            {key}: {value ? 'TRUE' : 'FALSE'} (
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                setFeatureFlag(key, !value);
              }}
            >
              toggle
            </button>
            )
          </div>
        );
      })}
    </div>
  );
};

export default DevToolsFeatureFlags;
