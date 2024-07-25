import addDays from 'date-fns/add_days';
import isWeekend from 'date-fns/is_weekend';
import parse from 'date-fns/parse';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import startOfDay from 'date-fns/start_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import toString from 'lodash/toString';

import { CalculatorElementsEnum } from '@cc/shared/enums/calculator-elements';
import getLetterFromIndex from '@cc/shared/utils/getLetterFromIndex';
import { Outputs } from '@cc/types';

import getNumberErrorMessage from '../elements/common/utils/getNumberErrorMessage';
import { getClientSearchParams } from '../helpers';
import { CalculatorContent } from '../types';

import { formatDate } from './formatDate';
import getEmailErrorMessage from './getEmailErrorMessage';
import getFileErrorMessage from './getFileErrorMessage';
import getFormattedNumber from './getFormattedNumber';
import getPhoneErrorMessage from './getPhoneErrorMessage';
import getSpreadsheetEpoch from './getSpreadsheetEpoch';

const getDefaultValueFromQueryParam = ({ question }) => {
  if (!question.shouldSetQueryParam || !question.queryParamName)
    return undefined;

  const urlParams = new URLSearchParams(getClientSearchParams());
  const queryParamValue = urlParams.get(question.queryParamName);

  return queryParamValue;
};

const getDefaultValueFromFormula = ({ question, outputs }) => {
  if (!outputs || !question.shouldUseFormulaForDefaultValue) {
    return undefined;
  }

  const output = outputs[`${question.reference}-DV`];

  if (!output) {
    return undefined;
  }

  return output.result;
};

const getQuestionDefault = ({
  language,
  messages,
  numberFormatting,
  question,
  outputs,
}: {
  language: CalculatorContent['language'];
  messages: CalculatorContent['messages'];
  numberFormatting: CalculatorContent['numberFormatting'];
  question: any;
  outputs?: Outputs;
}) => {
  const defaultValueFromQueryParam = getDefaultValueFromQueryParam({
    question,
  });

  const defaultValueFromFormula = getDefaultValueFromFormula({
    question,
    outputs,
  });

  if (question.type === CalculatorElementsEnum.COUPON) {
    return {
      label: '',
      value: 0,
      error: question.isRequired ? messages.couponRequired : undefined,
      data: {
        label: '',
      },
    };
  }

  if (question.type === CalculatorElementsEnum.DATE) {
    const { hasDefaultValue } = question.date;

    if (!hasDefaultValue && !defaultValueFromQueryParam) {
      return {
        label: '',
        value: 0,
        error: question.isRequired ? messages.dateRequired : undefined,
      };
    }

    const startOfToday = defaultValueFromQueryParam
      ? parse(defaultValueFromQueryParam)
      : startOfDay(new Date());

    return {
      label: formatDate(startOfToday, 'P', language),
      value: startOfToday,
      data: {
        spreadsheetTime: getSpreadsheetEpoch(startOfToday),
        isWeekend: isWeekend(startOfToday) ? 1 : 0,
        differenceToToday: 0,
      },
    };
  }

  if (question.type === CalculatorElementsEnum.DATES) {
    const [fromDateQueryParam, toDateQueryParam] = toString(
      defaultValueFromQueryParam,
    ).split('|');
    const fromDate = fromDateQueryParam
      ? parse(fromDateQueryParam)
      : startOfDay(new Date());
    const toDate = toDateQueryParam
      ? parse(toDateQueryParam)
      : addDays(fromDate, 1);

    return {
      label: `${formatDate(fromDate, 'P', language)} - ${formatDate(
        toDate,
        'P',
        language,
      )} (1 day)`,
      value: 1,
      data: {
        fromDate,
        toDate,
      },
    };
  }

  if (question.type === CalculatorElementsEnum.EMAIL) {
    const defaultAnswer = defaultValueFromQueryParam || '';

    const error = getEmailErrorMessage({
      isRequired: question.isRequired,
      messages,
      email: defaultAnswer,
    });

    return {
      label: defaultAnswer,
      value: defaultAnswer && !error ? 1 : 0,
      error,
      data: {
        email: defaultAnswer,
      },
    };
  }

  if (question.type === CalculatorElementsEnum.FILE) {
    return {
      label: '',
      value: 0,
      error: question.isRequired
        ? getFileErrorMessage({
            fileLength: 0,
            max: question.file.max,
            messages,
            min: question.file.min,
          })
        : undefined,
      data: {
        files: [],
      },
    };
  }

  if (question.type === CalculatorElementsEnum.ORDER_LIST) {
    const { default: defaultQty = 0, items, prefix } = question.orderList;

    const order = items
      .map((item) => {
        const total = defaultQty * item.value || 0;

        return {
          label: `${defaultQty}x ${item.name}`,
          name: item.name,
          qty: defaultQty,
          qtyFormatted: getFormattedNumber(numberFormatting, defaultQty),
          total,
          totalFormatted: `${prefix}${getFormattedNumber(
            numberFormatting,
            total,
          )}`,
          value: item.value,
          valueFormatted: `${prefix}${getFormattedNumber(
            numberFormatting,
            item.value,
          )}`,
        };
      })
      .filter((i) => {
        return i.qty;
      });

    const itemReferences = items.reduce((acc, item, index) => {
      const total = defaultQty * item.value;

      return { ...acc, [`I${getLetterFromIndex(index)}`]: total };
    }, {});

    const label = order
      .map((item) => {
        return item.label;
      })
      .join(' + ');

    const value = order.reduce((acc, item) => {
      return acc + item.total;
    }, 0);

    const qty = order.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    return {
      label,
      value,
      data: {
        ...itemReferences,
        order,
        qty,
      },
      error:
        !defaultQty && question.isRequired
          ? messages.orderListSelectionRequired
          : undefined,
    };
  }

  if (question.type === CalculatorElementsEnum.PHONE) {
    const defaultAnswer = defaultValueFromQueryParam || '';

    const error = getPhoneErrorMessage({
      isRequired: question.isRequired,
      messages,
      value: defaultAnswer,
      includeCountryCode: false,
      validatePhoneNumber: true,
    });

    return {
      label: defaultAnswer,
      value: defaultAnswer ? 1 : 0,
      error,
      data: {
        phone: defaultAnswer,
      },
    };
  }

  if (question.type === CalculatorElementsEnum.PLACE) {
    return {
      label: '',
      value: 0,
      error: question.isRequired ? messages.placeRequired : undefined,
      data: {
        distance: 0,
        duration: 0,
      },
    };
  }
  if (question.type === CalculatorElementsEnum.PLACES) {
    return {
      label: '',
      value: 0,
      error: question.isRequired ? messages.placesRequired : undefined,
      data: {
        distance: 0,
        duration: 0,
      },
    };
  }

  if (
    question.type === CalculatorElementsEnum.BUTTON_GROUP ||
    question.type === CalculatorElementsEnum.DROPDOWN ||
    question.type === CalculatorElementsEnum.MULTIPLE_CHOICE ||
    question.type === CalculatorElementsEnum.RADIO_GROUP
  ) {
    const {
      options = [],
      defaultOption: baseDefaultOption,
      shouldUseFormulaForOptions,
    } = question.multipleChoice ||
    question.dropdown ||
    question.buttonGroup ||
    question.radioGroup;

    const defaultOption = defaultValueFromQueryParam || baseDefaultOption;

    const hasDefaultOption = defaultOption && !shouldUseFormulaForOptions;

    if (!hasDefaultOption) {
      return {
        value: 0,
        _id: 'NO_DEFAULT',
        error: question.isRequired
          ? messages.radioMultipleSelectionRequired
          : undefined,
        data: {
          ...options.reduce((acc, _, index) => {
            return {
              ...acc,
              [`O${getLetterFromIndex(index)}`]: 0,
            };
          }, {}),
          checkedOptions: {},
        },
      };
    }

    const selectedOptionFromQueryParam = options.find((option) => {
      if (!defaultValueFromQueryParam) return false;

      return (
        option.value === parseFloat(defaultValueFromQueryParam) ||
        option.label.toLowerCase() === defaultValueFromQueryParam.toLowerCase()
      );
    });

    const selectedOptionFromDefault =
      options.find((option) => {
        return option._id === defaultOption;
      }) || {};

    const selectedOption =
      selectedOptionFromQueryParam || selectedOptionFromDefault;

    return {
      ...selectedOption,
      error:
        question.isRequired && !selectedOption._id
          ? messages.radioSelectionRequired
          : undefined,
      data: options.reduce((acc, option, index) => {
        const isSelected = option._id === selectedOption._id;

        return {
          ...acc,
          [`O${getLetterFromIndex(index)}`]: isSelected
            ? selectedOption.value
            : 0,
        };
      }, {}),
    };
  }

  if (question.type === CalculatorElementsEnum.MULTIPLE_SELECTION) {
    const { options = [] } = question.multipleSelection;

    return {
      value: 0,
      _id: 'NO_DEFAULT',
      error: question.isRequired
        ? messages.radioMultipleSelectionRequired
        : undefined,
      data: {
        ...options.reduce((acc, _, index) => {
          return {
            ...acc,
            [`O${getLetterFromIndex(index)}`]: 0,
          };
        }, {}),
        checkedOptions: {},
      },
    };
  }

  if (
    question.type === CalculatorElementsEnum.NUMBER ||
    question.type === CalculatorElementsEnum.NUMBER_INCREMENTER ||
    question.type === CalculatorElementsEnum.RANGE_SLIDER
  ) {
    const {
      default: defaultValue,
      max,
      min,
      postfix,
      prefix,
    } = question.rangeSlider || question.number || question.numberIncrementer;

    const getDefaultAnswer = () => {
      if (defaultValueFromFormula != null) {
        return defaultValueFromFormula;
      }
      if (defaultValueFromQueryParam != null) {
        return parseFloat(defaultValueFromQueryParam);
      }
      return defaultValue;
    };

    const defaultAnswer = getDefaultAnswer();
    const formattedValue = getFormattedNumber(numberFormatting, defaultAnswer);

    return {
      label: `${prefix || ''}${formattedValue}${postfix || ''}`,
      error: getNumberErrorMessage({
        isRequired: question.isRequired,
        max,
        messages,
        min,
        numberFormatting,
        value: defaultAnswer,
      }),
      value: defaultAnswer,
    };
  }

  if (question.type === CalculatorElementsEnum.CHAMBER_OF_COMMERCE) {
    return {
      label: '',
      value: 0,
      error: question.isRequired ? messages.answerRequired : undefined,
      data: {
        straatnaam: '',
        huisnummer: '',
        huisletter: '',
        postcode: '',
        plaats: '',
      },
    };
  }

  if (
    question.type === CalculatorElementsEnum.CHECKBOX ||
    question.type === CalculatorElementsEnum.SWITCH
  ) {
    const { defaultValue } = question.checkbox || question.switch;
    const defaultAnswer = defaultValueFromQueryParam
      ? parseFloat(defaultValueFromQueryParam)
      : defaultValue;

    return {
      label: defaultAnswer ? 'Yes' : 'No',
      value: defaultAnswer ? 1 : 0,
      error:
        !defaultAnswer && question.isRequired
          ? messages.switchRequired
          : undefined,
    };
  }

  if (question.type === CalculatorElementsEnum.STATE_BUTTON) {
    const defaultAnswer = defaultValueFromQueryParam
      ? parseFloat(defaultValueFromQueryParam)
      : question.stateButton.defaultValue;

    return {
      label: defaultAnswer ? 'Yes' : 'No',
      value: defaultAnswer ? 1 : 0,
      error:
        !defaultAnswer && question.isRequired
          ? messages.switchRequired
          : undefined,
    };
  }

  if (question.type === CalculatorElementsEnum.SIGNATURE) {
    return {
      label: '',
      value: 0,
      error: question.isRequired ? messages.signatureRequired : undefined,
      data: {
        files: [],
      },
    };
  }

  if (question.type === CalculatorElementsEnum.TEXT_FIELD) {
    const defaultAnswer =
      defaultValueFromFormula ?? defaultValueFromQueryParam ?? '';

    return {
      label: defaultAnswer,
      value: defaultAnswer ? 1 : 0,
      error:
        !defaultAnswer && question.isRequired
          ? messages.answerRequired
          : undefined,
      data: {
        text: defaultAnswer,
      },
    };
  }

  if (question.type === CalculatorElementsEnum.TIME) {
    const { hasDefaultValue } = question.time;

    if (!hasDefaultValue && !defaultValueFromQueryParam) {
      return {
        value: 0,
        error: question.isRequired ? messages.timeRequired : undefined,
        data: {
          hours: 0,
          minutes: 0,
        },
      };
    }

    const now = new Date();
    const [hoursFromQuery, minutesFromQuery] = toString(
      defaultValueFromQueryParam,
    ).split(':');

    const hours = hoursFromQuery || now.getHours();
    const minutes = minutesFromQuery || now.getMinutes();

    const dateTime = setMinutes(setHours(startOfMinute(now), hours), minutes);

    return {
      label: formatDate(now, 'HH:mm', language),
      value: dateTime,
      data: {
        hours: dateTime.getHours(),
        minutes: dateTime.getMinutes(),
      },
    };
  }

  if (question.type === CalculatorElementsEnum.TIMESLOT) {
    return {
      label: '',
      value: 0,
      error: question.isRequired
        ? messages.timeslotRequired || messages.answerRequired
        : undefined,
    };
  }

  return { value: 0, label: '' };
};

const getQuestionDefaultAnswers = (calculatorContent: CalculatorContent, outputs?: Outputs) => {
  const {
    language,
    messages = {},
    numberFormatting,
    contents = {},
  } = calculatorContent;
  const { questions = [] } = contents;

  return questions.reduce((acc, question) => {
    const defaultAnswer = getQuestionDefault({
      language,
      messages,
      numberFormatting,
      question,
      outputs,
    });

    return { ...acc, [question.reference]: defaultAnswer };
  }, {});
};

export default getQuestionDefaultAnswers;
