import { ChartTypeEnum } from '@cc/shared/enums/chart-types';
import { CalculatorSettings } from '@cc/types';

import { useOutput } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';

import { ChartTypeComponentSwitch } from './ChartTypeComponentSwitch';
import { useChartDatasets } from './useChartDatasets';
import { useChartLabels } from './useChartLabels';

export type ChartElement = {
  _id: string;
  type: 'chart';
  reference: string;
  chart: {
    type: ChartTypeEnum;
    lineTension?: number;
    useGradientFill?: boolean;
    gridColor?: string;
    showDataPoints?: boolean;
    yAxisMinScale?: string;
    yAxisMaxScale?: string;
    yAxisStepSize?: string;
    labels: {
      label?: string;
      color?: string;
    }[];
    datasets: {
      _id: string;
      values: string;
      label?: string;
      color?: string;
    }[];
    labelsFormulaId?: string;
    formulaLabelColumnIndex?: number;
    formulaColorColumnIndex?: number;
    shouldUseFormulaForLabels?: boolean;
    hideVerticalLabels?: boolean;
    labelColor?: string;
    hideLegend?: boolean;
    rotationAngle?: number;
    topRadius?: number;
    aspectRatio?: number | null;
    yTicksPrefix?: string;
    yTicksSuffix?: string;
    animation?: boolean;
    customizeConfig?: boolean;
    customConfig?: string;
    stackedBar100Orientation?: string;
  };
};

type ChartProps = {
  element: ChartElement;
  isHidden: boolean;
  settings: CalculatorSettings;
};

const returnNumberorUndefined = (value: any) => {
  if (typeof value === 'number') {
    return value;
  }
  return undefined;
};

const Chart = ({ element, isHidden, settings }: ChartProps) => {
  const datasets = useChartDatasets(element.chart.datasets);
  const labels = useChartLabels(element);

  const { numberFormatting } = settings;

  const yAxisMinScaleOutputValue = returnNumberorUndefined(
    useOutput(`${element.reference}-yAxisMinScale`)?.result,
  );
  const yAxisMaxScaleOutputValue = returnNumberorUndefined(
    useOutput(`${element.reference}-yAxisMaxScale`)?.result,
  );
  const yAxisStepSizeOutputValue = returnNumberorUndefined(
    useOutput(`${element.reference}-yAxisStepSize`)?.result,
  );

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isError={false}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="formulas" element={element}>
        <ElementClassNameWrapper element={element}>
          <ChartTypeComponentSwitch
            elementId={element._id}
            datasets={datasets}
            type={element.chart.type}
            labels={labels}
            numberFormatting={numberFormatting}
            extraOption={{
              lineTension: element.chart.lineTension,
              useGradientFill: element.chart.useGradientFill,
              showDataPoints: element.chart.showDataPoints,
              gridColor: element.chart.gridColor,
              yAxisMinScale: yAxisMinScaleOutputValue,
              yAxisMaxScale: yAxisMaxScaleOutputValue,
              yAxisStepSize: yAxisStepSizeOutputValue,
              hideVerticalLabels: element.chart.hideVerticalLabels,
              labelColor: element.chart.labelColor,
              hideLegend: element.chart.hideLegend,
              rotationAngle: element.chart.rotationAngle,
              topRadius: element.chart.topRadius,
              aspectRatio: element.chart.aspectRatio,
              yTicksPrefix: element.chart.yTicksPrefix,
              yTicksSuffix: element.chart.yTicksSuffix,
              animation: element.chart.animation,
              customizeConfig: element.chart.customizeConfig,
              customConfig: element.chart.customConfig,
              stackedBar100Orientation: element.chart.stackedBar100Orientation,
            }}
          />
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Chart;
