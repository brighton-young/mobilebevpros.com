import { ReactNode } from 'react';

import { getIn } from 'immutable';
import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from 'recoil';

import { CalculatorContent, Output, Outputs, Variable } from '@cc/types';

import IsLiveModeRecoilSyncer from '../components/IsLiveModeRecoilSyncer';
import answersState from '../recoil/answersState';
import answerState from '../recoil/answerState';
import calculatorIdState from '../recoil/calculatorIdState';
import calculatorItemState from '../recoil/calculatorItemState';
import calculatorQuickStylesState from '../recoil/calculatorQuickStylesState';
import CalculatorRecoilMutator from '../recoil/CalculatorRecoilMutator';
import calculatorState from '../recoil/calculatorState';
import calculatorStyleState from '../recoil/calculatorStyleState';
import canvasSizeState from '../recoil/canvasSizeState';
import canvasWidthState from '../recoil/canvasWidthState';
import featureFlagsState from '../recoil/featureFlagsState';
import fingerprintState from '../recoil/fingerprintState';
import formFieldsState from '../recoil/formFieldsState';
import formulaItemState from '../recoil/formulaItemState';
import formulasState from '../recoil/formulasState';
import isDebuggingState from '../recoil/isDebuggingState';
import isEditingState from '../recoil/isEditingState';
import isLiveModeState from '../recoil/isLiveModeState';
import isProductionState from '../recoil/isProductionState';
import isTestingState from '../recoil/isTestingState';
import { isUploadingState } from '../recoil/isUploadingState';
import profileState from '../recoil/profileState';
import selectedIndexOfViewContainerState from '../recoil/selectedIndexOfViewContainerState';
import selectedViewState from '../recoil/selectedViewState';
import showErrorsState from '../recoil/showErrorsState';
import viewContainerProgressState from '../recoil/viewContainerProgressState';
import workerUrlState from '../recoil/workerUrlState';
import { CalculatorData } from '../types';

/*

  Answers
*/

export const useAnswers = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['answers']);

  return useRecoilValue(answersState);
};

export const useAnswer = (reference) => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['answers', reference]);

  return useRecoilValue(answerState(reference));
};

/*
  Calculator ID
*/

export const useCalculatorId = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['calculator', '_id']);

  return useRecoilValue(calculatorIdState);
};

/*
  Calculator
*/

export const useCalculator = () => {
  return useRecoilValue(calculatorState);
};

export const useCalculatorProp = (prop) => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['calculator', ...prop.split('.')]);

  const calculator = useRecoilValue(calculatorState);

  return getIn(calculator, prop.split('.'));
};

/*
  Canvas Size
*/

export const useCanvasSize = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['canvasSize']);

  return useRecoilValue(canvasSizeState);
};

/*
  Canvas Width
*/
export const useCanvasWidth = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['canvasWidth']);

  return useRecoilValue(canvasWidthState);
};

export const useSetCanvasWidth = () => {
  // TODO: Migrate to PathState
  // const setCanvasWidth = useSetPathStateState(['canvasWidth']);

  return useSetRecoilState(canvasWidthState);
};

/*
  Feature Flags
*/

export const useFeatureFlags = () => {
  return useRecoilValue(featureFlagsState);
};

export const useSetFeatureFlag = () => {
  const setFeatureFlags = useSetRecoilState(featureFlagsState);

  return (flag: string, value: boolean) => {
    setFeatureFlags((prev) => {
      return {
        ...prev,
        [flag]: value,
      };
    });
  };
};

/*
  Fingerprint
*/

export const useFingerprint = () => {
  return useRecoilValue(fingerprintState);
};

/*
  Form Fields
*/
export const useFormFields = () => {
  // return usePathStateValue(['formFields']);

  return useRecoilValue(formFieldsState);
};

/*
  Is Debugging
*/

export const useIsDebugging = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['isDebugging']);

  return useRecoilValue(isDebuggingState);
};

/*
  Is Editing
*/

export const useIsEditing = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['isEditing']);

  return useRecoilValue(isEditingState);
};

export const useIsLiveMode = () => {
  return useRecoilValue(isLiveModeState);
};

/*
  Is Production
*/

export const useIsProduction = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['isProduction']);

  return useRecoilValue(isProductionState);
};

/*
  Is Testing
*/

export const useIsTesting = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['isTesting']);

  return useRecoilValue(isTestingState);
};

/*
  Is Uploading
*/
export const useIsUploading = () => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['isUploading']);

  return useRecoilValue(isUploadingState);
};

/*
  Outputs
*/

export const useOutputs = (): Outputs => {
  // return usePathStateValue(['results']);

  return useRecoilValue(formulasState);
};

export const useOutput = (reference: string): Output => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['results', reference]);

  const formulaResult = useRecoilValue(formulaItemState(reference));

  return formulaResult || {};
};

export const useFilteredOutputs = (references: string[]): Outputs => {
  const outputs = useRecoilValue(
    waitForAll(
      references.map((reference) => {
        return formulaItemState(reference);
      }),
    ),
  );

  return Object.fromEntries(
    references.map((reference, index) => {
      return [reference, outputs[index]];
    }),
  );
};

export const useOutputByFormulaId = (outputId: string): Output => {
  const calculatorItem = useRecoilValue(calculatorItemState(outputId));

  const formulaResult = useRecoilValue(
    formulaItemState(calculatorItem?.reference),
  );

  return formulaResult || {};
};

/*
  Profile
*/

export const useProfile = () => {
  return useRecoilValue(profileState);
};

/*
  Profile
*/

export const useProfileProp = (prop) => {
  // TODO: Migrate to PathState
  // return usePathStateValue(['profile', ...prop.split('.')]);

  const profile = useRecoilValue(profileState);

  return getIn(profile, prop.split('.'));
};

/*
  Selected View
*/

export const useSelectedView = () => {
  // return usePathStateValue(['selectedView']);

  return useRecoilValue(selectedViewState);
};

/*
  Selected View of a view container
*/

export const useSelectedIndexOfViewContainer = (viewContainerId: string) => {
  return useRecoilValue(selectedIndexOfViewContainerState(viewContainerId));
};

export const useViewContainerProgress = (viewContainerId: string) => {
  return useRecoilValue(viewContainerProgressState(viewContainerId));
};

/*
  Show errors
*/

export const useShowErrors = () => {
  // return usePathStateValue(['showErrors']);

  return useRecoilValue(showErrorsState);
};

/*
  Styles
  */

export const useCalculatorStyles = () => {
  return useRecoilValue(calculatorStyleState);
};

/*
  Quick Styles
*/

export const useCalculatorQuickStyles = () => {
  return useRecoilValue(calculatorQuickStylesState);
};

const getCalculatorItems = ({ contents = {} }: CalculatorContent) => {
  const {
    elements = [],
    formulas = [],
    questions = [],
    variables = [],
  } = contents;

  const calculatorItems = [];

  for (let i = 0; i < elements?.length; i++) {
    calculatorItems.push({ ...elements[i], collection: 'elements' });
  }

  for (let i = 0; i < formulas?.length; i++) {
    calculatorItems.push({ ...formulas[i], collection: 'formulas' });
  }

  for (let i = 0; i < questions?.length; i++) {
    calculatorItems.push({ ...questions[i], collection: 'questions' });
  }

  for (let i = 0; i < variables?.length; i++) {
    calculatorItems.push({ ...variables[i], collection: 'variables' });
  }

  return calculatorItems;
};

interface Props {
  calculatorId: string;
  children: ReactNode;
  data: CalculatorData;
  fingerprint: string;
  workerUrl: string;
  isDebugging: boolean;
  isEditing: boolean;
  isTesting: boolean;
  isLiveMode: boolean;
}

const CalculatorState = ({
  calculatorId,
  children,
  data,
  fingerprint,
  workerUrl,
  isDebugging,
  isEditing,
  isTesting,
  isLiveMode,
}: Props) => {
  const {
    calculator,
    defaultAnswers = {},
    featureFlags,
    outputs = {},
    profile,
  } = data;

  if (calculator === undefined) return null;

  const calculatorItems = getCalculatorItems(calculator);

  const isProduction = !isEditing && !isTesting;

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(calculatorIdState, calculatorId);
        set(calculatorState, calculator);
        set(featureFlagsState, featureFlags);
        set(fingerprintState, fingerprint);
        set(isDebuggingState, isDebugging);
        set(isEditingState, isEditing);
        set(isLiveModeState, false);
        set(isProductionState, isProduction);
        set(isTestingState, isTesting);
        set(profileState, profile);

        set(calculatorQuickStylesState, calculator.quickStyles);
        set(calculatorStyleState, calculator.style);

        calculatorItems.forEach((calculatorItem) => {
          set(calculatorItemState(calculatorItem._id), calculatorItem);
        });

        set(answersState, defaultAnswers);

        Object.entries(defaultAnswers).forEach(([reference, answer]) => {
          set(answerState(reference), answer);
        });

        Object.entries(outputs).forEach(([reference, output]) => {
          set(formulaItemState(reference), output);
        });

        set(workerUrlState, workerUrl);
      }}
    >
      <CalculatorRecoilMutator
        data={data}
        needsRefresh={isEditing || isTesting}
      >
        <IsLiveModeRecoilSyncer isLiveMode={isLiveMode} />
        {children}
      </CalculatorRecoilMutator>
    </RecoilRoot>
  );
};

export default CalculatorState;
