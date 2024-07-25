import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

const getUploadUrl = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  return fetchJson({
    url: getWebsiteUrl({
      slug: '/api/get-upload-url/',
    }),
    method: 'POST',
    data: {
      fileName,
      fileType,
      bucket: 'uploads',
    },
  });
};

export default getUploadUrl;
