import {
    getFontFamily,
    getStyleWithUnit
} from '..';

export const getFormulaResultStyleVariables = (theme) => {
    return {
        fontFamily: getFontFamily({
            theme
        }),
        fontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
        }),
        fontWeight: theme.fontWeight,
        lineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
        }),
        textColor: theme.textColor,
        textAlign: theme.textAlign,
        textTransform: theme.textTransform,
        fontStyle: theme.fontStyle,
    };
};