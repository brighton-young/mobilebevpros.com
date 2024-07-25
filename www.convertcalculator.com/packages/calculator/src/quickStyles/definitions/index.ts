import { StyleInputType } from '../../styles/inputType';

import { buttonQuickStylesDefinitions } from './button';
import { buttonGroupQuickStylesDefinitions } from './buttonGroup';
import { checkboxQuickStylesDefinitions } from './checkbox';
import { containerQuickStylesDefinitions } from './container';
import { fileQuickStylesDefinitions } from './file';
import { headingQuickStylesDefinitions } from './heading';
import { inputQuickStylesDefinitions } from './input';
import { labelQuickStylesDefinitions } from './label';
import { linkQuickStylesDefinitions } from './link';
import { numberIncrementerQuickStylesDefinitions } from './numberIncrementer';
import { progressBarQuickStylesDefinitions } from './progressBar';
import { radioGroupQuickStylesDefinitions } from './radioGroup';
import { rangeSliderQuickStylesDefinitions } from './rangeSlider';
import { stateButtonQuickStylesDefinitions } from './stateButton';
import { stepsQuickStylesDefinitions } from './steps';
import { tabsQuickStylesDefinitions } from './tabs';
import { textQuickStylesDefinitions } from './text';
import { themeQuickStylesDefinitions } from './theme';
import { tooltipQuickStylesDefinitions } from './tooltip';

export const quickStylesDefinitions = {
  ...themeQuickStylesDefinitions,
  ...headingQuickStylesDefinitions,
  ...labelQuickStylesDefinitions,
  ...inputQuickStylesDefinitions,
  ...rangeSliderQuickStylesDefinitions,
  ...buttonQuickStylesDefinitions,
  ...linkQuickStylesDefinitions,
  ...containerQuickStylesDefinitions,
  ...textQuickStylesDefinitions,
  ...radioGroupQuickStylesDefinitions,
  ...buttonGroupQuickStylesDefinitions,
  ...stateButtonQuickStylesDefinitions,
  ...fileQuickStylesDefinitions,
  ...numberIncrementerQuickStylesDefinitions,
  ...checkboxQuickStylesDefinitions,
  ...tooltipQuickStylesDefinitions,
  ...tabsQuickStylesDefinitions,
  ...progressBarQuickStylesDefinitions,
  ...stepsQuickStylesDefinitions,
} satisfies Record<string, StyleInputType>;
