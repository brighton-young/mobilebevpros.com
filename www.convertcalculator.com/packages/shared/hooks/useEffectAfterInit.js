import {
    useEffect,
    useRef
} from 'react';

const useEffectAfterInit = (fn, deps) => {
    const isInit = useRef(true);

    useEffect(() => {
        (async () => {
            if (isInit.current) {
                isInit.current = false;
            } else {
                await fn();
            }
        })();
    }, deps);
};

export default useEffectAfterInit;