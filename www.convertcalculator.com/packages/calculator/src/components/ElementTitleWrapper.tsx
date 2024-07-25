import React from 'react';

import styled from 'styled-components';

import getHeadingStyleVariables, {
  getHeadingTypePrefix,
} from '../styles/styleVariables/headingStyleVariables';
import getLabelStyleVariables from '../styles/styleVariables/labelStyleVariables';
import { getTextStyleVariables } from '../styles/styleVariables/textStyleVariables';
import useStyles, { mergeStyles } from '../styles/useStyles';

import Description from './Description';
import Title from './Title';

type HeaderProps = {
  labelStyles: {
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    textColor?: string;
  };
};

const Header = styled.div<HeaderProps>`
  margin-bottom: 0.25rem;

  ${({ labelStyles }) => {
    return `
    label {
      font-weight: ${labelStyles.fontWeight};
      font-size: ${labelStyles.fontSize};
      line-height: ${labelStyles.lineHeight};
      color: ${labelStyles.textColor};
    }
  `;
  }}
`;

type ElementWrapperProps = {
  children: React.ReactNode;
  collection: string;
  element: {
    titleIsVisible: boolean;
    title: string;
    titleHasTooltip: boolean;
    titleTooltipText: string;
    titleFontType: string;
    isRequired: boolean;
    description: string;
  };
};

const ElementWrapper: React.FC<ElementWrapperProps> = ({
  children,
  collection,
  element,
}) => {
  const collectionSingular = collection.slice(0, -1);

  const labelStyles = useStyles({
    prefix: 'label',
    getVariables: getLabelStyleVariables,
  });

  const headingStyles = useStyles({
    prefix: 'heading',
    getVariables: getHeadingStyleVariables,
  });

  const titleType = getHeadingTypePrefix(element.titleFontType);
  const titleTypeStyles = useStyles({
    prefix: titleType,
    getVariables:
      titleType === 'p' || titleType === 'label'
        ? getTextStyleVariables
        : getHeadingStyleVariables,
  });

  const titleStyles = mergeStyles(headingStyles, titleTypeStyles);

  const hasTitle = element.titleIsVisible && !!element.title;
  const hasDescription = !!element.description;

  if (!hasTitle && !hasDescription) return children;

  return (
    <>
      <Header labelStyles={labelStyles}>
        {hasTitle && (
          <Title
            component={element.titleFontType}
            className={`cc__element-title cc__${collectionSingular}-title`}
            tooltip={element.titleHasTooltip && element.titleTooltipText}
            styles={titleStyles}
          >
            {element.isRequired ? `${element.title}*` : element.title}
          </Title>
        )}
        {element.description && (
          <Description
            className={`cc__element-description cc__${collectionSingular}-description`}
          >
            {element.description}
          </Description>
        )}
      </Header>

      {children}
    </>
  );
};

export default ElementWrapper;
