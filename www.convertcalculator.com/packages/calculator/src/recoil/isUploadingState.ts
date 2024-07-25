import { atom, selector } from 'recoil';

const isUploadingFileState = atom({
  key: 'isUploadingFileState',
  default: {},
});

const isUploadingState = selector({
  key: 'isUploadingState',
  get: ({ get }) => {
    const isUploading = get(isUploadingFileState);

    return Object.values(isUploading).some((value) => {
      return value;
    });
  },
});

export { isUploadingState, isUploadingFileState };
