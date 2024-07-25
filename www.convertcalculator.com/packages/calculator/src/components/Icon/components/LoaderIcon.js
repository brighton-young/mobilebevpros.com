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

const Loader = (props) => {
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
        line x1 = "12"
        y1 = "2"
        x2 = "12"
        y2 = "6" / >
        <
        line x1 = "12"
        y1 = "18"
        x2 = "12"
        y2 = "22" / >
        <
        line x1 = "4.93"
        y1 = "4.93"
        x2 = "7.76"
        y2 = "7.76" / >
        <
        line x1 = "16.24"
        y1 = "16.24"
        x2 = "19.07"
        y2 = "19.07" / >
        <
        line x1 = "2"
        y1 = "12"
        x2 = "6"
        y2 = "12" / >
        <
        line x1 = "18"
        y1 = "12"
        x2 = "22"
        y2 = "12" / >
        <
        line x1 = "4.93"
        y1 = "19.07"
        x2 = "7.76"
        y2 = "16.24" / >
        <
        line x1 = "16.24"
        y1 = "7.76"
        x2 = "19.07"
        y2 = "4.93" / >
        <
        /Svg>
    );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;