const getElementStyleVariables = (theme) => {
    const {
        spacing = {}
    } = theme;

    return {
        paddingTop: spacing.paddingTop && `${spacing.paddingTop}px`,
        paddingRight: spacing.paddingRight && `${spacing.paddingRight}px`,
        paddingBottom: spacing.paddingBottom && `${spacing.paddingBottom}px`,
        paddingLeft: spacing.paddingLeft && `${spacing.paddingLeft}px`,
        marginTop: spacing.marginTop && `${spacing.marginTop}px`,
        marginRight: spacing.marginRight && `${spacing.marginRight}px`,
        marginBottom: spacing.marginBottom && `${spacing.marginBottom}px`,
        marginLeft: spacing.marginLeft && `${spacing.marginLeft}px`,
    };
};

export default getElementStyleVariables;