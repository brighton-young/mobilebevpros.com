import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg `
  display: block;
`;

const propTypes = {
    stroke: PropTypes.string,
};

const defaultProps = {
    stroke: '#565D64',
};

const CheckIcon = (props) => {
    return ( <
        Svg xmlns = "http://www.w3.org/2000/svg"
        width = "22px"
        height = "22px"
        viewBox = "0 0 24 24"
        fill = "none"
        stroke = "currentColor"
        stroke - width = "2"
        stroke - linecap = "round"
        stroke - linejoin = "round" { ...props
        } >
        <
        path strokeLinecap = "round"
        strokeLinejoin = "round"
        strokeWidth = "2"
        d = "M5 13l4 4L19 7" /
        >
        <
        /Svg>
    );
};

CheckIcon.propTypes = propTypes;
CheckIcon.defaultProps = defaultProps;

export default CheckIcon;