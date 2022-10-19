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
        "headerName": "출고지",
        "matchedHeaderName": "releaseLocation"
    },
    {
        "headerName": "비고",
        "matchedHeaderName": "memo"
    }
]

const staticProductSortHeader = [
    {
        "headerName": "상품명",
        "matchedHeaderName": "defaultName"
    },
    {
        "headerName": "등록일",
        "matchedHeaderName": "createdAt"
    },
    {
        "headerName": "수정일",
        "matchedHeaderName": "updatedAt"
    }

];

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

function getProductSortHeader() {
    let result = staticProductSortHeader.map(r => {
        return r.matchedHeaderName;
    })

    return result;
}

export {
    getProductSearchHeader,
    getOptionSearchHeader,
    getDefaultHeaderFields,
    getProductSortHeader
}