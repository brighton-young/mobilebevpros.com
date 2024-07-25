import {
    useMemo,
    useRef
} from 'react';

import {
    dequal
} from 'dequal';

import useDeepCompareMemoize from '@cc/shared/hooks/useDeepCompareMemoize';
import useEffectAfterInit from '@cc/shared/hooks/useEffectAfterInit';
import getCalculatorItems from '@cc/shared/utils/getCalculatorItems';
import mapBy from '@cc/shared/utils/mapBy';

import setCalculatorItemsState from '../../setCalculatorItemsState';

const useCalculatorItemsMutator = ({
    calculator,
    needsRefresh
}) => {
    const {
        contents = {}
    } = calculator;
    const {
        elements,
        formulas,
        questions
    } = contents;

    const handleSetCalculatorItems = setCalculatorItemsState();

    const changedRef = useRef([]);
    const oldCalculatorItems = useRef([]);

    const changedCalculatorItems = useMemo(() => {
        if (!needsRefresh) return [];

        const newCalculatorItems = getCalculatorItems(calculator);

        const newChangedCalculatorItems = [];

        newCalculatorItems.forEach((newItem) => {
            const oldItem = mapBy(oldCalculatorItems.current).get(newItem._id);

            if (!dequal(newItem, oldItem)) {
                newChangedCalculatorItems.push(newItem);
            }
        });

        oldCalculatorItems.current = newCalculatorItems;
        changedRef.current = newChangedCalculatorItems;

        return newChangedCalculatorItems;
    }, [
        useDeepCompareMemoize(formulas),
        useDeepCompareMemoize(elements),
        useDeepCompareMemoize(questions),
    ]);

    useEffectAfterInit(() => {
        handleSetCalculatorItems(changedRef.current);
    }, [changedCalculatorItems]);

    return {
        changedCalculatorItems
    };
};

export default useCalculatorItemsMutator;