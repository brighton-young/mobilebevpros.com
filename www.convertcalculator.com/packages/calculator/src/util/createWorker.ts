const createWorker = async (workerUrl: string): Promise<Worker | undefined> => {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) return undefined;

  const blob = await fetch(workerUrl).then((r) => {
    return r.blob();
  });

  const url = window.URL || window.webkitURL;
  const blobUrl = url.createObjectURL(blob);

  const worker = new Worker(blobUrl, { type: 'module' });

  return worker;
};

export default createWorker;
