import React from 'react';

import { useRecoilCallback } from 'recoil';

import { Answer, CalculatorSettings } from '@cc/types';

import { useAnswer, useOutput, useShowErrors } from '../CalculatorState';
import answersState from '../recoil/answersState';
import answerState from '../recoil/answerState';
import formFieldsState from '../recoil/formFieldsState';

import TreeItemElementRenderer from './TreeItemElementRenderer';
import { TreeItemType, TreePath } from './TreeRenderer';

type TreeItemProps = {
  item: TreeItemType;
  settings: CalculatorSettings;
  treePath: TreePath;
  treeRenderer: React.JSX.Element;
};

const TreeItem = ({
  item,
  settings,
  treeRenderer,
  treePath,
}: TreeItemProps) => {
  const valueObject = useAnswer(item.reference);

  const showErrors = useShowErrors();

  const error =
    showErrors || valueObject.isInstantError ? valueObject.error : undefined;

  const visibilityOutput = useOutput(`${item.reference}-VE`);

  const isHidden = item.shouldAddVisibilityLogic && !visibilityOutput?.result;

  // const jsApi = useJsApi();
  // const tracker = useTracker();

  const handleInteraction = useRecoilCallback(({ snapshot }) => {
    return async ({ questionReference, answer }) => {
      const formFields = await snapshot.getPromise(formFieldsState);
      const answers = await snapshot.getPromise(answersState);

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

      // TODO: Refactor this whenever we get the plugins / event system going
      // We have to do it this way to prevent rerenders from useJsApi and useTracker hooks
      const event = new CustomEvent('interaction', {
        detail: payload,
      });

      window.dispatchEvent(event);

      // jsApi.onInteraction(payload);
      // tracker.onInteraction(payload);
    };
  }, []);

  const handleValueChange = useRecoilCallback(({ set }) => {
    // eslint-disable-next-line no-shadow
    return (
      questionReference: string,
      newAnswer: Answer,
      triggerInteraction = true,
    ) => {
      set(answerState(questionReference), newAnswer);

      set(answersState, (answers) => {
        return {
          ...answers,
          [questionReference]: newAnswer,
        };
      });

      if (triggerInteraction) {
        window.setTimeout(() => {
          handleInteraction({ questionReference, answer: newAnswer });
        }, 10);
      }
    };
  }, []);

  return (
    <TreeItemElementRenderer
      error={error}
      isHidden={isHidden}
      element={item}
      onValueChange={handleValueChange}
      settings={settings}
      treePath={treePath}
      treeRenderer={treeRenderer}
      valueObject={valueObject}
    />
  );
};

export default TreeItem;
