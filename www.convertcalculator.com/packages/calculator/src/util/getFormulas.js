import toString from 'lodash/toString';

import {
    ButtonActionsEnum
} from '@cc/shared/enums/button-actions';
import {
    CalculatorElementsEnum
} from '@cc/shared/enums/calculator-elements';

import {
    getClientSearchParams
} from '../helpers';

const createFormula = ({
    formulaString
}) => {
    return {
        value: formulaString,
        type: 'formula'
    };
};

const getFormulas = ({
    answers,
    calculatorId,
    contents,
    engine
}) => {
    return {
        ...getContext({
            answers,
            contents
        }),
        ...getEquations({
            calculatorId,
            contents
        }),
        ...getInputs({
            engine
        }),
        ...getQueryParameters(),
        calculatorId: {
            value: calculatorId,
            type: 'internal'
        },
    };
};

const isNil = (value) => {
    // if (typeof value === 'string' && !value) return true;
    return value == null;
};

const getInputs = ({
    engine = {}
}) => {
    const context = {};

    for (let i = 0; i < engine.inputs ? .length; i++) {
        const input = engine.inputs[i];

        context[input.reference] = {
            value: toString(input.defaultValue),
            type: 'formula',
        };
    }

    return context;
};

export const getEquations = ({
    contents = {}
}) => {
    const {
        elements = [],
            formulas = [],
            questions = [],
            variables = [],
    } = contents;

    const equations = {};

    const allElements = [...elements, ...formulas, ...questions];

    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];

        if (element.shouldAddVisibilityLogic) {
            equations[`${element.reference}-VE`] = createFormula({
                // calculatorId,
                formulaString: element.visibilityEquation || '',
            });
        }

        if (element.shouldUseFormulaForDefaultValue) {
            equations[`${element.reference}-DV`] = createFormula({
                formulaString: element ? .defaultValueFormula || '',
            });
        }

        if (element.type === 'image') {
            const {
                image
            } = element;
            const {
                shouldUseFormulaForImage
            } = image;
            if (shouldUseFormulaForImage) {
                const {
                    imageFormula
                } = image;
                const formula = createFormula({
                    // calculatorId,
                    formulaString: imageFormula || '',
                });
                equations[element.reference] = formula;
            }
        }

        if (element.type === 'button') {
            for (let j = 0; j < element.button.actions.length; j++) {
                const action = element.button.actions[j];

                if (action.shouldAddExecutionLogic) {
                    equations[`${element.reference}-${action._id}-EF`] = createFormula({
                        // calculatorId,
                        formulaString: action.executionFormula || '',
                    });
                }

                const properties = action[action.type];

                if (action.type === ButtonActionsEnum.NAVIGATE) {
                    equations[`${element.reference}-NAVIGATE_URL`] = createFormula({
                        formulaString: properties.link || '',
                    });
                }

                if (action.type === ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART) {
                    equations[`${element.reference}-SNIPCART_IMAGE_FORMULA`] =
                        createFormula({
                            // calculatorId,
                            formulaString: properties.imageFormula || '',
                        });

                    equations[`${element.reference}-SNIPCART_PRICE_FORMULA`] =
                        createFormula({
                            // calculatorId,
                            formulaString: properties.priceFormula || '',
                        });

                    equations[`${element.reference}-SNIPCART_QUANTITY_FORMULA`] =
                        createFormula({
                            // calculatorId,
                            formulaString: properties.quantityFormula || '',
                        });

                    equations[`${element.reference}-SNIPCART_PRODUCT_NAME_FORMULA`] =
                        createFormula({
                            // calculatorId,
                            formulaString: properties.productNameFormula || '',
                        });

                    equations[
                        `${element.reference}-SNIPCART_PRODUCT_DESCRIPTION_FORMULA`
                    ] = createFormula({
                        // calculatorId,
                        formulaString: properties.productDescriptionFormula || '',
                    });
                }

                if (action.type === ButtonActionsEnum.VIEW_CONTAINER_NAVIGATION) {
                    const {
                        viewContainerNavigation = {}
                    } = action;
                    const {
                        navigationCommand,
                        viewContainerId
                    } =
                    viewContainerNavigation;

                    if (navigationCommand === 'INDEX') {
                        const {
                            formula
                        } = viewContainerNavigation;

                        equations[`${viewContainerId}-INDEX-${formula}`] = {
                            type: 'formula',
                            value: formula || '',
                        };
                    }
                }
            }
        }

        if (element.type === 'chart') {
            const {
                chart
            } = element;
            const {
                yAxisMinScale,
                yAxisMaxScale,
                yAxisStepSize
            } = chart;
            if (yAxisMinScale) {
                const formula = createFormula({
                    formulaString: yAxisMinScale || '',
                });
                equations[`${element.reference}-yAxisMinScale`] = formula;
            }
            if (yAxisMaxScale) {
                const formula = createFormula({
                    formulaString: yAxisMaxScale || '',
                });
                equations[`${element.reference}-yAxisMaxScale`] = formula;
            }
            if (yAxisStepSize) {
                const formula = createFormula({
                    formulaString: yAxisStepSize || '',
                });
                equations[`${element.reference}-yAxisStepSize`] = formula;
            }
        }
    }

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (
            question.type === CalculatorElementsEnum.BUTTON_GROUP ||
            question.type === CalculatorElementsEnum.DROPDOWN ||
            question.type === CalculatorElementsEnum.MULTIPLE_CHOICE ||
            question.type === CalculatorElementsEnum.MULTIPLE_SELECTION ||
            question.type === CalculatorElementsEnum.RADIO_GROUP ||
            question.type === CalculatorElementsEnum.CHART
        ) {
            const {
                optionsFormula
            } =
            question.buttonGroup ||
                question.dropdown ||
                question.multipleChoice ||
                question.multipleSelection ||
                question.radioGroup ||
                question.orderList ||
                question.chart;

            equations[`${question.reference}-RF`] = createFormula({
                // calculatorId,
                formulaString: optionsFormula || '',
            });
        }

        if (question.type === CalculatorElementsEnum.ORDER_LIST) {
            const {
                itemsFormula
            } = question.orderList;

            equations[`${question.reference}-RF`] = createFormula({
                // calculatorId,
                formulaString: itemsFormula || '',
            });
        }
    }

    for (let i = 0; i < formulas.length; i++) {
        const formula = formulas[i];

        if (formula.type === 'formula') {
            if (!isNil(formula.formula.equation)) {
                equations[formula.reference] = createFormula({
                    // calculatorId,
                    formulaString: formula.formula.equation,
                });
            }
        }

        if (formula.type === 'layeredImages') {
            const {
                imagesFormula,
                images,
                shouldUseFormulaForImages
            } =
            formula.layeredImages;

            if (shouldUseFormulaForImages && imagesFormula) {
                equations[`${formula.reference}_IMAGES_FORMULA`] = createFormula({
                    // calculatorId,
                    formulaString: imagesFormula || '',
                });
            }

            for (let j = 0; j < images.length; j++) {
                const image = images[j];

                if (!isNil(image.visibilityEquation)) {
                    equations[`${formula.reference}-${image._id}`] = createFormula({
                        // calculatorId,
                        formulaString: image.visibilityEquation,
                    });
                }
            }
        }

        if (formula.type === 'table') {
            const {
                columns: tableColumns,
                data: tableData = []
            } =
            formula.table.table;

            for (let j = 0; j < tableData.length; j++) {
                const tableRow = tableData[j];

                for (let k = 0; k < tableRow.length; k++) {
                    const column = tableColumns[k];
                    const tableCell = tableRow[k];

                    if (column ? .type === 'equation') {
                        equations[`${formula.reference}-${j}-${k}`] = createFormula({
                            // calculatorId,
                            formulaString: tableCell,
                        });
                    }
                }
            }
        }
    }

    for (let i = 0; i < variables.length; i++) {
        const variable = variables[i];

        if (!isNil(variable.equation)) {
            equations[variable.reference] = createFormula({
                // calculatorId,
                formulaString: variable.equation,
            });
        }
    }

    return equations;
};

const getSpreadsheetFromData = (array) => {
    const newArray = [...array];
    // Calculate the width and height of the Array
    const width = newArray.length || 0;
    const height = newArray[0] instanceof Array ? newArray[0].length : 0;

    // In case it is a zero matrix, no transpose routine needed.
    if (height === 0 || width === 0) {
        return [];
    }

    const spreadsheet = [];

    // Loop through every item in the outer array (height)
    for (let i = 0; i < height; i++) {
        // Insert a new row (array)
        spreadsheet[i] = [];

        // Loop through every item per item in outer array (width)
        for (let j = 0; j < width; j++) {
            // Save transposed data.
            spreadsheet[i][j] = newArray[j][i];
        }
    }

    return spreadsheet.map((row) => {
        return row.map((column) => {
            return column && column.value;
        });
    });
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const getLetterFromIndex = (index) => {
    if (index >= alphabet.length) {
        const alphabetCount = Math.floor(index / alphabet.length);
        const firstIndex = alphabetCount - 1;
        const lastIndex = index - alphabet.length * alphabetCount;

        return `${alphabet[firstIndex]}${alphabet[lastIndex]}`;
    }

    return alphabet[index];
};

const LETTER_INDEX_COUNT = 200;

const getContext = ({
    answers = {},
    contents = {}
}) => {
    const {
        datasheets = [], elements = [], questions = []
    } = contents;
    const context = {};

    for (let i = 0; i < LETTER_INDEX_COUNT; i++) {
        const letter = getLetterFromIndex(i);

        // FV is a function and should not be overwritten
        // eslint-disable-next-line no-continue
        if (letter === 'FV') continue;

        context[`T${letter}`] = {
            value: `T${letter}`,
            type: 'context'
        };
        context[letter] = {
            value: i,
            type: 'context'
        };
    }

    for (let i = 0; i < datasheets.length; i++) {
        const {
            reference,
            data
        } = datasheets[i];

        const spreadsheet = getSpreadsheetFromData(data);
        const table = spreadsheet[0] ? .map((col, j) => {
            return spreadsheet.map((row) => {
                return row[j];
            });
        });

        if (table) {
            context[reference] = {
                value: table,
                type: 'context'
            };

            spreadsheet.forEach((row, index) => {
                context[`${reference}_${getLetterFromIndex(index)}`] = {
                    value: row || [],
                    type: 'context',
                };
            }, {});
        }
    }

    for (let i = 0; i < elements.length; i++) {
        const {
            button,
            type: elementType
        } = elements[i];

        if (elementType === CalculatorElementsEnum.BUTTON) {
            for (let j = 0; j < button.actions.length; j++) {
                const {
                    connectAPI,
                    type: actionType
                } = button.actions[j];

                if (actionType === ButtonActionsEnum.CONNECT_API) {
                    context[`${connectAPI.reference}`] = {
                        value: {},
                        type: 'context',
                    };
                }
            }
        }
    }

    const meta = {};

    for (let i = 0; i < questions.length; i++) {
        const {
            reference
        } = questions[i];
        const answer = answers[reference] ? ? {};

        const answerData = answer ? .data || {};
        const dataItems = Object.entries(answerData);

        const {
            labelsMap: labels = {}
        } = answer;

        for (let j = 0; j < dataItems.length; j++) {
            const [dataKey, dataValue] = dataItems[j];

            context[`${reference}_${dataKey}`] = {
                value: dataValue,
                type: 'context',
            };
            context[`${reference}{${dataKey}}`] = {
                value: dataValue,
                type: 'context',
            };

            // TODO: this includes random dataKeys
            context[`${reference}_${dataKey}_label`] = {
                value: labels[dataKey] ? ? '',
                type: 'context',
            };

            context[`${reference}{${dataKey}}{label}`] = {
                value: labels[dataKey] ? ? '',
                type: 'context',
            };
        }

        context[reference] = {
            value: answer ? .value || 0,
            type: 'context',
        };

        context[`${reference}_label`] = {
            value: answer ? .label || '',
            type: 'context',
        };
        context[`${reference}{label}`] = {
            value: answer ? .label || '',
            type: 'context',
        };

        context[`${reference}_labels`] = {
            value: labels,
            type: 'context',
        };

        context[`${reference}_data`] = {
            value: answerData,
            type: 'context'
        };
        context[`${reference}{data}`] = {
            value: answerData,
            type: 'context'
        };

        meta[reference] = {
            labels,
            data: answerData
        };
    }

    context.QUESTIONS_METADATA = {
        value: meta,
        type: 'context'
    };

    return context;
};

const getQueryParameters = () => {
    const urlParams = new URLSearchParams(getClientSearchParams());

    const parameters = [...urlParams.entries()].reduce((acc, [key, value]) => {
        return { ...acc,
            [key.toUpperCase()]: value
        };
    }, {});

    return {
        QUERYPARAMS: {
            value: parameters,
            type: 'context'
        }
    };
};

export default getFormulas;