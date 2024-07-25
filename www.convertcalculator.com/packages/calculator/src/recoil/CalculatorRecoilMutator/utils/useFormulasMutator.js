import {
    useRecoilCallback,
    useRecoilValue
} from 'recoil';

import {
    useAnswers,
    useCalculatorId,
    useIsProduction,
} from '../../../CalculatorState';
import getFormulas from '../../../util/getFormulas';
import formulaContextState from '../../formulaContextState';
import formulaItemState from '../../formulaItemState';
import formulasState from '../../formulasState';

import useWorker from './useWorker';

const useFormulasMutator = ({
    calculator,
    featureFlags
}) => {
    const {
        contents,
        engine = {}
    } = calculator;

    const answers = useAnswers();
    const calculatorId = useCalculatorId();
    const formulaContext = useRecoilValue(formulaContextState);

    const formulas = {
        ...getFormulas({
            answers,
            calculatorId,
            contents,
            engine
        }),
        ...formulaContext,
        featureFlags: {
            value: featureFlags,
            type: 'internal'
        },
    };

    const setFormulas = useRecoilCallback(({
        set
    }) => {
        return (results) => {
            set(formulasState, results);

            Object.entries(results).forEach(([key, value]) => {
                set(formulaItemState(key), value);
            });
        };
    }, []);

    const isProduction = useIsProduction();

    useWorker({
        name: 'calculate',
        payload: {
            calculatorId,
            context: formulas,
            sources: engine.sources ? ? [],
            calculatorDataSources: featureFlags.calculatorDataSources,
            isProduction,
        },
        onReceiveMessage: (results) => {
            window.dispatchEvent(new CustomEvent('evaluate', {
                detail: results
            }));
            setFormulas(results);
        },
    });
};

export default useFormulasMutator;