import random from 'lodash/random';

import createWorker from './createWorker';

const getWorkerMessage = async ({
    name,
    payload,
    workerUrl
}) => {
    const messageId = random(1000);
    const worker = await createWorker(workerUrl);

    worker.postMessage({
        name,
        messageId,
        payload,
    });

    return new Promise((resolve, reject) => {
        worker.onmessage = (ev) => {
            const {
                messageId: receivedMessageId,
                result
            } = ev.data;

            if (messageId === receivedMessageId) {
                resolve(result);
            }
        };

        worker.onerror = (ev) => {
            const {
                messageId: receivedMessageId,
                result
            } = ev.data;
            if (messageId === receivedMessageId) {
                reject(result);
            }
        };
    });
};

export default getWorkerMessage;