import {
    useMemo
} from 'react';

import isObject from 'lodash/isObject';

import {
    useCalculatorStyles,
    useCalculatorQuickStyles,
    useIsEditing,
} from '../CalculatorState';

import {
    getStyleKeys
} from '.';
import {
    getQuickStyleVariables
} from './styles';

export const mergeStyles = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {
                    [key]: {}
                });
                mergeStyles(target[key], source[key]);
            } else {
                // only add defined values to styleKeys to
                // prevent overwriting values with `undefined` or `''`
                if (!source[key] && source[key] !== 0) return;

                Object.assign(target, {
                    [key]: source[key]
                });
            }
        });
    }

    return mergeStyles(target, ...sources);
};

const useStyles = ({
    prefix,
    elementStyle = {},
    elementQuickStyles = {},
    getVariables,
}) => {
    const styles = useCalculatorStyles();
    const quickStyles = useCalculatorQuickStyles();
    const isEditing = useIsEditing();

    // we only want to recompute styles when isEditing
    // it will create a new object reference each time
    // which will trigger a rerender
    // otherwise, we want to return false to prevent style calculations
    const change = isEditing ? {} : false;

    const result = useMemo(() => {
        const styleKeys = mergeStyles({},
            getStyleKeys(styles, prefix),
            getQuickStyleVariables(quickStyles, prefix),
            getStyleKeys(elementStyle),
            getQuickStyleVariables(elementQuickStyles, prefix),
        );

        const calculatorStyleKeys = mergeStyles({},
            getStyleKeys(styles),
            getQuickStyleVariables(quickStyles),
        );

        return getVariables(styleKeys, calculatorStyleKeys);
    }, [change]);

    return result;
};

export default useStyles;