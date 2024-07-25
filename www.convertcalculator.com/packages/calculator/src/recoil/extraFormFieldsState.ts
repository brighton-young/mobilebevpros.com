import { atom } from 'recoil';

const extraFormFields = atom({
  key: 'extraFormFields',
  default: [],
});

export default extraFormFields;
