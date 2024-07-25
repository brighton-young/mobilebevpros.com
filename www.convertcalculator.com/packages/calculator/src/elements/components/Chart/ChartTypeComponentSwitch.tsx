import { useEffect, useMemo } from 'react';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import dynamic from 'next/dynamic';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';

import { ChartTypeEnum } from '@cc/shared/enums/chart-types';

import { useIsEditing } from '../../../CalculatorState';

import { getChartData, getChartOptions } from './helpers';

// the stacked bar 100 chart is a special case that needs to be imported dynamically
// see: https://github.com/y-takey/chartjs-plugin-stacked100/issues/87
const StackedBar100Chart = dynamic(
  () => {
    return import('./StackedBar100Chart');
  },
  {
    ssr: false,
  },
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale,
);

export interface Props {
  elementId?: string;
  type: ChartTypeEnum;
  labels: {
    _id: string;
    color?: string;
    label?: string;
  }[];
  datasets: {
    _id: string;
    color?: string;
    label?: string;
    name: string;
    reference: string;
    referenceColor: string;
    result: number[];
    lineWidth?: number;
    useLineType?: boolean;
    useBarType?: boolean;
  }[];
  extraOption?: {
    lineTension?: number;
    useGradientFill?: boolean;
    showDataPoints?: boolean;
    gridColor?: string;
    yAxisMinScale?: number;
    yAxisMaxScale?: number;
    yAxisStepSize?: number;
    hideVerticalLabels?: boolean;
    labelColor?: string;
    hideLegend?: boolean;
    rotationAngle?: number;
    topRadius?: number;
    aspectRatio?: number;
    yTicksPrefix?: string;
    yTicksSuffix?: string;
    animation?: boolean;
    customizeConfig?: boolean;
    customConfig?: string;
    stackedBar100Orientation?: string;
  };
  numberFormatting: string;
}

export const ChartTypeComponentSwitch = ({
  type,
  labels,
  datasets,
  extraOption = {},
  numberFormatting,
  elementId,
}: Props) => {
  const isEditing = useIsEditing();

  const data = useMemo(() => {
    return getChartData({ type, labels, datasets, extraOption });
  }, [type, labels, datasets, extraOption]);

  const options = useMemo(() => {
    return getChartOptions({ type, extraOption, numberFormatting });
  }, [type, extraOption, numberFormatting]);

  useEffect(() => {
    if (isEditing) {
      console.log(`Chart options for #${elementId}`, options);
    }
  }, [options, isEditing]);

  switch (type) {
    case ChartTypeEnum.LINE:
      return <Line data={data} options={options} />;
    case ChartTypeEnum.BAR:
      return <Bar data={data} options={options} />;
    case ChartTypeEnum.STACKED_BAR:
      return <Bar data={data} options={options} />;
    case ChartTypeEnum.HORIZONTAL_BAR:
      return <Bar data={data} options={options} />;
    case ChartTypeEnum.POLAR_AREA:
      return <PolarArea data={data} options={options} />;
    case ChartTypeEnum.DOUGHNUT:
      return <Doughnut data={data} options={options} />;
    case ChartTypeEnum.PIE:
      return <Pie data={data} options={options} />;
    case ChartTypeEnum.RADAR:
      return <Radar data={data} options={options} />;
    case ChartTypeEnum.STACKED_BAR_100:
      return (
        <StackedBar100Chart
          data={data}
          options={options}
          orientation={extraOption?.stackedBar100Orientation}
        />
      );
    default:
      return null;
  }
};
