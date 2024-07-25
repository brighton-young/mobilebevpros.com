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

const UploadIcon = (props) => {
    return ( <
        Svg xmlns = "http://www.w3.org/2000/S"
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
        path d = "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" / >
        <
        polyline points = "17 8 12 3 7 8" / >
        <
        line x1 = "12"
        y1 = "3"
        x2 = "12"
        y2 = "15" / >
        <
        /Svg>
    );
};

UploadIcon.propTypes = propTypes;
UploadIcon.defaultProps = defaultProps;

export default UploadIcon;