type GetEmailErrorMessage = (options: {
  isRequired: boolean;
  messages: {
    answerRequired: string;
    emailNotValid: string;
  };
  email: string;
}) => string | undefined;

const getEmailErrorMessage: GetEmailErrorMessage = ({
  isRequired,
  messages,
  email,
}) => {
  if (isRequired && !email) return messages.answerRequired;
  // If no value is set, we don't have to validate the email and return no error
  if (!email) return undefined;

  // eslint-disable-next-line prefer-regex-literals
  const regEx = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  );
  const isValidEmail = regEx.test(email);

  if (!isValidEmail) return messages.emailNotValid;

  return undefined;
};

export default getEmailErrorMessage;
