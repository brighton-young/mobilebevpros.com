import React from 'react';

import CheckIcon from './components/CheckIcon';
import ChevronLeftIcon from './components/ChevronLeftIcon';
import ChevronRightIcon from './components/ChevronRightIcon';
import LoaderIcon from './components/LoaderIcon';
import MinusIcon from './components/MinusIcon';
import PlusIcon from './components/PlusIcon';
import PrintIcon from './components/PrintIcon';
import RefreshIcon from './components/RefreshIcon';
import SparklesIcon from './components/SparklesIcon';
import UploadIcon from './components/UploadIcon';
import XIcon from './components/XIcon';

const icons = {
  check: CheckIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  loader: LoaderIcon,
  minus: MinusIcon,
  plus: PlusIcon,
  print: PrintIcon,
  refresh: RefreshIcon,
  x: XIcon,
  upload: UploadIcon,
  sparkles: SparklesIcon,
} as const;

type IconName = keyof typeof icons;

type RestProps<N extends IconName> = Parameters<(typeof icons)[N]>[0];

type IconProps<N extends IconName> = {
  name: N;
  style?: React.CSSProperties;
} & RestProps<N>;

const Icon = <N extends IconName>(props: IconProps<N>) => {
  const { name } = props;
  const IconComponent = icons[name];

  if (!IconComponent) return <></>;

  const { style = {}, ...restProps } = props;

  return (
    <IconComponent
      {...restProps}
      style={{ verticalAlign: 'middle', ...style }}
    />
  );
};

export default Icon;
