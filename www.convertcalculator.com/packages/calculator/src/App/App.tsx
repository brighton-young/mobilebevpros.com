import Actions from '../Actions/Actions';
import CalculatorState from '../CalculatorState';
import JsApi from '../components/JsApi';
import Tracker from '../components/Tracker';
import DevTools from '../DevTools';
import { CalculatorData, EmbedType } from '../types';

import Canvas from './Canvas';
import DisabledBoundary from './DisabledBoundary';
import ErrorBoundary from './ErrorBoundary';
import LoaderBoundary from './LoaderBoundary';
import useFetchData from './useFetchData';
import useFingerprintGen from './useFingerprintGen';

export type CalculatorProps = {
  calculatorId: string;
  data?: CalculatorData;
  embedType: EmbedType;
  framedUrl?: string;
  workerUrl?: string;
  isDebugging?: boolean;
  isEditing?: boolean;
  isTesting?: boolean;
  isLiveMode?: boolean;
};

const App = ({
  calculatorId,
  data: dataFromProps,
  embedType,
  framedUrl,
  workerUrl,
  isDebugging = false,
  isEditing = false,
  isTesting = false,
  isLiveMode = false,
}: CalculatorProps) => {
  const { data, isLoading, error } = useFetchData({
    calculatorId,
    dataFromProps,
    embedType,
  });

  const fingerprint = useFingerprintGen();

  const checkIsDisabled =
    !isDebugging && !isEditing && !isTesting && !isLiveMode;

  return (
    <ErrorBoundary error={error}>
      <LoaderBoundary isLoading={isLoading}>
        <DisabledBoundary
          checkIsDisabled={checkIsDisabled}
          calculatorId={calculatorId}
        >
          <CalculatorState
            calculatorId={calculatorId}
            data={data}
            fingerprint={fingerprint}
            workerUrl={workerUrl}
            isDebugging={isDebugging}
            isEditing={isEditing}
            isTesting={isTesting}
            isLiveMode={isLiveMode}
          >
            <DevTools>
              <Actions actionsOnInitialize={[]}>
                <JsApi>
                  <Tracker framedUrl={framedUrl}>
                    <Canvas embedType={embedType} />
                  </Tracker>
                </JsApi>
              </Actions>
            </DevTools>
          </CalculatorState>
        </DisabledBoundary>
      </LoaderBoundary>
    </ErrorBoundary>
  );
};

export default App;
