import { useState } from 'react';

import styled from 'styled-components';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getLetterFromIndex from '@cc/shared/utils/getLetterFromIndex';
import { CalculatorSettings } from '@cc/types';

import { useOutput } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import ImageSelector from '../../../components/ImageSelector';
import IncrementerField from '../../../components/IncrementerField';
import NumberField from '../../../components/NumberField';
import Tooltip from '../../../components/Tooltip';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getInputStyleVariables from '../../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../../styles/useStyles';
import getFormattedNumber from '../../../util/getFormattedNumber';

const OrderListContainer = styled.div`
  ${({ isInline }) => {
    if (!isInline) return '';

    return `
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.25rem;
    `;
  }}
`;

const Flex = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0rem !important;
  }
`;

const FlexChildGrowing = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 1rem;
`;

const FlexChildShrinking = styled.div`
  flex-shrink: 1;
`;

const ItemName = styled.h4`
  margin: 0px;
  padding: 0px;
`;

const ItemValue = styled.p`
  margin: 0px;
  padding: 0px;
`;

const IncrementerFieldWrapper = styled.div`
  padding-top: 0.5rem;
`;

const LabelValue = styled.span`
  font-size: 0.75rem;
`;

const useItems = ({ orderList, reference }) => {
  const {
    shouldUseFormulaForItems,
    itemsFormulaLabelColumnIndex,
    itemsFormulaValueColumnIndex,
    itemsFormulaImageColumnIndex,
    itemsFormulaTooltipTextColumnIndex,
    items: itemsFromSettings,
  } = orderList;

  const output = useOutput(`${reference}-RF`);

  if (!shouldUseFormulaForItems) return itemsFromSettings;

  const isMatrix =
    output?.result &&
    Array.isArray(output.result) &&
    Array.isArray(output.result[0]);

  if (!isMatrix) return [];

  return output.result.map((row, index) => {
    return {
      _id: `${reference}-RF-${row[itemsFormulaLabelColumnIndex || 0]}`,
      name: row[itemsFormulaLabelColumnIndex || 0],
      value:
        itemsFormulaValueColumnIndex == null
          ? index + 1
          : row[itemsFormulaValueColumnIndex],
      tooltipText: row[itemsFormulaTooltipTextColumnIndex],
      image: row[itemsFormulaImageColumnIndex],
    };
  });
};

const NumberValue = ({
  name,
  value,
  prefix,
  postfix,
  numberFormatting,
  handleChange,
}) => {
  const styles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  return (
    <NumberField
      className="cc__number-question-input"
      numberFormatting={numberFormatting}
      prefix={prefix}
      suffix={postfix}
      onClick={(ev) => {
        ev.stopPropagation();
      }}
      onChange={(newValue) => {
        handleChange(name, Number(newValue));
      }}
      value={value}
      styles={styles}
    />
  );
};

type OrderListProps = {
  error: string;
  isHidden: boolean;
  settings: CalculatorSettings;
  onValueChange: HandleValueChange;
  question: OrderListElement;
  valueObject: ValueObject;
};

export type OrderListElement = {
  type: 'orderList';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  orderList: {
    default: number;
    hasTooltips?: boolean;
    imagesPerRow?: number;
    imagesPerRowMobile?: number;
    items: {
      _id: string;
      image?: string;
      name?: string;
      tooltipText?: string;
      value?: number;
    }[];
    itemsFormula?: string;
    itemsFormulaLabelColumnIndex?: number;
    itemsFormulaValueColumnIndex?: number;
    itemsFormulaImageColumnIndex?: number;
    itemsFormulaTooltipTextColumnIndex?: number;
    max?: number;
    min?: number;
    postfix?: string;
    prefix?: string;
    shouldShowValue?: boolean;
    shouldUseNumberInputField?: boolean;
    shouldUseFormulaForItems?: boolean;
    shouldUseImages?: boolean;
    step?: number;
  };
};

const OrderList = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: OrderListProps) => {
  const { messages, numberFormatting } = settings;
  const {
    default: defaultValue,
    hasTooltips,
    imagesPerRow,
    imagesPerRowMobile,
    max,
    min,
    postfix = '',
    prefix = '',
    shouldShowValue,
    shouldUseImages,
    shouldUseNumberInputField,
    step,
  } = question.orderList;

  const items = useItems(question);

  const [itemValues, setItemValues] = useState(
    items.reduce((acc, item) => {
      const previous = valueObject?.data?.order?.find(({ itemId }) => {
        return itemId === item._id;
      })?.qty;
      return {
        ...acc,
        [item._id]: previous !== undefined ? previous : defaultValue,
      };
    }, {}),
  );

  const getValueObject = (newItemValues) => {
    if (!Array.isArray(items) || items.length === 0) return {};

    const order = items
      .map((item) => {
        const qty = newItemValues[item._id] || 0;
        const total = qty * item.value || 0;

        return {
          itemId: item._id,
          label: `${qty}x ${item.name}`,
          name: item.name,
          qty,
          qtyFormatted: getFormattedNumber(numberFormatting, qty),
          total,
          totalFormatted: `${prefix}${getFormattedNumber(
            numberFormatting,
            total,
          )}`,
          value: item.value,
          valueFormatted: `${prefix}${getFormattedNumber(
            numberFormatting,
            item.value,
          )}`,
        };
      })
      .filter((i) => {
        return i.qty;
      });

    const itemReferences = items.reduce((acc, item, index) => {
      const qty = newItemValues[item._id] || 0;
      const total = qty * item.value;

      return { ...acc, [`I${getLetterFromIndex(index)}`]: total };
    }, {});

    const label = order
      .map((item) => {
        return item.label;
      })
      .join(' + ');

    const value = order.reduce((acc, item) => {
      return acc + item.total;
    }, 0);

    const qty = order.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    return {
      label,
      value,
      data: {
        ...itemReferences,
        order,
        qty,
      },

      error:
        !value && question.isRequired
          ? messages.orderListSelectionRequired
          : undefined,
    };
  };

  const handleChange = (name, value) => {
    const newItemValues = { ...itemValues, [name]: value };

    setItemValues(newItemValues);

    const newValue = getValueObject(newItemValues);

    onValueChange(question.reference, newValue);
  };

  // this is a hack to make sure the value is updated when the items change
  // it is possible for value to change even though the internal state of the component
  // has not changed. For example, when the items formula returns a different set of items.
  // See: https://github.com/convertcalculator/convertcalculator/issues/287
  useEffectDeepCompare(() => {
    const value = getValueObject(itemValues);

    onValueChange(question.reference, value);
  }, [items]);

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <OrderListContainer isInline={shouldUseImages}>
            {items.map((item) => {
              const value = Number.isInteger(itemValues[item._id])
                ? itemValues[item._id]
                : defaultValue;
              const formattedValue = getFormattedNumber(
                numberFormatting,
                item.value,
              );

              if (shouldUseImages) {
                return (
                  <ImageSelector
                    key={item._id}
                    className="cc__orderList-question-item--image"
                    id={item._id}
                    name={question._id}
                    value={item._id}
                    imagesPerRow={imagesPerRow}
                    imagesPerRowMobile={imagesPerRowMobile}
                    imageUrl={item.image}
                    isHidden={isHidden}
                    label={
                      <>
                        {item.name}
                        {!shouldShowValue &&
                          hasTooltips &&
                          item.tooltipText && (
                            <>
                              {' '}
                              <Tooltip position="top">
                                {item.tooltipText}
                              </Tooltip>
                            </>
                          )}
                        {shouldShowValue && (
                          <LabelValue>
                            <br />
                            {prefix}
                            {formattedValue}
                            {postfix}

                            {hasTooltips && !!item.tooltipText && (
                              <span>
                                {' '}
                                <Tooltip position="top">
                                  {item.tooltipText}
                                </Tooltip>
                              </span>
                            )}
                          </LabelValue>
                        )}
                        <IncrementerFieldWrapper>
                          <IncrementerField
                            alignment="center"
                            max={max}
                            min={min}
                            name={item._id}
                            onChange={handleChange}
                            step={step}
                            value={value}
                            acceptZero={!question.isRequired}
                          >
                            {shouldUseNumberInputField ? (
                              <NumberValue
                                name={item._id}
                                value={value}
                                prefix={prefix}
                                postfix={postfix}
                                numberFormatting={numberFormatting}
                                handleChange={handleChange}
                              />
                            ) : (
                              value
                            )}
                          </IncrementerField>
                        </IncrementerFieldWrapper>
                      </>
                    }
                  />
                );
              }

              return (
                <Flex
                  key={item._id}
                  className="cc__orderList-question-item"
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  middle
                >
                  <FlexChildShrinking>
                    <IncrementerField
                      max={max}
                      min={min}
                      name={item._id}
                      onChange={handleChange}
                      step={step}
                      value={value}
                      acceptZero={!question.isRequired}
                    >
                      {shouldUseNumberInputField ? (
                        <NumberValue
                          name={item._id}
                          value={value}
                          numberFormatting={numberFormatting}
                          handleChange={handleChange}
                        />
                      ) : (
                        value
                      )}
                    </IncrementerField>
                  </FlexChildShrinking>
                  <FlexChildGrowing>
                    <ItemName className="cc__orderList-question-item-name">
                      {item.name}
                      {!shouldShowValue &&
                        hasTooltips &&
                        !!item.tooltipText && (
                          <span>
                            {' '}
                            <Tooltip position="top">{item.tooltipText}</Tooltip>
                          </span>
                        )}{' '}
                    </ItemName>
                    {shouldShowValue && (
                      <ItemValue className="cc__orderList-question-item-value">
                        <span>
                          {prefix}
                          {formattedValue}
                          {postfix}
                        </span>
                        {hasTooltips && !!item.tooltipText && (
                          <span>
                            {' '}
                            <Tooltip position="top">{item.tooltipText}</Tooltip>
                          </span>
                        )}
                      </ItemValue>
                    )}
                  </FlexChildGrowing>
                </Flex>
              );
            })}
          </OrderListContainer>

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default OrderList;
