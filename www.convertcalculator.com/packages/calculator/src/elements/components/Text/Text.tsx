import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import MarkdownContent from '../../../components/MarkdownContent';
import Tooltip from '../../../components/Tooltip';
import { prefixElementStyles } from '../../../util/prefixElementStyles';

import StyledDescription from './StyledDescription';
import { StyledText } from './StyledText';

type TextProps = {
  element: TextElement;
  isHidden: boolean;
};

export type TextElement = {
  type: 'text';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  text: {
    text?: string;
    style: {
      fontFamily?: string;
      fontWeight?: string;
      fontSize?: number;
      fontSizeUnit: 'px' | 'rem' | '%';
      lineHeight?: number;
      lineHeightUnit: 'px' | 'rem' | '%';
      textAlign: 'left' | 'center' | 'right' | 'justify';
      fontStyle: 'normal' | 'italic';
      textColor?: string;
    };
  };
};

const Text = ({ element, isHidden }: TextProps) => {
  const { text } = element;

  const tooltip = element.titleHasTooltip ? element.titleTooltipText : false;

  const flattenedQuickStyles = {};
  Object.entries(element.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  const prefixedStyles = prefixElementStyles(text.style, 'text');

  return (
    <ElementThemeProvider
      elementStyles={prefixedStyles}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="elements"
        element={element}
        isHidden={isHidden}
      >
        <ElementClassNameWrapper element={element}>
          <StyledText>
            <StyledDescription>
              {text.text && <MarkdownContent>{text.text}</MarkdownContent>}
            </StyledDescription>
            {tooltip && <Tooltip position="bottom-end">{tooltip}</Tooltip>}
          </StyledText>
        </ElementClassNameWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default Text;
