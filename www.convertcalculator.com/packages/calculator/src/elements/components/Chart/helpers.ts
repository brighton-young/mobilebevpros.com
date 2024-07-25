import { ScriptableContext } from 'chart.js';
import merge from 'lodash/merge';
import { transparentize } from 'polished';

import { ChartTypeEnum } from '@cc/shared/enums/chart-types';

import hexAToRGBA from '../../../styles/utils/hexAToRGBA';
import getFormattedNumber from '../../../util/getFormattedNumber';

import { Props as SharedProps } from './ChartTypeComponentSwitch';

export const getChartData = ({
  type,
  labels,
  datasets,
  extraOption,
}: Pick<SharedProps, 'type' | 'labels' | 'datasets' | 'extraOption'>) => {
  let data;
  if (
    type === ChartTypeEnum.POLAR_AREA ||
    type === ChartTypeEnum.DOUGHNUT ||
    type === ChartTypeEnum.PIE
  ) {
    data = {
      labels: labels.map((label) => {
        return label.label;
      }),
      datasets: datasets.map((dataset) => {
        return {
          label: dataset.label || '',
          data: dataset.result,
          backgroundColor: labels.map((label) => {
            return label.color;
          }),
        };
      }),
    };
  } else if (type === ChartTypeEnum.RADAR) {
    data = {
      labels: labels.map((label) => {
        return label.label;
      }),
      datasets: datasets.map((dataset) => {
        return {
          label: dataset.label || '',
          data: dataset.result,
          borderWidth: dataset.lineWidth || 1,
          borderColor: dataset.color,
          backgroundColor: transparentize(0.7, dataset.color),
        };
      }),
    };
  } else {
    // expend the labels list with empty items for the line and bar chart if the label count
    // is less than the data set count. This to make all the data set points visible on the chart.

    const totalLabelCountNeeded = datasets.reduce((max, curr) => {
      return Math.max(max, curr.result.length);
    }, 0);

    const expandedLabels = labels
      .map((label) => {
        return label.label;
      })
      .concat(
        new Array(Math.max(totalLabelCountNeeded - labels.length, 0)).fill(''),
      );

    data = {
      labels: expandedLabels,
      datasets: datasets.map((dataset, index) => {
        return {
          label: dataset.label || '',
          data: dataset.result,
          lineTension: 0.1,
          fill: false,
          borderWidth: dataset.lineWidth || 1,
          backgroundColor: dataset.color,
          ...(type === ChartTypeEnum.LINE &&
            extraOption?.useGradientFill && {
              backgroundColor: (context: ScriptableContext<'line'>) => {
                if (!dataset.color) {
                  return 'transparent';
                }
                const { ctx } = context.chart;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);

                const rgbaColor = hexAToRGBA(dataset.color);

                gradient.addColorStop(
                  0,
                  rgbaColor.replace(/[^,]+(?=\))/, '0.3'),
                );
                gradient.addColorStop(
                  0.6,
                  rgbaColor.replace(/[^,]+(?=\))/, '0'),
                );
                return gradient;
              },
              fill: true,
            }),
          ...(type === ChartTypeEnum.LINE && {
            pointStyle: extraOption?.showDataPoints ? 'circle' : false,
            pointBackgroundColor: dataset.color,
          }),
          ...(type === ChartTypeEnum.LINE && {
            pointStyle: extraOption?.showDataPoints ? 'circle' : false,
            pointBackgroundColor: dataset.color,
          }),
          borderColor: dataset.color,
          ...(type === ChartTypeEnum.LINE && {
            lineTension: extraOption?.lineTension || 0,
          }),
          // set the border radius explicitly to fix a bug in chart.js where multiple stacked bars get a top border radius
          borderRadius: {
            topLeft: 0,
            topRight: 0,
          },
          ...(Boolean(
            (type === ChartTypeEnum.STACKED_BAR &&
              index === datasets.length - 1) ||
              (type !== ChartTypeEnum.STACKED_BAR && extraOption?.topRadius),
          ) && {
            borderRadius: {
              topLeft: extraOption?.topRadius,
              topRight: extraOption?.topRadius,
            },
          }),
          type: null, // needed so the type resets when useLineType is toggled off
          ...(type === ChartTypeEnum.BAR &&
            dataset.useLineType && {
              type: 'line',
              pointStyle: false,
              lineTension: extraOption?.lineTension || 0,
            }),
        };
      }),
    };
  }
  return data;
};

export const getChartOptions = ({
  type,
  extraOption,
  numberFormatting,
}: Pick<SharedProps, 'type' | 'extraOption' | 'numberFormatting'>) => {
  let options = {
    // enable animation for older charts where the animation option is undefined
    animation:
      extraOption?.animation === undefined ? true : extraOption.animation,
    aspectRatio: extraOption?.aspectRatio,
    plugins: {
      legend: {
        display: !extraOption?.hideLegend,
      },
      tooltip: {
        ...(type !== ChartTypeEnum.STACKED_BAR_100 && {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }

              let parsedValue =
                context.parsed.y ?? context.parsed.r ?? context.parsed;

              if (type === ChartTypeEnum.HORIZONTAL_BAR) {
                parsedValue = context.parsed.x;
              }

              const valueFormatted =
                typeof parsedValue === 'number'
                  ? getFormattedNumber(numberFormatting, parsedValue)
                  : parsedValue;

              label += valueFormatted;

              return label;
            },
          },
        }),
      },
    },
  };

  if (
    type === ChartTypeEnum.LINE ||
    type === ChartTypeEnum.BAR ||
    type === ChartTypeEnum.STACKED_BAR ||
    type === ChartTypeEnum.HORIZONTAL_BAR
  ) {
    const lineAndBarOptions = {
      scales: {
        x: {
          stacked: false,
          grid: {
            display: false,
          },
          ticks: {
            color: extraOption?.labelColor,
          },
        },
        y: {
          border: {
            display: false,
          },
          stacked: false,
          grid: {
            color: extraOption?.gridColor,
          },
          min: extraOption?.yAxisMinScale,
          max: extraOption?.yAxisMaxScale,
          ticks: {
            stepSize: extraOption?.yAxisStepSize,
            display: !extraOption?.hideVerticalLabels,
            color: extraOption?.labelColor,
            callback: (value) => {
              const valueFormatted =
                typeof value === 'number'
                  ? getFormattedNumber(numberFormatting, value)
                  : value;

              return `${extraOption?.yTicksPrefix || ''}${valueFormatted}${
                extraOption?.yTicksSuffix || ''
              }`;
            },
          },
        },
      },
      indexAxis: undefined,
    };
    options = merge(options, lineAndBarOptions);
  }

  if (type === ChartTypeEnum.DOUGHNUT || type === ChartTypeEnum.PIE) {
    const rotationOptions = {
      rotation: extraOption?.rotationAngle,
    };
    options = merge(options, rotationOptions);
  }

  if (type === ChartTypeEnum.RADAR || type === ChartTypeEnum.POLAR_AREA) {
    const radarOptions = {
      scales: {
        r: {
          min: extraOption?.yAxisMinScale,
          max: extraOption?.yAxisMaxScale,
          ticks: {
            stepSize: extraOption?.yAxisStepSize,
          },
        },
      },
    };
    options = merge(options, radarOptions);
  }

  if (type === ChartTypeEnum.STACKED_BAR) {
    options.scales.y.stacked = true;
    options.scales.x.stacked = true;
  }

  if (type === ChartTypeEnum.HORIZONTAL_BAR) {
    options.indexAxis = 'y';
  }

  if (extraOption?.customizeConfig && extraOption?.customConfig) {
    try {
      const customConfig = JSON.parse(extraOption.customConfig);
      merge(options, customConfig);
      console.debug('Custom chart config applied', options);
    } catch (e) {
      console.log(e);
    }
  }

  return options;
};
