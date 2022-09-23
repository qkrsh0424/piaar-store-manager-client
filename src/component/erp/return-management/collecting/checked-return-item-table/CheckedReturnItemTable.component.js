import { useCallback, useEffect, useReducer } from "react";
import { Container } from "./CheckedReturnItemTable.styled";
import TableFieldView from "./TableField.view";

const CheckedReturnItemTableComponent = (props) => {
    const [checkedReturnItemList, dispatchCheckedReturnItemList] = useReducer(checkedReturnItemListReducer, initialCheckedReturnItemList);
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

    useEffect(() => {
        if(!props.checkedReturnItemList || props.checkedReturnItemList?.length <= 0) {
            dispatchCheckedReturnItemList({
                type: 'CLEAR'
            });
            return;
        }

        let data = [...props.checkedReturnItemList];
        let sortedData = data.sort((a, b) => a.erpOrderItem.receiver.localeCompare(b.erpOrderItem.receiver));

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

        let checkedOrderItemViewList = props.checkedReturnItemList.map(r1 => {
            let data = sortedData.filter(r2 => r1.id === r2.id)[0];
            return {
                ...r1,
                duplicationUser: data.duplicationUser
            }
        });

        dispatchCheckedReturnItemList({
            type: 'SET_DATA',
            payload: checkedOrderItemViewList
        })
    }, [props.checkedReturnItemList])

    const onActionfetchMoreReturnItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    const isCheckedOne = useCallback((id) => {
        return props.checkedReturnItemList.some(r => r.id === id);
    }, [props.checkedReturnItemList])

    const onActionCheckReturnItem = (e, returnItem) => {
        e.stopPropagation();
        props._onAction_checkReturnItem(e, returnItem);
    }

    return (
        <>
            <Container>
                {(props.viewHeader && checkedReturnItemList) &&
                    <TableFieldView
                        viewHeader={props.viewHeader}
                        checkedReturnItemList={checkedReturnItemList}
                        viewSize={viewSize}

                        isCheckedOne={isCheckedOne}

                        onActionfetchMoreReturnItems={onActionfetchMoreReturnItems}
                        onActionCheckReturnItem={onActionCheckReturnItem}
                    ></TableFieldView>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
        </>
    );
}
export default CheckedReturnItemTableComponent;

const initialViewSize = 50;
const initialCheckedReturnItemList = [];

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}


const checkedReturnItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCheckedReturnItemList;
        default: return initialCheckedReturnItemList;
    }
}
