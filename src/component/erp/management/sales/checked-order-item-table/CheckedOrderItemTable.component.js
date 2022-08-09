import { useCallback, useEffect, useReducer, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";
import { Container } from "./CheckedOrderItemTable.styled";
import TableFieldView from "./TableField.view";

const CheckedOrderItemTableComponent = (props) => {
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);

    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [checkedOrderItem, dispatchCheckedOrderItem] = useReducer(checkedOrderItemReducer, initialCheckedOrderItem);
    const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);

    const onActionfetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

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

    const isCheckedOne = useCallback((id) => {
        return props.checkedOrderItemList.some(r => r.id === id);
    }, [props.checkedOrderItemList])

    const onActionCheckOrderItem = (e, orderItem) => {
        e.stopPropagation();
        props._onAction_checkOrderItem(e, orderItem);
    }

    const onActionOpenOptionCodeModal = (e, itemId) => {
        e.stopPropagation();

        console.log(itemId);
        let data = checkedOrderItemList.filter(r => r.id === itemId);

        dispatchCheckedOrderItem({
            type: 'SET_DATA',
            payload: data
        })

        if (data?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setOptionCodeModalOpen(true);
    }

    const onActionCloseOptionCodeModal = () => {
        setOptionCodeModalOpen(false);
    }

    const onActionChangeOptionCode = (optionCode) => {
        let data = [...checkedOrderItem];
        data = data.map(r => {
            return {
                ...r,
                optionCode: optionCode
            }
        })
        props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
        onActionCloseOptionCodeModal();
    }

    const onActionOpenReleaseOptionCodeModal = (e, itemId) => {
        e.stopPropagation();

        let data = checkedOrderItemList.filter(r => r.id === itemId);
        
        dispatchCheckedOrderItem({
            type: 'SET_DATA',
            payload: data
        })

        if (data?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setReleaseOptionCodeModalOpen(true);
    }

    const onActionCloseReleaseOptionCodeModal = () => {
        setReleaseOptionCodeModalOpen(false);
    }

    const onActionChangeReleaseOptionCode = (optionCode) => {
        let data = [...checkedOrderItem];
        data = data.map(r => {
            return {
                ...r,
                releaseOptionCode: optionCode
            }
        })
        props._onSubmit_changeReleaseOptionCodeForOrderItemListInBatch(data);
        onActionCloseReleaseOptionCodeModal();
    }

    return (
        <>
            <Container>
                {(props.viewHeader && checkedOrderItemList) &&
                    <TableFieldView
                        viewHeader={props.viewHeader}
                        checkedOrderItemList={checkedOrderItemList}
                        viewSize={viewSize}

                        isCheckedOne={isCheckedOne}

                        onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                        onActionCheckOrderItem={onActionCheckOrderItem}

                        onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                        onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                    ></TableFieldView>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>

            {/* 옵션 코드 모달 */}
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedOrderItemList={checkedOrderItem}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeOptionCode(optionCode)}
                ></OptionCodeModalComponent>
            </CommonModalComponent>

            {/* 옵션 코드 모달 */}
            <CommonModalComponent
                open={releaseOptionCodeModalOpen}

                onClose={onActionCloseReleaseOptionCodeModal}
            >
                <ReleaseOptionCodeModalComponent
                    checkedOrderItemList={checkedOrderItem}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeReleaseOptionCode(optionCode)}
                ></ReleaseOptionCodeModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default CheckedOrderItemTableComponent;

const initialViewSize = 50;
const initialCheckedOrderItemList = [];
const initialCheckedOrderItem = [];

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

const checkedOrderItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCheckedOrderItem;
        default: return initialCheckedOrderItem;
    }
}