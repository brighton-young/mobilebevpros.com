import camelCase from 'lodash/camelCase';

import { ButtonActionsEnum } from '@cc/shared/enums/button-actions';

import loadSnipcart from './loadSnipcart';

type HandleCCEventProps = {
  calculatorId: string;
  type: string;
  payload: Record<string, any>;
  context: {
    parentWindow: Window;
    calculatorContainer: HTMLIFrameElement | HTMLDivElement;
  };
};

const handleCCEvent = async ({
  calculatorId,
  type,
  payload = {},
  context,
}: HandleCCEventProps) => {
  const { parentWindow, calculatorContainer } = context;

  if (type === ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART) {
    const {
      apiKey,
      formFields = [],
      hasTaxesIncluded,
      image,
      quantity,
      productName,
      productDescription,
      price,
      shippable,
      stackable,
      taxable,
    } = payload;

    await loadSnipcart({ apiKey });

    const productId = `${camelCase(productName)}-${price}-${calculatorId}`;

    window.Snipcart.api.cart.items.add({
      id: productId,
      name: productName,
      description: productDescription,
      hasTaxesIncluded,
      image,
      price,
      quantity,
      metadata: formFields.reduce((acc, field) => {
        return { ...acc, [field.name]: field.label };
      }, {}),
      shippable,
      stackable,
      taxable,
      url: `https://www.convertcalculator.com/api/embed/validate-snipcart-price/?id=${productId}&price=${price}`,
    });
  }

  if (type === 'resize') {
    if (!calculatorContainer) return;

    calculatorContainer.height = `${payload.height}px`;
  }

  if (type === ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE) {
    if (!payload.linkUrl) return;

    if (payload.shouldOpenInNewTab) {
      const newWindow = parentWindow.open(payload.linkUrl, '_blank');
      newWindow.focus();
    } else {
      try {
        // TODO: with a location.href redirects that open in a new tab
        // will be focused
        // parentWindow.location.href = payload.linkUrl;
        // however, if we do an open _self, we can focus
        // but which one should win? how to we know what page to focus
        // my guess is that the open _self should win because it is the
        // same window
        const newWindow = parentWindow.open(payload.linkUrl, '_self');
        newWindow.focus();
      } catch (err) {
        const newWindow = parentWindow.open(payload.linkUrl, '_blank');
        newWindow.focus();
      }
    }
  }

  if (type === 'trackExternalEvent') {
    const newName = `convertcalculator.${payload.name}`;

    // Track Google Analytics Events
    const { ga } = parentWindow;

    if (ga && typeof ga === 'function') {
      ga('send', 'event', 'convertcalculator', payload.name);
    }

    // Track Google Tag Manager Events
    const { dataLayer } = parentWindow;
    if (dataLayer && typeof dataLayer.push === 'function') {
      dataLayer.push({
        event: newName,
      });
    }

    // Track Mixpanel Events
    const { mixpanel } = parentWindow;
    if (mixpanel && mixpanel.track && typeof mixpanel.track === 'function') {
      mixpanel.track(newName, payload.properties);
    }

    // Track Amplitude Events
    const { amplitude } = parentWindow;

    if (
      amplitude &&
      typeof amplitude.getInstance === 'function' &&
      typeof amplitude.getInstance().logEvent === 'function'
    ) {
      amplitude.getInstance().logEvent(newName, payload.properties);
    }

    // Track Facebook Events
    const { fbq } = parentWindow;
    if (fbq && typeof fbq === 'function') {
      if (payload.name === 'submit') {
        fbq('track', 'Lead');
      } else if (payload.name === 'checkout') {
        const { amount, currency } = payload.properties;

        fbq('track', 'Purchase', { value: amount, currency });
      }

      fbq('track', newName, payload.properties);
    }

    // Track HubSpot Events
    parentWindow._hsq = parentWindow._hsq || [];
    const { _hsq } = parentWindow;

    // If it's an submitting event, identify the current user by email
    const getEmail = () => {
      if (!payload.properties.formData || !payload.properties.formData.fields)
        return undefined;

      const emailField = payload.properties.formData.fields.find((field) => {
        return field.type === 'email';
      });

      if (!emailField) return undefined;

      return emailField.label;
    };

    const email = getEmail();
    const isAction =
      payload.name === 'submit' ||
      payload.name === 'checkout' ||
      payload.name === 'redirect';

    if (isAction && email) {
      _hsq.push(['identify', { email }]);
    }

    _hsq.push(['trackEvent', { id: payload.name }]);

    // Track Plausible Events
    const { plausible } = parentWindow;

    if (plausible && typeof plausible === 'function') {
      plausible(newName, { props: payload.properties });
    }
  }

  if (type === 'scrollToTop') {
    if (!calculatorContainer) {
      return;
    }

    const elTop = calculatorContainer.getBoundingClientRect().top;
    const topInScreen = elTop > 0;

    if (topInScreen) return;

    parentWindow.requestAnimationFrame(() => {
      calculatorContainer.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    });
  }

  parentWindow.addEventListener('click', () => {
    if (typeof calculatorContainer?.contentWindow?.postMessage !== 'function')
      return;

    calculatorContainer.contentWindow.postMessage(
      {
        calculatorId,
        type: 'clickInParent',
        payload: {},
      },
      '*',
    );
  });
};

export default handleCCEvent;
