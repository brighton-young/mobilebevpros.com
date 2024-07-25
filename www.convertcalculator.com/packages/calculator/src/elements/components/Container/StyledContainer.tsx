import styled, { css } from 'styled-components';

import convertImageUrl from '@cc/shared/utils/convertImageUrl';

import { StyledElementWrapper } from '../../../components/StyledElementWrapper';
import { colors, getReadableColor } from '../../../styles';
import { getBoxShadowCSS } from '../../../styles/utils/getBoxShadowCSS';
import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

const getTextColor = ({
  containerBackgroundColor,
  containerTextColor,
}: {
  containerBackgroundColor?: string;
  containerTextColor?: string;
}) => {
  if (!containerBackgroundColor && !containerTextColor) return undefined;

  if (containerTextColor) return containerTextColor;

  return getReadableColor({ color: containerBackgroundColor });
};

interface Props {
  isEditing?: boolean;
  hasChildren?: boolean;
  isMobile?: boolean;
}

export const StyledContainer = styled(StyledElementWrapper)<Props>`
  ${(props) => {
    const textColor = getTextColor(props.theme);

    if (!textColor) return '';

    return css`
      color: ${textColor};
      --color: ${textColor};

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      label {
        color: var(--color) !important;
      }
    `;
  }}

  background-color: ${(props) => {
    return props.theme.containerBackgroundColor;
  }};

  background-image: ${(props) => {
    const { containerBackgroundImage, containerShowBackgroundImage } =
      props.theme;
    return containerShowBackgroundImage && containerBackgroundImage
      ? `url("${convertImageUrl(containerBackgroundImage)}")`
      : 'none';
  }};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  min-height: ${({ isEditing, hasChildren }) => {
    return isEditing && !hasChildren ? '5rem' : undefined;
  }};

  border: ${({ isEditing, hasChildren }) => {
    return isEditing && !hasChildren
      ? `1px dashed ${colors.darkGray}`
      : undefined;
  }};

  display: ${(props) => {
    return props.theme.containerDisplay;
  }};

  ${(props) => {
    const {
      containerAlignItems: alignItems,
      containerJustifyContent: justifyContent,
      containerFlexWrap: flexWrap,
      containerDisplay: display,
      containerFlexDirection: flexDirection,
      containerGap: gap,
    } = props.theme;

    const { isMobile } = props;

    return (
      display === 'flex' &&
      css`
        flex-direction: ${flexDirection || 'row'};
        align-items: ${alignItems || 'flex-start'};
        justify-content: ${justifyContent || 'flex-start'};
        flex-wrap: ${flexWrap || 'wrap'};

        --gap: ${gap ? `${gap.size}${gap.unit}` : undefined};
        gap: ${gap ? `${gap.size}${gap.unit}` : undefined};

        /* For SSR we need to also use the classname to refer to the child component */
        ${StyledContainer}, .cc__container-element-wrapper {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: ${() => {
            return isMobile && '100%';
          }};
          width: auto;
          margin-left: 0px;
          margin-right: 0px;
        }
      `
    );
  }}

  ${(props) => {
    const { containerWidth } = props.theme;

    if (containerWidth) {
      return css`
        width: ${containerWidth.size}${containerWidth.unit};
      `;
    }

    return 'width: 100%';
  }};

  ${(props) => {
    const { containerMaxWidth } = props.theme;

    if (containerMaxWidth) {
      return css`
        max-width: ${containerMaxWidth.size}${containerMaxWidth.unit};
        flex-basis: calc(
          ${containerMaxWidth.size}${containerMaxWidth.unit} - var(--gap, 0rem)
        ) !important;
      `;
    }

    return '';
  }};

  min-height: ${(props) => {
    const { containerMinHeight } = props.theme;

    return containerMinHeight
      ? `${containerMinHeight.size}${containerMinHeight.unit}`
      : undefined;
  }};

  height: ${(props) => {
    const { containerHeight } = props.theme;

    return containerHeight
      ? `${containerHeight.size}${containerHeight.unit}`
      : undefined;
  }};

  margin-left: ${(props) => {
    const { containerDisplay, containerMaxWidth } = props.theme;

    return containerDisplay === 'block' && !!containerMaxWidth && 'auto';
  }};

  margin-right: ${(props) => {
    const { containerDisplay, containerMaxWidth } = props.theme;

    return containerDisplay === 'block' && !!containerMaxWidth && 'auto';
  }};

  border-radius: ${(props) => {
    const { containerBorderRadius } = props.theme;

    return (
      containerBorderRadius &&
      `${containerBorderRadius.size}${containerBorderRadius.unit}`
    );
  }};

  border-color: ${(props) => {
    const { containerBorder } = props.theme;

    return containerBorder?.color && containerBorder.color;
  }};

  border-style: ${(props) => {
    const { containerBorder } = props.theme;

    return containerBorder?.style && containerBorder.style;
  }};

  border-width: ${(props) => {
    const { containerBorder } = props.theme;

    return (
      containerBorder?.width &&
      `${containerBorder.width.size}${containerBorder.width.unit}`
    );
  }};

  ${(props) => {
    const { containerShadow } = props.theme;

    if (containerShadow) {
      return css`
        ${getBoxShadowCSS(containerShadow)};
      `;
    }

    return '';
  }};

  ${({ theme }) => {
    return css`
      ${theme.containerFlexGrow !== undefined
        ? css`
            flex-grow: ${theme.containerFlexGrow} !important;
          `
        : ''}
      ${theme.containerFlexShrink !== undefined
        ? css`
            flex-shrink: ${theme.containerFlexShrink} !important;
          `
        : ''}
      ${theme.containerFlexBasis !== undefined
        ? css`
            flex-basis: ${getSizeWithUnitCSS(
              theme.containerFlexBasis,
            )} !important;
          `
        : ''}
    `;
  }})
`;
