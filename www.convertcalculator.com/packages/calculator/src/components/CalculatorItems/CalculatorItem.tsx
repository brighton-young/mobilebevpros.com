import { useRecoilCallback, useRecoilValue } from 'recoil';

import type { CalculatorContent } from '@cc/db';
import { CalculatorElementsEnum } from '@cc/shared/enums/calculator-elements';
import { Answer, CalculatorSettings } from '@cc/types';

import { useAnswer, useOutput } from '../../CalculatorState';
import ButtonElement from '../../elements/components/Button';
import ButtonGroupQuestion from '../../elements/components/ButtonGroup';
import Chart from '../../elements/components/Chart';
import CheckboxQuestion from '../../elements/components/Checkbox';
import ColumnElement from '../../elements/components/Column';
import ColumnsElement from '../../elements/components/Columns';
import ContainerElement from '../../elements/components/Container';
import CouponQuestion from '../../elements/components/Coupon';
import DateQuestion from '../../elements/components/Date';
import DatesQuestion from '../../elements/components/Dates';
import DividerElement from '../../elements/components/Divider';
import DropdownQuestion from '../../elements/components/Dropdown';
import EmailQuestion from '../../elements/components/Email';
import FileQuestion from '../../elements/components/File';
import FormulaFormula from '../../elements/components/Formula';
import HeadingElement from '../../elements/components/Heading';
import ImageElement from '../../elements/components/Image';
import LayeredImagesFormula from '../../elements/components/LayeredImages';
import MultipleChoiceQuestion from '../../elements/components/MultipleChoice';
import MultipleSelectionQuestion from '../../elements/components/MultipleSelection';
import NumberQuestion from '../../elements/components/Number';
import NumberIncrementerQuestion from '../../elements/components/NumberIncrementer';
import OrderListQuestion from '../../elements/components/OrderList';
import PhoneQuestion from '../../elements/components/Phone';
import PlaceQuestion from '../../elements/components/Place';
import PlacesQuestion from '../../elements/components/Places';
import RadioGroupQuestion from '../../elements/components/RadioGroup';
import RangeSliderQuestion from '../../elements/components/RangeSlider';
import SignatureQuestion from '../../elements/components/Signature';
import StateButtonQuestion from '../../elements/components/StateButton';
import SwitchQuestion from '../../elements/components/Switch';
import TableFormula from '../../elements/components/Table';
import TextElement from '../../elements/components/Text';
import TextFieldQuestion from '../../elements/components/TextField';
import TimeQuestion from '../../elements/components/Time';
import TimeslotQuestion from '../../elements/components/Timeslot';
import ViewElement from '../../elements/components/View';
import ViewBreakElement from '../../elements/components/ViewBreak';
import ViewContainerElement from '../../elements/components/ViewContainer';
import ViewContainerNavigation from '../../elements/components/ViewContainerNavigation';
import answersState from '../../recoil/answersState';
import answerState from '../../recoil/answerState';
import calculatorItemState from '../../recoil/calculatorItemState';

type Props = {
  isEditing: boolean;
  itemChildren: CalculatorContent['items'];
  itemId: string;
  onInteraction: (interaction: any) => void;
  selectedViewIndex: number;
  settings: CalculatorSettings;
  showErrors: boolean;
};

/**
 * @deprecated CalculatorItem will be removed when "dataAsPropsRefactor" feature flag
 * is stable. This will be replaced by TreeItem
 */
const CalculatorItem = ({
  isEditing,
  itemChildren,
  itemId,
  onInteraction,
  selectedViewIndex,
  settings,
  showErrors,
}: Props) => {
  const item = useRecoilValue(calculatorItemState(itemId));
  const answer = useAnswer(item.reference);

  const error = showErrors || answer.isInstantError ? answer.error : undefined;

  const visibilityOutput = useOutput(`${item.reference}-VE`);

  const isHidden = item.shouldAddVisibilityLogic && !visibilityOutput?.result;

  const handleSetAnswer = useRecoilCallback(({ set }) => {
    // eslint-disable-next-line no-shadow
    return (
      questionReference: string,
      newAnswer: Answer,
      triggerInteraction = true,
    ) => {
      set(answerState(questionReference), newAnswer);

      set(answersState, (answers) => {
        return {
          ...answers,
          [questionReference]: newAnswer,
        };
      });

      if (triggerInteraction) {
        window.requestAnimationFrame(() => {
          onInteraction({ questionReference, answer: newAnswer });
        });
      }
    };
  }, []);

  // if (shouldBlock && !isEditing) return false;

  if (item.type === CalculatorElementsEnum.BUTTON) {
    return (
      <ButtonElement
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.BUTTON_GROUP) {
    return (
      <ButtonGroupQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.CHECKBOX) {
    return (
      <CheckboxQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.COLUMN) {
    return (
      <ColumnElement
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
        itemChildren={itemChildren}
        onInteraction={onInteraction}
        selectedViewIndex={selectedViewIndex}
        showErrors={showErrors}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.COLUMNS) {
    return (
      <ColumnsElement
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
        itemChildren={itemChildren}
        onInteraction={onInteraction}
        selectedViewIndex={selectedViewIndex}
        showErrors={showErrors}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.CONTAINER) {
    return (
      <ContainerElement
        element={item}
        isHidden={isHidden}
        isEditing={isEditing}
        itemChildren={itemChildren}
        onInteraction={onInteraction}
        selectedViewIndex={selectedViewIndex}
        showErrors={showErrors}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.COUPON) {
    return (
      <CouponQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.DATE) {
    return (
      <DateQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.DATES) {
    return (
      <DatesQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.DIVIDER) {
    return (
      <DividerElement element={item} isHidden={isHidden} settings={settings} />
    );
  }

  if (item.type === CalculatorElementsEnum.DROPDOWN) {
    return (
      <DropdownQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.EMAIL) {
    return (
      <EmailQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.FILE) {
    return (
      <FileQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.FORMULA) {
    return (
      <FormulaFormula formula={item} isHidden={isHidden} settings={settings} />
    );
  }

  if (item.type === CalculatorElementsEnum.HEADING) {
    return (
      <HeadingElement element={item} isHidden={isHidden} settings={settings} />
    );
  }

  if (item.type === CalculatorElementsEnum.IMAGE) {
    return (
      <ImageElement element={item} isHidden={isHidden} settings={settings} />
    );
  }

  if (item.type === CalculatorElementsEnum.LAYERED_IMAGES) {
    return (
      <LayeredImagesFormula
        onValueChange={handleSetAnswer}
        formula={item}
        formulaState={answer}
        isHidden={isHidden}
        selectedViewIndex={selectedViewIndex}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.ORDER_LIST) {
    return (
      <OrderListQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        selectedViewIndex={selectedViewIndex}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.PHONE) {
    return (
      <PhoneQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.PLACE) {
    return (
      <PlaceQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.PLACES) {
    return (
      <PlacesQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.MULTIPLE_SELECTION) {
    return (
      <MultipleSelectionQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
        selectedViewIndex={selectedViewIndex}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.MULTIPLE_CHOICE) {
    return (
      <MultipleChoiceQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        selectedViewIndex={selectedViewIndex}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.NUMBER) {
    return (
      <NumberQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.NUMBER_INCREMENTER) {
    return (
      <NumberIncrementerQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        x
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.RADIO_GROUP) {
    return (
      <RadioGroupQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        selectedViewIndex={selectedViewIndex}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.RANGE_SLIDER) {
    return (
      <RangeSliderQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.SIGNATURE) {
    return (
      <SignatureQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
        selectedViewIndex={selectedViewIndex}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.SWITCH) {
    return (
      <SwitchQuestion
        error={error}
        isHidden={isHidden}
        settings={settings}
        onValueChange={handleSetAnswer}
        question={item}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.STATE_BUTTON) {
    return (
      <StateButtonQuestion
        onValueChange={handleSetAnswer}
        valueObject={answer}
        question={item}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.TABLE) {
    return (
      <TableFormula
        formula={item}
        formulaState={answer}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.TEXT) {
    return (
      <TextElement element={item} isHidden={isHidden} settings={settings} />
    );
  }

  if (item.type === CalculatorElementsEnum.TEXT_FIELD) {
    return (
      <TextFieldQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.TIME) {
    return (
      <TimeQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.TIMESLOT) {
    return (
      <TimeslotQuestion
        error={error}
        isHidden={isHidden}
        onValueChange={handleSetAnswer}
        question={item}
        settings={settings}
        valueObject={answer}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.VIEW_BREAK) {
    return (
      <ViewBreakElement
        element={item}
        isHidden={isHidden}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.CHART) {
    return <Chart element={item} isHidden={isHidden} settings={settings} />;
  }

  if (item.type === CalculatorElementsEnum.VIEW_CONTAINER) {
    return (
      <ViewContainerElement
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
        itemChildren={itemChildren}
        onInteraction={onInteraction}
        selectedViewIndex={selectedViewIndex}
        showErrors={showErrors}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.VIEW) {
    return (
      <ViewElement
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
        itemChildren={itemChildren}
        onInteraction={onInteraction}
        selectedViewIndex={selectedViewIndex}
        showErrors={showErrors}
        settings={settings}
      />
    );
  }

  if (item.type === CalculatorElementsEnum.VIEW_NAVIGATION) {
    return (
      <ViewContainerNavigation
        element={item}
        isEditing={isEditing}
        isHidden={isHidden}
      />
    );
  }

  return <></>;
};

export default CalculatorItem;
