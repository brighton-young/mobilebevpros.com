import React from 'react';

import classNames from 'classnames';
import {
    eachDay,
    endOfMonth,
    isSameDay,
    startOfMonth
} from 'date-fns';
import styled from 'styled-components';

import {
    colors
} from '../../../../styles';
import {
    formatDate
} from '../../../../util/formatDate';

import {
    getDaysOfWeek,
    groupDatesByWeek
} from './helpers';

const StyledTable = styled.table `
  border-collapse: collapse;
`;

const StyledTd = styled.td `
  text-align: center;
  cursor: pointer;
  padding: 0.5rem;
  box-sizing: border-box !important;

  background: ${(props) => {
    return props.isSelected ? colors.mediumGray : colors.white;
  }};

  color: ${(props) => {
    return props.isSelected ? colors.white : colors.darkGray;
  }};

  border: ${(props) => {
    return props.hasBorder ? `1px solid ${colors.lightGray}` : '';
  }};
`;

const MonthTable = (props) => {
    const {
        locale,
        onChange,
        selectedDate,
        visibleDate
    } = props;

    const start = startOfMonth(visibleDate);
    const end = endOfMonth(visibleDate);
    const days = eachDay(start, end);

    const daysOfWeek = getDaysOfWeek(locale);

    const groupedDates = groupDatesByWeek(days, locale);

    return ( <
        StyledTable className = "cc_date-picker-table" >
        <
        thead >
        <
        tr > {
            daysOfWeek.map((day, index) => {
                return <StyledTd key = {
                    index
                } > {
                    day
                } < /StyledTd>;
            })
        } <
        /tr> <
        /thead>

        <
        tbody > {
            groupedDates.map((group, rowIndex) => {
                return ( <
                    tr key = {
                        rowIndex
                    } > {
                        group.map((day, groupIndex) => {
                            const isSelected = isSameDay(selectedDate, day);

                            return ( <
                                StyledTd key = {
                                    `${rowIndex}-${groupIndex}`
                                }
                                className = {
                                    classNames('cc__datepicker-day', {
                                        'is-selected': isSelected,
                                    })
                                }
                                onClick = {
                                    () => {
                                        onChange(day);
                                    }
                                }
                                isSelected = {
                                    isSelected
                                }
                                hasBorder = {
                                    day && day instanceof Date
                                } >
                                {
                                    day && day instanceof Date && formatDate(day, 'D', locale)
                                } <
                                /StyledTd>
                            );
                        })
                    } <
                    /tr>
                );
            })
        } <
        /tbody> <
        /StyledTable>
    );
};

export default MonthTable;