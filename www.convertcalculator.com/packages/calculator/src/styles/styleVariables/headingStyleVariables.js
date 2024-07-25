import {
    getFontFamily
} from '..';

export const getHeadingTypePrefix = (type) => {
    switch (type) {
        case 'p':
            return '';
        case 'label':
            return 'label';
        case 'h1':
            return 'headingOne';
        case 'h2':
            return 'headingTwo';
        case 'h3':
            return 'headingThree';
        case 'h4':
            return 'headingFour';
        case 'h5':
            return 'headingFive';
        case 'h6':
            return 'headingSix';
        default:
            return '';
    }
};

const getHeadingStyleVariables = (theme) => {
    return {
        fontFamily: getFontFamily({
            theme
        }),
        fontWeight: theme.fontWeight,
        textColor: theme.textColor,
        textAlign: theme.textAlign,
        textTransform: theme.textTransform,
        fontStyle: theme.fontStyle,
    };
};

export default getHeadingStyleVariables;