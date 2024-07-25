import RegExLib from '@cc/shared/lib/regEx';

import { validatePhone } from '../elements/components/Phone/utils';

// TODO: the default fallback should be defined in a generic place
const DEFAULT_INVALID_MESSAGE = "Hmm… that phone number doesn't look valid";

type Props = {
  isRequired?: boolean;
  messages: any;
  value: string;
  includeCountryCode?: boolean;
  validatePhoneNumber?: boolean;
};
const getPhoneErrorMessage = ({
  isRequired,
  messages,
  value,
  includeCountryCode,
  validatePhoneNumber,
}: Props) => {
  if (isRequired && !value) return messages.answerRequired;
  // If no value is set, we don't have to validate the email and return no error
  if (!value) return undefined;

  if (validatePhoneNumber) {
    if (includeCountryCode) {
      // validate the phone number using validate function from https://github.com/goveo/react-international-phone
      // this validation is better than the regex but requires a country code
      // TODO: use a better validation function using https://github.com/google/libphonenumber

      if (!validatePhone(value).isValid)
        return messages.phoneNotValid || DEFAULT_INVALID_MESSAGE;
    } else {
      // TODO: improve this regex
      const regEx = new RegExp(RegExLib.Phone);
      const isValidPhone = regEx.test(value);
      if (!isValidPhone)
        return messages.phoneNotValid || DEFAULT_INVALID_MESSAGE;
    }
  }

  return undefined;
};

export default getPhoneErrorMessage;
