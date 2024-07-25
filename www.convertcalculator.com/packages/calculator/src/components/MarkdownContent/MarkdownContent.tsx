import React from 'react';

import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';

import { colors } from '../../styles';

const OPTIONS = {
  forceBlock: true,
};

const ErrorMessage = styled.div`
  color: ${colors.alertColor};
`;

const MarkdownWrapper = styled.div`
  *:last-child {
    margin-bottom: 0;
  }
`;

type MarkdownContentProps = {
  children: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MarkdownContent: React.FC<MarkdownContentProps> = (props) => {
  const { children } = props;

  try {
    return (
      <MarkdownWrapper>
        <Markdown options={OPTIONS}>{children}</Markdown>
      </MarkdownWrapper>
    );
  } catch (err) {
    return <ErrorMessage>!! MARKDOWN ERROR</ErrorMessage>;
  }
};

export default MarkdownContent;
