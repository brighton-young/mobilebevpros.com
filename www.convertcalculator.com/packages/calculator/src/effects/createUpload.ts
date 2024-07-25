import fetchJson from '@cc/shared/utils/fetchJson';
import getWebsiteUrl from '@cc/shared/utils/getWebsiteUrl';

const createUpload = async ({
  calculatorId,
  isProduction,
  size,
  url,
  name,
}: {
  calculatorId: string;
  isProduction: boolean;
  size: number;
  url: string;
  name: string;
}) => {
  return fetchJson({
    url: getWebsiteUrl({ slug: '/api/embed/create-upload/' }),
    method: 'POST',
    data: {
      calculatorId,
      isProduction,
      size,
      url,
      name,
    },
  }) as {
    uploadId: string;
    status: 'success' | 'error';
  };
};

export default createUpload;
