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
    },
    /**
     * 넘어온 값(value)을 구분자(splitStr)로 분리해 배열을 만든다.
     * 배열 요소의 앞뒤 공백을 제거한다.
     * 
     * 상품등록 > 옵션명 일괄 생성, 옵션 리스트 적용 버튼 클릭시 동작.
     */
    trimAndSplit: (value, splitStr) => {
        let data = value?.split(splitStr);
        return data.map(r => r.trim());
    }
}

export default valueUtils;