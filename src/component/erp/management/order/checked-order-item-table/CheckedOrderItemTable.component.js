import { useEffect, useReducer } from "react";
import { Container } from "./CheckedOrderItemTable.styled";
import TableFieldView from "./TableField.view";

const CheckedOrderItemTableComponent = (props) => {
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

    useEffect(() => {
        if(!props.checkedOrderItemList || props.checkedOrderItemList?.length <= 0) {
            dispatchCheckedOrderItemList({
                type: 'CLEAR'
            });
            return;
        }

        let data = [...props.checkedOrderItemList];
        let sortedData = data.sort((a, b) => a.receiver.localeCompare(b.receiver));

        // 수령인+수취인전화번호 동일하다면 수령인 duplicationUser값 true로 변경
        for (var i = 0; i < sortedData.length-1; i++) {
            if ((sortedData[i].receiver === sortedData[i + 1].receiver)
                && sortedData[i].receiverContact1 === sortedData[i + 1].receiverContact1) {
                sortedData[i] = {
                    ...sortedData[i],
                    duplicationUser: true
                };

                sortedData[i + 1] = {
                    ...sortedData[i + 1],
                    duplicationUser: true
                };
            }
        }

        let checkedOrderItemViewList = props.checkedOrderItemList.map(r1 => {
            let data = sortedData.filter(r2 => r1.id === r2.id)[0];
            return {
                ...r1,
                duplicationUser: data.duplicationUser
            }
        });

        dispatchCheckedOrderItemList({
            type: 'SET_DATA',
            payload: checkedOrderItemViewList
        })
    }, [props.checkedOrderItemList])

    const onActionfetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    const onActionCheckedOrderItem = (e, orderItem) => {
        e.stopPropagation();
        props._onAction_checkOrderItem(e, orderItem);
    }

    return (
        <>
            <Container>
                {(props.viewHeader && checkedOrderItemList) &&
                    <TableFieldView
                        viewHeader={props.viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                        viewSize={viewSize}

                        onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                        onActionCheckedOrderItem={onActionCheckedOrderItem}
                    ></TableFieldView>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
        </>
    );
}
export default CheckedOrderItemTableComponent;

const initialViewSize = 50;
const initialCheckedOrderItemList = [];

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}


const checkedOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCheckedOrderItemList;
        default: return initialCheckedOrderItemList;
    }
}