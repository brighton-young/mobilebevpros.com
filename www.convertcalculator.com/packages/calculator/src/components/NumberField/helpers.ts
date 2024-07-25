export const getThousandSeparator = (formatting: string) => {
  switch (formatting) {
    case '###0.00':
    case '###0,00':
      return '';

    case '#,##0.00':
      return ',';

    case '#.##0,00':
      return '.';

    case '# ##0.00':
    case '# ##0,00':
      return ' ';

    default:
      return '';
  }
};

export const getDecimalSeparator = (formatting: string) => {
  switch (formatting) {
    case '###0.00':
    case '#,##0.00':
    case '# ##0.00':
      return '.';

    case '###0,00':
    case '#.##0,00':
    case '# ##0,00':
      return ',';

    default:
      return '.';
  }
};
