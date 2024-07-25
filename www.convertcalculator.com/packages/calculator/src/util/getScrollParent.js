import getFramedWindow from './getFramedWindow';

const getParentsRecursively = (node, ps) => {
    if (node.parentNode === null) {
        return ps;
    }

    return getParentsRecursively(node.parentNode, ps.concat([node]));
};

const isScrollable = (node) => {
    if (node.tagName === 'HTML') return false;

    const overflowProp = getComputedStyle(node, null).getPropertyValue(
        'overflow',
    );
    const hasOverflow = overflowProp === 'auto' || overflowProp === 'scroll';
    const overflowYProp = getComputedStyle(node, null).getPropertyValue(
        'overflow-y',
    );
    const hasOverflowY = overflowYProp === 'auto' || overflowYProp === 'scroll';

    return hasOverflow || hasOverflowY || false;
};

const getScrollParent = (node) => {
    if (!node || !node.parentNode) return false;

    const parents = getParentsRecursively(node.parentNode, []);

    const scrollParent =
        parents.find((parent) => {
            return isScrollable(parent);
        }) || window;

    // If calculator is embedded in a frame, return the framed window
    const framedWindow = getFramedWindow();

    if (scrollParent === window || scrollParent.tagName === 'BODY')
        return framedWindow;

    return scrollParent;
};

export default getScrollParent;