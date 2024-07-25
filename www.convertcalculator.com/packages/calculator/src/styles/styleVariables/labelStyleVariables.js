const getLabelStyleVariables = (theme) => {
    return {
        fontWeight: theme.fontWeight,
        fontSize: theme.fontSize && `${theme.fontSize}${theme.fontSizeUnit}`,
        lineHeight: theme.lineHeight && `${theme.lineHeight}${theme.lineHeightUnit}`,
        textColor: theme.textColor,
    };
};

export default getLabelStyleVariables;