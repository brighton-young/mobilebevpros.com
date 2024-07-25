const getSpreadsheetEpoch = (date = new Date()) => {
  const epochDate = new Date(Date.UTC(1899, 11, 30, 0, 0, 0));

  const nonLocalDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const spreadsheetEpochInDays = epochDate.getTime() / 1000 / 60 / 60 / 24;
  const unixEpochInDays = nonLocalDate.getTime() / 1000 / 60 / 60 / 24;

  return unixEpochInDays + -spreadsheetEpochInDays;
};

export default getSpreadsheetEpoch;
