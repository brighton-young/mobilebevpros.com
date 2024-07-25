import React, { memo } from 'react';

import merge from 'lodash/merge';

import {
  useCalculatorQuickStyles,
  useCalculatorStyles,
  useCanvasSize,
  useFeatureFlags,
} from '../../../CalculatorState';
import CalculatorItems from '../../../components/CalculatorItems';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import { quickStylesDefinitions } from '../../../quickStyles/definitions';
import { stylesDefinitions } from '../../../styles/definitions';
import { convertLegacyQuickStyles } from '../../../util/convertLegacyQuickStyles';
import { convertLegacyStyles } from '../../../util/convertLegacyStyles';
import { prefixElementStyles } from '../../../util/prefixElementStyles';

import { StyledContainer } from './StyledContainer';

type ContainerProps = {
  hasChildren: boolean;
  isHidden: boolean;
  itemChildren?: any[];
  element: ContainerElement;
  treeRenderer: React.JSX.Element;
};

export type ContainerElement = {
  type: 'container';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  container: {
    style: {
      alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
      backgroundColor?: string;
      backgroundImage?: string;
      border?: boolean;
      borderColor?: string;
      borderRadius?: number;
      borderRadiusUnit?: 'px' | 'rem' | '%';
      borderStyle?: '' | 'none' | 'solid' | 'dashed' | 'dotted';
      borderWidth?: number;
      borderWidthUnit?: 'px' | 'rem' | '%';
      display?: 'inline' | 'inline-block' | 'block' | 'flex';
      flexDirection?: 'row' | 'column';
      flexWrap?: 'nowrap' | 'wrap';
      height?: number;
      heightUnit?: 'px' | 'rem' | '%';
      gap?: number;
      gapUnit?: 'px' | 'rem' | '%';
      justifyContent?:
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
      maxWidth?: number;
      maxWidthUnit?: 'px' | 'rem' | '%';
      maxWidthMobile?: number;
      maxWidthMobileUnit?: 'px' | 'rem' | '%';
      minHeight?: number;
      minHeightUnit?: 'px' | 'rem' | '%';
      showBackgroundImage?: boolean;
      spacing?: {
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
      };
      textColor?: string;
      width?: number;
      widthUnit?: 'px' | 'rem' | '%';
    };
  };
};

const Container = (props: ContainerProps) => {
  const {
    hasChildren,
    isHidden,
    itemChildren = [],
    element,
    treeRenderer,
  } = props;
  const { container } = element;

  const { isMobile } = useCanvasSize();

  // A container will wrap all children including other containers.
  // This will merge multiple (quick)style definitions from the theme provider and mess up the styles.
  // Therefor we cannot use the theme provider for containers, so we must resort to using the styles directly.

  const elementStyles = convertLegacyStyles(
    prefixElementStyles(container.style, 'container') || {},
    stylesDefinitions,
  );

  // there are no legacy quick styles for containers
  const flattenedElementQuickStyles = {};
  Object.entries(element.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedElementQuickStyles[key] = value.value;
  });

  const calculatorStyles = convertLegacyStyles(
    useCalculatorStyles() || {},
    stylesDefinitions,
  );

  const calculatorQuickStyles = useCalculatorQuickStyles() || {};
  const flattenedCalculatorQuickStyles = {};
  Object.entries(calculatorQuickStyles).forEach(([key, value]: any) => {
    flattenedCalculatorQuickStyles[key] = value.value;
  });

  const convertedCalculatorQuickStyles = convertLegacyQuickStyles(
    flattenedCalculatorQuickStyles,
    quickStylesDefinitions,
  );

  const { dataAsPropsRefactor } = useFeatureFlags();

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      // @ts-ignore
      isMobile={isMobile}
      isHidden={isHidden}
      theme={merge(
        {},
        calculatorStyles,
        convertedCalculatorQuickStyles,
        elementStyles,
        flattenedElementQuickStyles,
      )}
      styledItem={StyledContainer}
      hasChildren={dataAsPropsRefactor ? hasChildren : itemChildren.length}
      isError={undefined}
    >
      {dataAsPropsRefactor ? (
        treeRenderer
      ) : (
        <CalculatorItems {...props} items={itemChildren} />
      )}
    </ElementStyleWrapper>
  );
};

export default memo(Container);
