import React from 'react';

import classNames from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { useAnswers, useIsUploading, useOutputs } from '../../CalculatorState';
import useNextView from '../../elements/common/hooks/useNextView';
import usePreviousView from '../../elements/common/hooks/usePreviousView';
import selectedViewState from '../../recoil/selectedViewState';
import showErrorsState from '../../recoil/showErrorsState';
import getButtonStyleVariables from '../../styles/styleVariables/buttonStyleVariables';
import useStyles from '../../styles/useStyles';
import validate from '../../util/validate';
import Icon from '../Icon';

import { ArrowButton, Container, DotsLink, DotsList } from './Styles';

const ViewNavigation = ({ calculator, tree = [] }) => {
  const answers = useAnswers();
  const outputs = useOutputs();

  const [selectedView, setSelectedView] = useRecoilState(selectedViewState);
  const setShowErrors = useSetRecoilState(showErrorsState);
  const isUploading = useIsUploading();

  const { handleNextView } = useNextView();
  const { handlePreviousView } = usePreviousView();

  const handleNewView = (newViewIndex) => {
    setShowErrors(false);

    if (newViewIndex === selectedView) return;

    if (newViewIndex > selectedView) {
      [...Array(newViewIndex - selectedView)]
        .reduce((acc, item, index) => {
          return acc.then(() => {
            return new Promise((resolve, reject) => {
              const isViewValid = validate({
                calculator,
                outputs,
                answers,
                items: tree[selectedView + index],
              });

              if (isViewValid) {
                setSelectedView(selectedView + index + 1);
                resolve();
              } else {
                reject();
              }
            });
          });
        }, Promise.resolve())
        .catch(() => {
          setShowErrors(true);
        });
    } else {
      setSelectedView(newViewIndex);
    }
  };

  const isFirstView = selectedView === 0;
  const isLastView = selectedView + 1 === tree.length;
  const isNumbered = calculator.viewBreakDisplayType === 'numberedDots';

  const buttonStyles = useStyles({
    prefix: 'button',
    getVariables: getButtonStyleVariables,
  });

  return (
    <Container>
      {calculator.viewBreakDisplayType === 'arrows' ? (
        <div className="cc__view-navigation cc__view-navigation-arrows">
          <ArrowButton
            className="cc_view-navigation-arrow cc_view-navigation-arrow-previous"
            isLeft
            type="button"
            onClick={handlePreviousView}
            disabled={isFirstView || isUploading}
            styles={buttonStyles}
          >
            <Icon name="chevronLeft" size={28} />
          </ArrowButton>
          <ArrowButton
            className="cc_view-navigation-arrow cc_view-navigation-arrow-next"
            isRight
            type="button"
            onClick={handleNextView}
            disabled={isLastView || isUploading}
            styles={buttonStyles}
          >
            <Icon name="chevronRight" size={28} />
          </ArrowButton>
        </div>
      ) : (
        <DotsList
          className={classNames('cc__view-navigation', {
            'cc__view-navigation-dots': !isNumbered,
            'cc__view-navigation-numbered-dots': !isNumbered,
          })}
        >
          {tree.map((view, index) => {
            const isActive = selectedView === index;

            return (
              <DotsLink
                className={`cc__view-navigation-item ${
                  isActive ? 'is-selected' : ''
                }`}
                // eslint-disable-next-line react/no-array-index-key
                key={`view-navigation-${index}`}
                isActive={isActive}
                isNumbered={isNumbered}
                color={calculator.style?.primaryColor}
                styles={buttonStyles}
                onClick={() => {
                  handleNewView(index);
                }}
              >
                {isNumbered && index + 1}
              </DotsLink>
            );
          })}
        </DotsList>
      )}
    </Container>
  );
};

export default ViewNavigation;
