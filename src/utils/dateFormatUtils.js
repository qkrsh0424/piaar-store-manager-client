import moment from "moment";

function dateToYYYYMMDDhhmmss(idate) {
    let date = new Date(idate);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function diffTimeToHHmmss(startDate, endDate){
    let diffTime = new Date(endDate) - new Date(startDate);
    let tempTime = moment.duration(diffTime);
    return moment.utc(tempTime.asMilliseconds()).format('HH : mm : ss');
}

export {
    dateToYYYYMMDDhhmmss,
    diffTimeToHHmmss
}