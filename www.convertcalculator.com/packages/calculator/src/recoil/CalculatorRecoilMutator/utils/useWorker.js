import {
    useCallback,
    useEffect,
    useState
} from 'react';

import {
    useRecoilValue
} from 'recoil';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getRandomSecret from '@cc/shared/utils/getRandomSecret';

import {
    getScriptsUrl
} from '../../../helpers';
import createWorker from '../../../util/createWorker';
import workerUrlState from '../../workerUrlState';

// TODO: remove this hook once useFormulasMutation is removed
const useWorker = ({
    name,
    payload,
    onReceiveMessage
}) => {
    const [result, setResult] = useState(undefined);

    const [worker, setWorker] = useState(undefined);

    const workerUrl =
        useRecoilValue(workerUrlState) ? ?
        `${getScriptsUrl({ slug: '/worker.js' })}?hash=${getRandomSecret()}`;

    useEffect(() => {
        (async () => {
            const newWorker = await createWorker(workerUrl);

            setWorker(newWorker);
        })();
    }, []);

    const handleReceiveMessage = useCallback((ev) => {
        const {
            name: messageName,
            result: messageResult
        } = ev.data;

        if (name === messageName) {
            setResult(messageResult);

            if (typeof onReceiveMessage === 'function')
                onReceiveMessage(messageResult);
        }
    }, []);

    useEffectDeepCompare(() => {
        if (!worker) return undefined;

        worker.postMessage({
            name,
            payload,
        });

        worker.addEventListener('message', handleReceiveMessage);

        return () => {
            return worker.removeEventListener('message', handleReceiveMessage);
        };
    }, [payload, worker]);

    return result;
};

export default useWorker;