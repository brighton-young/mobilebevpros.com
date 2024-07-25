import {
    getFontFamily,
    getStyleWithUnit
} from '..';

export const getTextStyleVariables = (style) => {
    return {
        fontFamily: getFontFamily({
            theme: style
        }),
        fontSize: getStyleWithUnit({
            theme: style,
            property: 'fontSize',
        }),
        fontWeight: style.fontWeight,
        lineHeight: getStyleWithUnit({
            theme: style,
            property: 'lineHeight',
        }),
        textColor: style.textColor,
        textAlign: style.textAlign,
        textTransform: style.textTransform,
        fontStyle: style.fontStyle,
    };
};