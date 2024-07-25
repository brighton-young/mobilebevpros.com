import { selector } from 'recoil';

import type { CalculatorContent } from '@cc/db';
import { Answers, CalculatorFormField, Outputs } from '@cc/types';

import getFormattedFormula from '../util/getFormattedFormula';
import getQueryParams from '../util/getQueryParams';

import answersState from './answersState';
import calculatorState from './calculatorState';
import extraFormFieldsState from './extraFormFieldsState';
import formulasState from './formulasState';

const getUTMParameterFields = () => {
  const parameters = getQueryParams([
    'utm_campaign',
    'utm_source',
    'utm_term',
    'utm_medium',
    'utm_content',
    'gclid',
  ]);

  return parameters.map(({ name, value }) => {
    return {
      name,
      value,
      label: value,
      isPersistent: false,
    };
  });
};

const getFormFields = ({
  answers,
  calculator,
  outputs,
}: {
  answers: Answers;
  calculator: CalculatorContent;
  outputs: Outputs;
}): CalculatorFormField[] => {
  const { contents = {}, numberFormatting } = calculator;
  const { formulas = [], questions = [], variables = [] } = contents;

  const formFieldsFromAnswers: CalculatorFormField[] = questions
    .map<CalculatorFormField>((question) => {
      const answer = answers[question.reference];

      return {
        label: answer?.label,
        value: answer?.value,
        data: answer?.data,
        isHidden:
          question.shouldAddVisibilityLogic &&
          !outputs[`${question.reference}-VE`]?.result,
        itemId: question._id,
        name: question.title || 'No question title',
        reference: question.reference,
        collection: 'questions',
        type: question.type,
      };
    })
    .filter((q) => {
      return q;
    });

  const formFieldsFromFormulas: CalculatorFormField[] = formulas
    .map((formula) => {
      const formulaObject = {
        label: undefined,
        value: 0,
        isHidden:
          formula.shouldAddVisibilityLogic &&
          !outputs[`${formula.reference}-VE`]?.result,
        itemId: formula._id,
        name: formula.title || 'No formula title',
        reference: formula.reference,
        collection: 'formulas',
        type: formula.type,
      };

      if (formula.type === 'formula') {
        return {
          ...formulaObject,
          value: outputs[`${formula.reference}`]?.result,
          label: getFormattedFormula({
            result: outputs[`${formula.reference}`]?.result,
            decimals: formula.formula.decimals,
            formatting: numberFormatting,
            prefix: formula.formula.prefix,
            postfix: formula.formula.postfix,
          }),
          data: {
            result: outputs[`${formula.reference}`]?.result,
            resultFormatted: getFormattedFormula({
              result: outputs[`${formula.reference}`]?.result,
              decimals: formula.formula.decimals,
              formatting: numberFormatting,
            }),
            resultFormattedFull: getFormattedFormula({
              result: outputs[`${formula.reference}`]?.result,
              decimals: formula.formula.decimals,
              formatting: numberFormatting,
              prefix: formula.formula.prefix,
              postfix: formula.formula.postfix,
            }),
          },
        };
      }

      if (formula.type === 'layeredImages') {
        return {
          ...formulaObject,
          label: '',
          value: 0,
          data: {
            imageResults: formula.layeredImages.images.reduce((acc, image) => {
              return {
                ...acc,
                [image._id]:
                  outputs[`${formula.reference}-${image._id}`]?.result,
              };
            }, {}),
          },
        };
      }

      if (formula.type === 'table') {
        return {
          ...formulaObject,
          label: '1',
          value: 1,
          data: {
            tableResults: {
              columns: formula.table.table.columns,
              data: formula.table.table.data
                .map((row, rowIndex) => {
                  const isHidden = row.reduce((acc, cell, cellIndex) => {
                    const column = formula.table.table.columns[cellIndex];

                    const result =
                      outputs[`${formula.reference}-${rowIndex}-${cellIndex}`]
                        ?.result;

                    if (
                      column &&
                      column.type === 'equation' &&
                      column.shouldHideIfZero &&
                      !result
                    ) {
                      return true;
                    }

                    return acc;
                  }, false);

                  if (isHidden) return undefined;

                  return row.map((cell, cellIndex) => {
                    const column = formula.table.table.columns[cellIndex];

                    if (!column || column.type !== 'equation') {
                      return {
                        result: cell,
                        resultFormatted: cell,
                        resultFormattedFull: cell,
                      };
                    }

                    const result =
                      outputs[`${formula.reference}-${rowIndex}-${cellIndex}`]
                        ?.result;
                    const { decimals, prefix, postfix } = column;

                    return {
                      result,
                      resultFormatted: getFormattedFormula({
                        result,
                        decimals,
                        formatting: numberFormatting,
                      }),
                      resultFormattedFull: getFormattedFormula({
                        result,
                        decimals,
                        formatting: numberFormatting,
                        prefix,
                        postfix,
                      }),
                    };
                  });
                })
                .filter((data) => {
                  return !!data;
                }),
            },
          },
        };
      }

      return formulaObject;
    })
    .filter((f) => {
      return f;
    });

  const formFieldsFromVariables: CalculatorFormField[] = variables
    .map((variable) => {
      return {
        value: outputs[variable.reference]?.result,
        label: outputs[variable.reference]?.result,
        itemId: variable._id,
        name: variable.name || 'No variable title',
        reference: variable.reference,
        collection: 'variables',
        isHidden: false,
      };
    })
    .filter((v) => {
      return v;
    });

  return [
    ...formFieldsFromAnswers,
    ...formFieldsFromFormulas,
    ...formFieldsFromVariables,
  ].filter(({ value }) => {
    const isMatrix =
      Array.isArray(value) && value.length > 0 && Array.isArray(value[0]);

    return !isMatrix;
  });
};

const formFieldsState = selector<CalculatorFormField[]>({
  key: 'formFieldsState',
  get: ({ get }) => {
    const answers = get(answersState);
    const outputs = get(formulasState);
    const calculator = get(calculatorState);
    const extraFormFields = get(extraFormFieldsState);

    const { shouldTrackUTMParameters } = calculator;

    const utmParams = shouldTrackUTMParameters ? getUTMParameterFields() : [];

    const formFields = getFormFields({
      answers,
      calculator,
      outputs,
    });

    return [...formFields, ...utmParams, ...extraFormFields];
  },
});

export default formFieldsState;
