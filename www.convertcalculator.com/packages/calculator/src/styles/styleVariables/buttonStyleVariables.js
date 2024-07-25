import {
    darken,
    lighten,
    transparentize
} from 'polished';

import {
    colors,
    getFontFamily,
    getReadableColor,
    getStyle,
    getStyleWithUnit,
} from '..';
import getSpacing from '../utils/getSpacing';
import hexAToRGBA from '../utils/hexAToRGBA';

export const getBackgroundColor = (theme, calculatorStyle) => {
    return (
        theme.backgroundColor || calculatorStyle.primaryColor || colors['gray-700']
    );
};

export const getDisabledBackgroundColor = (theme, calculatorStyle) => {
    const color = getBackgroundColor(theme, calculatorStyle);

    return lighten(0.1, hexAToRGBA(color));
};

export const getHoverBackgroundColor = (theme, calculatorStyle) => {
    if (theme.hoverBackgroundColor) return theme.hoverBackgroundColor;

    const color = getBackgroundColor(theme, calculatorStyle);

    return darken(0.05, hexAToRGBA(color));
};

export const getHoverTextColor = (theme, calculatorStyle) => {
    if (theme.hoverTextColor) return theme.hoverTextColor;

    return getTextColor(theme, calculatorStyle);
};

export const getTextColor = (theme, calculatorStyle) => {
    if (theme.textColor) return theme.textColor;

    return getReadableColor({
        color: getBackgroundColor(theme, calculatorStyle),
    });
};

export const getDisabledTextColor = (theme, calculatorStyle) => {
    const color = getTextColor(theme, calculatorStyle);

    return transparentize(0.6, color);
};

// outer shadow styles only work when shadow style property is emitted, so we only add it when set to inset
export const getBoxShadow = (theme, prefix) => {
    const hasShadow = getStyle({
        theme,
        property: 'shadow',
        prefix
    });

    if (!hasShadow) return '';

    const shadowStyle = getStyle({
        theme,
        property: 'shadowStyle',
        prefix
    });
    const shadowX = getStyle({
        theme,
        property: 'shadowX',
        prefix
    });
    const shadowY = getStyle({
        theme,
        property: 'shadowY',
        prefix
    });
    const shadowBlur = getStyle({
        theme,
        property: 'shadowBlur',
        prefix
    });
    const shadowSpread = getStyle({
        theme,
        property: 'shadowSpread',
        prefix
    });
    const shadowColor = getStyle({
        theme,
        property: 'shadowColor',
        prefix,
    });

    if (shadowStyle === 'inset') {
        return [
            shadowStyle,
            ...(shadowX && [`${shadowX}px`]),
            ...(shadowY && [`${shadowY}px`]),
            ...(shadowBlur && [`${shadowBlur}px`]),
            ...(shadowSpread && [`${shadowSpread}px`]),
            shadowColor,
        ].join(' ');
    }

    return [
        ...(shadowX && [`${shadowX}px`]),
        ...(shadowY && [`${shadowY}px`]),
        ...(shadowBlur && [`${shadowBlur}px`]),
        ...(shadowSpread && [`${shadowSpread}px`]),
        shadowColor,
    ].join(' ');
};

export const getButtonBorder = (theme, prefix) => {
    const buttonHasBorder = getStyle({
        theme,
        property: 'border',
        prefix
    });

    if (!buttonHasBorder) {
        return 'none';
    }

    const borderWidth = getStyleWithUnit({
        theme,
        property: 'borderWidth',
        prefix,
    });
    const borderStyle = getStyle({
        theme,
        property: 'borderStyle',
        prefix
    });
    const borderColor = getStyle({
        theme,
        property: 'borderColor',
        prefix
    });

    if (!borderWidth && !borderStyle && !borderColor) return 'none';

    return [borderWidth, borderStyle, borderColor].filter(Boolean).join(' ');
};

const getButtonStyleVariables = (theme, calculatorStyle = {}) => {
    return {
        width: theme.alignment === 'full' ? '100%' : 'auto',
        paddingTop: getSpacing('paddingTop', [theme, theme.spacing]),
        paddingRight: getSpacing('paddingRight', [theme, theme.spacing]),
        paddingBottom: getSpacing('paddingBottom', [theme, theme.spacing]),
        paddingLeft: getSpacing('paddingLeft', [theme, theme.spacing]),
        textAlign: 'center',
        backgroundColor: getBackgroundColor(theme, calculatorStyle),
        disabledBackgroundColor: getDisabledBackgroundColor(theme, calculatorStyle),
        textColor: getTextColor(theme, calculatorStyle),
        hoverTextColor: getHoverTextColor(theme, calculatorStyle),
        disabledTextColor: getDisabledTextColor(theme, calculatorStyle),
        hoverBackgroundColor: getHoverBackgroundColor(theme, calculatorStyle),
        boxShadow: getBoxShadow(theme),
        fontFamily: getFontFamily({
            theme,
            fallback: 'inherit'
        }),
        fontSize: getStyleWithUnit({
            theme,
            property: 'fontSize',
            fallback: 'inherit',
        }),
        fontWeight: getStyle({
            theme,
            property: 'fontWeight'
        }),
        borderRadius: getStyleWithUnit({
            theme,
            property: 'borderRadius'
        }),
        border: getButtonBorder(theme),
        lineHeight: getStyleWithUnit({
            theme,
            property: 'lineHeight'
        }),
    };
};

export default getButtonStyleVariables;