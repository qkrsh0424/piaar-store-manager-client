import moment from "moment";

function diffTimeToHHmmss(startDate, endDate){
    let diffTime = new Date(endDate) - new Date(startDate);
    let tempTime = moment.duration(diffTime);
    return moment.utc(tempTime.asMilliseconds()).format('HH : mm : ss');
}

function getStartDate(date) {
    var d = new Date(date);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    // console.log(d);
    return d;
}

function getEndDate(date) {
    var d = new Date(date);
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    // console.log(d);
    return d;
}

// function dateToYYYYMMDD(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join('-');
// }

function dateToYYYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssFile(idate){
    var date = new Date(idate);
    return moment(date).format("YYYYMMDDHHmmss");
}

function dateToYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YY/MM/DD HH:mm:ss");
}

function dateToYYMMDD(idate){
    var date = new Date(idate);
    return moment(date).format("YY.MM.DD");
}

// 기간 설정 시 start값을 직접 설정
function setStartDateOfPeriod(idate, prevYear, prevMonth, prevDay){
    var date = new Date(idate);
    date.setFullYear(date.getFullYear() + prevYear)
    date.setMonth(date.getMonth() + prevMonth);
    date.setDate(date.getDate() + prevDay);
    return moment(date);
}

function getRemainingDateCount(closingDate) {
    let currDate = new Date();
    let nextDate = new Date(closingDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil((nextDate - currDate) / oneDay);

    return diffDays;
}

// function getStartDate(date) {
//     let cdate = new Date(date);
//     cdate.setHours(0);
//     cdate.setMinutes(1);
//     cdate.setSeconds(0);
//     cdate.setMilliseconds(0);
//     return cdate;
// }

// function getEndDate(date) {
//     let cdate = new Date(date);
//     cdate.setHours(23);
//     cdate.setMinutes(58);
//     cdate.setSeconds(59);
//     cdate.setMilliseconds(0);
//     return cdate
// }

function dateToYYYYMMDD(date) {
    var d = new Date(date)
    return moment(d).format("YYYY-MM-DD");
}

export {
    diffTimeToHHmmss,
    getStartDate,
    getEndDate,
    dateToYYYYMMDD,
    dateToYYYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssFile,
    dateToYYMMDDhhmmss,
    dateToYYMMDD,
    setStartDateOfPeriod,
    getRemainingDateCount
}