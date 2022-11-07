import { getStartDate } from "./dateFormatUtils";

const valueUtils = {
    /**
     * 넘어온 값이 빈값인지 체크.
     * [], {}, ' ' 빈값 처리
     * 숫자 0 통과
     */
    isEmptyValues: (value) => {
        return value === undefined || value === null || value === NaN || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0);
    },
    emptyCheckAndGet: (value, emptyReturn) => {
        if (valueUtils.isEmptyValues(value)) {
            return emptyReturn || '';
        } else {
            return value;
        }
    },
    reorder: (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    },
    // 최근 7일 내의 날짜인지 아닌지
    isRecentlyReleased: (value) => {
        let comparedDate = new Date(value);
        let date = new Date();
        // date.setMonth(date.getMonth()-1);
        date.setDate(date.getDate() - 7);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        if(!comparedDate) {
            return false;
        }

        if(date <= comparedDate) {
            return true;
        }else {
            return false;
        }
    }
}

export default valueUtils;