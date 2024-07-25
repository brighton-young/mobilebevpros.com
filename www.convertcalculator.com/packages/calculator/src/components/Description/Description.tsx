import React from 'react';

import MarkdownContent from '../MarkdownContent';

type DescriptionProps = {
  children: string;
  className?: string;
};

const Description: React.FC<DescriptionProps> = ({ children, className }) => {
  if (!children) return false;

  return (
    <div className={className}>
      <MarkdownContent>{children}</MarkdownContent>
    </div>
  );
};

export default Description;
