import React from 'react';

import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

const TitleWithTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type StyledTitleProps = {
  styles: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textColor?: string;
    textAlign?: string;
    textTransform?: string;
    fontStyle?: string;
  };
};

const StyledTitle = styled.h3<StyledTitleProps>`
  padding: 0 !important;
  margin: 0 !important;

  ${({ styles }) => {
    return css`
      font-family: ${styles.fontFamily};
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      color: ${styles.textColor};
      text-align: ${styles.textAlign};
      text-transform: ${styles.textTransform};
      font-style: ${styles.fontStyle};
    `;
  }}
`;

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  tooltip?: React.ReactNode;
  styles?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textColor?: string;
    textAlign?: string;
    textTransform?: string;
    fontStyle?: string;
  };
};

const Title: React.FC<TitleProps> = ({
  children,
  className = '',
  component = 'h3',
  tooltip = false,
  styles = {},
}) => {
  if (!children) return false;

  if (tooltip) {
    return (
      <TitleWithTooltipWrapper>
        <StyledTitle as={component} className={className} styles={styles}>
          {children}
        </StyledTitle>
        {tooltip && <Tooltip position="bottom-end">{tooltip}</Tooltip>}
      </TitleWithTooltipWrapper>
    );
  }

  return (
    <StyledTitle as={component} className={className} styles={styles}>
      {children}
    </StyledTitle>
  );
};

export default Title;
