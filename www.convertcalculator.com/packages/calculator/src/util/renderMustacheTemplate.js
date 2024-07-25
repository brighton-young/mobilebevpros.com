import {
    render
} from 'mustache';

import getFormulas from './getFormulas';
import getWorkerMessage from './getWorkerMessage';

const getStringWithFormulas = async ({
    answers,
    contents,
    engine,
    string,
    workerUrl,
    formulaCtx,
    featureFlags,
}) => {
    const matches = string.match(/{{#formula}}(.*?){{\/formula}}/g);

    if (!matches || !matches.length) return string;

    const inlineFormulas = matches.reduce((acc, completeFormula) => {
        const equation = completeFormula
            .replace('{{#formula}}', '')
            .replace('{{/formula}}', '');

        return {
            ...acc,
            [completeFormula]: {
                value: equation,
                type: 'formula'
            },
        };
    }, {});

    const formulas = {
        ...getFormulas({
            answers,
            contents,
            engine
        }),
        ...inlineFormulas,
        ...formulaCtx,
    };

    const calculations = await getWorkerMessage({
        name: 'calculate',
        payload: {
            context: formulas,
            sources: engine.sources ? ? [],
            calculatorDataSources: featureFlags.calculatorDataSources,
        },
        workerUrl,
    });

    const newString = Object.keys(inlineFormulas).reduce(
        (reducer, formulaKey) => {
            if (!reducer.includes(formulaKey)) return reducer;

            return reducer.replace(formulaKey, calculations[formulaKey] ? .result);
        },
        string,
    );

    return newString;
};

const renderMustacheTemplate = async ({
    input,
    answers,
    contents,
    formulaCtx,
    engine,
    results,
    workerUrl,
    featureFlags,
}) => {
    const string = String(input);

    const stringWithFormulas = await getStringWithFormulas({
        answers,
        contents,
        engine,
        string,
        workerUrl,
        formulaCtx,
        featureFlags,
    });

    const viewFromVariables = contents.variables.reduce((acc, {
        reference
    }) => {
        return {
            ...acc,
            [reference]: results[reference] ? .result,
        };
    }, {});

    const viewFromAnswers = Object.entries(answers).reduce(
        (acc, [key, answer]) => {
            return { ...acc,
                [key]: answer.value
            };
        }, {},
    );

    try {
        return render(stringWithFormulas, {
            ...viewFromAnswers,
            ...viewFromVariables,
        });
    } catch (err) {
        return string;
    }
};

export default renderMustacheTemplate;