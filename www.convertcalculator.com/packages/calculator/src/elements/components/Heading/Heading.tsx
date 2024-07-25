import styled, { css } from 'styled-components';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import Tooltip from '../../../components/Tooltip';
import { getHeadingTypePrefix } from '../../../styles/styleVariables/headingStyleVariables';
import getHeadingTypeStyleVariables from '../../../styles/styleVariables/headingTypeStyleVariables';
import useStyles from '../../../styles/useStyles';

const TitleComponent = styled.h1`
  margin-top: 0rem;
  margin-bottom: 0rem;

  flex-grow: 1;

  ${({ styles }) => {
    return css`
      font-family: ${styles.fontFamily} !important;
      font-size: ${styles.fontSize} !important;
      font-weight: ${styles.fontWeight} !important;
      line-height: ${styles.lineHeight} !important;
      color: ${styles.textColor} !important;
      text-align: ${styles.textAlign} !important;
      text-transform: ${styles.textTransform} !important;
      font-style: ${styles.fontStyle} !important;
    `;
  }}
`;

const TitleComponentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

type HeadingProps = {
  element: HeadingElement;
  isHidden: boolean;
};

export type HeadingElement = {
  type: 'heading';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  heading: {
    style: {
      fontFamily?: string;
      fontWeight?: string;
      fontSize?: number;
      fontSizeUnit?: 'px' | 'rem' | '%';
      lineHeight?: number;
      lineHeightUnit?: 'px' | 'rem' | '%';
      textAlign?: 'left' | 'center' | 'right' | 'justify';
      fontStyle?: 'normal' | 'italic';
      textColor?: string;
    };
    title?: string;
    titleFontType?: string;
  };
};

const Heading = ({ element, isHidden }: HeadingProps) => {
  const { heading } = element;
  const { title, titleFontType } = heading;

  const headingStyles = useStyles({
    prefix: getHeadingTypePrefix(titleFontType),
    getVariables: getHeadingTypeStyleVariables,
    elementStyle: heading.style,
  });

  const tooltip = element.titleHasTooltip ? element.titleTooltipText : false;

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
    >
      <ElementClassNameWrapper element={element}>
        <TitleComponentWrapper>
          <TitleComponent
            as={titleFontType}
            className="cc__element-title cc__title-title"
            styles={headingStyles}
          >
            {title}
          </TitleComponent>
          {tooltip && <Tooltip position="bottom-end">{tooltip}</Tooltip>}
        </TitleComponentWrapper>
      </ElementClassNameWrapper>
    </ElementStyleWrapper>
  );
};

export default Heading;
