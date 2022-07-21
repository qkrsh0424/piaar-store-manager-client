import { dateToYYYYMM, dateToYYYYMMDD, getDayName, getWeekNumber } from "./dateFormatUtils";

class GraphDataset {
    constructor() {
        this.type = 'bar';
        this.label = '';
        this.data = [];
        this.fill = false;
        this.borderColor = '#80A9E1';
        this.backgroundColor = '#80A9E1';
        this.order = 0;
    }

    toJSON() {
        return {
            type: this.type,
            label: this.label,
            data: this.data,
            fill: this.fill,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            order: this.order
        }
    }
}

// dateRange(일, 주, 월)값에 따라 date값을 변환한다
function getDateToAnalysisRangeDateFormat(dateRange, date) {
    let addDate = dateToYYYYMMDD(date);
    if (dateRange === 'week') {
        addDate = dateToYYYYMM(date) + '-' + getWeekNumber(date);
    } else if (dateRange === 'month') {
        addDate = dateToYYYYMM(date);
    }
    return addDate;
}

// dateRange(일, 주, 월)값에 따라 date값을 view 형식으로 변환한다
function getAnalysisDateFormatToViewFormat(dateRange, date) {
    let viewDateFormat = dateToYYYYMMDD(date) + ' (' + getDayName(date) + ')';
    if (dateRange === 'week') {
        viewDateFormat = date + '주차';
    } else if (dateRange === 'month') {
        viewDateFormat = date;
    }
    return viewDateFormat;
}

// 결과 test를 설정. label: 항목명, value: 항목 해당 값, color: 그래프에서 나타내는 색상
function setAnalysisResultText(datasets) {
    // 데이터가 존재하지 않는 경우
    return datasets?.map(r => {
        let sum = 0;
        r.data.forEach(r2 => sum += r2);

        return {
            label: r.label || '',
            value: sum || 0,
            color: r.backgroundColor || ''
        }
    })
}

export{
    GraphDataset,
    getDateToAnalysisRangeDateFormat,
    getAnalysisDateFormatToViewFormat,
    setAnalysisResultText
}