import {
    getFontFamily,
    getStyle,
    getStyleWithUnit
} from '..';
import getSpacing from '../utils/getSpacing';

const getCalculatorStyleVariables = (theme) => {
    // Use theme.padding or theme.spacing
    return {
        textColor: theme.textColor || '',
        primaryColor: theme.primaryColor || '',
        neutralColor: theme.neutralColor || '',

        fontFamily: getFontFamily({
            theme
        }),
        fontSize: getStyleWithUnit({
            theme,
            property: 'fontSize'
        }),
        fontWeight: theme.fontWeight || '',
        lineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
        }),
        textAlign: theme.textAlign || '',
        textTransfrom: theme.textTransfrom || '',
        fontStyle: theme.fontStyle || '',

        backgroundColor: theme.backgroundColor || '',
        maxWidth: theme.maxWidth ?
            getStyleWithUnit({
                theme,
                property: 'maxWidth'
            }) :
            '',
        height: theme.height ? getStyleWithUnit({
            theme,
            property: 'height'
        }) : '',
        overflow: theme.height ? 'auto' : undefined,

        paddingTop: getSpacing('paddingTop', [theme, theme.spacing]),
        paddingRight: getSpacing('paddingRight', [theme, theme.spacing]),
        paddingBottom: getSpacing('paddingBottom', [theme, theme.spacing]),
        paddingLeft: getSpacing('paddingLeft', [theme, theme.spacing]),

        headingFontFamily: getFontFamily({
            theme,
            prefix: 'heading',
        }),
        headingFontWeight: getStyle({
            theme,
            prefix: 'heading',
            property: 'fontWeight',
        }),
        headingTextColor: getStyle({
            theme,
            prefix: 'heading',
            property: 'textColor',
        }),
        headingTextAlign: getStyle({
            theme,
            prefix: 'heading',
            property: 'textAlign',
        }),
        headingTextTransform: getStyle({
            theme,
            prefix: 'heading',
            property: 'textTransform',
        }),
        headingFontStyle: getStyle({
            theme,
            prefix: 'heading',
            property: 'fontStyle',
        }),
        headingMargin: '0px 0px 0.5rem',

        headingOneFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingOne',
        }),
        headingOneFontWeight: theme.headingOneFontWeight,
        headingOneLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingOne',
            fallback: '1.25',
        }),

        headingTwoFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingTwo',
        }),
        headingTwoFontWeight: theme.headingTwoFontWeight,
        headingTwoLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingTwo',
            fallback: '1.25',
        }),

        headingThreeFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingThree',
        }),
        headingThreeFontWeight: theme.headingThreeFontWeight,
        headingThreeLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingThree',
            fallback: '1.25',
        }),

        headingFourFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingFour',
        }),
        headingFourFontWeight: theme.headingFourFontWeight,
        headingFourLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingFour',
            fallback: '1.25',
        }),

        headingFiveFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingFive',
        }),
        headingFiveFontWeight: theme.headingFiveFontWeight,
        headingFiveLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingFive',
            fallback: '1.25',
        }),

        headingSixFontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            prefix: 'headingSix',
        }),
        headingSixFontWeight: theme.headingSixFontWeight,
        headingSixLineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight',
            prefix: 'headingSix',
            fallback: '1.25',
        }),
    };
};

export default getCalculatorStyleVariables;