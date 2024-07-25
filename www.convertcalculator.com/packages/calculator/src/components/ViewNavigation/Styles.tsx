import transparentize from 'polished/lib/color/transparentize';
import styled, { css } from 'styled-components';

import { colors } from '../../styles';

type ArrowButtonProps = {
  disabled?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  styles: {
    backgroundColor: string;
    disabledBackgroundColor: string;
    textColor: string;
    disabledTextColor: string;
  };
};

export const ArrowButton = styled.button<ArrowButtonProps>`
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  background: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  user-select: none;

  ${({ disabled, isLeft, isRight, styles }) => {
    return css`
      background-color: ${styles.backgroundColor};

      &:hover:not([disabled]) {
        background-color: ${styles.disabledBackgroundColor};
      }

      ${isLeft &&
      `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 1px solid ${transparentize(0.6, colors.white)};
      `}

      ${isRight &&
      `
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    `}

    color: ${disabled ? styles.disabledTextColor : styles.textColor};
    `;
  }}
`;

export const Container = styled.div`
  text-align: center;
`;

export const DotsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

type DotsLinkProps = {
  isActive: boolean;
  isNumbered?: boolean;
  styles: {
    backgroundColor: string;
    textColor: string;
  };
};

export const DotsLink = styled.li<DotsLinkProps>`
  ${({ isActive, styles }) => {
    return `
    background-color: ${isActive ? styles.backgroundColor : colors.lightGray};

    &:hover:not([disabled]) {
      background-color: ${styles.backgroundColor};
    }

    color: ${isActive ? styles.textColor : colors.mediumGray};
  `;
  }}

  display: inline-block;
  cursor: pointer;

  border-radius: 50%;

  text-align: center;

  ${({ isNumbered }) => {
    if (isNumbered) {
      return `
        width: 1.75rem;
        height: 1.75rem;
        line-height: 1.75rem;
        margin-right: 1rem;
      `;
    }

    return `
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.6rem;
      `;
  }}

  &:last-child {
    margin-right: 0;
  }
`;
