import { getDefaultHeaderDetails } from "./staticData";

const staticDefaultHeaderDetails = [
    {
        "cellNumber": 0,
        "customCellName": "반품 운송장번호",
        "originCellName": "반품 운송장번호",
        "matchedColumnName": "waybillNumber",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 1,
        "customCellName": "반품 택배사",
        "originCellName": "반품 택배사",
        "matchedColumnName": "courier",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 2,
        "customCellName": "반품 배송방식",
        "originCellName": "반품 배송방식",
        "matchedColumnName": "transportType",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 3,
        "customCellName": "반품배송비 입금방식",
        "originCellName": "반품배송비 입금방식",
        "matchedColumnName": "deliveryChargeReturnType",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 4,
        "customCellName": "반품 수거지",
        "originCellName": "반품 수거지",
        "matchedColumnName": "receiveLocation",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 5,
        "customCellName": "반품요청사유",
        "originCellName": "반품요청사유",
        "matchedColumnName": "returnReasonType",
        "allowedSearch": true,
        "requiredFlag": true,
        "variableType": 'string'
    },
    {
        "cellNumber": 6,
        "customCellName": "반품상세사유",
        "originCellName": "반품상세사유",
        "matchedColumnName": "returnReasonDetail",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 7,
        "customCellName": "관리메모1",
        "originCellName": "관리메모1",
        "matchedColumnName": "managementMemo1",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 8,
        "customCellName": "관리메모2",
        "originCellName": "관리메모2",
        "matchedColumnName": "managementMemo2",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 9,
        "customCellName": "관리메모3",
        "originCellName": "관리메모3",
        "matchedColumnName": "managementMemo3",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 10,
        "customCellName": "관리메모4",
        "originCellName": "관리메모4",
        "matchedColumnName": "managementMemo4",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 11,
        "customCellName": "관리메모5",
        "originCellName": "관리메모5",
        "matchedColumnName": "managementMemo5",
        "allowedSearch": true,
        "requiredFlag": false,
        "variableType": 'string'
    },
    {
        "cellNumber": 12,
        "customCellName": "!반품등록일",
        "originCellName": "!반품등록일",
        "matchedColumnName": "createdAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    },
    {
        "cellNumber": 13,
        "customCellName": "!수거일",
        "originCellName": "!수거일",
        "matchedColumnName": "collectAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    },
    {
        "cellNumber": 14,
        "customCellName": "!수거완료일",
        "originCellName": "!수거완료일",
        "matchedColumnName": "collectCompleteAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    },
    {
        "cellNumber": 15,
        "customCellName": "!처리완료일",
        "originCellName": "!처리완료일",
        "matchedColumnName": "returnCompleteAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    },
    {
        "cellNumber": 16,
        "customCellName": "!보류설정일",
        "originCellName": "!보류설정일",
        "matchedColumnName": "holdAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    },
    {
        "cellNumber": 17,
        "customCellName": "!반품거절 등록일",
        "originCellName": "!반품거절 등록일",
        "matchedColumnName": "returnRejectAt",
        "allowedSearch": false,
        "requiredFlag": false,
        "variableType": 'date'
    }
];

function getReturnDefaultHeaderDetails() {
    // let result = staticDefaultHeaderDetails.map((r, index) => {
    //     return {
    //         ...r,
    //         cellNumber: index
    //     }
    // })
    let orderDetails = getDefaultHeaderDetails().map(r => {
        return {
            ...r,
            matchedColumnName: 'order_' + r.matchedColumnName
        }
    })

    let result = [...staticDefaultHeaderDetails, ...orderDetails];
    result = {
        "headerDetail": {
            "details": result
        }
    }
    return result;
}

export {
    getReturnDefaultHeaderDetails
}