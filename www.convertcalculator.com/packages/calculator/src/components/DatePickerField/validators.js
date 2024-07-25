export const validateDatePart = (inputValue, part) => {
    switch (part) {
        case 'day':
            return validateDay(inputValue);
        case 'month':
            return validateMonth(inputValue);
        case 'year':
            return validateYear(inputValue);
        default:
            return '';
    }
};

export const validateDay = (inputValue = '') => {
    const value = inputValue.replace(/[^0-9.]/g, '');

    if (Number(value) > 31) return {};

    if (value.length > 2) return {};

    // prefix with 0 & continue
    if (value.length === 1 && Number(value) >= 4) {
        return {
            value: `0${value}`,
            next: true,
        };
    }

    // continue
    if (value.length === 2 && Number(value) >= 1) {
        return {
            value,
            next: true,
        };
    }

    // turn 00 into 01
    if (value.length === 2 && Number(value) === 0) {
        return {
            value: '01',
            next: true,
        };
    }

    return {
        value
    };
};

export const validateMonth = (inputValue = '') => {
    const value = inputValue.replace(/[^0-9.]/g, '');

    if (Number(inputValue) > 12) return {};

    if (value.length > 2) return {};

    // prefix with 0 & continue
    if (value.length === 1 && Number(value) >= 2) {
        return {
            value: `0${value}`,
            next: true,
        };
    }

    // continue
    if (value.length === 2 && Number(value) >= 1) {
        return {
            value,
            next: true,
        };
    }

    // turn 00 into 01
    if (value.length === 2 && Number(value) === 0) {
        return {
            value: '01',
            next: true,
        };
    }

    return {
        value
    };
};

export const validateYear = (inputValue = '') => {
    const value = inputValue.replace(/[^0-9.]/g, '');

    if (Number(value) > 9999) return {};

    if (value.length > 4) return {};

    if (value.length === 4) {
        return {
            value,
            next: true,
        };
    }

    return {
        value,
    };
};