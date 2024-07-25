import getRandomId from '@cc/shared/utils/getRandomId';

const getFileFromDataUrl = ({
  dataUrl,
  fileName,
}: {
  dataUrl: string;
  fileName: string;
}): File => {
  const [header, base64] = dataUrl.split(',');
  const [, mime] = header.match(/:(.*?);/) || [];
  const binary = window.atob(base64);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  const extension = String(mime).split('/')?.[1];
  const newFileName = [fileName, '-', getRandomId(), '.', extension].join('');

  return new File([new Uint8Array(array)], newFileName, { type: mime });
};

export default getFileFromDataUrl;
