import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg `
  display: block;
`;

const propTypes = {
    fill: PropTypes.string,
};

const defaultProps = {
    fill: '#565D64',
};

const PlusIcon = (props) => {
    const {
        fill,
        className
    } = props;

    return ( <
        Svg width = "22px"
        height = "22px"
        viewBox = "405 123 21 21"
        version = "1.1"
        xmlns = "http://www.w3.org/2000/svg"
        className = {
            className
        } >
        <
        g id = "plus"
        stroke = "none"
        strokeWidth = "1"
        fill = "none"
        fillRule = "evenodd"
        transform = "translate(405.000000, 123.000000)" >
        <
        g id = "Group" >
        <
        g id = "_x36_4px_boxes" >
        <
        rect id = "Rectangle-path"
        x = "0"
        y = "0"
        width = "21"
        height = "21" / >
        <
        /g> <
        g id = "Production"
        transform = "translate(1.625000, 1.625000)"
        fillRule = "nonzero"
        fill = {
            fill
        } >
        <
        polygon id = "Shape"
        points = "14.453125 8.21875 9.203125 8.21875 9.203125 2.96875 8.21875 2.96875 8.21875 8.21875 2.96875 8.21875 2.96875 9.203125 8.21875 9.203125 8.21875 14.453125 9.203125 14.453125 9.203125 9.203125 14.453125 9.203125" /
        >
        <
        path d = "M8.859375,17.5546875 C4.05708651,17.5546875 0.1640625,13.6616635 0.1640625,8.859375 C0.1640625,4.05708651 4.05708651,0.1640625 8.859375,0.1640625 C13.6616635,0.1640625 17.5546875,4.05708651 17.5546875,8.859375 C17.5546875,13.6616635 13.6616635,17.5546875 8.859375,17.5546875 Z M8.859375,16.5703125 C13.1180082,16.5703125 16.5703125,13.1180082 16.5703125,8.859375 C16.5703125,4.60074181 13.1180082,1.1484375 8.859375,1.1484375 C4.60074181,1.1484375 1.1484375,4.60074181 1.1484375,8.859375 C1.1484375,13.1180082 4.60074181,16.5703125 8.859375,16.5703125 Z"
        id = "Oval" /
        >
        <
        /g> <
        /g> <
        /g> <
        /Svg>
    );
};

PlusIcon.propTypes = propTypes;
PlusIcon.defaultProps = defaultProps;

export default PlusIcon;