import styled, { css } from 'styled-components';

// This is the legacy styled input component that must be used where the quickstyle and style theme definitions are not setup

type InputProps = {
  styles: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textAlign?: string;
    textTransform?: string;
    fontStyle?: string;
    placeholderTextColor?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    boxShadow?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    hoverBorderRadius?: string;
    hoverBorderStyle?: string;
    hoverBorderWidth?: string;
    hoverBorderColor?: string;
    hoverBoxShadow?: string;
    focusBackgroundColor?: string;
    focusTextColor?: string;
    focusBorderRadius?: string;
    focusBorderStyle?: string;
    focusBorderWidth?: string;
    focusBorderColor?: string;
    focusBoxShadow?: string;
  };
  showInputIcon?: boolean;
};

const Input = styled.input<InputProps>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  appearance: none;
  resize: none;
  transition-property: all;
  transition-duration: 150ms;

  &:focus {
    outline: none;
  }

  ${({ styles, showInputIcon }) => {
    return css`
      font-family: ${styles.fontFamily};
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      text-align: ${styles.textAlign};

      text-transform: ${styles.textTransform};
      font-style: ${styles.fontStyle};

      &::placeholder {
        color: ${styles.placeholderTextColor};
        opacity: 1;
      }
      &::-webkit-input-placeholder {
        color: ${styles.placeholderTextColor};
      }
      &::-ms-input-placeholder {
        color: ${styles.placeholderTextColor};
      }
      &::-moz-placeholder {
        color: ${styles.placeholderTextColor};
        opacity: 1;
      }

      margin-top: ${styles.marginTop};
      margin-right: ${styles.marginRight};
      margin-bottom: ${styles.marginBottom};
      margin-left: ${styles.marginLeft};

      padding-top: ${styles.paddingTop};
      padding-right: ${styles.paddingRight};
      padding-bottom: ${styles.paddingBottom};
      padding-left: ${styles.paddingLeft};

      // If the input has an icon, add extra padding to the left to make room for it
      ${Boolean(showInputIcon) &&
      `padding-left: ${(parseInt(styles.paddingLeft, 10) ?? 0) + 30}px;`}

      background-color: ${styles.backgroundColor};
      color: ${styles.textColor};

      border-radius: ${styles.borderRadius};
      border-style: ${styles.borderStyle};
      border-width: ${styles.borderWidth};
      border-color: ${styles.borderColor};

      box-shadow: ${styles.boxShadow};

      &:hover {
        background-color: ${styles.hoverBackgroundColor};
        color: ${styles.hoverTextColor};

        border-radius: ${styles.hoverBorderRadius || styles.borderRadius};
        border-style: ${styles.hoverBorderStyle || styles.borderStyle};
        border-width: ${styles.hoverBorderWidth || styles.borderWidth};
        border-color: ${styles.hoverBorderColor || styles.borderColor};

        box-shadow: ${styles.hoverBoxShadow};
      }

      &:focus {
        background-color: ${styles.focusBackgroundColor};
        color: ${styles.focusTextColor};

        border-radius: ${styles.focusBorderRadius || styles.borderRadius};
        border-style: ${styles.focusBorderStyle || styles.borderStyle};
        border-width: ${styles.focusBorderWidth || styles.borderWidth};
        border-color: ${styles.focusBorderColor || styles.borderColor};

        box-shadow: ${styles.focusBoxShadow};
      }
    `;
  }}
`;

export default Input;
