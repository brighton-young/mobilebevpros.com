import { useEffect, useRef } from 'react';

import { useSetRecoilState } from 'recoil';

import useMemoDeep from '@cc/shared/hooks/useMemoDeep';

import {
  useAnswers,
  useCalculator,
  useCalculatorId,
  useIsEditing,
  useIsLiveMode,
  useIsProduction,
  useIsTesting,
  useOutputs,
  useProfile,
  useSelectedView,
} from '../CalculatorState';
import CalculatorStyle from '../components/CalculatorStyle';
import Outline from '../components/Outline';
import TreeRenderer from '../components/TreeRenderer';
import View from '../components/View';
import ViewNavigation from '../components/ViewNavigation';
import { useDevToolsContext } from '../DevTools/DevTools';
import isValidState from '../recoil/isValidState';
import viewCountState from '../recoil/viewCountState';
import getTreeNew from '../util/getTreeNew';
import triggerEvent from '../util/triggerEvent';
import useWebFontLoader from '../util/useWebFontLoader';
import validate from '../util/validate';

import useEventTriggerer from './useEventTriggerer';
import useResizeDetector from './useResizeDetector';

type CanvasProps = {
  embedType?: 'inPage' | 'framed' | 'standalone';
};

const CanvasNew = ({ embedType = 'inPage' }: CanvasProps) => {
  const calculator = useCalculator();
  const isEditing = useIsEditing();
  const isLiveMode = useIsLiveMode();
  const isTesting = useIsTesting();
  const isProduction = useIsProduction();

  const profile = useProfile();

  // TODO: Move this to recoil state or Context
  const settings = useMemoDeep(() => {
    const {
      numberFormatting,
      language,
      messages,
      shouldShowViewBreakNavigation,
      systemOfMeasurement,
      snipcartApiKey,
      stripeUserId,
    } = calculator;

    return {
      numberFormatting,
      language,
      messages,
      shouldShowViewBreakNavigation,
      systemOfMeasurement,
      snipcartApiKey,
      stripeUserId,
      isEditing,
      isTesting,
      isProduction,
    };
  }, [calculator]);

  const tree = getTreeNew(calculator);

  const setViewCount = useSetRecoilState(viewCountState);

  useEffect(() => {
    setViewCount(tree.length);
  }, [tree.length]);

  // TODO: Refactor to CalculatorState
  const answers = useAnswers();
  const selectedView = useSelectedView();

  const outputs = useOutputs();
  const isValid = validate({
    calculator,
    outputs,
    answers,
    items: tree[selectedView],
  });

  const setIsValid = useSetRecoilState(isValidState);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  // Jump to top on selected view change
  const calculatorId = useCalculatorId();
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

  const calculatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useResizeDetector({ calculatorEl: calculatorRef.current, calculatorId });

  useEventTriggerer({
    calculatorContainer: canvasRef.current,
    embedType,
  });

  useWebFontLoader();

  const { isDevToolsOpen } = useDevToolsContext();

  return (
    <div
      ref={calculatorRef}
      className="cc-calculator"
      style={{
        height: '100%',
        marginBottom: isDevToolsOpen ? 400 : 0,
      }}
    >
      <CalculatorStyle
        canvasRef={canvasRef}
        className="cc"
        embedType={embedType}
      >
        <Views settings={settings} tree={tree}></Views>

        {tree.length > 1 &&
          (!isEditing || isLiveMode) &&
          settings.shouldShowViewBreakNavigation && (
            <ViewNavigation calculator={calculator} tree={tree} />
          )}

        <Outline
          calculator={calculator}
          embedType={embedType}
          profile={profile}
        />
      </CalculatorStyle>
    </div>
  );
};

/**
 * This is a temporary component that renders the views generated from view breaks.
 * Once View Breaks is migrated to View Container, we can get rid of this.
 */
const Views = ({ settings, tree }) => {
  const isEditing = useIsEditing();
  const isLiveMode = useIsLiveMode();
  const selectedView = useSelectedView();

  return (
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
            <TreeRenderer
              items={items}
              treePath={[viewIndex]}
              settings={settings}
            />
          </View>
        );
      })}
    </>
  );
};

export default CanvasNew;
