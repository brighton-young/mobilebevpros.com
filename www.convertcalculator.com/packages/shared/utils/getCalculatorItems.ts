const getCalculatorItems = (calculator = {}) => {
  const { contents = {} } = calculator;
  const {
    datasheets = [],
    elements = [],
    formulas = [],
    questions = [],
    variables = [],
  } = contents;

  return [
    ...datasheets.map((datasheet) => {
      return { ...datasheet, collection: 'datasheets' };
    }),
    ...elements.map((element) => {
      return { ...element, collection: 'elements' };
    }),
    ...formulas.map((formula) => {
      return { ...formula, collection: 'formulas' };
    }),
    ...questions.map((question) => {
      return { ...question, collection: 'questions' };
    }),
    ...variables.map((variable) => {
      return { ...variable, collection: 'variables' };
    }),
  ];
};

export default getCalculatorItems;
