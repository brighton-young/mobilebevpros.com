enum FormulaResultTypesEnum {
  BOOLEAN = 'boolean',
  DATE = 'date',
  EMPTY = 'empty',
  IMAGE = 'image',
  LIST = 'list',
  NUMBER = 'number',
  OBJECT = 'object',
  TABLE = 'table',
  TEXT = 'text',
  UNKNOWN = 'unknown',
}

export const FormulaResultTypesLabels: {
  [key in FormulaResultTypesEnum]: string;
} = {
  [FormulaResultTypesEnum.BOOLEAN]: 'Yes/No',
  [FormulaResultTypesEnum.DATE]: 'Date',
  [FormulaResultTypesEnum.EMPTY]: 'Empty',
  [FormulaResultTypesEnum.IMAGE]: 'Image',
  [FormulaResultTypesEnum.LIST]: 'List',
  [FormulaResultTypesEnum.NUMBER]: 'Number',
  [FormulaResultTypesEnum.OBJECT]: 'Object',
  [FormulaResultTypesEnum.TABLE]: 'Table',
  [FormulaResultTypesEnum.TEXT]: 'Text',
  [FormulaResultTypesEnum.UNKNOWN]: 'Unknown',
};

export default FormulaResultTypesEnum;
