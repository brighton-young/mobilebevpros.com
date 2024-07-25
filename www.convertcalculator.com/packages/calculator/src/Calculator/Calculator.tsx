import { useEffect, useMemo, useRef, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useResizeDetector } from 'react-resize-detector';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import fetchJson from '@cc/shared/utils/fetchJson';
import getRandomSecret from '@cc/shared/utils/getRandomSecret';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

import CalculatorState, {
  useAnswers,
  useCalculatorId,
  useIsDebugging,
  useIsEditing,
  useIsProduction,
  useIsTesting,
  useProfileProp,
  useSetCanvasWidth,
} from '../CalculatorState';
import Callout from '../components/Callout';
import Canvas from '../components/Canvas';
import ErrorFallback from '../components/ErrorFallback';
import JsApi from '../components/JsApi';
import Loader from '../components/Loader';
import Tracker from '../components/Tracker';
import handleCCEvent from '../util/handleCCEvent';
import triggerEvent from '../util/triggerEvent';

const CalculatorWithData = ({
  calculatorId,
  data: dataFromOutside,
  embedType,
  onChangeAnswers,
  framedUrl,
  workerUrl,
  isDebugging = false,
  isEditing = false,
  isTesting = false,
  isLiveMode = false,
}) => {
  const [dataFromFetch, setDataFromFetch] = useState();
  const [isLoading, setIsLoading] = useState(!dataFromOutside);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (embedType !== 'inPage' || !!dataFromOutside) return;

    (async () => {
      try {
        const result = await fetchJson({
          url: getWebsiteUrl({
            slug: `/api/embed/get-data/?calculatorId=${calculatorId}`,
          }),
          method: 'GET',
        });

        if (result.error) {
          // setError(result.error);
        } else {
          setDataFromFetch(result);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, [calculatorId, embedType]);

  const fingerprint = useMemo(() => {
    try {
      const existingFingerprint = window.localStorage.getItem('ccFp');

      if (existingFingerprint) return existingFingerprint;

      const newFingerprint = getRandomSecret();

      window.localStorage.setItem('ccFp', newFingerprint);

      return fingerprint;
    } catch (err) {
      return getRandomSecret();
    }
  }, [typeof window === 'undefined']);

  const data = dataFromOutside || dataFromFetch;

  if (!data) return false;

  return (
    <CalculatorWithError error={error}>
      <CalculatorWithLoader isLoading={isLoading}>
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
          <CalculatorWithCanvas
            embedType={embedType}
            onChangeAnswers={onChangeAnswers}
            framedUrl={framedUrl}
          />
        </CalculatorState>
      </CalculatorWithLoader>
    </CalculatorWithError>
  );
};

const CalculatorWithError = ({ children, error }) => {
  if (error) {
    return (
      <Callout variant="alert">
        {error.status || 500}
        {': '}
        {error.data?.reason || error.message}
      </Callout>
    );
  }

  return (
    <ErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallbackRender={(fallbackProps) => {
        return (
          <ErrorFallback {...fallbackProps}>
            Something went wrong. Please contact support.
          </ErrorFallback>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const CalculatorWithLoader = ({ children, isLoading }) => {
  if (isLoading) {
    if (isLoading) return <Loader />;
  }

  return children;
};

const CalculatorWithCanvas = ({ embedType, onChangeAnswers, framedUrl }) => {
  const {
    height,
    width,
    ref: calculatorRef,
  } = useResizeDetector({ refreshMode: 'debounce', refreshRate: 0 });

  const setCanvasWidth = useSetCanvasWidth();
  const answers = useAnswers();
  const calculatorId = useCalculatorId();

  useEffectDeepCompare(() => {
    if (typeof onChangeAnswers !== 'function') return;

    onChangeAnswers(answers);
  }, [answers]);

  const profileId = useProfileProp('_id');
  const isDebugging = useIsDebugging();
  const isEditing = useIsEditing();
  const isProduction = useIsProduction();
  const isTesting = useIsTesting();

  // TODO: Only log these stats when adding a flag (or in a function: getEnvironment())
  useEffect(() => {
    const script = [...document.getElementsByTagName('script')]
      .map(({ src }) => {
        return src;
      })
      .find((src) => {
        return src.includes('embed.js');
      });

    // eslint-disable-next-line no-console
    console.log(
      '💡 The interactive content on this page is powered by https://www.ConvertCalculator.com',
    );
    // eslint-disable-next-line no-console
    console.debug('ℹ️ LOADING CALC...');
    // eslint-disable-next-line no-console
    console.debug('ℹ️ CALC SCRIPTS ORIGIN', script);
    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC ID: ${calculatorId}`);
    // eslint-disable-next-line no-console
    console.debug(`ℹ️ PROFILE ID: ${profileId}`);

    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC ENV: ${process.env.NEXT_PUBLIC_APP_ENV}`);

    try {
      // eslint-disable-next-line no-console
      console.debug(
        'ℹ️ STRIPE ENV',
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.split('_')[1],
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('No stripe key found');
    }

    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC IS_PRODUCTION: ${isProduction}`);
    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC IS_TESTING: ${isTesting}`);
    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC IS_EDITING: ${isEditing}`);
    // eslint-disable-next-line no-console
    console.debug(`ℹ️ CALC IS_DEBUGGING: ${isDebugging}`);
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    // On Framed embeds, we handle ccEvent listening via `initFramedCalculator.js`, so should be triggered here
    if (embedType === 'framed') return undefined;

    const handleCCEventListener = (ev) => {
      const { calculatorId: calculatorIdInEvent, type, payload } = ev.detail;

      handleCCEvent({
        calculatorId: calculatorIdInEvent,
        type,
        payload,
        context: {
          parentWindow: window,
          calculatorContainer: canvasRef.current,
        },
      });
    };

    window.addEventListener('ccEvent', handleCCEventListener);

    return () => {
      window.removeEventListener('ccEvent', handleCCEventListener);
    };
  }, [embedType]);

  useEffect(() => {
    setCanvasWidth(width);
  }, [width]);

  useEffect(() => {
    triggerEvent({
      calculatorId,
      type: 'resize',
      payload: { height },
      options: {
        triggerInPage: false,
        triggerFramed: true,
      },
    });
  }, [height]);

  return (
    <div
      ref={calculatorRef}
      className="cc-calculator"
      style={{ height: '100%' }}
    >
      <JsApi>
        <Tracker framedUrl={framedUrl}>
          <Canvas embedType={embedType} ref={canvasRef} />
        </Tracker>
      </JsApi>
    </div>
  );
};

export default CalculatorWithData;
