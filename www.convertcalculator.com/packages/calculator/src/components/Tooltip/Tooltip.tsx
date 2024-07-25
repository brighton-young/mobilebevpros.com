import React, { useEffect, useState } from 'react';

import { usePopper } from 'react-popper';

import { useCanvasWidth } from '../../CalculatorState';
import MarkdownContent from '../MarkdownContent';
import Portal from '../Portal';

import { StyledArrow, TooltipDiv, TooltipWrapper } from './Style';

const MAX_WIDTH_BIG = 640;
const MAX_WIDTH = 240;

const Tooltip = ({ children, colorTone, position }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isLongForm = !!children.match(/\n/g);
  const hasHeadings = !!children.match(/#/g);

  const isBig = isLongForm || hasHeadings;

  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);

  const width = useCanvasWidth();

  const {
    state,
    styles,
    attributes,
    forceUpdate: updatePopper,
  } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  useEffect(() => {
    if (typeof updatePopper !== 'function') return;

    updatePopper();
  }, [width]);

  return (
    <>
      <TooltipWrapper
        ref={setReferenceElement}
        position={position}
        colorTone={colorTone}
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        onTouchEnd={(ev) => {
          ev.stopPropagation();

          setIsOpen(!isOpen);
        }}
      >
        ?
      </TooltipWrapper>

      <Portal>
        <TooltipDiv
          {...attributes.popper}
          ref={setPopperElement}
          isBig={isLongForm || hasHeadings}
          maxWidth={getWidth({ isBig, width })}
          isVisible={isOpen}
          style={styles.popper}
        >
          <MarkdownContent>{children}</MarkdownContent>
          <StyledArrow
            {...attributes.arrow}
            placement={state?.placement || ''}
            data-popper-arrow
            style={styles.arrow}
          />
        </TooltipDiv>
      </Portal>
    </>
  );
};

const getWidth = ({ isBig, width }) => {
  const maxWidth = isBig ? MAX_WIDTH_BIG : MAX_WIDTH;

  return Math.min(width, maxWidth);
};

export default Tooltip;
