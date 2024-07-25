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

const XIcon = (props) => {
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
        line x1 = "18"
        y1 = "6"
        x2 = "6"
        y2 = "18" / >
        <
        line x1 = "6"
        y1 = "6"
        x2 = "18"
        y2 = "18" / >
        <
        /Svg>
    );
};

XIcon.propTypes = propTypes;
XIcon.defaultProps = defaultProps;

export default XIcon;