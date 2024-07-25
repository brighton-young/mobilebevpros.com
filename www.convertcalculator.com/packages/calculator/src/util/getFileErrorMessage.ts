import { render } from 'mustache';

type GetFileErrorMessage = (options: {
  max: number;
  messages: {
    fileRequiredSingular: string;
    fileRequiredPlural: string;
    fileTooLowSingular: string;
    fileTooLowPlural: string;
    fileTooHighSingular: string;
    fileTooHighPlural: string;
  };
  min: number;
  fileLength: number;
}) => string | undefined;

const getFileErrorMessage: GetFileErrorMessage = ({
  max,
  messages,
  min,
  fileLength,
}) => {
  if (min === max && min === 1 && fileLength < min)
    return messages.fileRequiredSingular;
  if (min === max && min > 1 && fileLength < min) {
    return render(messages.fileRequiredPlural, { numberOfFiles: min });
  }

  if (min === 1 && fileLength < min) return messages.fileTooLowSingular;
  if (min > 1 && fileLength < min) {
    return render(messages.fileTooLowPlural, { numberOfFiles: min });
  }

  if (max === 1 && fileLength > max) return messages.fileTooHighSingular;
  if (max > 1 && fileLength > max) {
    return render(messages.fileTooHighPlural, { numberOfFiles: max });
  }

  return undefined;
};
export default getFileErrorMessage;
