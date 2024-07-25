import React from 'react';

import styled from 'styled-components';

const Svg = styled.svg `
  display: block;
`;

const ChevronRightIcon = ({
    size = 22,
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
        stroke = "currentColor"
        stroke - width = "2"
        stroke - linecap = "round"
        stroke - linejoin = "round" { ...restProps
        } >
        <
        polyline points = "9 18 15 12 9 6" / >
        <
        /Svg>
    );
};

export default ChevronRightIcon;