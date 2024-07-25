import { DependencyList, useRef } from 'react';

import styled from 'styled-components';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import convertImageUrl from '@cc/shared/utils/convertImageUrl';
import { Output } from '@cc/types';

import { useFilteredOutputs, useOutput } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import useSetFormulaContext from '../../../recoil/useSetFormulaContext';

import { useCompiledImage } from './useCompiledImage';

export type LayeredImageElement = {
  type: 'layeredImages';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  layeredImages: {
    images: {
      _id: string;
      imageUrl?: string;
      visibilityEquation?: string;
    }[];
    imagesFormula?: string;
    imagesFormulaFormulaColumnIndex?: number;
    imagesFormulaImageColumnIndex?: number;
    shouldUseFormulaForImages?: boolean;
  };
};

const useImages = (
  { layeredImages, reference }: LayeredImageElement,
  deps: DependencyList = [],
): {
  _id: string;
  imageUrl: string;
  formulaReference: string;
  formula: string;
}[] => {
  const {
    images,
    imagesFormula,
    imagesFormulaFormulaColumnIndex,
    imagesFormulaImageColumnIndex,
    shouldUseFormulaForImages,
  } = layeredImages;

  const output = useOutput(`${reference}_IMAGES_FORMULA`);

  const isMatrix =
    output?.result &&
    Array.isArray(output.result) &&
    Array.isArray(output.result[0]);

  const shouldUseFormula =
    shouldUseFormulaForImages &&
    imagesFormula &&
    imagesFormulaFormulaColumnIndex != null &&
    imagesFormulaImageColumnIndex != null &&
    isMatrix;

  const handleSetFormulaContext = useSetFormulaContext();

  const formulaImages =
    shouldUseFormula && Array.isArray(output?.result)
      ? output.result
          .map((row, rowIndex) => {
            return {
              _id: String(rowIndex),
              imageUrl: row[imagesFormulaImageColumnIndex],
              formulaReference: `${reference}_IMAGES_FORMULA_${rowIndex}`,
              formula: row[imagesFormulaFormulaColumnIndex],
            };
          })
          .filter(({ formula, imageUrl }) => {
            return imageUrl && formula;
          })
      : [];

  useEffectDeepCompare(() => {
    const formulaContext = {};

    formulaImages.forEach((image) => {
      formulaContext[image.formulaReference] = {
        value: image.formula || '',
        type: 'formula',
      };
    });

    if (!shouldUseFormula) {
      images.forEach((image) => {
        formulaContext[`${reference}_IMAGES_${image._id}`] = {
          value: image.visibilityEquation,
          type: 'formula',
        };
      });
    }

    handleSetFormulaContext(formulaContext);
  }, [...deps, output?.result, imagesFormulaFormulaColumnIndex]);

  if (shouldUseFormula) {
    return formulaImages;
  }

  return images.map((image) => {
    return {
      _id: image._id,
      imageUrl: convertImageUrl(image.imageUrl),
      formulaReference: `${reference}_IMAGES_${image._id}`,
      formula: image.visibilityEquation,
    };
  });
};
const ImageWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
`;

const StyledImage = styled.img<{ isVisible: boolean }>`
  width: 100%;
  grid-area: content;

  visibility: ${({ isVisible }) => {
    return isVisible ? 'visible' : 'hidden';
  }};
`;

const LayeredImage = ({
  image,
  isOnDemand,
  output,
}: {
  image: LayeredImageElement['layeredImages']['images'][0] & {
    formulaReference: string;
  };
  isOnDemand: boolean;
  output: Output;
}) => {
  const isVisible = output?.result;

  if (!isVisible && isOnDemand) return <></>;

  return (
    <StyledImage
      crossOrigin="anonymous"
      key={image._id}
      src={image.imageUrl}
      alt=""
      isVisible={Boolean(isVisible)}
      data-is-visible={!!isVisible}
    />
  );
};

type LayeredImagesProps = {
  formula: LayeredImageElement;
  isHidden: boolean;
};

const LayeredImages = ({ formula, isHidden }: LayeredImagesProps) => {
  const images = useImages(formula);

  const isOnDemand = images.length > 250;

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const outputs = useFilteredOutputs(
    images.map(({ formulaReference }) => {
      return formulaReference;
    }),
  );

  const compiledImage = useCompiledImage(imageWrapperRef, [outputs]);

  const setFormulaContext = useSetFormulaContext();

  useEffectDeepCompare(() => {
    setFormulaContext({
      [formula.reference]: {
        value: compiledImage,
        type: 'context',
      },
    });
  }, [compiledImage]);

  return (
    <ElementStyleWrapper
      collection="formulas"
      element={formula}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="formulas" element={formula}>
        <ElementClassNameWrapper element={formula}>
          <ImageWrapper ref={imageWrapperRef}>
            {images.map((image) => {
              return (
                image.imageUrl &&
                image.formulaReference && (
                  <LayeredImage
                    key={image._id}
                    image={image}
                    output={outputs[image.formulaReference]}
                    isOnDemand={isOnDemand}
                  />
                )
              );
            })}
          </ImageWrapper>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default LayeredImages;
