import { StyleInputType } from '../inputType';

import { buttonStylesDefinitions } from './button';
import { containerStylesDefinitions } from './container';
import { headingStylesDefinitions } from './heading';
import { inputStylesDefinitions } from './input';
import { itemStylesDefinitions } from './item';
import { labelStylesDefinitions } from './label';
import { linkStylesDefinitions } from './link';
import { textStylesDefinitions } from './text';
import { themeStylesDefinitions } from './theme';

export const stylesDefinitions = {
  ...themeStylesDefinitions,
  ...buttonStylesDefinitions,
  ...containerStylesDefinitions,
  ...headingStylesDefinitions,
  ...inputStylesDefinitions,
  ...itemStylesDefinitions,
  ...labelStylesDefinitions,
  ...linkStylesDefinitions,
  ...textStylesDefinitions,
} satisfies Record<string, StyleInputType>;
