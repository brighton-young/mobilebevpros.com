import getFormattedNumber from './getFormattedNumber';

export const formatDistanceMatrixResults = (
  result,
  numberFormatting,
  systemOfMeasurement,
) => {
  if (
    !result.rows ||
    !result.rows.length ||
    !result.rows[0].elements ||
    !result.rows[0].elements.length
  ) {
    throw new Error('An unknown error occurred');
  }

  const { distance: distanceObj, duration: durationObj } =
    result.rows[0].elements[0];

  const distanceInMeters = distanceObj ? distanceObj.value : 0;
  const distanceInFeet = distanceInMeters * 3.280839895;
  const distance =
    systemOfMeasurement === 'metric' ? distanceInMeters : distanceInFeet;
  const postfix = systemOfMeasurement === 'imperial' ? 'ft.' : 'm.';
  const formattedDistance = getFormattedNumber(
    numberFormatting,
    distance.toFixed(),
  );

  const duration = durationObj ? durationObj.value : 0;

  return {
    distance,
    duration,
    formattedDistance,
    postfix,
  };
};
