import { useEffect } from 'react';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getLetterFromIndex from '@cc/shared/utils/getLetterFromIndex';

import useJumpToNextView from './useJumpToNextView';
import { useOptions } from './useOptions';

export const useMultipleChoiceLogic = ({
  onValueChange,
  question,
  settings,
  valueObject,
}) => {
  const { messages } = settings;

  const options = useOptions(question);
  const { handleJumpToNextView } = useJumpToNextView({ question });

  const nullValue = {
    value: 0,
    _id: 'NO_DEFAULT',
    error: question.isRequired ? messages.radioSelectionRequired : undefined,
  };

  const handleValueChange = (selectedOption, triggerInteraction = true) => {
    const selectedOptionWithData = {
      ...selectedOption,
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

    onValueChange(
      question.reference,
      selectedOptionWithData,
      triggerInteraction,
    );
  };

  useEffectDeepCompare(() => {
    const option = options.find((o) => {
      return o.label === valueObject.label;
    });

    // If no option is found, its missing from the options object so we need to set to null
    if (!option) {
      handleValueChange(nullValue, false);
    }
  }, [options]);

  useEffect(() => {
    if (valueObject._id) return;

    const option = options.find((o) => {
      return o.value === valueObject.value;
    });

    if (!option) return;

    handleValueChange(option, false);
  }, [valueObject.value]);

  const handleChange = (name, value) => {
    // If the same value is selected, return null value
    if (valueObject._id === value) {
      handleValueChange(nullValue);

      // Otherwise, select the option
    } else {
      const selectedOption = options.find((option) => {
        return option._id === value;
      });

      if (!selectedOption) return;

      handleValueChange(selectedOption);
    }

    handleJumpToNextView();
  };

  const handleClear = () => {
    handleValueChange(nullValue);
  };

  return { handleChange, handleClear, options };
};
