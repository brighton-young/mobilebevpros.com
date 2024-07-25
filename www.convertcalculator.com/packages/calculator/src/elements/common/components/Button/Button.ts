import styled from 'styled-components';

import { shadows } from '../../../../styles';

type StyledButtonProps = {
  styles: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    borderRadius: string;
    border: string;
    boxShadow: string;
    lineHeight: string;
    textAlign: string;
    width: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
  };
  disabled?: boolean;
  isEditing?: boolean;
};

const Button = styled.button<StyledButtonProps>`
  ${({ styles }) => {
    return `
    background-color: ${styles.backgroundColor};
    color: ${styles.textColor};

    font-family: ${styles.fontFamily};
    font-size: ${styles.fontSize};
    font-weight: ${styles.fontWeight};

    border-radius: ${styles.borderRadius};

    border: ${styles.border};

    box-shadow: ${styles.boxShadow};
    line-height: ${styles.lineHeight};
    text-align: ${styles.textAlign};

    width: ${styles.width};

    padding-top: ${styles.paddingTop};
    padding-right: ${styles.paddingRight};
    padding-bottom: ${styles.paddingBottom};
    padding-left: ${styles.paddingLeft};

    &:hover {
      background-color: ${styles.hoverBackgroundColor};
      color: ${styles.hoverTextColor};
    }

    box-sizing: border-box;
  `;
  }}

  display: inline-block;
  vertical-align: middle;
  margin: 0rem !important;

  cursor: pointer;
  appearance: none;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;

  &:disabled {
    ${({ isEditing }) => {
      return (
        !isEditing &&
        `
      opacity: 0.5;
    `
      );
    }}
    cursor: not-allowed;
  }

  ${({ disabled, isEditing }) => {
    return (
      disabled &&
      `
      opacity: ${isEditing ? 1 : 0.5};
      cursor: not-allowed;
    `
    );
  }}

  &:focus {
    outline: 0;
    box-shadow: ${shadows.outline};
  }
`;

export default Button;
