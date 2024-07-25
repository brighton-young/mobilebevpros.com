import {
    getFontFamily,
    getStyleWithUnit
} from '../styles';

const getHeadingTypeStyleVariables = (theme) => {
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

export default getHeadingTypeStyleVariables;