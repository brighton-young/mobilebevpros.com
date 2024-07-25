import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import type { Element } from '@cc/db';

import { useIsEditing, useIsLiveMode } from '../CalculatorState';
import { colors } from '../styles';
import getElementStyleVariables from '../styles/styleVariables/elementStyleVariables';
import useStyles from '../styles/useStyles';

const TRANSITION_DURATION = 150;

export const DefaultStyledItem = styled.div<{
  styles: {
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
  };
  isEditing: boolean;
  isLiveMode: boolean;
  isError: boolean;
  isHidden: boolean;
}>`
  ${({ styles }) => {
    return `
    margin-top: ${styles.marginTop};
    margin-right: ${styles.marginRight};
    margin-bottom: ${styles.marginBottom};
    margin-left: ${styles.marginLeft};

    padding-top: ${styles.paddingTop};
    padding-right: ${styles.paddingRight};
    padding-bottom: ${styles.paddingBottom};
    padding-left: ${styles.paddingLeft};

    position: relative; //This is used for field errors
  `;
  }}

  ${({ isError }) => {
    if (isError) {
      return `
        * {
          color: ${colors.alertColor};
        }
      `;
    }

    return '';
  }}

  ${({ isEditing, isHidden, isLiveMode }) => {
    if (isHidden && isEditing && !isLiveMode) {
      return `
          opacity: 0.4;
        `;
    }

    return undefined;
  }}
`;

const getAnimationStyles = ({ element, ref, transitionState }) => {
  if (!transitionState) return {};

  if (transitionState === 'isEntering') {
    return element.showAnimations.reduce((acc, animation) => {
      return {
        ...acc,
        ...(animation === 'fade' && {
          opacity: 0,
        }),
        ...(animation === 'height' && {
          minHeight: 0,
          maxHeight: 0,
        }),

        ...(animation === 'slideInTop' && {
          transform: 'translate3D(0px, -50%, 0px)',
        }),
        ...(animation === 'slideInRight' && {
          transform: 'translate3D(50%, 0px, 0px)',
        }),
        ...(animation === 'slideInBottom' && {
          transform: 'translate3D(0px, 50%, 0px)',
        }),
        ...(animation === 'slideInLeft' && {
          transform: 'translate3D(-50%, 0px, 0px)',
        }),
      };
    }, {});
  }

  if (transitionState === 'isEnteringActive') {
    return element.showAnimations.reduce(
      (acc, animation) => {
        return {
          ...acc,
          ...(animation === 'fade' && {
            opacity: 1,
          }),
          ...(animation === 'height' && {
            opacity: 1,
            maxHeight: ref?.scrollHeight,
          }),
          ...(animation === 'slideInTop' && {
            transform: 'translate3D(0px, 0px, 0px)',
          }),
          ...(animation === 'slideInRight' && {
            transform: 'translate3D(0px, 0px, 0px)',
          }),
          ...(animation === 'slideInBottom' && {
            transform: 'translate3D(0px, 0px, 0px)',
          }),
          ...(animation === 'slideInLeft' && {
            transform: 'translate3D(0px, 0px, 0px)',
          }),
        };
      },
      {
        transition: `opacity ${TRANSITION_DURATION}ms ease-out, min-height ${TRANSITION_DURATION}ms ease-out, max-height ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out`,
      },
    );
  }

  if (transitionState === 'isLeaving') {
    return element.hideAnimations.reduce((acc, animation) => {
      return {
        ...acc,
        ...(animation === 'fade' && {
          opacity: 1,
        }),
        ...(animation === 'height' && {
          maxHeight: ref?.scrollHeight,
        }),
        ...(animation === 'slideOutTop' && {
          transform: 'translate3D(0px, 0px, 0px)',
        }),
        ...(animation === 'slideOutRight' && {
          transform: 'translate3D(0px, 0px, 0px)',
        }),
        ...(animation === 'slideOutBottom' && {
          transform: 'translate3D(0px, 0px, 0px)',
        }),
        ...(animation === 'slideOutLeft' && {
          transform: 'translate3D(0px, 0px, 0px)',
        }),
      };
    }, {});
  }

  if (transitionState === 'isLeavingActive') {
    return element.hideAnimations.reduce(
      (acc, animation) => {
        return {
          ...acc,
          ...(animation === 'fade' && {
            opacity: 0,
          }),
          ...(animation === 'height' && {
            minHeight: 0,
            maxHeight: 0,
          }),
          ...(animation === 'slideOutTop' && {
            transform: 'translate3D(0px, -50%, 0px)',
          }),
          ...(animation === 'slideOutRight' && {
            transform: 'translate3D(50%, 0px, 0px)',
          }),
          ...(animation === 'slideOutBottom' && {
            transform: 'translate3D(0px, 50%, 0px)',
          }),
          ...(animation === 'slideOutLeft' && {
            transform: 'translate3D(-50%, 0px, 0px)',
          }),
        };
      },
      {
        transition: `opacity ${TRANSITION_DURATION}ms ease-in, min-height ${TRANSITION_DURATION}ms ease-in, max-height ${TRANSITION_DURATION}ms ease-in, transform ${TRANSITION_DURATION}ms ease-in`,
      },
    );
  }

  return {};
};

const ElementStyleWrapper = ({
  children,
  collection,
  element,
  isError = false,
  isHidden,
  styledItem: StyledItem = DefaultStyledItem,
  ...restProps
}: {
  children: React.ReactNode;
  collection: 'elements' | 'formulas' | 'questions';
  element: Element;
  isError?: boolean;
  isHidden: boolean;
  styledItem?: React.ElementType;
}) => {
  const { customClassNames = [], type } = element;

  const isEditing = useIsEditing();
  const isLiveMode = useIsLiveMode();

  const styles = useStyles({
    prefix: 'item',
    getVariables: getElementStyleVariables,
    elementStyle: element.style,
  });

  const collectionSingular = collection.slice(0, -1);

  const [transitionState, setTransitionState] = useState({});

  const hasShowAnimations = element.showAnimations?.length;
  const hasHideAnimations = element.hideAnimations?.length;
  const hasAnimations = hasShowAnimations || hasHideAnimations;

  const [shouldBlock, setShouldBlock] = useState(isHidden);

  const [isInitialized, setIsInitalized] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setIsInitalized(true);
    }, TRANSITION_DURATION * 3);

    return () => {
      window.clearTimeout(id);
    };
  });

  useEffect(() => {
    if (isEditing && !isLiveMode) {
      setShouldBlock(false);
      return undefined;
    }

    if (isHidden && !hasHideAnimations) {
      setShouldBlock(isHidden);
      return undefined;
    }

    if (!isHidden && !hasShowAnimations) {
      setShouldBlock(isHidden);
      return undefined;
    }

    if (!element.shouldAnimateOnInit && !isInitialized) {
      setShouldBlock(isHidden);
      return undefined;
    }

    if (isHidden && hasHideAnimations && isInitialized) {
      setShouldBlock(false);
      setTransitionState('isLeaving');

      const t1 = window.setTimeout(() => {
        setTransitionState('isLeavingActive');
      }, 24);

      const t2 = window.setTimeout(() => {
        setTransitionState(undefined);
        setShouldBlock(true);
      }, TRANSITION_DURATION * 2);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    if (!isHidden && hasShowAnimations) {
      setShouldBlock(true);

      const t1 = window.setTimeout(() => {
        setShouldBlock(false);
        setTransitionState('isEntering');
      }, TRANSITION_DURATION * 2);

      const t2 = window.setTimeout(() => {
        setTransitionState('isEnteringActive');
      }, TRANSITION_DURATION * 2 + 24);

      const t3 = window.setTimeout(() => {
        setTransitionState(undefined);
      }, TRANSITION_DURATION * 3);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
      };
    }

    return undefined;
  }, [isHidden, isLiveMode]);

  const ref = useRef<HTMLDivElement>(undefined);

  return (
    <StyledItem
      ref={ref}
      {...restProps}
      styles={styles}
      style={{
        ...(hasAnimations && {
          willChange: 'transform, opacity, min-height, max-height',
        }),

        ...(shouldBlock && {
          display: 'none',
        }),

        ...getAnimationStyles({
          element,
          ref: ref.current,
          transitionState,
        }),
      }}
      className={classNames(
        `cc__${collectionSingular}`,
        `cc__${type}-${collectionSingular}-wrapper`,
        ...customClassNames,
        {
          [`cc__${collectionSingular}--hidden`]: isHidden,
        },
      )}
      isEditing={isEditing}
      isError={isError}
      isLiveMode={isLiveMode}
      isHidden={isHidden}
      transitionState={transitionState}
      data-selector-element-id={element._id}
      elementId={element._id.toLowerCase()}
    >
      {children}
    </StyledItem>
  );
};

export default ElementStyleWrapper;
