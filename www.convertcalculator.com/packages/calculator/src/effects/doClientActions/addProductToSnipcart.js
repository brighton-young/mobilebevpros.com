import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import {
    ButtonActionsEnum
} from '@cc/shared/enums/button-actions';

import calculatorIdState from '../../recoil/calculatorIdState';
import formFieldsState from '../../recoil/formFieldsState';
import formulaItemState from '../../recoil/formulaItemState';
import triggerEvent from '../../util/triggerEvent';

const addProductToSnipcart = async ({
    element,
    properties,
    settings,
    recoilProps,
}) => {
    const {
        snapshot
    } = recoilProps;

    const calculatorId = await snapshot.getPromise(calculatorIdState);

    const formFields = await snapshot.getPromise(formFieldsState);

    const imageFormula = await snapshot.getPromise(
        formulaItemState(`${element.reference}-SNIPCART_IMAGE_FORMULA`),
    );
    const priceFormula = await snapshot.getPromise(
        formulaItemState(`${element.reference}-SNIPCART_PRICE_FORMULA`),
    );
    const quantityFormula = await snapshot.getPromise(
        formulaItemState(`${element.reference}-SNIPCART_QUANTITY_FORMULA`),
    );
    const productNameFormula = await snapshot.getPromise(
        formulaItemState(`${element.reference}-SNIPCART_PRODUCT_NAME_FORMULA`),
    );
    const productDescriptionFormula = await snapshot.getPromise(
        formulaItemState(
            `${element.reference}-SNIPCART_PRODUCT_DESCRIPTION_FORMULA`,
        ),
    );

    const image = imageFormula ? .result;
    const price = priceFormula ? .result;
    const quantity = quantityFormula ? .result;
    const productName = productNameFormula ? .result;
    const productDescription = productDescriptionFormula ? .result;

    const shouldTriggerAction =
        isNumber(price) &&
        isNumber(quantity) &&
        isString(productName) &&
        settings.snipcartApiKey;

    if (!shouldTriggerAction) return 0;

    const {
        hasTaxesIncluded,
        shippable,
        stackable,
        taxable
    } = properties;

    triggerEvent({
        calculatorId,
        type: ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART,
        payload: {
            apiKey: settings.snipcartApiKey,
            formFields,
            hasTaxesIncluded,
            image,
            price,
            productName,
            productDescription,
            quantity,
            shippable,
            stackable,
            taxable,
        },
    });

    return 1;
};

export default addProductToSnipcart;