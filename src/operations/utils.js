import moment from 'moment';

/**
 * Takes message content as arugment and returns array of links in it.
 * @param text
 */
const urlify = text => text.match(/(https?:\/\/[^\s]+)/g);

/**
 * Takes none and returns percentage
 * @returns {{percentage: number, year: (moment.Moment | number)}}
 */
const getPercentage = () => {
  const year = moment().year();
  const nowUTC = moment()
    .startOf(`${year}`)
    .utc();
  const jan1ThisUTC = moment(`${year}-01-01 00:00:00.000`).utc();
  const jan1NextUTS = moment(`${year + 1}-01-01 00:00:00.000`).utc();
  const percentage = Math.round(
    (nowUTC - jan1ThisUTC) / (jan1NextUTS - jan1ThisUTC) * 100,
  );
  return { percentage, year };
};

export default {
  urlify,
  getPercentage,
};
