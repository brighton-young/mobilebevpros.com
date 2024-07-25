import React, { useCallback, useEffect, useReducer, useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useDropzone } from 'react-dropzone';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import type { Feature } from '@cc/shared/lib/features';
import getRandomId from '@cc/shared/utils/getRandomId';
import type { Plan } from '@cc/types';

import useCreateUpload from '../../effects/useCreateUpload';
import useGetUploadUrl from '../../effects/useGetUploadUrl';
import useRemoveUpload from '../../effects/useRemoveUpload';
import { isUploadingFileState } from '../../recoil/isUploadingState';
import profileState from '../../recoil/profileState';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Spinner from '../Spinner';

import FileUploadErrors from './FileUploadErrors';
import { filesReducer, getFileName, uploadFile } from './helpers';
import StyledDropzone from './StyledDropZone';
import StyledFile from './StyledFile';
import StyledFileName from './StyledFileName';
import StyledFiles from './StyledFiles';
import StyledIconWrapper from './StyledIconWrapper';

const FileUploadField = ({
  accept,
  label = 'Drop files here...',
  name,
  onChange,
  value = [],
  settings,
  isPublic,
}) => {
  const [files, dispatchFiles] = useReducer(filesReducer, value);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const setIsUploadingFile = useSetRecoilState(isUploadingFileState);

  const createUpload = useCreateUpload();
  const removeUpload = useRemoveUpload();
  const getUploadUrl = useGetUploadUrl();

  const profile = useRecoilValue(profileState);

  // empty field when files are removed from parent
  useEffect(() => {
    if (isEmpty(value) && !isEmpty(files)) {
      dispatchFiles({ type: 'clear' });
    }
  }, [value]);

  // update value after uploading
  useEffect(() => {
    const uploadedFiles = files.filter((file) => {
      return file.isUploaded;
    });

    const filesArray = uploadedFiles.map((file) => {
      return {
        uploadId: file._id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url,
      };
    });

    if (!isEqual(filesArray, value)) {
      onChange(name, filesArray);
    }
  }, [files]);

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      setIsUploadingFile({ [name]: true });

      const acceptedFilesToSet = acceptedFiles.map((file) => {
        return Object.assign(file, {
          key: getRandomId(),
          preview: URL.createObjectURL(file),
          isUploading: true,
          isUploaded: false,
        });
      });

      dispatchFiles({ type: 'add', values: acceptedFilesToSet });

      const handleUploadFile = async (file) => {
        try {
          const fileName = getFileName(file.name);
          const fileType = file.type;

          const uploadUrlRes = await getUploadUrl({ fileName, fileType });
          const data = await uploadFile({ file, uploadUrlRes });

          const { uploadId } = await createUpload({
            size: data.size,
            isPublic,
            url: data.url,
            name: data.name,
          });

          dispatchFiles({
            type: 'update',
            values: {
              ...data,
              _id: uploadId,
              isUploading: false,
              isUploaded: true,
              error: undefined,
            },
          });
        } catch (error) {
          onDeleteFile(file);
        }
      };

      await Promise.all(acceptedFilesToSet.map(handleUploadFile));
      setIsUploadingFile({ [name]: false });
    },
    [files],
  );

  const maxSize = getMaxSize(profile.plan, profile.extraFeatures);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: () => {
      setRejectedFiles([]);
    },
    onDropRejected: setRejectedFiles,
    onDropAccepted: handleDrop,
    accept,
    maxSize: maxSize * 1000000,
  });

  const onDeleteFile = async (file) => {
    if (file._id) {
      try {
        await removeUpload({ uploadId: file._id });
      } catch (error) {
        // no-op
      }
    }

    dispatchFiles({ type: 'delete', values: file });
  };

  return (
    <>
      <StyledFiles>
        <div>
          {files &&
            files.length > 0 &&
            files.map((file) => {
              return (
                <StyledFile key={file.key}>
                  <StyledFileName className="FileUpload__file-name">
                    {file.name}
                  </StyledFileName>

                  {file.isUploading && (
                    <Spinner style={{ width: '24px', height: '24px' }} />
                  )}

                  {file.isUploaded && (
                    <IconButton
                      onClick={() => {
                        return onDeleteFile(file);
                      }}
                    >
                      <Icon name="x" width="24px" height="24px" />
                    </IconButton>
                  )}
                </StyledFile>
              );
            })}
        </div>

        <StyledDropzone
          {...getRootProps()}
          className="FileUpload__dropzone"
          activeClassName="active"
          rejectClassName="reject"
        >
          <input {...getInputProps()} />
          <StyledIconWrapper>
            <Icon
              name="upload"
              width="16px"
              height="16px"
              style={{ display: 'inline-block' }}
              stroke="currentColor"
            />
          </StyledIconWrapper>{' '}
          {label}
        </StyledDropzone>
      </StyledFiles>
      <FileUploadErrors
        rejectedFiles={rejectedFiles}
        maxFileSize={maxSize}
        settings={settings}
      />
    </>
  );
};

const getMaxSize = (plan: Plan, extraFeatures?: Feature[]) => {
  if (extraFeatures?.includes('largeFileUploads')) {
    return 100;
  }

  if (plan === 'premium') return 10;
  if (plan === 'platinum') return 100;

  return 1;
};

export default FileUploadField;
