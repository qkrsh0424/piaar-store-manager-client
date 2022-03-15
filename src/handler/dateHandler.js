import moment from 'moment';

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

function dateToYYYYMMDD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

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

// 현재 달에서 prevMonth값을 뺀 달의 데이트값을 담는 데이터
function setStartDateOfPeriod(idate, prevYear, prevMonth, prevDay){
    var date = new Date(idate);
    date.setFullYear(date.getFullYear() + prevYear)
    date.setMonth(date.getMonth() + prevMonth);
    date.setDate(date.getDate() + prevDay);
    return moment(date);
}

export {
    getStartDate,
    getEndDate,
    dateToYYYYMMDD,
    dateToYYYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssFile,
    dateToYYMMDDhhmmss,
    dateToYYMMDD,
    setStartDateOfPeriod
}