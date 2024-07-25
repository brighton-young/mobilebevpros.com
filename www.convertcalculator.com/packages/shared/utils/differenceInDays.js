const differenceInDays = (date1, date2) => {
    date1.setHours(0);
    date1.setMinutes(0);
    date1.setSeconds(0);
    date1.setMilliseconds(0);
    date2.setHours(0);
    date2.setMinutes(0);
    date2.setSeconds(0);
    date2.setMilliseconds(0);

    const timeDiff = date1.getTime() - date2.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

export default differenceInDays;