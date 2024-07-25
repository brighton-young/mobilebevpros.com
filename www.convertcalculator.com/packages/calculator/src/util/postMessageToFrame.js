const getParentWindows = (existingWindows = [window]) => {
    const lastWindow = existingWindows[existingWindows.length - 1];

    if (lastWindow === lastWindow.parent) return existingWindows;

    return getParentWindows([...existingWindows, lastWindow.parent]);
};

const postMessageToFrame = ({
    calculatorId,
    type,
    payload
}) => {
    const windows = getParentWindows();

    windows.forEach((w) => {
        w.postMessage({
                calculatorId,
                type,
                payload,
            },
            '*',
        );
    });
};

export default postMessageToFrame;