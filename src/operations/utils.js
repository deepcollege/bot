import moment from 'moment';

// takes message content as arugment and returns array of links in it.
const urlify = (text) => text.match(/(https?:\/\/[^\s]+)/g);

// takes none and returns percentage
const get_percentage = () => {

    var year = moment().year()
    var now_utc = moment().startOf(`${year}`).utc();
    var jan1This_utc = moment(`${year}-01-01 00:00:00.000`).utc();
    var jan1Next_utc = moment(`${year+1}-01-01 00:00:00.000`).utc();
    var percentage = Math.round((now_utc - jan1This_utc) / (jan1Next_utc - jan1This_utc) * 100);
    return {percentage, year};

};


module.exports = {
    urlify,
    get_percentage
};