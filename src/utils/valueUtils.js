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
    }
}

export default valueUtils;