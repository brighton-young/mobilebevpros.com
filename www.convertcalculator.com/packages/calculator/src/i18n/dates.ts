type DateDefinition = {
  startOfWeek: 'monday' | 'sunday';
  weekdayValues: string[];
  monthValues: string[];
  dateFormat: string;
  dateSeparator: string[];
  dateName: {
    day: string;
    month: string;
    year: string;
  };
  datePlaceholder: {
    day: string;
    month: string;
    year: string;
  };
  datePartOrder: string[];
  timeFormat: string;
};

const ca: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  monthValues: [
    'gener',
    'febrer',
    'març',
    'abril',
    'maig',
    'juny',
    'juliol',
    'agost',
    'setembre',
    'octubre',
    'novembre',
    'desembre',
  ],
  dateFormat: 'MM/DD/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['month', 'day', 'year'],
  timeFormat: 'h:mm aa',
};

const da: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  monthValues: [
    'januar',
    'februar',
    'marts',
    'april',
    'maj',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'december',
  ],
  dateFormat: 'DD.MM.YYYY',
  dateSeparator: ['.', '.'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const de: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  monthValues: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  dateFormat: 'YYYY-MM-DD',
  dateSeparator: ['-', '-'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const el: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'],
  monthValues: [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος',
  ],
  dateFormat: 'MM/DD/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['month', 'day', 'year'],
  timeFormat: 'h:mm aa',
};

const en: DateDefinition = {
  startOfWeek: 'sunday',
  weekdayValues: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthValues: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: 'MM/DD/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['month', 'day', 'year'],
  timeFormat: 'h:mm a',
};

const enGb: DateDefinition = { ...en, datePartOrder: ['day', 'month', 'year'] };

const es: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'],
  monthValues: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  dateFormat: 'DD/MM/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const eu: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['ig', 'al', 'as', 'az', 'og', 'or', 'lr'],
  monthValues: [
    'urtarrila',
    'otsaila',
    'martxoa',
    'apirila',
    'maiatza',
    'ekaina',
    'uztaila',
    'abuztua',
    'iraila',
    'urria',
    'azaroa',
    'abendua',
  ],
  dateFormat: 'YYYY/MM/DD',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const fi: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
  monthValues: [
    'tammikuu',
    'helmikuu',
    'maaliskuu',
    'huhtikuu',
    'toukokuu',
    'kesäkuu',
    'heinäkuu',
    'elokuu',
    'syyskuu',
    'lokakuu',
    'marraskuu',
    'joulukuu',
  ],
  dateFormat: 'D.M.YYYY',
  dateSeparator: ['.', '.'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'H:mm',
};

const fr: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
  monthValues: [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ],
  dateFormat: 'DD/MM/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'jj',
    month: 'mm',
    year: 'aaaa',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const it: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['do', 'lu', 'ma', 'me', 'gi', 've', 'sa'],
  monthValues: [
    'gennaio',
    'febbraio',
    'marzo',
    'aprile',
    'maggio',
    'giugno',
    'luglio',
    'agosto',
    'settembre',
    'ottobre',
    'novembre',
    'dicembre',
  ],
  dateFormat: 'DD.MM.YYYY',
  dateSeparator: ['.', '.'],
  dateName: {
    day: 'gg',
    month: 'mm',
    year: 'aaaa',
  },
  datePlaceholder: {
    day: 'gg',
    month: 'mm',
    year: 'aaaa',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'h:mm aa',
};

const ja: DateDefinition = {
  startOfWeek: 'sunday',
  weekdayValues: ['日', '月', '火', '水', '木', '金', '土'],
  monthValues: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  dateFormat: 'YYYY年MM月DD日',
  dateSeparator: ['年', '月', '日'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const koKR: DateDefinition = {
  startOfWeek: 'sunday',
  weekdayValues: ['일', '월', '화', '수', '목', '금', '토'],
  monthValues: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dateFormat: 'YYYY년 MM월 DD일',
  dateSeparator: ['년 ', '월 ', '일'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const nl: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  monthValues: [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ],
  dateFormat: 'DD-MM-YYYY',
  dateSeparator: ['-', '-'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'jjjj',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'jjjj',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const no: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  monthValues: [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
  ],
  dateFormat: 'DD.MM.YYYY',
  dateSeparator: ['.', '.'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'åååå',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'åååå',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const pl: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'],
  monthValues: [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
  ],
  dateFormat: 'DD.MM.YYYY',
  dateSeparator: ['.', '.'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'rrrr',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'rrrr',
  },
  datePartOrder: ['day', 'month', 'year'],
  timeFormat: 'HH:mm',
};

const pt: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['do', 'se', 'te', 'qa', 'qi', 'se', 'sa'],
  monthValues: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  dateFormat: 'MM/DD/YYYY',
  dateSeparator: ['/', '/'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'aaaa',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'aaaa',
  },
  datePartOrder: ['month', 'day', 'year'],
  timeFormat: 'HH:mm',
};

const sv: DateDefinition = {
  startOfWeek: 'monday',
  weekdayValues: ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
  monthValues: [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december',
  ],
  dateFormat: 'YYYY-MM-DD',
  dateSeparator: ['-', '-'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'åååå',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'åååå',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const zhCN: DateDefinition = {
  startOfWeek: 'sunday',
  weekdayValues: ['日', '一', '二', '三', '四', '五', '六'],
  monthValues: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  dateFormat: 'YYYY年MM月DD日',
  dateSeparator: ['年', '月', '日'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const zhTW: DateDefinition = {
  startOfWeek: 'sunday',
  weekdayValues: ['日', '一', '二', '三', '四', '五', '六'],
  monthValues: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ],
  dateFormat: 'YYYY年MM月DD日',
  dateSeparator: ['年', '月', '日'],
  dateName: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePlaceholder: {
    day: 'dd',
    month: 'mm',
    year: 'yyyy',
  },
  datePartOrder: ['year', 'month', 'day'],
  timeFormat: 'HH:mm',
};

const locales = {
  ca,
  da,
  de,
  el,
  en,
  es,
  eu,
  fi,
  fr,
  it,
  ja,
  koKR,
  nl,
  no,
  pl,
  pt,
  sv,
  zhCN,
  zhTW,
  'en-GB': enGb,
} as const;

export type DateLocale = keyof typeof locales;

const getDefinitions = (locale: DateLocale = 'en'): DateDefinition => {
  return locales[locale] ?? locales.en;
};

export const getStartOfWeek = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).startOfWeek;
};

export const getWeekdayValues = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).weekdayValues;
};

export const getMonthValues = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).monthValues;
};

export const getDateFormat = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).dateFormat;
};

export const getDateSeparator = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).dateSeparator;
};

export const getDateName = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).dateName;
};

export const getDatePlaceholder = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).datePlaceholder;
};

export const getDatePartOrder = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).datePartOrder;
};

export const getTimeFormat = (locale: DateLocale = 'en') => {
  return getDefinitions(locale).timeFormat;
};
