export type ButtonAction =
  (typeof ButtonActionsEnum)[keyof typeof ButtonActionsEnum];

export const ButtonActionsEnum = {
  LINK_TO_EXTERNAL_PAGE: 'linkToExternalPage',
  NAVIGATE_TO_NEXT_VIEW: 'navigateToNextView',
  NAVIGATE_TO_PREVIOUS_VIEW: 'navigateToPreviousView',
  ADD_SUBMISSION: 'addSubmission',
  SEND_SUBMISSION_EMAIL: 'sendSubmissionEmail',
  UPDATE_TABLE: 'updateTable',
  CHECKOUT_WITH_STRIPE: 'checkoutWithStripe',
  CONNECT_API: 'connectAPI',
  SEND_DATA_TO_HUBSPOT: 'sendDataToHubspot',
  SEND_DATA_TO_GOOGLE_SHEETS: 'sendDataToGoogleSheets',
  SEND_DATA_TO_MAILCHIMP: 'sendDataToMailchimp',
  SEND_DATA_TO_WEBHOOK: 'sendDataToWebhook',
  SET_INPUT: 'setInput',
  ADD_PRODUCT_TO_SNIPCART_CART: 'addProductToSnipcartCart',
  INTEGRATE_WITH_ZAPIER: 'integrateWithZapier',

  VIEW_CONTAINER_NAVIGATION: 'viewContainerNavigation',
  CREATE_TRELLO_CARD: 'createTrelloCard',
  SEND_SMS: 'sendSMS',
  NAVIGATE: 'navigate',
} as const;

export const ButtonActionsProperties = {
  [ButtonActionsEnum.LINK_TO_EXTERNAL_PAGE]: {
    side: 'client',
    label: 'Link to External Page',
  },
  [ButtonActionsEnum.NAVIGATE_TO_NEXT_VIEW]: {
    side: 'client',
    label: 'Navigate to Next View',
  },
  [ButtonActionsEnum.NAVIGATE_TO_PREVIOUS_VIEW]: {
    side: 'client',
    label: 'Navigate to Previous View',
  },
  [ButtonActionsEnum.VIEW_CONTAINER_NAVIGATION]: {
    side: 'client',
    label: 'View Container Navigation',
  },
  [ButtonActionsEnum.ADD_SUBMISSION]: {
    side: 'server',
    label: 'Add Submission',
  },
  [ButtonActionsEnum.SEND_SUBMISSION_EMAIL]: {
    side: 'server',
    label: 'Send Submission Email',
  },
  [ButtonActionsEnum.UPDATE_TABLE]: {
    side: 'server',
    label: 'Update Table',
  },
  [ButtonActionsEnum.CHECKOUT_WITH_STRIPE]: {
    side: 'server',
    label: 'Add Checkout with Stripe (Payments)',
  },
  [ButtonActionsEnum.CONNECT_API]: {
    side: 'server',
    label: 'Connect API',
  },
  [ButtonActionsEnum.SEND_DATA_TO_HUBSPOT]: {
    side: 'server',
    label: 'Send Data to Hubspot',
    description:
      'Our Hubspot integration, makes it possible to save your data to the Hubspot CRM-system. Click the “Connect” button below, log in, and select the Hubspot account you want to connect. NB. make sure your Hubspot user profile has set the appropriate rights in the HubSpot account to manage integrations.',
    helpLink:
      'https://www.convertcalculator.com/help/integrations/integrate-with-hubspot/',
  },
  [ButtonActionsEnum.SEND_DATA_TO_GOOGLE_SHEETS]: {
    side: 'server',
    label: 'Send Data to Google Sheets',
    description:
      'Our Google Sheets integration, makes it possible to save your data to a Google Sheet. Click the “Connect” button below, log in, and select the Google account you want to connect. The access-rights to Google-Drive are necessary to write data to your spreadsheet.',
    helpLink:
      'https://www.convertcalculator.com/help/integrations/integrate-with-google/',
  },
  [ButtonActionsEnum.SEND_DATA_TO_MAILCHIMP]: {
    side: 'server',
    label: 'Send Data to Mailchimp',
    description:
      'Integrating with Mailchimp will let you customise your email template and create automated campaigns.',
    helpLink:
      'https://www.convertcalculator.co/help/integrations/integrate-with-mailchimp/',
  },
  [ButtonActionsEnum.SEND_DATA_TO_WEBHOOK]: {
    side: 'server',
    label: 'Send Data to Webhook',
    description:
      'Connecting to Webhooks allows you to connect ConvertCalculator to whatever tools or service your company uses internally.',
    helpLink:
      'https://www.convertcalculator.com/help/integrations/integrate-with-webhooks/',
  },
  [ButtonActionsEnum.SET_INPUT]: {
    side: 'client',
    label: 'Set Input',
  },
  [ButtonActionsEnum.ADD_PRODUCT_TO_SNIPCART_CART]: {
    side: 'client',
    label: 'Add product to Snipcart cart',
  },
  [ButtonActionsEnum.INTEGRATE_WITH_ZAPIER]: {
    side: 'none',
    label: 'Integrate with Zapier',
    description:
      'Connecting to Zapier allows you to connect ConvertCalculator to 1000+ apps, like alternative CRM applications or PandaDoc for pfd-generation. Connecting ConvertCalculator to Zapier will for instance allow you to further automate your price quoting process.',
    helpLink:
      'https://www.convertcalculator.co/help/integrations/integrate-with-zapier/',
  },
  [ButtonActionsEnum.CREATE_TRELLO_CARD]: {
    side: 'server',
    label: 'Create Trello Card',
    description:
      'Connecting to Trello allows you to create a new card in a Trello board. This can be useful to create a new card for your sales team to follow up on a new lead.',
    helpLink:
      'https://www.convertcalculator.co/help/integrations/integrate-with-trello/',
  },

  [ButtonActionsEnum.SEND_SMS]: {
    side: 'server',
    label: 'Send SMS',
    description:
      'Send an SMS to a phone number. This can be useful to send a notification to your sales team to follow up on a new lead.',
  },
  [ButtonActionsEnum.NAVIGATE]: {
    side: 'client',
    label: 'Navigate',
  },
} as const;
