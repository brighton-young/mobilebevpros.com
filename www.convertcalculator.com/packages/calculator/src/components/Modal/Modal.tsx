import React, { Fragment, useRef } from 'react';

import styled from 'styled-components';

import { useCalculatorId } from '../../CalculatorState';
import { borderRadius, colors, shadows, textSizes } from '../../styles';
import getHeadingTypeStyleVariables from '../../styles/styleVariables/headingTypeStyleVariables';
import useStyles, { mergeStyles } from '../../styles/useStyles';
import getCurrentFrameElement from '../../util/getCurrentFrameElement';
import getIsFramed from '../../util/getIsFramed';
import getRootWindow from '../../util/getRootWindow';
import useReceiveMessageFromParent from '../../util/useReceiveMessageFromParent';
import useScroll from '../../util/useScroll';
import Description from '../Description';
import Portal from '../Portal';
import Title from '../Title';

const Subtitle = styled(Description)`
  margin-bottom: 1rem;
  font-size: ${textSizes.lg};
`;

type StyledModalContainerProps = {
  isFramed: boolean;
};

const StyledModalContainer = styled.div<StyledModalContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;

  ${({ isFramed }) => {
    if (isFramed) {
      return `
        align-items: baseline;
      `;
    }

    return `
      background: rgba(0, 0, 0, 0.3);
      align-items: center;

    `;
  }}
`;

type StyledModalProps = {
  isFramed: boolean;
  marginTop: number;
  marginLeft: number;
};

const StyledModal = styled.div<StyledModalProps>`
  padding: 1rem;
  border: 1px solid ${colors.lightGray};
  background: ${colors.white};
  width: 600px;
  max-width: 100%;
  border-radius: ${borderRadius.default};
  box-shadow: ${shadows.lg};
  ${({ isFramed, marginTop, marginLeft }) => {
    if (isFramed) {
      return `
        margin-top: ${marginTop}px;
        margin-left: ${marginLeft}px;
      `;
    }

    return '';
  }}
`;

const ModalHeading = styled.div`
  margin-bottom: 1rem;
`;

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  subtitle?: string;
  title?: string;
  openInPortal?: boolean;
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    isOpen,
    onClose,
    subtitle,
    title,
    openInPortal = true,
  } = props;

  const calculatorId = useCalculatorId();

  const modalRef = useRef<HTMLDivElement>(null);

  const isFramed = getIsFramed();

  useScroll(getCurrentFrameElement());

  const { marginTop, marginLeft } = getModalMargins(modalRef.current);

  useReceiveMessageFromParent({
    calculatorId,
    onReceiveMessage: ({ type }) => {
      if (!isOpen) return;

      if (type === 'clickInParent') {
        onClose();
      }
    },
  });

  const headingStyles = useStyles({
    getVariables: getHeadingTypeStyleVariables,
  });

  const titleStyles = mergeStyles(headingStyles, {
    marginBottom: '1rem',
  });

  const PortalComponent = openInPortal ? Portal : Fragment;

  return (
    <PortalComponent>
      {isOpen && (
        <StyledModalContainer isFramed={isFramed} onClick={onClose}>
          <StyledModal
            ref={modalRef}
            isFramed={isFramed}
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            marginTop={marginTop}
            marginLeft={marginLeft}
          >
            {(!!title || !!subtitle) && (
              <ModalHeading>
                {title && <Title styles={titleStyles}>{title}</Title>}
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
              </ModalHeading>
            )}

            {children}
          </StyledModal>
        </StyledModalContainer>
      )}
    </PortalComponent>
  );
};

const getModalMargins = (modalEl: HTMLDivElement) => {
  const isFramed = getIsFramed();

  const frameElement = getCurrentFrameElement();

  if (!isFramed || !modalEl || !frameElement) {
    return { marginTop: 0, marginLeft: 0 };
  }

  const { innerHeight, innerWidth } = getRootWindow();

  const { left, top } = frameElement.parentNode.getBoundingClientRect();

  const { offsetWidth, offsetHeight } = modalEl;

  return {
    marginTop: top / -1 + innerHeight / 2 - offsetHeight / 2,
    marginLeft: left / -1 + innerWidth / 2 - offsetWidth / 2,
  };
};

export default Modal;
