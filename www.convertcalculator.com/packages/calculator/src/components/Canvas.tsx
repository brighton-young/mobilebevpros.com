import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import {
  useAnswers,
  useCalculator,
  useCalculatorId,
  useFormFields,
  useIsEditing,
  useIsLiveMode,
  useIsProduction,
  useIsTesting,
  useOutputs,
  useProfile,
  useSelectedView,
  useShowErrors,
} from '../CalculatorState';
import isValidState from '../recoil/isValidState';
import viewCountState from '../recoil/viewCountState';
import getSettings from '../util/getSettings';
import getTree from '../util/getTree';
import triggerEvent from '../util/triggerEvent';
import useWebFontLoader from '../util/useWebFontLoader';
import validate from '../util/validate';

import CalculatorItems from './CalculatorItems';
import CalculatorStyle from './CalculatorStyle';
import { useJsApi } from './JsApi';
import Outline from './Outline';
import { useTracker } from './Tracker';
import View from './View';
import ViewNavigation from './ViewNavigation';

const Canvas = (
  {
    embedType = 'inPage',
  }: {
    embedType?: 'inPage' | 'framed' | 'standalone';
  },
  canvasRef,
) => {
  const calculator = useCalculator();
  const isEditing = useIsEditing();
  const isLiveMode = useIsLiveMode();
  const isProduction = useIsProduction();
  const isTesting = useIsTesting();
  const profile = useProfile();

  const settings = getSettings({
    calculator,
    isEditing,
    isTesting,
    isProduction,
  });

  const answers = useAnswers();
  const calculatorId = useCalculatorId();
  const outputs = useOutputs();
  const selectedView = useSelectedView();
  const setIsValid = useSetRecoilState(isValidState);
  const setViewCount = useSetRecoilState(viewCountState);
  const showErrors = useShowErrors();

  const tree = getTree(calculator.items);

  useEffect(() => {
    setViewCount(tree.length);
  }, [tree.length]);

  // TODO: Refactor to CalculatorState
  const isValid = validate({
    calculator,
    outputs,
    answers,
    items: tree[selectedView],
  });

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  // Jump to top on selected view change
  const shouldScrollToTopRef = useRef(false);
  useEffect(() => {
    if (!shouldScrollToTopRef.current) {
      shouldScrollToTopRef.current = true;

      return;
    }

    triggerEvent({
      calculatorId,
      type: 'scrollToTop',
    });
  }, [selectedView]);

  useWebFontLoader(calculator);

  const isEnabled = isTesting || !profile.disabled;

  const [interactionQueue, setInteractionQueue] = useState([]);

  const onInteraction = useCallback((payload) => {
    setInteractionQueue([...interactionQueue, payload]);
  }, []);

  const formFields = useFormFields();

  const jsApi = useJsApi();
  const tracker = useTracker();

  useEffect(() => {
    if (!interactionQueue.length) return;

    const { questionReference, answer } = interactionQueue[0];

    const payload = {
      questionReference,
      answer,
      additionalProps: {
        answers,
        formData: {
          fields: formFields,
        },
      },
    };

    jsApi.onInteraction(payload);
    tracker.onInteraction(payload);

    const newInteractionQueue = interactionQueue.slice(1);

    setInteractionQueue(newInteractionQueue);
  }, [interactionQueue.length]);

  if (!isEnabled) return false;
  if (!calculatorId) return false;

  return (
    <>
      <CalculatorStyle
        embedType={embedType}
        calculator={calculator}
        isEditing={isEditing}
        className="cc"
        canvasRef={canvasRef}
        showErrors={showErrors}
      >
        <>
          {tree.map((items, viewIndex) => {
            return (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`view-${viewIndex}`}
                isActive={selectedView === viewIndex}
                isLast={tree.length === viewIndex + 1}
                isEditing={isEditing}
                isLiveMode={isLiveMode}
                hasChildren={items.length}
              >
                <CalculatorItems
                  containerId="main"
                  isEditing={isEditing}
                  items={items}
                  onInteraction={onInteraction}
                  showErrors={showErrors}
                  selectedView={selectedView}
                  settings={settings}
                  type="canvas"
                />
              </View>
            );
          })}

          {tree.length > 1 &&
            (!isEditing || isLiveMode) &&
            settings.shouldShowViewBreakNavigation && (
              <ViewNavigation calculator={calculator} tree={tree} />
            )}
        </>

        <Outline
          calculator={calculator}
          embedType={embedType}
          profile={profile}
          isTesting={isTesting}
        />
      </CalculatorStyle>
    </>
  );
};

export default forwardRef(Canvas);
