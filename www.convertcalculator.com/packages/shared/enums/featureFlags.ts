export const featureFlags = {
  dataAsPropsRefactor: {
    description: 'Refactor calculator data as props, not recoil state',
  },
  aiFormulaBuilder: {
    description: 'AI Formula Builder',
  },
  calculatorDataSources: {
    description: 'Calculator data sources',
  },
  logicPanel: {
    description: 'Logic menu',
  },
  expandArrayInResults: {
    description:
      'Expands arrays in submissions and interactions. Experimental does not enable this.',
  },
  viewContainer: {
    description: 'New view container and view elements',
  },
  placesViaGeoapify: {
    description: 'Places via Geoapify: Make Place less expensive',
  },
  layoutBlocks: {
    description: 'Layout building blocks to speed up calculator building',
  },
  waitForCompiledImage: {
    description:
      'Wait for all image layers to load before we add them to the canvas',
  },
  optionalActionExecutionLogic: {
    description: 'Add optional execution logic to actions',
  },
  omitServerActionProps: {
    description:
      'Omitting server action props ensures that no sensitive data is sent to the client',
  },
  liveMode: {
    description: 'Live mode in the editor',
  },
  datasheetCompression: {
    description: 'Datasheet update compression',
  },
  chamberOfCommmerceElement: {
    description: 'Add possibilty to look up an organization in the Dutch CoC',
  },
  tableBulkImageUpload: {
    description: 'Bulk image upload capability for tables',
  },
  customizeChartConfig: {
    description: 'Customize chart.js config via JSON',
  },
  stackedBar100Percent: {
    description: 'Add stacked bar 100% chart type',
  },
  improvedNavigationAction: {
    description: 'Improved navigation action',
  },
  compressTableData: {
    description: 'Compress table data',
  },
};

export type FeatureFlags = Record<keyof typeof featureFlags, boolean>;

export const featureFlagSegments = {
  none: {
    name: 'Nobody',
  },
  experimental: {
    name: 'Experimental',
  },
  internal: {
    name: 'Internal',
    profileIds: [
      'CefRMqBFAsHAribwR', // info@convertcalculator.co
      'zkjNm99MWEyJzipuN', // twan@convertcalculator.co
      'v4dZwLpn2rPZmongv', // bas@convertcalculator.co
      '7kWP3nibqxGz4nqmr', // andres@convertcalculator.co
    ],
  },
  beta: {
    name: 'Beta',
    profileIds: ['fukKb93ciGPcYfeXq'],
  },
  all: {
    name: 'All (100%)',
  },
};
