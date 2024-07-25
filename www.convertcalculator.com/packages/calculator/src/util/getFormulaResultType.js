import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import lowerCase from 'lodash/lowerCase';

import FormulaResultTypesEnum from '@cc/shared/enums/formula-result-types';
import isNumberLike from '@cc/shared/utils/isNumberLike';

const isImage = (result) => {
    if (!isString(result)) return false;

    const lowerCaseResult = lowerCase(result);
    const imageMediaTypes = ['JPG', 'JPEG', 'GIF', 'PNG', 'TIFF', 'BMP', 'SVG'];

    return imageMediaTypes.reduce((isImageReducer, mediaType) => {
        if (lowerCaseResult.indexOf(lowerCase(mediaType)) > -1) return true;

        return isImageReducer;
    }, false);
};

const isTable = (result) => {
    if (!isArray(result) || !result.length) return false;

    if (isArray(result[0])) return true;

    return false;
};

const isList = (result) => {
    if (!isArray(result)) return false;
    if (result.length && isArray(result[0])) return false;

    return true;
};

const getFormulaResultType = (result) => {
    if (result === null) return FormulaResultTypesEnum.EMPTY;
    if (isBoolean(result)) return FormulaResultTypesEnum.BOOLEAN;
    if (isNumber(result) || isNumberLike(result))
        return FormulaResultTypesEnum.NUMBER;
    if (isImage(result)) return FormulaResultTypesEnum.IMAGE;
    if (isString(result)) return FormulaResultTypesEnum.TEXT;
    if (isTable(result)) return FormulaResultTypesEnum.TABLE;
    if (isList(result)) return FormulaResultTypesEnum.LIST;
    if (isDate(result)) return FormulaResultTypesEnum.DATE;
    if (isObject(result)) return FormulaResultTypesEnum.OBJECT;

    return FormulaResultTypesEnum.UNKNOWN;
};

export default getFormulaResultType;