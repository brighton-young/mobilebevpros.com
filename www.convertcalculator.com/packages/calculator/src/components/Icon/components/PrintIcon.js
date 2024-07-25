import React from 'react';

import styled from 'styled-components';

const Svg = styled.svg `
  display: block;
`;

const PrintIcon = ({
    size = 24,
    stroke = '#565D64',
    ...restProps
}) => {
    return ( <
        Svg xmlns = "http://www.w3.org/2000/svg"
        width = {
            size
        }
        height = {
            size
        }
        viewBox = "0 0 24 24"
        fill = "none"
        stroke = {
            stroke
        }
        strokeWidth = "2"
        strokeLinecap = "round"
        strokeLinejoin = "round"
        className = "feather feather-printer" { ...restProps
        } >
        <
        polyline points = "6 9 6 2 18 2 18 9" / >
        <
        path d = "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" / >
        <
        rect x = "6"
        y = "14"
        width = "12"
        height = "8" / >
        <
        /Svg>
    );
};

export default PrintIcon;