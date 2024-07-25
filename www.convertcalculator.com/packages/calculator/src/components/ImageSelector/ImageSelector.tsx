import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import useElementOnScreen from '@cc/shared/hooks/useElementOnScreen';
import convertImageUrl from '@cc/shared/utils/convertImageUrl';

import { useCanvasSize, useSelectedView } from '../../CalculatorState';
import { getSiteUrl } from '../../helpers';
import { borderRadius, colors } from '../../styles';
import useResize from '../../util/useResize';
import Icon from '../Icon';

const IconWrapper = styled.div`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  display: inline-block;
  border-radius: 50%;
  padding: 0.115rem;

  background: var(--theme-primary-color);
  color: ${colors.white};
  border: 1px solid ${colors.white};
`;

type StyledRadioOptionProps = {
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  width: string;
};

const StyledRadioOption = styled.div<StyledRadioOptionProps>`
  padding: 0 0.25rem;
  text-align: center;
  ${(props) => {
    if (typeof props.onClick === 'function') {
      return 'cursor: pointer';
    }

    return undefined;
  }};

  width: ${(props) => {
    return props.width;
  }};
`;

type StyledBackgroundImageProps = {
  checked: boolean;
  height: string;
  imageUrl: string;
};

const StyledBackgroundImage = styled.div<StyledBackgroundImageProps>`
  position: relative;

  border: 1px solid
    ${({ checked }) => {
      return checked ? 'var(--theme-primary-color)' : 'transparent';
    }};

  border-radius: ${borderRadius.default};

  background-image: url('${(props) => {
    return props.imageUrl;
  }}');

  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${(props) => {
    return props.height;
  }};

  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 0.5rem 0rem;
  overflow: hidden;
`;

type ImageSelectorProps = {
  className?: string;
  checked?: boolean;
  imagesPerRow?: number;
  imagesPerRowMobile?: number;
  imageUrl?: string;
  isHidden?: boolean;
  label: string;
  radio;
  name: string;
  onChange?: (name: string, value: any) => void;
  value: any;
};

const ImageSelector: React.FC<ImageSelectorProps> = (props) => {
  const {
    className,
    checked = false,
    imagesPerRow = 4,
    imagesPerRowMobile = 2,
    imageUrl: imageUrlFromProps,
    isHidden = false,
    label,
    name,
    onChange,
    value,
  } = props;

  const selectedViewIndex = useSelectedView();

  const imageUrl =
    convertImageUrl(imageUrlFromProps) ||
    getSiteUrl({ slug: '/img/image-placeholder.svg' });

  const [wrapperComponent, isOnScreen] = useElementOnScreen();
  const [width, setWidth] = useState(0);

  const handleSetWidth = () => {
    if (!wrapperComponent.current) return;

    window.requestAnimationFrame(() => {
      setWidth(wrapperComponent.current?.offsetWidth || 0);
    });
  };

  useEffect(() => {
    handleSetWidth();
  }, [selectedViewIndex, isHidden, isOnScreen]);

  useResize(handleSetWidth);

  const { isMobile } = useCanvasSize();

  const newImagesPerRow = isMobile ? imagesPerRowMobile : imagesPerRow;

  return (
    <StyledRadioOption
      ref={wrapperComponent}
      width={`${(1 / newImagesPerRow) * 100}%`}
      onClick={(ev) => {
        if (typeof onChange !== 'function') return;
        ev.stopPropagation();

        onChange(name, value);
      }}
      className={className}
    >
      <StyledBackgroundImage
        checked={checked}
        height={`${width}px`}
        imageUrl={imageUrl}
        className={`${className}-image`}
      >
        {checked && (
          <IconWrapper>
            <Icon
              name="check"
              width="12px"
              height="12px"
              stroke="currentColor"
            />
          </IconWrapper>
        )}
      </StyledBackgroundImage>

      <StyledLabel className={`${className}-label`}>{label}</StyledLabel>
    </StyledRadioOption>
  );
};

export default ImageSelector;
