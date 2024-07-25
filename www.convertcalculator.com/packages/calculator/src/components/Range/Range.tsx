import React from 'react';

import styled, { css } from 'styled-components';

const Input = styled.input`
  ${({ percentageValue, styles }) => {
    return css`
      --range-result-color: ${styles.resultColor};
      --range-thumb-color: ${styles.thumbColor};
      --range-track-color: ${styles.trackColor};
      --range-active-track-color: ${styles.activeTrackColor};
      --range-track-end-color: var(--range-track-color);
      --range-ms-track-fill-upper: var(--range-track-color);
      --range-track-start-color: var(--range-active-track-color);
      --range-ms-track-fill-lower: var(--range-active-track-color);

      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      margin: 0rem;
      display: block;
      width: 100%;
      height: 1.5rem;
      border: 0 !important;
      line-height: 1rem;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: none !important;

      &:focus {
        outline: none;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border: 3px;
        border-style: solid;
        border-color: white;
        border-radius: 50%;
        background: var(--range-thumb-color);
        cursor: pointer;
        margin-top: -0.5rem;
      }

      /* All the same stuff for Firefox */
      &::-moz-range-thumb {
        -moz-appearance: none;
        height: 24px;
        width: 24px;
        border: 3px;
        border-style: solid;
        border-color: white;
        border-radius: 50%;
        background: var(--range-thumb-color);
        cursor: pointer;
        margin-top: 0;
      }

      /* All the same stuff for IE */
      &::-ms-thumb {
        -ms-appearance: none;
        height: 1.5rem;
        width: 1.5rem;
        border: 0;
        border-radius: 50%;
        background: var(--range-thumb-color);
        cursor: pointer;
        margin-top: 0;
      }

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 0.5rem;
        cursor: pointer;
        background: linear-gradient(
          to right,
          var(--range-track-start-color) 0%,
          var(--range-active-track-color) ${percentageValue},
          var(--range-track-color) ${percentageValue},
          var(--range-track-end-color) 100%
        );
        border-radius: 4px;
        box-sizing: border-box;
        border: 0;
      }

      &::-moz-range-track {
        width: 100%;
        height: 0.5rem;
        cursor: pointer;
        background: linear-gradient(
          to right,
          var(--range-track-start-color) 0%,
          var(--range-active-track-color) ${percentageValue},
          var(--range-track-color) ${percentageValue},
          var(--range-track-end-color) 100%
        );
        border-radius: 4px;
        box-sizing: border-box;
        border: 0;
      }

      &::-moz-focus-outer {
        border: 0;
      }

      &::-ms-track {
        width: 100%;
        height: 0.5rem;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
        box-sizing: border-box;
        border: 0;
      }

      &::-ms-fill-lower {
        background: var(--range-ms-track-fill-lower);
        border-radius: 4px;
      }

      &::-ms-fill-upper {
        background: var(--range-ms-track-fill-upper);
        border-radius: 4px;
      }
    `;
  }}
`;

type RangeProps = {
  max?: number;
  min?: number;
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  value?: number;
  inputRef?: React.Ref<HTMLInputElement>;
  styles: {
    resultColor: string;
    thumbColor: string;
    trackColor: string;
    activeTrackColor: string;
  };
};

const Range = ({
  max = 100,
  min = 0,
  onClick,
  onChange,
  step = 1,
  value = 50,
  inputRef,
  styles,
}: RangeProps) => {
  return (
    <div
      draggable
      onDragStart={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      }}
    >
      <Input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={inputRef}
        percentageValue={`${((value - min) / (max - min)) * 100}%`}
        styles={styles}
      />
    </div>
  );
};

export default Range;
