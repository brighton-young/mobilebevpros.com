const getSettings = ({
    calculator = {},
    ...restProps
}) => {
    const {
        numberFormatting,
        language,
        preset,
        messages,
        shouldShowViewBreakNavigation,
        systemOfMeasurement,
        snipcartApiKey,
        stripeUserId,
    } = calculator;

    return {
        ...restProps,
        numberFormatting,
        language,
        preset,
        messages,
        shouldShowViewBreakNavigation,
        systemOfMeasurement,
        snipcartApiKey,
        stripeUserId,
    };
};

export default getSettings;