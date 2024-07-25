import { Placement } from '@popperjs/core/lib/enums';
import styled, { css } from 'styled-components';

import { colors } from '../../styles';
import { getSizeWithUnitCSS } from '../../styles/utils/getSizeWithUnitCSS';
import { getSpacingCSS } from '../../styles/utils/getSpacingCSS';

export const StyledArrow = styled.div<{
  placement?: string;
}>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: inherit;
  visibility: hidden;
  transition: none;

  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: inherit;
    transition: none;

    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  top: ${({ placement }) => {
    return placement.startsWith('bottom') && '-4px';
  }};
  right: ${({ placement }) => {
    return placement.startsWith('left') && '-4px';
  }};
  bottom: ${({ placement }) => {
    return placement.startsWith('top') && '-4px';
  }};
  left: ${({ placement }) => {
    return placement.startsWith('right') && '-4px';
  }};
`;

export const TooltipDiv = styled.div<{
  isVisible?: boolean;
  isBig?: boolean;
  isMobile?: boolean;
  maxWidth?: number;
}>`
  display: block;
  opacity: ${({ isVisible }) => {
    return isVisible ? '0.9' : '0.0';
  }};
  border-radius: 3px;
  position: absolute;
  z-index: 1000;
  transform: none;
  transition: transform 0.32s ease-out, opacity 0.24s ease-out;
  pointer-events: none;
  overflow-wrap: break-word;

  ${({ isBig, isMobile }) => {
    if (isBig && !isMobile) {
      return `
        text-align: left;
        padding: 1rem;
        
      `;
    }

    return `
      text-align: center;
      padding: 0.5rem;
      
    `;
  }}

  ${({ theme }) => {
    return css`
      background-color: ${theme.tooltipBackgroundColor || colors.black};
      color: ${theme.tooltipTextColor || colors.white} !important;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        color: ${theme.tooltipTextColor || colors.white};
      }
      font-weight: ${theme.tooltipFontWeight || 'normal'};
      font-family: ${theme.tooltipFontFamily};
      font-size: ${getSizeWithUnitCSS(theme.tooltipFontSize) || '1rem'};

      a {
        color: ${theme.tooltipTextColor || colors.white} !important;
        text-decoration: underline;
      }

      ${getSpacingCSS(theme.tooltipPadding)}
    `;
  }}
  
  max-width: ${({ maxWidth }) => {
    return `${maxWidth || 320}px`;
  }};
`;

export const TooltipWrapper = styled.span<{
  colorTone?: 'dark' | 'light';
  position?: Placement;
}>`
  display: inline-block;
  position: relative;

  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.75rem;
  font-weight: normal;
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: help;
  vertical-align: middle;
  text-align: center;

  ${({ colorTone, theme }) => {
    if (colorTone === 'dark') {
      return `
        background-color: ${theme.tooltipButtonBackgroundColor || colors.white};
        color: ${theme.tooltipTextColor || colors.darkGray};
      `;
    }

    return `
      background-color: ${
        theme.tooltipButtonBackgroundColor || colors.mediumGray
      };
      color: ${theme.tooltipTextColor || colors.white};
      `;
  }}

  outline: 0 !important;

  &:focus {
    ${TooltipDiv} {
      outline: 0;
    }
  }

  &:hover {
    ${TooltipDiv} {
      visibility: visible;

      ${({ position }) => {
        if (position === 'left' || position === 'right') {
          return `
            transform: translateX(-0.5rem);
          `;
        }

        if (position === 'top') {
          return `
            transform: translate3D(-50%, -0.5rem, 0);
          `;
        }

        if (position === 'top-right' || position === 'top-left') {
          return `
            transform: translate3D(0, -0.5rem, 0);
          `;
        }

        return '';
      }}
    }
  }
`;
