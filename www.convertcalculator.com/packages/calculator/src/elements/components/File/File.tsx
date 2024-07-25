import { render } from 'mustache';
import { useSetRecoilState } from 'recoil';

import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import FileUploadField from '../../../components/FileUploadField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import showErrorsState from '../../../recoil/showErrorsState';
import getFileErrorMessage from '../../../util/getFileErrorMessage';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type FileProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: FileElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type FileElement = {
  type: 'file';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  file: {
    allowedTypes?: (
      | 'image/*'
      | 'audio/*'
      | 'video/*'
      | '.powerpoint,.keynote'
      | '.xls,.xlsx,.numbers'
      | '.pdf'
      | '.doc,.docx,.pages'
      | '.zip,.rar'
    )[];
    customAllowedFileTypes?: string;
    max?: number;
    min?: number;
    placeholder?: string;
    isPublic?: boolean;
  };
};

const File = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: FileProps) => {
  const { messages } = settings;

  const {
    allowedTypes = [],
    customAllowedFileTypes = '',
    max,
    min,
    placeholder,
  } = question.file;

  const setShowErrors = useSetRecoilState(showErrorsState);

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = (_, value) => {
    if (!value.length) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired
          ? getFileErrorMessage({
              max,
              messages,
              min,
              fileLength: 0,
            })
          : undefined,
        data: {
          files: [],
        },
      });

      return;
    }

    const label = value
      .map((f) => {
        return f.url;
      })
      .join(' + ');

    const newError = getFileErrorMessage({
      max,
      messages,
      min,
      fileLength: value.length,
    });

    onValueChange(question.reference, {
      label,
      value: value.length || 0,
      error: newError,
      data: {
        files: value,
      },
    });

    if (newError) {
      setShowErrors(true);
    } else {
      handleJumpToNextView();
    }
  };

  const handleReject = ({ numberOfFiles, maxFileSize }) => {
    const messageType =
      numberOfFiles === 1
        ? messages.fileTooBigSingular
        : messages.fileTooBigPlural;

    onValueChange(question.reference, {
      label: '',
      value: 0,
      error: render(messageType, { maxFileSize }),
      isInstantError: true,
      data: {
        files: [],
      },
    });
  };

  const value = valueObject.data ? valueObject.data.files : [];

  const accept = `${allowedTypes.join(',')}${customAllowedFileTypes}`;

  const flattenedQuickStyles = {};
  Object.entries(question.quickStyles || {}).forEach(([k, v]: any) => {
    if (v.enabled) {
      flattenedQuickStyles[k] = v.value;
    }
  });

  // this component does not have any styles defined
  return (
    <ElementThemeProvider
      elementStyles={{}}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="questions"
        element={question}
        isError={!!error}
        isHidden={isHidden}
      >
        <ElementTitleWrapper collection="questions" element={question}>
          <ElementClassNameWrapper element={question}>
            <FileUploadField
              label={placeholder}
              name={question._id}
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              onChange={handleChange}
              onClear={handleChange}
              onReject={handleReject}
              value={value}
              accept={accept || undefined}
              settings={settings}
              isPublic={question.file.isPublic}
            />

            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default File;
