export const prefixElementStyles = (
  styles: {
    [key: string]: any;
  },
  prefix: string,
): any => {
  const newStyles: {
    [key: string]: any;
  } = {};

  Object.entries(styles || {}).forEach(([key, value]) => {
    const newKey = prefix + key.charAt(0).toUpperCase() + key.slice(1);
    newStyles[newKey] = value;
  });

  return newStyles;
};
