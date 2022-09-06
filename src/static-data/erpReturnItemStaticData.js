import { getDefaultHeaderDetails } from "./staticData";

const staticDefaultHeaderDetails = [
    {
        "cellNumber": 0,
        "customCellName": "반품 운송장번호",
        "originCellName": "반품 운송장번호",
        "matchedColumnName": "waybillNumber"
    },
    {
        "cellNumber": 1,
        "customCellName": "반품 택배사",
        "originCellName": "반품 택배사",
        "matchedColumnName": "courier"
    },
    {
        "cellNumber": 2,
        "customCellName": "반품 배송방식",
        "originCellName": "반품 배송방식",
        "matchedColumnName": "transportType"
    },
    {
        "cellNumber": 3,
        "customCellName": "반품배송비 입금방식",
        "originCellName": "반품배송비 입금방식",
        "matchedColumnName": "deliveryChargeReturnType"
    },
    {
        "cellNumber": 4,
        "customCellName": "반품 수거지",
        "originCellName": "반품 수거지",
        "matchedColumnName": "receiveLocation"
    },
    {
        "cellNumber": 5,
        "customCellName": "반품요청사유",
        "originCellName": "반품요청사유",
        "matchedColumnName": "returnReasonType"
    },
    {
        "cellNumber": 6,
        "customCellName": "반품상세사유",
        "originCellName": "반품상세사유",
        "matchedColumnName": "returnReasonDetail"
    },
    {
        "cellNumber": 7,
        "customCellName": "관리메모1",
        "originCellName": "관리메모1",
        "matchedColumnName": "managementMemo1"
    },
    {
        "cellNumber": 8,
        "customCellName": "관리메모2",
        "originCellName": "관리메모2",
        "matchedColumnName": "managementMemo2"
    },
    {
        "cellNumber": 9,
        "customCellName": "관리메모3",
        "originCellName": "관리메모3",
        "matchedColumnName": "managementMemo3"
    },
    {
        "cellNumber": 10,
        "customCellName": "관리메모4",
        "originCellName": "관리메모4",
        "matchedColumnName": "managementMemo4"
    },
    {
        "cellNumber": 11,
        "customCellName": "관리메모5",
        "originCellName": "관리메모5",
        "matchedColumnName": "managementMemo5"
    },
    {
        "cellNumber": 12,
        "customCellName": "!반품등록일",
        "originCellName": "!반품등록일",
        "matchedColumnName": "createdAt"
    },
    {
        "cellNumber": 13,
        "customCellName": "!수거일",
        "originCellName": "!수거일",
        "matchedColumnName": "collectAt"
    },
    {
        "cellNumber": 14,
        "customCellName": "!수거완료일",
        "originCellName": "!수거완료일",
        "matchedColumnName": "collectCompleteAt"
    },
    {
        "cellNumber": 15,
        "customCellName": "!처리완료일",
        "originCellName": "!처리완료일",
        "matchedColumnName": "returnCompleteAt"
    },
    {
        "cellNumber": 16,
        "customCellName": "!보류설정일",
        "originCellName": "!보류설정일",
        "matchedColumnName": "holdAt"
    },
    {
        "cellNumber": 17,
        "customCellName": "!반품거절 등록일",
        "originCellName": "!반품거절 등록일",
        "matchedColumnName": "returnRejectAt"
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