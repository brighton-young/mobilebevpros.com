type SpacingObject = Record<string, number>;

type GetSpacing = (
  name: string,
  spacingObjects?: SpacingObject[],
) => string | undefined;

const getSpacing: GetSpacing = (name, spacingObjects = []) => {
  const spacing =
    spacingObjects.find((spacingObject = {}) => {
      return typeof spacingObject[name] === 'number';
    }) || {};

  return spacing[name] ? `${spacing[name]}px` : undefined;
};

export default getSpacing;
