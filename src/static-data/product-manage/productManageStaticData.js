const staticProductSearchHeader = [
    {
        "headerName": "상품코드",
        "matchedHeaderName": "code"
    },
    {
        "headerName": "상품명",
        "matchedHeaderName": "defaultName",
    },
    {
        "headerName": "상품설명",
        "matchedHeaderName": "managementName"
    },
    {
        "headerName": "메모",
        "matchedHeaderName": "memo"
    }
];

const staticOptionSearchHeader = [
    {
        "headerName": "옵션코드",
        "matchedHeaderName": "code"
    },
    {
        "headerName": "옵션명",
        "matchedHeaderName": "defaultName"
    },
    {
        "headerName": "옵션설명",
        "matchedHeaderName": "managementName"
    },
    {
        "headerName": "상태",
        "matchedHeaderName": "status"
    },
    {
        "headerName": "메모",
        "matchedHeaderName": "memo"
    },
    {
        "headerName": "출고지",
        "matchedHeaderName": "releaseLocation"
    }
]

function getProductSearchHeader() {
    let result = [...staticProductSearchHeader];
    return result;
}

function getOptionSearchHeader() {
    let result = [...staticOptionSearchHeader];
    return result;
}

function getDefaultHeaderFields() {
    let result = staticOptionSearchHeader.map(r => {
        return r.matchedHeaderName;
    })

    return result;
}

export {
    getProductSearchHeader,
    getOptionSearchHeader,
    getDefaultHeaderFields
}