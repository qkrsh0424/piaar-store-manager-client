import moment from "moment";

const weekName = ['일', '월', '화', '수', '목', '금', '토'];

function diffTimeToHHmmss(startDate, endDate) {
    let diffTime = new Date(endDate) - new Date(startDate);
    let tempTime = moment.duration(diffTime);
    return moment.utc(tempTime.asMilliseconds()).format('HH : mm : ss');
}

function getStartDate(date) {
    var d = new Date(date);
    d.setHours(0);
    d.setMinutes(0);
    // d.setSeconds(0);
    d.setSeconds(1);
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

function getStartDateOfMonth(date) {
    var d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function getEndDateOfMonth(date) {
    var d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
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

const isValidDateObject = (date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date)) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return false
        } else {
            // date object is valid
            return true;
        }
    } else {
        // not a date object
        return false;
    }
}

function dateToYYYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssWithInvalid(idate, invalidReturn) {
    var date = new Date(idate || '');
    if (!isValidDateObject(date)) {
        return invalidReturn;
    }
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssFile(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDDHHmmss");
}

function dateToYYYYMMDDhhmmFile(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDD_HHmm");
}

function dateToYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YY/MM/DD HH:mm:ss");
}

function dateToYYMMDD(idate) {
    var date = new Date(idate);
    return moment(date).format("YY.MM.DD");
}

function dateToYYMMDD2(idate) {
    var date = new Date(idate);
    return moment(date).format("YY-MM-DD");
}

// 기간 설정 시 start값을 직접 설정
// function setStartDateOfPeriod(idate, prevYear, prevMonth, prevDay) {
//     var date = new Date(idate);
//     date.setFullYear(date.getFullYear() + prevYear)
//     date.setMonth(date.getMonth() + prevMonth);
//     date.setDate(date.getDate() + prevDay);
//     return new Date(moment(date));
// }

function setSubtractedDate(idate, prevYear, prevMonth, prevDay) {
    var date = new Date(idate);
    date.setFullYear(date.getFullYear() + prevYear)
    date.setMonth(date.getMonth() + prevMonth);
    date.setDate(date.getDate() + prevDay);
    return new Date(moment(date));
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

function dateToYYYYMMDD2(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDD");
}

function getDayName(idate) {
    var d = new Date(idate);
    return weekName[d.getDay()];
}

function dateToMMDD(idate) {
    var d = new Date(idate);
    return moment(d).format("MM.DD")
}

function getDifferenceBetweenStartDateAndEndDate(startDate, endDate) {
    var sDate = new Date(startDate);
    var eDate = new Date(endDate);

    var betweenTime = Math.abs(eDate.getTime() - sDate.getTime());
    return Math.floor(betweenTime / (1000 * 60 * 60 * 24)) + 1;
}

function dateToYYYYMM(date) {
    var d = new Date(date);
    return moment(d).format("YYYY-MM");
}

function dateToYYYY(date) {
    var d = new Date(date);
    return moment(d).format("YYYY");
}

// function getWeekNumber(date) {
//     let d = new Date(date);
//     var currentDate = d.getDate()-1;
//     var startOfMonth = new Date(d.setDate(1));
//     var weekDay = startOfMonth.getDay();
//     var weekNum = parseInt(((weekDay - 1) + currentDate) / 7) + 1;
//     return weekNum;
// }

function getWeekNumber(date) {
    let d = new Date(date);
    let currentDate = new Date(d.setDate(d.getDate()-1));
    // let startOfMonth = new Date(d2.setDate(1));
    
    // var weekNum = moment(currentDate).week() - moment(startOfMonth).week() + 1;
    var weekNum = moment(currentDate).week();
    return weekNum;
}

function getStartDateByWeekNumber(date) {
    var y = date.slice(0, 4);
    var m = date.slice(5, 7)-1;
    var weekNum = date.slice(8, 9);

    var startOfMonth = new Date(y, m, 1);
    var weekDay = startOfMonth.getDay();
    let d = parseInt((weekNum-1) * 7) + 2 - weekDay;

    var date = new Date(y, m, d);
    return getStartDate(date);
}

function getEndDateByWeekNumber(date) {
    var y = date.slice(0, 4);
    var m = date.slice(5, 7) - 1;
    var weekNum = date.slice(8, 9);

    var startOfMonth = new Date(y, m, 1);
    var weekDay = startOfMonth.getDay();
    let d = parseInt((weekNum) * 7) + 1 - weekDay;

    var date = new Date(y, m, d);
    return getEndDate(date);
}

function getWeekName() {
    return weekName;
}

function getDateOfLastSunDay() {
    var date = new Date();
    var day = date.getDay();
    return new Date(date.setDate(date.getDate() - day));
}

function isSearchablePeriod(date1, date2, searchablePeriod) {
    var startDate = moment(date1);
    var endDate = moment(date2);

    // diff <= searchablePeriod
    if(endDate.diff(startDate, 'days') <= searchablePeriod) {
        return true;
    }
    return false;
}

function getTimeDiffWithUTC() {
    var d = new Date();
    var hourDiff = d.getTimezoneOffset() / 60;

    // hourDiff가 -9라면, utc시간보다 9시간 빠른것
    return hourDiff * -1;
}

export {
    diffTimeToHHmmss,
    getStartDate,
    getEndDate,
    dateToYYYY,
    dateToYYYYMMDD,
    dateToYYYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssWithInvalid,
    dateToYYYYMMDDhhmmssFile,
    dateToYYMMDDhhmmss,
    dateToYYMMDD,
    // setStartDateOfPeriod,
    getRemainingDateCount,
    dateToYYYYMMDDhhmmFile,
    dateToYYYYMMDD2,
    getDayName,
    dateToMMDD,
    getDifferenceBetweenStartDateAndEndDate,
    dateToYYYYMM,
    getWeekNumber,
    getWeekName,
    getStartDateOfMonth,
    getEndDateOfMonth,
    dateToYYMMDD2,
    getStartDateByWeekNumber,
    getEndDateByWeekNumber,
    getDateOfLastSunDay,
    isSearchablePeriod,
    getTimeDiffWithUTC,
    setSubtractedDate
}