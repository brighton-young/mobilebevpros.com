import React from 'react';

import { render } from 'mustache';
import styled from 'styled-components';

import { borderRadius, colors } from '../../styles';

const StyledList = styled.ul`
  margin-left: 1rem;

  li {
    list-style-type: disc;
  }
`;

const Callout = styled.div`
  background-color: ${colors['gray-100']};
  color: ${colors['gray-600']};
  border-radius: ${borderRadius.default};

  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
`;

const FileUploadErrors = ({ maxFileSize, rejectedFiles, settings }) => {
  const { messages } = settings;

  if (!rejectedFiles.length) return false;

  const tooBigFiles = rejectedFiles.filter((file) => {
    return file.errors.find(({ code }) => {
      return code === 'file-too-large';
    });
  });

  return (
    <div>
      {tooBigFiles.length > 0 && (
        <Callout isVisible>
          {render(
            tooBigFiles.length === 1
              ? messages.fileTooBigSingular
              : messages.fileTooBigPlural,
            { maxFileSize },
          )}
          :
          <StyledList>
            {tooBigFiles.map(({ file }, index) => {
              return <li key={index}>{file.name}</li>;
            })}
          </StyledList>
        </Callout>
      )}
    </div>
  );
};

export default FileUploadErrors;
