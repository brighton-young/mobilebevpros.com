import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { CalculatorSettings } from '@cc/types';

import {
  useAnswers,
  useIsProduction,
  useIsTesting,
  useOutput,
} from '../../../../../CalculatorState';
import Callout from '../../../../../components/Callout';
import useCheckoutWithStripe from '../../../../../effects/useCheckoutWithStripe';
import { getClientHref } from '../../../../../helpers';
import calculatorState from '../../../../../recoil/calculatorState';
import getFormattedFormula from '../../../../../util/getFormattedFormula';
import useScript from '../../../../../util/useScript';

import CheckoutForm from './CheckoutForm';

declare global {
  interface Window {
    Stripe: any;
  }
}

const getStripeInstance = ({ stripePublishableKey, stripeUserId }) => {
  if (typeof window.Stripe !== 'function') return undefined;

  return window.Stripe(stripePublishableKey, {
    stripeAccount: stripeUserId,
  });
};

export const useStripe = ({ stripeUserId, isProduction }) => {
  const [stripeInstance, setStripeInstance] = useState(undefined);

  const isLoaded = useScript({
    src: 'https://js.stripe.com/v3/',
    id: 'stripe-script-embed',
  });

  const stripePublishableKey = isProduction
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY;

  useEffect(() => {
    if (!isLoaded || !stripeUserId) return;

    const stripe = getStripeInstance({ stripePublishableKey, stripeUserId });
    setStripeInstance(stripe);
  }, [stripeUserId, isProduction, isLoaded]);

  return stripeInstance;
};

const getSymbolFromCurrencyCode = (currencyString: string): string => {
  if (!currencyString) return '';

  const uppercasedCurrencyString = currencyString.toUpperCase();

  const currencies = {
    USD: 'US$',
    AUD: 'AU$',
    BRL: 'R$',
    CAD: 'C$',
    CHF: 'CHF',
    DKK: 'DKK',
    EUR: '€',
    GBP: '£',
    HKD: 'HK$',
    JPY: 'JP¥',
    MXN: 'MX$',
    NOK: 'NOK',
    NZD: 'NZ$',
    SEK: 'SEK',
    SGD: 'SGD',
  };

  return currencies[uppercasedCurrencyString];
};

const getCheckoutFormFields = ({
  paymentProps,
  checkoutResult,
  title = 'Payment',
}) => {
  return [
    {
      name: `${title} status`,
      label: checkoutResult.status || 'failed',
      reference: 'paymentStatus',
      isPersistent: true,
    },
    {
      name: `${title} amount`,
      label: `${getSymbolFromCurrencyCode(paymentProps.currency)} ${
        paymentProps.amountString
      }`,
      reference: 'paymentAmount',
      isPersistent: true,
    },
    {
      name: `${title} ID`,
      label: checkoutResult.stripeChargeId,
      reference: 'stripeId',
      isPersistent: true,
    },
    {
      name: 'Billing City',
      label: paymentProps.billingAddressCity,
      reference: 'billingAddressCity',
      isPersistent: true,
    },
    {
      name: 'Billing Country',
      label: paymentProps.billingAddressCountry,
      reference: 'billingAddressCountry',
      isPersistent: true,
    },
    {
      name: 'Billing Address',
      label: paymentProps.billingAddressLine1,
      reference: 'billingAddressLine1',
      isPersistent: true,
    },
    {
      name: 'Billing State',
      label: paymentProps.billingAddressState,
      reference: 'billingAddressState',
      isPersistent: true,
    },
    {
      name: 'Billing Zip',
      label: paymentProps.billingAddressZip,
      reference: 'billingAddressZip',
      isPersistent: true,
    },
    {
      name: 'Billing Email',
      label: paymentProps.billingEmail,
      reference: 'billingEmail',
      isPersistent: true,
    },
    {
      name: 'Billing Name',
      label: paymentProps.billingName,
      reference: 'billingName',
      isPersistent: true,
    },
  ];
};

const getBillingEmail = ({ answers, questions }) => {
  const emailQuestion =
    questions.find((question) => {
      return question.type === 'email';
    }) || {};

  return answers[emailQuestion.reference]
    ? answers[emailQuestion.reference].label
    : '';
};

const getActivePaymentMethodTypes = ({
  currency,
  isSubscription,
  paymentMethodTypes,
}) => {
  const types = Object.entries(paymentMethodTypes || {})
    .filter(([key, value]) => {
      if (key === 'ideal' && value && (isSubscription || currency !== 'EUR')) {
        return false;
      }

      return value;
    })
    .map(([key]) => {
      return key;
    });

  return types.length ? types : undefined;
};

const CheckoutWithStripe = ({
  buttonText,
  currency,
  formulaId,
  isSubscription,
  onCheckoutError,
  onCheckoutSuccess,
  paymentMethodTypes,
  settings,
  shouldCaptureBillingAddress,
  shouldCaptureZipCode,
  subscriptionInterval,
}: {
  buttonText: string;
  currency: string;
  formulaId: string;
  isSubscription: boolean;
  onCheckoutError: (error: any) => void;
  onCheckoutSuccess: (data: any) => void;
  paymentMethodTypes: string[];
  settings: CalculatorSettings;
  shouldCaptureBillingAddress: boolean;
  shouldCaptureZipCode: boolean;
  subscriptionInterval: string;
}) => {
  const isProduction = useIsProduction();
  const isTesting = useIsTesting();
  const { numberFormatting, stripeUserId } = settings;

  const stripeInstance = useStripe({ stripeUserId, isProduction });

  const answers = useAnswers();
  const calculator = useRecoilValue(calculatorState);

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(undefined);

  const checkoutWithStripe = useCheckoutWithStripe();

  const { contents = {} } = calculator;
  const { formulas = [], questions = [] } = contents;

  const checkoutFormula = formulas.find((formula) => {
    return formula._id === formulaId;
  }) || { formula: {} };

  const output = useOutput(checkoutFormula.reference);
  const result =
    typeof output.result === 'number' ? output.result : isProduction ? 0 : 1;

  const resultFormatted = getFormattedFormula({
    result,
    decimals: checkoutFormula.formula.decimals,
    formatting: numberFormatting,
  });

  const doCheckout = async (paymentProps) => {
    const checkout = await checkoutWithStripe({
      paymentProps,
    });

    return checkout;
  };

  const handleCheckout = async (checkoutForm, paymentElement) => {
    const paymentProps = {
      ...checkoutForm,
      amount: Math.round(result * 100),
      amountString: resultFormatted,
      currency,
      isTesting,
      subscriptionInterval,
      subscriptionProductName: `${calculator.title} ${
        result / 100
      } ${currency}`,
    };

    try {
      const { paymentMethodType } = paymentProps;

      setSubmitting(true);

      const checkoutResult = await doCheckout(paymentProps);

      if (checkoutResult.status === 'success') {
        await onCheckoutSuccess({
          fields: getCheckoutFormFields({
            paymentProps,
            checkoutResult,
            title: isSubscription ? 'Subscription' : 'Payment',
          }),
          hidden: { paymentId: checkoutResult.paymentId },
        });
      }

      if (
        checkoutResult.status === 'requires_confirmation' ||
        checkoutResult.status === 'requires_action'
      ) {
        const { paymentId, paymentIntentClientSecret } = checkoutResult;

        if (paymentMethodType === 'card') {
          await stripeInstance.confirmCardPayment(paymentIntentClientSecret, {
            payment_method: {
              card: paymentElement,
            },
          });

          const newCheckoutResult = await doCheckout({
            ...paymentProps,
            paymentId: checkoutResult.paymentId,
          });

          if (newCheckoutResult.status === 'success') {
            onCheckoutSuccess({
              fields: getCheckoutFormFields({
                paymentProps,
                checkoutResult: newCheckoutResult,
                title: isSubscription ? 'Subscription' : 'Payment',
              }),
              hidden: { paymentId: checkoutResult.paymentId },
            });
          } else {
            onCheckoutError(newCheckoutResult);
          }
        }

        if (paymentMethodType === 'ideal') {
          await stripeInstance.confirmIdealPayment(paymentIntentClientSecret, {
            payment_method: {
              ideal: paymentElement,
            },
            return_url: `${getClientHref()}?payment_id=${paymentId}`,
          });
        }
      }
    } catch (err) {
      onCheckoutError(err);

      setError(err);
      console.error(err);
    }
  };

  const billingEmail = getBillingEmail({ answers, questions });

  if (!stripeInstance) return <></>;

  return (
    <>
      <CheckoutForm
        buttonText={
          <>
            <span className="cc__button-text">{buttonText} </span>
            <span className="cc__button-currency">
              {getSymbolFromCurrencyCode(currency)}{' '}
            </span>
            <span className="cc__button-value">{resultFormatted}</span>
          </>
        }
        captureBillingAddress={shouldCaptureBillingAddress}
        captureZipCode={shouldCaptureZipCode}
        initialFormData={{ billingEmail }}
        isDisabled={isSubmitting}
        isSubscription={isSubscription}
        onSubmit={handleCheckout}
        paymentMethodTypes={getActivePaymentMethodTypes({
          currency,
          isSubscription,
          paymentMethodTypes,
        })}
        settings={settings}
        stripeInstance={stripeInstance}
      />

      {!!error && <Callout variant="alert">{error.message}</Callout>}
    </>
  );
};

export default CheckoutWithStripe;
