import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { useIsTesting } from '../../../../../CalculatorState';
import Callout from '../../../../../components/Callout';
import CountrySelectorField from '../../../../../components/CountrySelectorField';
import Input from '../../../../../components/Input';
import { renderMessage } from '../../../../../i18n/text';
import { colors } from '../../../../../styles';
import getButtonStyleVariables from '../../../../../styles/styleVariables/buttonStyleVariables';
import getInputStyleVariables from '../../../../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../../../../styles/useStyles';
import Button from '../../../../common/components/Button';

const StyledIdealElement = styled(Input)`
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
  background-origin: content-box;
  background-position: right -0.75rem center;
  background-repeat: no-repeat;
  background-size: 9px 6px;
  padding-right: 1.5rem;
  cursor: pointer;s
  padding: 0px;
`;

const Spacer = styled.div`
  display: block;
  height: 1rem;
  width: 100%;
`;

const Ul = styled.ul`
  margin-top: 1rem;
  margin-bottom: 0;
`;

const Flex = styled.div`
  display: flex;
`;

const FlexChild = styled.div`
  width: 50%;

  &:first-child {
    padding-right: 0.5rem;
  }

  &:last-child {
    padding-left: 0.5rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  list-style: none;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  appearance: none;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0;
  color: ${colors.mediumGray}

  &:first-child {
    margin-right: 0.5rem;
  }

  &:last-child {
    margin-left: 0.5rem;
  }

  ${(props) => {
    const { isActive } = props;

    if (!isActive) return '';

    return `
      border-bottom: 2px solid ${colors.mediumGray}

    `;
  }}
`;

const CheckoutForm = ({
  buttonText,
  settings,
  captureBillingAddress = false,
  captureZipCode = false,
  initialFormData = {},
  isDisabled = false,
  isSubscription = false,
  onSubmit,
  paymentMethodTypes = ['card'],
  stripeInstance,
}) => {
  const isTesting = useIsTesting();
  const { language } = settings;

  const emailRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (!initialFormData.billingEmail) {
      emailRef.current.focus();
    }

    if (initialFormData.billingEmail && captureBillingAddress) {
      nameRef.current.focus();
    }
  }, []);

  const [selectedPaymentMethodType, setSelectedPaymentMethodType] = useState(
    paymentMethodTypes[0],
  );
  const [formData, setFormData] = useState(initialFormData);
  const [stripeId, setStripeId] = useState(undefined);

  const setFieldValue = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const paymentElementRef = useRef(undefined);

  useEffect(() => {
    if (selectedPaymentMethodType !== 'ideal') return;

    const elements = stripeInstance.elements();
    const elementOptions = getElementOptions();

    const idealElement = elements.create('idealBank', elementOptions);
    idealElement.mount('#ideal-bank-element');

    idealElement.on('change', async () => {
      const response = await stripeInstance.createPaymentMethod(
        'ideal',
        idealElement,
      );

      if (!response.error) {
        setStripeId({
          value: response.paymentMethod.id,
          type: 'stripePaymentMethodId',
        });
      }
    });

    paymentElementRef.current = idealElement;
  }, [selectedPaymentMethodType]);

  useEffect(() => {
    if (selectedPaymentMethodType !== 'card') return;

    const elements = stripeInstance.elements();

    const elementOptions = getElementOptions();

    const cardElement = elements.create('card', {
      ...elementOptions,
      hidePostalCode: !captureZipCode,
    });
    cardElement.mount('#card-element');

    cardElement.on('ready', () => {
      if (initialFormData.billingEmail && !captureBillingAddress) {
        cardElement.focus();
      }
    });

    cardElement.on('change', async (ev) => {
      if (ev.complete) {
        if (isSubscription) {
          const response = await stripeInstance.createToken(cardElement);

          if (!response.error) {
            setStripeId({ value: response.token.id, type: 'stripeTokenId' });
          }
        } else {
          const response = await stripeInstance.createPaymentMethod(
            'card',
            cardElement,
          );

          if (!response.error) {
            setStripeId({
              value: response.paymentMethod.id,
              type: 'stripePaymentMethodId',
            });
          }
        }
      }
    });

    paymentElementRef.current = cardElement;
  }, [selectedPaymentMethodType]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFieldValue(name, value);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    onSubmit(
      {
        ...formData,
        [stripeId.type]: stripeId.value,
        paymentMethodType: selectedPaymentMethodType,
      },
      paymentElementRef.current,
    );
  };

  const isValid =
    validate(formData, captureBillingAddress) &&
    stripeId &&
    stripeId.value &&
    stripeId.type;

  const isTestingEnvironment =
    isTesting || process.env.NEXT_PUBLIC_APP_ENV !== 'production';

  const inputStyles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  const buttonStyles = useStyles({
    prefix: 'button',
    getVariables: getButtonStyleVariables,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        styles={inputStyles}
        ref={emailRef}
        type="email"
        name="billingEmail"
        id="billingEmail"
        placeholder={renderMessage('billingEmailPlaceholder', language)}
        onChange={handleChange}
        required
        value={formData.billingEmail || ''}
      />

      <Spacer />

      {captureBillingAddress && (
        <>
          <Input
            styles={inputStyles}
            ref={nameRef}
            type="text"
            name="billingName"
            id="billingName"
            placeholder={renderMessage('billingNamePlaceholder', language)}
            onChange={handleChange}
            required
            value={formData.billingName || ''}
          />
          <Spacer />

          <Input
            styles={inputStyles}
            type="text"
            name="billingAddressLine1"
            id="billingAddressLine1"
            placeholder={renderMessage(
              'billingAddressLine1Placeholder',
              language,
            )}
            onChange={handleChange}
            required
            value={formData.billingAddressLine1 || ''}
          />
          <Spacer />

          <Flex>
            <FlexChild>
              <Input
                styles={inputStyles}
                type="text"
                name="billingAddressZip"
                id="billingAddressZip"
                placeholder={renderMessage(
                  'billingAddressZipPlaceholder',
                  language,
                )}
                onChange={handleChange}
                required
                value={formData.billingAddressZip || ''}
              />
            </FlexChild>
            <FlexChild>
              <Input
                styles={inputStyles}
                type="text"
                name="billingAddressCity"
                id="billingAddressCity"
                placeholder={renderMessage(
                  'billingAddressCityPlaceholder',
                  language,
                )}
                onChange={handleChange}
                required
                value={formData.billingAddressCity || ''}
              />
            </FlexChild>
          </Flex>
          <Spacer />

          <CountrySelectorField
            language={settings.language}
            name="billingAddressCountry"
            id="billingAddressCountry"
            placeholder={renderMessage(
              'billingAddressCountryPlaceholder',
              language,
            )}
            onChange={setFieldValue}
            required
            value={formData.billingAddressCountry || ''}
          />
          <Spacer />
        </>
      )}

      {paymentMethodTypes.length > 1 && (
        <Tabs>
          {paymentMethodTypes.includes('card') && (
            <TabButton
              type="button"
              onClick={() => {
                setSelectedPaymentMethodType('card');
              }}
              isActive={selectedPaymentMethodType === 'card'}
            >
              Card
            </TabButton>
          )}

          {paymentMethodTypes.includes('ideal') && (
            <TabButton
              type="button"
              onClick={() => {
                setSelectedPaymentMethodType('ideal');
              }}
              isActive={selectedPaymentMethodType === 'ideal'}
            >
              iDeal
            </TabButton>
          )}
        </Tabs>
      )}

      {selectedPaymentMethodType === 'card' && (
        <>
          <Input styles={inputStyles} as="div" id="card-element" />

          <Spacer />

          {isTestingEnvironment && (
            <Callout variant="warning">
              You are currently in &quot;testing mode&quot;. You can use the
              following card numbers with to test payments with a expiry date in
              the future and a random CVC:
              <br />
              <Ul>
                <li>
                  <code>4242 4242 4242 4242 (US)</code>
                </li>
                <li>
                  <code>4000 0027 6000 3184 (3D secure)</code>
                </li>
              </Ul>
            </Callout>
          )}
        </>
      )}

      {selectedPaymentMethodType === 'ideal' && (
        <>
          <StyledIdealElement
            styles={inputStyles}
            as="div"
            id="ideal-bank-element"
          />

          <Spacer />

          {isTestingEnvironment && (
            <Callout variant="warning">
              You are currently in &quot;testing mode&quot;. To test an iDeal
              payment, select your bank, fill out the necessary payment details
              and proceed. You will then see a test window where you can accept
              or decline the payment.
            </Callout>
          )}
        </>
      )}

      <Button
        type="submit"
        disabled={!isValid || isDisabled}
        settings={settings}
        styles={buttonStyles}
      >
        {buttonText}
      </Button>
    </form>
  );
};

const getElementOptions = () => {
  return {
    style: {
      base: {
        iconColor: '#2E44CB',
        color: '#606f7b',
        fontWeight: 300,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.5,
        '::placeholder': {
          color: '#b8c2cc',
        },
        padding: '8px',
      },
      invalid: {
        iconColor: '#e3342f',
        color: '#e3342f',
      },
    },
  };
};

const validate = (formData, captureBillingAddress) => {
  const fields = [
    'billingEmail',
    ...(captureBillingAddress
      ? [
          'billingName',
          'billingAddressLine1',
          'billingAddressZip',
          'billingAddressCity',
          'billingAddressCountry',
        ]
      : []),
  ];

  return fields.reduce((valid, field) => {
    if (!valid) return valid;

    return !!formData[field];
  }, true);
};

export default CheckoutForm;
