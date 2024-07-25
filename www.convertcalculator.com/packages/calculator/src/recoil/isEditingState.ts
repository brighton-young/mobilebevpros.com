import { atom } from 'recoil';

const isEditingState = atom({
  key: 'isEditing',
  default: false,
});

export default isEditingState;
