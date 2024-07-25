import React from 'react';

import { CalculatorSettings } from '@cc/types';

import ButtonElement from '../elements/components/Button';
import ButtonGroupQuestion from '../elements/components/ButtonGroup';
import ChamberOfCommerce from '../elements/components/ChamberOfCommerce';
import Chart from '../elements/components/Chart';
import CheckboxQuestion from '../elements/components/Checkbox';
import ColumnElement from '../elements/components/Column';
import ColumnsElement from '../elements/components/Columns';
import ContainerElement from '../elements/components/Container';
import CouponQuestion from '../elements/components/Coupon';
import DateQuestion from '../elements/components/Date';
import DatesQuestion from '../elements/components/Dates';
import DividerElement from '../elements/components/Divider';
import DropdownQuestion from '../elements/components/Dropdown';
import EmailQuestion from '../elements/components/Email';
import FileQuestion from '../elements/components/File';
import FormulaFormula from '../elements/components/Formula';
import HeadingElement from '../elements/components/Heading';
import ImageElement from '../elements/components/Image';
import LayeredImagesFormula from '../elements/components/LayeredImages';
import MultipleChoiceQuestion from '../elements/components/MultipleChoice';
import MultipleSelectionQuestion from '../elements/components/MultipleSelection';
import NumberQuestion from '../elements/components/Number';
import NumberIncrementerQuestion from '../elements/components/NumberIncrementer';
import OrderListQuestion from '../elements/components/OrderList';
import PhoneQuestion from '../elements/components/Phone';
import PlaceQuestion from '../elements/components/Place';
import PlacesQuestion from '../elements/components/Places';
import ProgressBar from '../elements/components/ProgressBar/ProgressBar';
import RadioGroupQuestion from '../elements/components/RadioGroup';
import RangeSliderQuestion from '../elements/components/RangeSlider';
import SignatureQuestion from '../elements/components/Signature';
import StateButtonQuestion from '../elements/components/StateButton';
import SwitchQuestion from '../elements/components/Switch';
import TableFormula from '../elements/components/Table';
import TextElement from '../elements/components/Text';
import TextFieldQuestion from '../elements/components/TextField';
import TimeQuestion from '../elements/components/Time';
import TimeslotQuestion from '../elements/components/Timeslot';
import ViewElement from '../elements/components/View';
import ViewBreakElement from '../elements/components/ViewBreak';
import ViewContainerElement from '../elements/components/ViewContainer';
import ViewContainerNavigation from '../elements/components/ViewContainerNavigation';

import { TreeItemType, TreePath } from './TreeRenderer';

export type HandleValueChange = (
  name: string,
  value: any,
  triggerInteraction?: boolean,
) => void;

export type ValueObject<D = Record<string, any>, V = number> = {
  _id?: string;
  data?: D;
  error?: string;
  isInstantError?: boolean;
  isValid?: boolean;
  isValueEmpty?: boolean;
  value?: V;
  label?: string;
};

type TreeItemElementRendererProps = {
  error?: string;
  isHidden: boolean;
  element: TreeItemType;
  onValueChange: HandleValueChange;
  settings: CalculatorSettings;
  treePath: TreePath;
  treeRenderer: React.JSX.Element;
  valueObject: ValueObject;
};

const TreeItemElementRenderer = ({
  element,
  error,
  isHidden,
  onValueChange,
  settings,
  treeRenderer,
  valueObject,
}: TreeItemElementRendererProps) => {
  if (element.type === 'button') {
    return (
      <ButtonElement
        element={element}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (element.type === 'buttonGroup') {
    return (
      <ButtonGroupQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'chamberOfCommerce') {
    return (
      <ChamberOfCommerce
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'chart') {
    return <Chart element={element} isHidden={isHidden} settings={settings} />;
  }

  if (element.type === 'checkbox') {
    return (
      <CheckboxQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'column') {
    return (
      <ColumnElement
        element={element}
        hasChildren={element.children.length > 0}
        treeRenderer={treeRenderer}
      />
    );
  }

  if (element.type === 'columns') {
    return (
      <ColumnsElement
        hasChildren={element.children.length > 0}
        element={element}
        isHidden={isHidden}
        treeRenderer={treeRenderer}
      />
    );
  }

  if (element.type === 'container') {
    return (
      <ContainerElement
        element={element}
        hasChildren={element.children.length > 0}
        isHidden={isHidden}
        treeRenderer={treeRenderer}
      />
    );
  }

  if (element.type === 'coupon') {
    return (
      <CouponQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'date') {
    return (
      <DateQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'dates') {
    return (
      <DatesQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'divider') {
    return <DividerElement element={element} isHidden={isHidden} />;
  }

  if (element.type === 'dropdown') {
    return (
      <DropdownQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'email') {
    return (
      <EmailQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'file') {
    return (
      <FileQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'formula') {
    return (
      <FormulaFormula
        formula={element}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (element.type === 'heading') {
    return <HeadingElement element={element} isHidden={isHidden} />;
  }

  if (element.type === 'image') {
    return <ImageElement element={element} isHidden={isHidden} />;
  }

  if (element.type === 'layeredImages') {
    return <LayeredImagesFormula formula={element} isHidden={isHidden} />;
  }

  if (element.type === 'orderList') {
    return (
      <OrderListQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'phone') {
    return (
      <PhoneQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'place') {
    return (
      <PlaceQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'places') {
    return (
      <PlacesQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={
          valueObject as ValueObject<{
            distance: number;
            duration: number;
            fromPlaceId: string;
            toPlaceId: string;
          }>
        }
      />
    );
  }

  if (element.type === 'multipleSelection') {
    return (
      <MultipleSelectionQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={
          valueObject as ValueObject<{
            checkedOptions: Record<string, boolean>;
          }>
        }
      />
    );
  }

  if (element.type === 'multipleChoice') {
    return (
      <MultipleChoiceQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'number') {
    return (
      <NumberQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'numberIncrementer') {
    return (
      <NumberIncrementerQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'radioGroup') {
    return (
      <RadioGroupQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'rangeSlider') {
    return (
      <RangeSliderQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'signature') {
    return (
      <SignatureQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'switch') {
    return (
      <SwitchQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={onValueChange}
        question={element}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'stateButton') {
    return (
      <StateButtonQuestion
        onValueChange={onValueChange}
        valueObject={valueObject}
        question={element}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (element.type === 'table') {
    return (
      <TableFormula formula={element} isHidden={isHidden} settings={settings} />
    );
  }

  if (element.type === 'text') {
    return <TextElement element={element} isHidden={isHidden} />;
  }

  if (element.type === 'textField') {
    return (
      <TextFieldQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'time') {
    return (
      <TimeQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'timeslot') {
    return (
      <TimeslotQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={onValueChange}
        question={element}
        settings={settings}
        valueObject={valueObject}
      />
    );
  }

  if (element.type === 'viewBreak') {
    return (
      <ViewBreakElement
        element={element}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (element.type === 'viewContainer') {
    return (
      <ViewContainerElement
        element={element}
        isHidden={isHidden}
        treeRenderer={treeRenderer}
        settings={settings}
      />
    );
  }

  if (element.type === 'view') {
    return (
      <ViewElement
        element={element}
        isHidden={isHidden}
        treeRenderer={treeRenderer}
        settings={settings}
      />
    );
  }

  if (element.type === 'viewNavigation') {
    return <ViewContainerNavigation element={element} isHidden={isHidden} />;
  }

  if (element.type === 'progressBar') {
    return <ProgressBar element={element} isHidden={isHidden} />;
  }

  return <></>;
};

export default TreeItemElementRenderer;
