import styled from 'styled-components';

import convertImageUrl from '@cc/shared/utils/convertImageUrl';

import { useOutput } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import { getSiteUrl } from '../../../helpers';
import { colors } from '../../../styles';

const Fallback = styled.div`
  width: 100%;
  height: 12rem;
  background-color: ${colors.lightGray};

  img {
    display: block;
    margin: 0 auto;
    max-width: 4rem;
    padding-top: 4rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: start;

  justify-content: ${(props) => {
    if (props.alignment === 'left') return 'flex-start';
    if (props.alignment === 'center') return 'center';
    if (props.alignment === 'right') return 'flex-end';

    return 'flex-start';
  }};

  margin-top: ${(props) => {
    return `${props.margins || 0}rem`;
  }};

  margin-bottom: ${(props) => {
    return `${props.margins || 0}rem`;
  }};
`;

const StyledImage = styled.img`
  width: ${(props) => {
    return `${props.width || 100}%`;
  }};
`;

const ImageFromFormula = ({ reference, altText }) => {
  const output = useOutput(reference);

  return (
    <ImageWrapper>
      {output?.result ? (
        <StyledImage
          src={output.result}
          alt={altText ?? ''}
          loading="lazy"
          // TODO: fix size
          // width={width}
          // height={height}
        />
      ) : (
        <Fallback>
          <StyledImage
            src={getSiteUrl({ slug: '/img/image-placeholder.svg' })}
            alt="Fallback image"
            loading="lazy"
          />
        </Fallback>
      )}
    </ImageWrapper>
  );
};

type ImageProps = {
  element: ImageElement;
  isHidden: boolean;
};

export type ImageElement = {
  type: 'image';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  image: {
    shouldUseFormulaForImage?: boolean;
    imageFormula?: string;
    alignment?: string;
    imageUrl?: string;
    margins?: number;
    width?: number;
    altText?: string;
  };
};

const Image = ({ element, isHidden }: ImageProps) => {
  const { image } = element;
  const { shouldUseFormulaForImage } = image;

  const newImageUrl = convertImageUrl(image.imageUrl);

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
    >
      <ElementClassNameWrapper element={element}>
        {shouldUseFormulaForImage ? (
          <ImageFromFormula
            reference={element.reference}
            width={image.width}
            height={image.height}
            alt={image.altText ?? ''}
          />
        ) : (
          <ImageWrapper alignment={image.alignment} margins={image.margins}>
            {newImageUrl && (
              <StyledImage
                src={newImageUrl}
                alt={image.altText ?? ''}
                loading="lazy"
                width={image.width}
              />
            )}
            {!newImageUrl && (
              <Fallback>
                <StyledImage
                  src={getSiteUrl({ slug: '/img/image-placeholder.svg' })}
                  alt="Fallback image"
                  loading="lazy"
                  width={image.width}
                />
              </Fallback>
            )}
          </ImageWrapper>
        )}
      </ElementClassNameWrapper>
    </ElementStyleWrapper>
  );
};

export default Image;
