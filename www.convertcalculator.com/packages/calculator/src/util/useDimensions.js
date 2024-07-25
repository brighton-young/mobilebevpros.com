import {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    useCanvasWidth
} from '../CalculatorState';

const getSize = (width) => {
    if (width < 577) return 'small';
    if (width < 769) return 'medium';
    if (width < 993) return 'large';

    return 'extraLarge';
};

const getWidth = (element) => {
    return element ? element.offsetWidth : 0;
};
const getHeight = (element) => {
    return element ? element.offsetHeight : 0;
};

const useDimensions = (dependencyArray = []) => {
    const ref = useRef(null);
    const [height, setHeight] = useState(getHeight(ref.current));
    const [width, setWidth] = useState(getWidth(ref.current));

    const handleSetSize = () => {
        setHeight(getHeight(ref.current));
        setWidth(getWidth(ref.current));
    };

    const canvasWidth = useCanvasWidth();

    useEffect(handleSetSize, [canvasWidth, ref.current, ...dependencyArray]);

    const size = getSize(width);

    return [
        ref,
        {
            height,
            width,
            size,
            isSmall: size === 'small',
            isMedium: size === 'medium',
            isLarge: size === 'large',
        },
    ];
};

export default useDimensions;