import { render } from 'mustache';

import getFormattedNumber from '../../../util/getFormattedNumber';

type GetNumberErrorMessage = (options: {
  isRequired?: boolean;
  max?: number;
  messages: {
    answerRequired: string;
    rangeOutOfBounds: string;
    rangeTooHigh: string;
    rangeTooLow: string;
  };
  min?: number;
  numberFormatting?: string;
  value: number | string | undefined;
}) => string | undefined;

const getNumberErrorMessage: GetNumberErrorMessage = ({
  isRequired = false,
  max,
  messages,
  min,
  numberFormatting,
  value,
}) => {
  const isNumber = typeof value === 'number';
  const hasMax = typeof max === 'number';
  const hasMin = typeof min === 'number';

  if (!isNumber) {
    if (isRequired) {
      return messages.answerRequired;
    }

    return undefined;
  }

  if (hasMin && hasMax && (value < min || value > max)) {
    return render(messages.rangeOutOfBounds, {
      minValue: getFormattedNumber(numberFormatting, min),
      maxValue: getFormattedNumber(numberFormatting, max),
    });
  }

  if (hasMin && value < min) {
    return render(messages.rangeTooLow, {
      minValue: getFormattedNumber(numberFormatting, min),
    });
  }

  if (hasMax && value > max) {
    return render(messages.rangeTooHigh, {
      maxValue: getFormattedNumber(numberFormatting, max),
    });
  }

  return undefined;
};

export default getNumberErrorMessage;
