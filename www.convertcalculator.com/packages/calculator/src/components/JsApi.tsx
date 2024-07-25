import { createContext, useContext, useEffect, useRef } from 'react';

import { useRecoilCallback, useRecoilState } from 'recoil';

import useEventListener from '@cc/shared/hooks/useEventListener';

import {
  useAnswers,
  useCalculator,
  useCalculatorId,
  useIsDebugging,
  useIsEditing,
  useIsProduction,
  useOutputs,
} from '../CalculatorState';
import answersState from '../recoil/answersState';
import answerState from '../recoil/answerState';
import extraFormFieldsState from '../recoil/extraFormFieldsState';
import useCustomScripts from '../util/useCustomScripts';

const JsApiStoreContext = createContext();

export const useJsApi = () => {
  return useContext(JsApiStoreContext) || {};
};

if (typeof window !== 'undefined') {
  window.cc = {
    ...window.cc,
    answers: {},
    elements: {},
    parsedFormulas: {},
    extraFormFields: [],
    getInstance: () => {
      console.warn('Please turn on Use JS API to use custom JS code');
    },
  };
}

const JsApi = ({ children }) => {
  const answers = useAnswers();
  const calculatorId = useCalculatorId();
  const calculator = useCalculator();
  const isDebugging = useIsDebugging();
  const isEditing = useIsEditing();
  const isProduction = useIsProduction();

  useCustomScripts({ calculator, isEditing, isProduction });

  const { contents = {} } = calculator;
  const { formulas = [], questions = [] } = contents;

  const [extraFormFields, setExtraFormFields] =
    useRecoilState(extraFormFieldsState);
  const parsedFormulas = useOutputs();

  const isPermitted =
    (isProduction || isDebugging) && calculator.shouldPermitJavaScriptAccess;
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isPermitted || !isBrowser) return;

    window.cc.getInstance = () => {
      console.error(
        'The ConvertCalculator JS API only works on your live website',
      );
    };
  }, [isBrowser, isPermitted]);

  const handleSetAnswer = useRecoilCallback(({ set }) => {
    return (reference, value) => {
      set(answersState, (oldAnswers) => {
        return { ...oldAnswers, [reference]: value };
      });
      set(answerState(reference), value);
    };
  });

  const hooks = useRef({ calculator: {}, questions: {} });

  const getInstance = (calculatorIdFromInstance) => {
    if (calculatorId !== calculatorIdFromInstance) return {};
    if (!isPermitted) return {};

    const formulaObjects = formulas.map((formula) => {
      return {
        _id: formula._id,
        reference: formula.reference,
        title: formula.title,
        description: formula.description,
        getElement: () => {
          return getElementBySelectorId(formula._id);
        },
        getResult: () => {
          if (formula.type === 'formula') {
            return window.cc.parsedFormulas[formula.reference];
          }

          return 0;
        },
      };
    });

    const questionObjects = questions.map((question) => {
      return {
        _id: question._id,
        reference: question.reference,
        title: question.title,
        description: question.description,
        type: question.type,

        [question.type]: question[question.type],
        on: (eventName, func) => {
          hooks.current.questions[question.reference] =
            hooks.current.questions[question.reference] || {};
          hooks.current.questions[question.reference][eventName] = func;
        },
        getAnswer: () => {
          return window.cc.answers[question.reference];
        },
        getElement: () => {
          return getElementBySelectorId(question._id);
        },
        setAnswer: (answer) => {
          if (typeof answer === 'object' && answer.value) {
            handleSetAnswer(question.reference, answer, false);
          }

          if (typeof answer === 'string' || typeof answer === 'number') {
            handleSetAnswer(
              question.reference,
              { label: String(answer), value: parseFloat(answer) },
              false,
            );
          }
        },
      };
    });

    return {
      answers,
      calculator: {
        addFormData: (name, label) => {
          const existingItemIndex = window.cc.extraFormFields.findIndex(
            (item) => {
              return item.name === name;
            },
          );

          const newField = {
            name,
            label,
            value: label,
            reference: name,
            isPersistent: true,
          };

          if (existingItemIndex > -1) {
            const newExtraFormFields = [
              ...window.cc.extraFormFields.slice(0, existingItemIndex),
              newField,
              ...window.cc.extraFormFields.slice(existingItemIndex + 1),
            ];

            setExtraFormFields(newExtraFormFields);
          } else {
            const newExtraFormFields = [...extraFormFields, newField];

            setExtraFormFields(newExtraFormFields);
          }
        },
        on: (eventName, func) => {
          hooks.current.calculator[eventName] = func;
        },
      },
      formulas: {
        formulas: formulaObjects,
        getByReference: (fRef) => {
          return formulaObjects.find((f) => {
            return f.reference === fRef;
          });
        },
      },
      questions: {
        questions: questionObjects,
        getByReference: (qRef) => {
          return questionObjects.find((q) => {
            return q.reference === qRef;
          });
        },
      },
    };
  };

  useEffect(() => {
    if (!calculatorId) return;

    window.cc.getInstance = getInstance;

    /*
      FIXME: We need to set timeout because default answers are set and communicated to recoil after initialization.
      If you would use setAnswer() function on init,  the default answer triggers later which caused the setAnswer() not to work.
      The best fix is to set default answers as real defaults before calculator runs. When we did that, we can remove the setTimeout function
    */
    window.setTimeout(() => {
      const event = new CustomEvent('ccloaded', {
        detail: { calculatorId },
      });

      window.dispatchEvent(event);
    }, 300);
  }, [calculatorId]);

  useEffect(() => {
    window.cc.answers = answers;
    window.cc.parsedFormulas = parsedFormulas;
    window.cc.extraFormFields = extraFormFields;
  }, [answers, parsedFormulas, extraFormFields]);

  const handleDoServerSideActions = (payload) => {
    const { hasCheckoutWithStripeAction } = payload;

    if (
      !hasCheckoutWithStripeAction &&
      typeof hooks.current.calculator.submit === 'function'
    ) {
      try {
        hooks.current.calculator.submit(payload);
      } catch (err) {
        console.error('CC Custom JS On Submit Error', err);
      }
    }

    if (
      hasCheckoutWithStripeAction &&
      typeof hooks.current.calculator.checkout === 'function'
    ) {
      try {
        hooks.current.calculator.checkout(payload);
      } catch (err) {
        console.error('CC Custom JS On Checkout Error', err);
      }
    }
  };

  const handleInteraction = (payload) => {
    const { questionReference, answer, additionalProps } = payload;

    if (typeof hooks.current.calculator.interaction === 'function') {
      hooks.current.calculator.interaction({
        questionReference,
        answer,
        ...additionalProps,
      });
    }

    if (
      typeof hooks.current.questions?.[questionReference]?.valueChange ===
      'function'
    ) {
      try {
        hooks.current.questions[questionReference].valueChange({
          questionReference,
          answer,
          ...additionalProps,
        });
      } catch (err) {
        console.error('CC Custom JS On Interaction Error', err);
      }
    }
  };

  useEventListener('interaction', (ev) => {
    handleInteraction(ev.detail);
  });

  const handleLinkToExternalPage = (payload) => {
    if (typeof hooks.current.calculator.redirect === 'function') {
      try {
        hooks.current.calculator.redirect(payload);
      } catch (err) {
        console.error('CC Custom JS On Redirect Error', err);
      }
    }
  };

  return (
    <JsApiStoreContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onDoServerSideActions: handleDoServerSideActions,
        onInteraction: handleInteraction,
        onLinkToExternalPage: handleLinkToExternalPage,
      }}
    >
      {children}
    </JsApiStoreContext.Provider>
  );
};

const getElementBySelectorId = (elementId) => {
  return document.querySelector(`[data-selector-element-id="${elementId}"]`);
};

export default JsApi;
