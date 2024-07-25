import renamedImages from './renamedImages';

// This helper is used before migration of imageUrls in Files Collection has occurred

const getRenamedPath = (path: string) => {
  const extension = path.split('.').pop();
  const newPath = `${path.split('-').slice(0, 2).join('-')}.${extension}`;

  if (renamedImages.has(newPath)) {
    return newPath;
  }

  return path;
};

const convertImageUrl = (imageUrl: string = '') => {
  if (!imageUrl || typeof imageUrl !== 'string') return undefined;

  if (!imageUrl.includes('amazonaws.com')) return imageUrl;

  const path = imageUrl.split('/').pop();
  const newPath = getRenamedPath(path).trimEnd();

  const newImageUrl = `https://imagedelivery.net/RxM-_yk1wsGjVidUVgzK1A/${newPath}/public`;

  return newImageUrl;
};

export default convertImageUrl;
