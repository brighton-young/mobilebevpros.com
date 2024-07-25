import { useEffect, useMemo, useRef, useState } from 'react';

import styled from 'styled-components';

import getRandomId from '@cc/shared/utils/getRandomId';

import getInputStyleVariables from '../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../styles/useStyles';
import DropdownOptions from '../DropdownOptions';
import FloatingBox from '../FloatingBox';
import Icon from '../Icon';
import Input from '../Input';
import InputIcon from '../InputIcon/InputIcon';
import Spinner from '../Spinner';

const StyledSelect = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem;
  opacity: ${(props) => {
    return props.isActive ? 1 : 0;
  }};
`;

type LabelValuePair = {
  label: string;
  value: string | number;
};

type Options = Record<string, unknown>;

const SearchField = ({
  className,
  initialValue,
  name,
  onChange,
  onFetchSuggestions,
  options = {},
  placeholder,
  showInputIcon,
  inputIcon,
}: {
  className: string;
  initialValue: string;
  name: string;
  onChange: (name: string, option: LabelValuePair) => void;
  onFetchSuggestions: (props: {
    query: string;
    options: Options;
    sessionToken: string;
  }) => Promise<LabelValuePair[]>;
  options?: Options;
  placeholder?: string;
  showInputIcon?: boolean;
  inputIcon?: string;
}) => {
  const sessionToken = useMemo(() => {
    return getRandomId();
  }, []);

  const [results, setResults] = useState<LabelValuePair>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowResults, setShouldShowResults] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const dobouncedCurrentValue = useDebounce(currentValue, 300);

  const isSelected = useRef(false);
  const isTouched = useRef(false);

  const handleFetchSuggestions = async () => {
    if (!dobouncedCurrentValue || dobouncedCurrentValue.length < 3) {
      setResults([]);
      setShouldShowResults(false);

      if (isTouched.current) {
        onChange(name, undefined);
      }
    } else {
      if (isSelected.current) return;

      try {
        const result = await onFetchSuggestions({
          query: dobouncedCurrentValue,
          options,
          sessionToken,
        });

        setResults(result);
      } catch (err) {
        // no-op
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchSuggestions();
  }, [dobouncedCurrentValue]);

  const handleSelectOption = async (option: LabelValuePair | undefined) => {
    if (option === undefined) return;

    isTouched.current = true;
    isSelected.current = true;

    setCurrentValue(option.label);
    setShouldShowResults(false);

    onChange(name, option);
  };

  const inputStyles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  return (
    <StyledSelect>
      {showInputIcon && <InputIcon icon={inputIcon} />}
      <Input
        styles={inputStyles}
        className={className}
        value={currentValue}
        name={name}
        onChange={(ev) => {
          const { value } = ev.target;

          isSelected.current = false;

          setCurrentValue(value);
          setIsLoading(true);
          setShouldShowResults(true);
        }}
        placeholder={placeholder}
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        type="text"
        autoComplete="off"
        $showInputIcon={showInputIcon}
      />

      <FloatingBox
        position="below"
        isOpen={shouldShowResults && !isLoading}
        onClose={() => {
          setShouldShowResults(false);
        }}
      >
        <DropdownOptions
          isOpen={shouldShowResults && !isLoading}
          options={results}
          onSelectOption={handleSelectOption}
        />
      </FloatingBox>

      <SpinnerWrapper isActive={isLoading}>
        <Spinner>
          <Icon name="loader" width="16px" height="16px" />
        </Spinner>
      </SpinnerWrapper>
    </StyledSelect>
  );
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default SearchField;
