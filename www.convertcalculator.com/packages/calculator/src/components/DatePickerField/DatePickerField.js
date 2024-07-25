import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    addMonths,
    format,
    isValid,
    parse,
    subMonths
} from 'date-fns';
import styled from 'styled-components';

import usePrevious from '@cc/shared/hooks/usePrevious';

import {
    getDateName,
    getDatePartOrder,
    getDatePlaceholder,
    getDateSeparator,
} from '../../i18n/dates';
import {
    colors,
    shadows
} from '../../styles';
import getInputStyleVariables from '../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../styles/useStyles';
import {
    formatDate
} from '../../util/formatDate';
import FloatingBox from '../FloatingBox';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Input from '../Input';
import InputIcon from '../InputIcon/InputIcon';

import MonthTable from './components/MonthTable';
import {
    validateDatePart
} from './validators';

const DateInputWrapper = styled(Input)
`
  appearance: none;
  cursor: pointer;
`;

const DateInputFieldSeparator = styled.span `
  padding: 0 1px;
`;

const InputWrapper = styled.div `
  position: relative;
`;

const ClearButton = styled(IconButton)
`
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0.5rem;
  line-height: 1.5rem;
`;

const StyledDatePicker = styled.div `
  position: relative;
`;

const StyledMonthLabel = styled.span `
  color: ${colors.darkGray};
`;

const StyledPickerBox = styled.div `
  overflow: hidden;
`;

const Flex = styled.div `
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexChild = styled.div `
  flex-shrink: 1;
  padding: 0 0.5rem;
`;

const StyledInputIconSpacer = styled.div `
  display: inline-block;
  width: 30px;
`;

const DatePicker = ({
    locale = 'en',
    name,
    onChange,
    onClear,
    value,
    showInputIcon,
    inputIcon,
}) => {
    const previousValue = usePrevious(value);

    const [isPickerOpen, setPickerOpen] = useState(false);
    const [visibleDate, setVisibleDate] = useState(value || new Date());

    const [dateFieldValues, setDateFieldValues] = useState({
        day: value ? format(value || new Date(), 'DD') : '',
        month: value ? format(value || new Date(), 'MM') : '',
        year: value ? format(value || new Date(), 'YYYY') : '',
    });

    // set/unset value on hasDefaultValue change
    useEffect(() => {
        if (!previousValue && value) {
            setDateFieldValues({
                day: format(value || new Date(), 'DD'),
                month: format(value || new Date(), 'MM'),
                year: format(value || new Date(), 'YYYY'),
            });
        }

        if (previousValue && !value) {
            setDateFieldValues({
                day: '',
                month: '',
                year: '',
            });
        }
    }, [value]);

    const isClearable =
        dateFieldValues.day || dateFieldValues.month || dateFieldValues.year;

    const inputWrapper = useRef(null);

    const dateFieldPart = getDatePartOrder(locale);
    const dateFieldSeparator = getDateSeparator(locale);

    // update date state from day/month/year
    useEffect(() => {
        if (
            dateFieldValues.year.length < 4 ||
            dateFieldValues.month.length < 1 ||
            dateFieldValues.day < 1
        ) {
            return;
        }

        const date = parse(
            `${dateFieldValues.year}-${dateFieldValues.month}-${dateFieldValues.day}`,
        );

        if (!date || !isValid(date)) {
            return;
        }

        setVisibleDate(date || new Date());

        onChange(name, date);
    }, [dateFieldValues]);

    const handleAddMonth = () => {
        setVisibleDate(addMonths(visibleDate, 1));
    };

    const handleClear = () => {
        setPickerOpen(false);

        setDateFieldValues({
            day: '',
            month: '',
            year: '',
        });

        onClear(name, undefined);
    };

    const handleSelectDate = (date) => {
        setPickerOpen(false);

        setDateValues(date);

        onChange(name, date);
    };

    const setDateValues = (date) => {
        setDateFieldValues({
            day: format(date, 'DD'),
            month: format(date, 'MM'),
            year: format(date, 'YYYY'),
        });
    };

    const handleSubtractMonth = () => {
        setVisibleDate(subMonths(visibleDate, 1));
    };

    const handleDateInputClick = (event) => {
        setPickerOpen(true);
        if (event.target.tagName.toUpperCase() === 'INPUT') return;

        // focus first input
        window.setTimeout(() => {
            const inputs = inputWrapper.current ? .getElementsByTagName('input');
            if (!inputs) return;
            inputs[0] ? .focus();
        }, 0);
    };

    const focusNextInput = (currentInput) => {
        if (!inputWrapper.current) return;

        const inputs = [...inputWrapper.current.getElementsByTagName('input')];

        const inputIndex = inputs.findIndex((input) => {
            return input.name === currentInput.name;
        });

        if (inputIndex !== inputs.length - 1) {
            inputs[inputIndex + 1].focus();
        }
    };

    const focusPrevInput = (currentInput) => {
        if (!inputWrapper.current) return;

        const inputs = [...inputWrapper.current.getElementsByTagName('input')];

        const inputIndex = inputs.findIndex((input) => {
            return input.name === currentInput.name;
        });

        if (inputIndex > 0) {
            inputs[inputIndex - 1].focus();
        }
    };

    const inputStyles = useStyles({
        prefix: 'input',
        getVariables: getInputStyleVariables,
    });

    return ( <
        StyledDatePicker onClick = {
            (event) => {
                event.stopPropagation();
            }
        } >
        <
        InputWrapper >
        <
        DateInputWrapper as = "div"
        onClick = {
            handleDateInputClick
        }
        ref = {
            inputWrapper
        }
        styles = {
            inputStyles
        } >
        {
            showInputIcon && ( <
                >
                <
                InputIcon icon = {
                    inputIcon
                }
                /> <
                StyledInputIconSpacer / >
                <
                />
            )
        }

        <
        DateInputField part = {
            dateFieldPart[0]
        }
        placeholder = {
            getDatePlaceholder(locale)[dateFieldPart[0]]
        }
        value = {
            dateFieldValues[dateFieldPart[0]]
        }
        name = {
            getDateName(dateFieldPart[0])
        }
        onChange = {
            (val) => {
                return setDateFieldValues({
                    ...dateFieldValues,
                    [dateFieldPart[0]]: val,
                });
            }
        }
        focusPrevInput = {
            focusPrevInput
        }
        focusNextInput = {
            focusNextInput
        }
        setPickerOpen = {
            setPickerOpen
        }
        isPickerOpen = {
            isPickerOpen
        }
        />

        <
        DateInputFieldSeparator > {
            dateFieldSeparator[0]
        } <
        /DateInputFieldSeparator>

        <
        DateInputField part = {
            dateFieldPart[1]
        }
        placeholder = {
            getDatePlaceholder(locale)[dateFieldPart[1]]
        }
        value = {
            dateFieldValues[dateFieldPart[1]]
        }
        name = {
            getDateName(dateFieldPart[1])
        }
        onChange = {
            (val) => {
                return setDateFieldValues({
                    ...dateFieldValues,
                    [dateFieldPart[1]]: val,
                });
            }
        }
        focusPrevInput = {
            focusPrevInput
        }
        focusNextInput = {
            focusNextInput
        }
        setPickerOpen = {
            setPickerOpen
        }
        isPickerOpen = {
            isPickerOpen
        }
        />

        <
        DateInputFieldSeparator > {
            dateFieldSeparator[1]
        } <
        /DateInputFieldSeparator>

        <
        DateInputField isLastPart part = {
            dateFieldPart[2]
        }
        placeholder = {
            getDatePlaceholder(locale)[dateFieldPart[2]]
        }
        value = {
            dateFieldValues[dateFieldPart[2]]
        }
        name = {
            getDateName(dateFieldPart[2])
        }
        onChange = {
            (val) => {
                return setDateFieldValues({
                    ...dateFieldValues,
                    [dateFieldPart[2]]: val,
                });
            }
        }
        focusPrevInput = {
            focusPrevInput
        }
        focusNextInput = {
            focusNextInput
        }
        setPickerOpen = {
            setPickerOpen
        }
        isPickerOpen = {
            isPickerOpen
        }
        />

        <
        DateInputFieldSeparator > {
            dateFieldSeparator[2]
        } <
        /DateInputFieldSeparator> <
        /DateInputWrapper>

        {
            isClearable && ( <
                ClearButton type = "button"
                onClick = {
                    handleClear
                } >
                <
                Icon name = "x"
                width = "16px"
                height = "16px" / >
                <
                /ClearButton>
            )
        } <
        /InputWrapper>

        <
        FloatingBox isOpen = {
            isPickerOpen
        }
        onClose = {
            () => {
                setPickerOpen(false);
            }
        }
        position = "below"
        isFullWidth = {
            false
        } >
        <
        StyledPickerBox className = "cc__date-picker-box" >
        <
        Flex className = "cc__date-picker-header" >
        <
        FlexChild >
        <
        IconButton type = "button"
        onClick = {
            handleSubtractMonth
        } >
        <
        Icon name = "chevronLeft" / >
        <
        /IconButton> <
        /FlexChild> <
        FlexChild >
        <
        StyledMonthLabel > {
            formatDate(visibleDate, 'MMMM YYYY', locale)
        } <
        /StyledMonthLabel> <
        /FlexChild> <
        FlexChild >
        <
        IconButton type = "button"
        onClick = {
            handleAddMonth
        } >
        <
        Icon name = "chevronRight" / >
        <
        /IconButton> <
        /FlexChild> <
        /Flex>

        <
        MonthTable locale = {
            locale
        }
        onChange = {
            handleSelectDate
        }
        selectedDate = {
            value
        }
        visibleDate = {
            visibleDate
        }
        /> <
        /StyledPickerBox> <
        /FloatingBox> <
        /StyledDatePicker>
    );
};

const PlainInput = styled.input `
  font-size: ${({ styles }) => {
    return styles.fontSize;
  }} !important;
  padding: 0px !important;
  margin: 0px !important;
  background: transparent !important;
  color: ${({ styles }) => {
    return styles.textColor || '#0a0a0a';
  }} !important;
  box-shadow: ${shadows.none} !important;
  border: none !important;
  font-weight: normal !important;
  line-height: 1.5 !important;
`;

const StyledDateInputField = styled(PlainInput)
`
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  font-style: inherit;

  ${({ styles }) => {
    return ` &
::placeholder {
    color: $ {
        styles.placeholderTextColor
    };
    opacity: 1;
} &
::-webkit - input - placeholder {
        color: $ {
            styles.placeholderTextColor
        };
    } &
    ::-ms - input - placeholder {
        color: $ {
            styles.placeholderTextColor
        };
    } &
    ::-moz - placeholder {
        color: $ {
            styles.placeholderTextColor
        };
        opacity: 1;
    }
`;
  }}
`;

const DateInputField = ({
    isLastPart,
    setPickerOpen,
    isPickerOpen,
    value,
    part,
    name,
    placeholder,
    focusPrevInput,
    focusNextInput,
    onChange,
}) => {
    const digits = part === 'year' ? 4 : 2;

    const ref = useRef(null);
    const width = getWidth({
        digits,
        value,
        ref
    });

    const inputStyles = useStyles({
        prefix: 'input',
        getVariables: getInputStyleVariables,
    });

    return ( <
        StyledDateInputField ref = {
            ref
        }
        type = "text"
        inputMode = "numeric"
        placeholder = {
            placeholder
        }
        name = {
            name
        }
        value = {
            value
        }
        style = {
            {
                width
            }
        }
        styles = {
            inputStyles
        }
        onFocus = {
            (event) => {
                const target = event.currentTarget;
                window.setTimeout(() => {
                    return target.select();
                }, 0);
            }
        }
        onKeyDown = {
            (event) => {
                if (event.key === 'ArrowLeft') {
                    if (event.target.selectionStart <= 0) {
                        focusPrevInput(event.currentTarget);
                        event.preventDefault();
                    }
                }

                if (event.key === 'ArrowRight') {
                    if (event.target.selectionEnd >= digits) {
                        focusNextInput(event.currentTarget);
                        event.preventDefault();
                    }
                }

                if (event.key === 'Backspace' && !value) {
                    focusPrevInput(event.currentTarget);
                    event.preventDefault();
                }

                if (
                    event.key === 'Tab' &&
                    !event.shiftKey &&
                    isLastPart &&
                    isPickerOpen
                ) {
                    setPickerOpen(false);
                }

                if (event.key === 'Enter') {
                    setPickerOpen(!isPickerOpen);
                }
            }
        }
        onChange = {
            (event) => {
                const {
                    value: val,
                    next
                } = validateDatePart(event.target.value, part);

                if (val || val === '') {
                    onChange(val);
                }

                if (next) {
                    focusNextInput(event.currentTarget);
                }
            }
        }
        />
    );
};

const getWidth = ({
    value,
    ref
}) => {
    if (!ref.current) return 0;

    const valueOrPlaceholder = value || ref.current.placeholder;

    const styles = window.getComputedStyle(ref.current.parentElement);

    const {
        fontFamily,
        fontWeight,
        fontStyle,
        fontSize
    } = styles;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;

    const {
        width
    } = context.measureText(valueOrPlaceholder);

    return Math.ceil(width);
};

export default DatePicker;