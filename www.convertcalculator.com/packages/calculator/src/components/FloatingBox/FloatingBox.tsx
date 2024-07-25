import React, { MutableRefObject, useEffect, useRef } from 'react';

import styled from 'styled-components';

import { colors } from '../../styles';
import getCurrentFrameElement from '../../util/getCurrentFrameElement';
import getFramedWindow from '../../util/getFramedWindow';
import getRootWindow from '../../util/getRootWindow';
import useDimensions from '../../util/useDimensions';
import useScroll from '../../util/useScroll';
import Portal from '../Portal';

type StyledFloatingBoxProps = {
  isFullWidth: boolean;
  isOpen: boolean;
  position: string;
};

const StyledFloatingBox = styled.div<StyledFloatingBoxProps>`
  position: fixed;
  width: ${({ isFullWidth }) => {
    return isFullWidth ? '100%' : 'auto';
  }};
  margin: 0 !important;
  padding: 0 !important;
  background: ${colors.white};
  border: 1px solid ${colors['gray-300']};
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0px 1px 2px rgba(0, 0, 5, 0.1);
  visibility: ${({ isOpen }) => {
    return isOpen ? 'visible' : 'hidden';
  }};
  pointer-events: ${({ isOpen }) => {
    return isOpen ? 'inherit' : 'none';
  }};
  overflow: auto;
`;

type FloatingBoxProps = {
  children: React.ReactNode;
  isFullWidth?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  position?: string;
};

const useOutsideAlerter = <E extends HTMLElement>(
  isEnabled: boolean,
  onClickOutside: (ev: any) => void,
): MutableRefObject<E | null> => {
  const alerterEl = useRef<E | null>(null);

  const handleClickOutside = (ev: any) => {
    if (!alerterEl.current) return;

    if (!alerterEl.current.contains(ev.target)) {
      ev.stopPropagation();
      onClickOutside(ev);
    }
  };

  useEffect(() => {
    // Use Root Window to get click handler from Client's Website
    const rootWindow = getRootWindow();

    if (isEnabled) {
      rootWindow.document.addEventListener('click', handleClickOutside);
    } else {
      rootWindow.document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      rootWindow.document.removeEventListener('click', handleClickOutside);
    };
  }, [isEnabled, onClickOutside]);

  return alerterEl;
};

const FloatingBox: React.FC<FloatingBoxProps> = (props) => {
  const {
    children,
    isFullWidth = true,
    isOpen = false,
    onClose,
    position = 'inside',
  } = props;

  const floatingBoxC = useRef(null);

  const [wrapperC] = useDimensions();
  useScroll(wrapperC.current);

  const outsideAlerterEl = useOutsideAlerter<HTMLDivElement>(isOpen, (ev) => {
    ev.stopPropagation();

    onClose();
  });

  const styles = getStyles(wrapperC, floatingBoxC, { isFullWidth, position });

  return (
    <div ref={wrapperC}>
      <Portal>
        <div ref={outsideAlerterEl}>
          <StyledFloatingBox
            isFullWidth={isFullWidth}
            isOpen={isOpen}
            position={position}
            style={{ ...styles }}
            ref={floatingBoxC}
          >
            {children}
          </StyledFloatingBox>
        </div>
      </Portal>
    </div>
  );
};

type GetStyles = (
  wrapperC,
  floatingBoxC,
  options: {
    isFullWidth: boolean;
    position: string;
  },
) =>
  | {
      left: string;
      top?: string;
      bottom?: string;
      maxHeight: string;
      maxWidth: string;
    }
  | false;

const getStyles: GetStyles = (wrapperC, floatingBoxC, options) => {
  const { isFullWidth, position } = options;

  const triggerEl = wrapperC.current && wrapperC.current.previousElementSibling;

  if (!triggerEl) return false;

  const box = triggerEl.getBoundingClientRect();

  const framedWindow = getFramedWindow();
  const iFrame = getCurrentFrameElement();

  const iFrameBox = iFrame ? iFrame.getBoundingClientRect() : { top: 0 };

  const optionsMaxHeight =
    framedWindow.innerHeight -
    box.top -
    iFrameBox.top -
    triggerEl.offsetHeight -
    16;
  const optionsHeight =
    (floatingBoxC.current && floatingBoxC.current.offsetHeight) || 0;

  const flowToTop =
    optionsHeight > optionsMaxHeight &&
    framedWindow.innerHeight / 2 < box.top - iFrameBox.top;

  const bottomTop = window.innerHeight - box.top;
  const bottomBottom = window.innerHeight - box.top - box.height;

  const isInside = position === 'inside';
  const newTop = isInside ? `calc(${box.top}px + 0.5rem)` : `${box.bottom}px`;
  const newLeft = isInside ? `calc(${box.left}px + 0.5rem)` : `${box.left}px`;
  const newBottom = isInside
    ? `calc(${bottomBottom}px + 0.5rem)`
    : `${bottomTop}px`;

  const maxWidth = triggerEl.offsetWidth;

  const stylesFlowToBottom = {
    left: newLeft,
    top: newTop,
    maxHeight: `calc(100vh - ${box.top}px - 1rem)`,
    maxWidth: isFullWidth ? `${maxWidth}px` : 'auto',
  };

  const stylesFlowToTop = {
    left: newLeft,
    bottom: newBottom,
    maxHeight: `calc(${box.top}px - 1rem)`,
    maxWidth: isFullWidth ? `${maxWidth}px` : 'auto',
  };

  if (flowToTop) {
    return stylesFlowToTop;
  }

  return stylesFlowToBottom;
};

export default FloatingBox;
