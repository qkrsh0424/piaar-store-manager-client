import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Container, TipFieldWrapper } from "./OrderItemTable.styled";
import SelectorButtonFieldView from "./SelectorButtonField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import { dateToYYYYMMDDhhmmssWithInvalid } from "../../../../../utils/dateFormatUtils";
import SelectorRadioFieldView from "./SelectorRadioField.view";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";

function Tip({ selectedMatchCode }) {
    return (
        <TipFieldWrapper>
            <div>
                <span className='highlight'>{selectedMatchCode === 'optionCode' ? '[피아르 옵션코드]' : '[출고 옵션코드]'}</span> 
                를 기준으로 매칭된 상품 데이터 정보를 불러옵니다.
            </div>
        </TipFieldWrapper>
    );
}

const OrderItemTableComponent = (props) => {

    const tableScrollRef = useRef();

    const [orderItemList, dispatchOrderItemList] = useReducer(orderItemListReducer, initialOrderItemList);
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);
    const [fixTargetItem, dispatchFixTargetItem] = useReducer(fixTargetItemReducer, initialFixTargetItem);
    
    const [checkedOrderItemList, dispatchCheckedOrderItemList] = useReducer(checkedOrderItemListReducer, initialCheckedOrderItemList);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);
    const [fixItemModalOpen, setFixItemModalOpen] = useState(false);

    const [searchReleaseLocationValue, dispatchSearchReleaseLocationValue] = useReducer(searchReleaseLocationValueReducer, initialSearchReleaseLocationValue);

    useEffect(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            dispatchOrderItemList({
                type: 'CLEAR'
            });
            return;
        }
        
        if (tableScrollRef && tableScrollRef.current) {
            tableScrollRef.current.scrollTop = 0;
        }

        let data = [...props.orderItemList];
        let sortedData = data?.sort((a, b) => a.receiver.localeCompare(b.receiver));

        // 수령인+수취인전화번호 동일하다면 수령인 duplicationUser값 true로 변경
        for (var i = 0; i < sortedData.length - 1; i++) {
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

        let orderItemViewData = props.orderItemList.map(r1 => {
            let data = sortedData.filter(r2 => r1.id === r2.id)[0];
            return {
                ...r1,
                duplicationUser: data.duplicationUser
            }
        });

        dispatchOrderItemList({
            type: 'SET_DATA',
            payload: orderItemViewData
        });

        dispatchViewSize({
            type: 'SET_DATA',
            payload: 50
        })
    }, [props.orderItemList]);

    const isCheckedAll = useCallback(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            return false;
        }

        return props.orderItemList.length === props.checkedOrderItemList.length;
    }, [props.checkedOrderItemList, props.orderItemList])

    const isCheckedOne = useCallback((id) => {
        return props.checkedOrderItemList.some(r => r.id === id);
    }, [props.checkedOrderItemList])


    const onActionCheckOrderItem = (e, orderItem) => {
        e.stopPropagation();
        props._onAction_checkOrderItem(e, orderItem);
    }

    const onActionCheckOrderItemAll = () => {
        props._onAction_checkOrderItemAll(searchReleaseLocationValue);
    }

    const onActionReleaseOrderItemAll = () => {
        props._onAction_releaseOrderItemAll(searchReleaseLocationValue);
    }

    const onActionfetchMoreOrderItems = async () => {
        let newSize = viewSize + 20;
        dispatchViewSize({
            type: 'SET_DATA',
            payload: newSize
        })
    }

    const onActionOpenFixItemModal = (e, orderItem) => {
        e.stopPropagation();
        let targetData = {...orderItem};

        targetData.channelOrderDate = dateToYYYYMMDDhhmmssWithInvalid(orderItem.channelOrderDate, '');
        dispatchFixTargetItem({
            type: 'SET_DATA',
            payload: targetData
        })
        setFixItemModalOpen(true);
    }

    const onActionCloseFixItemModal = () => {
        dispatchFixTargetItem({
            type: 'CLEAR'
        })
        setFixItemModalOpen(false);
    }

    const onChangeFixTargetItem = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchFixTargetItem({
            type: 'CHANGE_DATA',
            payload: {
                name: name,
                value: value
            }
        })
    }

    const onActionConfirmUpdateFixOrderItem = (e) => {
        e.preventDefault();
        if (!fixTargetItem.uniqueCode) {
            alert('[피아르 고유번호] 는 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.prodName) {
            alert('[상품명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.optionName) {
            alert('[옵션정보] 는 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.unit || fixTargetItem.unit <= 0 || isNaN(fixTargetItem.unit)) {
            alert('[수량]  은 필수 항목이며, 1 이상의 숫자값만 허용됩니다.');
            return;
        }

        if (!fixTargetItem.receiver) {
            alert('[수취인명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.receiverContact1) {
            alert('[전화번호1] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.destination) {
            alert('[주소] 는 필수 입력 값 입니다.');
            return;
        }
        props._onSubmit_updateErpOrderItemOne(fixTargetItem);
        onActionCloseFixItemModal();
    }

    const onChangeReleaseLocationValue = (e) => {
        let location = e.target.value;
        dispatchSearchReleaseLocationValue({
            type: 'SET_DATA',
            payload: location
        })
    }

    const onChangeSelectedMatchCode = (e) => {
        e.stopPropagation();
        
        let matchedCode = e.target.value;
        props._onAction_changeMatchCode(matchedCode);
    }

    const onActionOpenOptionCodeModal = (e, itemId) => {
        e.stopPropagation();

        let data = orderItemList.filter(r => r.id === itemId);

        dispatchCheckedOrderItemList({
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
        let data = [...checkedOrderItemList];
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

        let data = orderItemList.filter(r => r.id === itemId);
        
        dispatchCheckedOrderItemList({
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
        let data = [...checkedOrderItemList];
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
                {(props.viewHeader && orderItemList) &&
                    <>
                        <Tip selectedMatchCode={props.selectedMatchCode}></Tip>
                        <div className="selector-box">
                            <SelectorButtonFieldView
                                releaseLocation={props.releaseLocation}
                                searchReleaseLocationValue={searchReleaseLocationValue}

                                onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                                onActionReleaseOrderItemAll={onActionReleaseOrderItemAll}
                                onChangeReleaseLocationValue={onChangeReleaseLocationValue}
                            ></SelectorButtonFieldView>
                            <SelectorRadioFieldView
                                selectedMatchCode={props.selectedMatchCode}
                                onChangeSelectedMatchCode={onChangeSelectedMatchCode}
                            ></SelectorRadioFieldView>
                        </div>
                        <TableFieldView
                            tableScrollRef={tableScrollRef}

                            viewHeader={props.viewHeader}
                            orderItemList={orderItemList}
                            viewSize={viewSize}
                            selectedMatchCode={props.selectedMatchCode}
                            
                            isCheckedOne={isCheckedOne}
                            isCheckedAll={isCheckedAll}
                            onActionCheckOrderItem={onActionCheckOrderItem}
                            onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                            onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                            onActionOpenFixItemModal={onActionOpenFixItemModal}

                            onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                            onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                        ></TableFieldView>
                    </>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
            {(fixItemModalOpen && fixTargetItem) &&
                <CommonModalComponent
                    open={fixItemModalOpen}
                    fullWidth={true}
                    maxWidth={'sm'}

                    onClose={onActionCloseFixItemModal}
                >
                    <FixOrderItemModalComponent
                        fixTargetItem={fixTargetItem}

                        onChangeFixTargetItem={onChangeFixTargetItem}
                        onActionCloseFixItemModal={onActionCloseFixItemModal}
                        onActionConfirmUpdateFixOrderItem={onActionConfirmUpdateFixOrderItem}
                    ></FixOrderItemModalComponent>
                </CommonModalComponent>
            }

            {/* 옵션 코드 모달 */}
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedOrderItemList={checkedOrderItemList}
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
                    checkedOrderItemList={checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeReleaseOptionCode(optionCode)}
                ></ReleaseOptionCodeModalComponent>
            </CommonModalComponent>
        </>
    );
}

export default OrderItemTableComponent;

const initialViewSize = 50;
const initialFixTargetItem = null;
const initialOrderItemList = [];
const initialSearchReleaseLocationValue = null;
const initialCheckedOrderItemList = null;

const viewSizeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return 50;
    }
}

const fixTargetItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialFixTargetItem;
        default: return initialFixTargetItem;
    }
}

const orderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderItemList;
        default: return initialOrderItemList;
    }
}

const searchReleaseLocationValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialSearchReleaseLocationValue;
    }
}

const checkedOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCheckedOrderItemList;
        default: return { ...state };
    }
}
