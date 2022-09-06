import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Container, TipFieldWrapper } from "./ReturnItemTable.styled";
import SelectorButtonFieldView from "./SelectorButtonField.view";
import TableFieldView from "./TableField.view";
// import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
// import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import { dateToYYYYMMDDhhmmssWithInvalid } from "../../../../../utils/dateFormatUtils";
import SelectorRadioFieldView from "./SelectorRadioField.view";
// import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
// import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";

function Tip() {
    return (
        <TipFieldWrapper>
            <div>
                <span className='highlight'>출고 옵션코드</span> 
                를 기준으로 매칭된 상품 데이터 정보를 불러옵니다.
            </div>
        </TipFieldWrapper>
    );
}

const ReturnItemTableComponent = (props) => {

    const tableScrollRef = useRef();

    const [returnItemList, dispatchReturnItemList] = useReducer(returnItemListReducer, initialReturnItemList);
    
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);
    // const [fixTargetItem, dispatchFixTargetItem] = useReducer(fixTargetItemReducer, initialFixTargetItem);
    
    // const [checkedReturnItemList, dispatchCheckedReturnItemList] = useReducer(checkedReturnItemListReducer, initialCheckedReturnItemList);
    // const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    // const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);
    // const [fixItemModalOpen, setFixItemModalOpen] = useState(false);

    const [searchReleaseLocationValue, dispatchSearchReleaseLocationValue] = useReducer(searchReleaseLocationValueReducer, initialSearchReleaseLocationValue);

    useEffect(() => {
        if (!props.returnItemList || props.returnItemList?.length <= 0) {
            dispatchReturnItemList({
                type: 'CLEAR'
            });
            return;
        }

        if (tableScrollRef && tableScrollRef.current) {
            tableScrollRef.current.scrollTop = 0;
        }

        let data = [...props.returnItemList];
        let sortedData = data?.sort((a, b) => a.erpOrderItem.receiver.localeCompare(b.erpOrderItem.receiver));

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

        let orderItemViewData = props.returnItemList.map(r1 => {
            let data = sortedData.filter(r2 => r1.id === r2.id)[0];
            return {
                ...r1,
                duplicationUser: data.duplicationUser
            }
        });

        dispatchReturnItemList({
            type: 'SET_DATA',
            payload: orderItemViewData
        });

        dispatchViewSize({
            type: 'SET_DATA',
            payload: 50
        })
    }, [props.returnItemList]);

    // const onActionOpenFixItemModal = (e, orderItem) => {
    //     e.stopPropagation();
    //     let targetData = {...orderItem};

    //     targetData.channelOrderDate = dateToYYYYMMDDhhmmssWithInvalid(orderItem.channelOrderDate, '');
    //     dispatchFixTargetItem({
    //         type: 'SET_DATA',
    //         payload: targetData
    //     })
    //     setFixItemModalOpen(true);
    // }

    // const onActionCloseFixItemModal = () => {
    //     dispatchFixTargetItem({
    //         type: 'CLEAR'
    //     })
    //     setFixItemModalOpen(false);
    // }

    // const onChangeFixTargetItem = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     dispatchFixTargetItem({
    //         type: 'CHANGE_DATA',
    //         payload: {
    //             name: name,
    //             value: value
    //         }
    //     })
    // }

    // const onActionConfirmUpdateFixOrderItem = (e) => {
    //     e.preventDefault();
    //     if (!fixTargetItem.uniqueCode) {
    //         alert('[피아르 고유번호] 는 필수 입력 값 입니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.prodName) {
    //         alert('[상품명] 은 필수 입력 값 입니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.optionName) {
    //         alert('[옵션정보] 는 필수 입력 값 입니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.unit || fixTargetItem.unit <= 0 || isNaN(fixTargetItem.unit)) {
    //         alert('[수량]  은 필수 항목이며, 1 이상의 숫자값만 허용됩니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.receiver) {
    //         alert('[수취인명] 은 필수 입력 값 입니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.receiverContact1) {
    //         alert('[전화번호1] 은 필수 입력 값 입니다.');
    //         return;
    //     }

    //     if (!fixTargetItem.destination) {
    //         alert('[주소] 는 필수 입력 값 입니다.');
    //         return;
    //     }
    //     props._onSubmit_updateErpOrderItemOne(fixTargetItem);
    //     onActionCloseFixItemModal();
    // }

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

    // const onActionOpenOptionCodeModal = (e, itemId) => {
    //     e.stopPropagation();

    //     let data = returnItemList.filter(r => r.id === itemId);

    //     dispatchCheckedReturnItemList({
    //         type: 'SET_DATA',
    //         payload: data
    //     })

    //     if (data?.length <= 0) {
    //         alert('데이터를 먼저 선택해 주세요.');
    //         return;
    //     }

    //     setOptionCodeModalOpen(true);
    // }

    // const onActionCloseOptionCodeModal = () => {
    //     setOptionCodeModalOpen(false);
    // }

    // const onActionChangeOptionCode = (optionCode) => {
    //     let data = [...checkedReturnItemList];
    //     data = data.map(r => {
    //         return {
    //             ...r,
    //             optionCode: optionCode
    //         }
    //     })
    //     props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
    //     onActionCloseOptionCodeModal();
    // }

    // const onActionOpenReleaseOptionCodeModal = (e, itemId) => {
    //     e.stopPropagation();

    //     let data = returnItemList.filter(r => r.id === itemId);
        
    //     dispatchCheckedReturnItemList({
    //         type: 'SET_DATA',
    //         payload: data
    //     })

    //     if (data?.length <= 0) {
    //         alert('데이터를 먼저 선택해 주세요.');
    //         return;
    //     }

    //     setReleaseOptionCodeModalOpen(true);
    // }

    // const onActionCloseReleaseOptionCodeModal = () => {
    //     setReleaseOptionCodeModalOpen(false);
    // }

    // const onActionChangeReleaseOptionCode = (optionCode) => {
    //     let data = [...checkedReturnItemList];
    //     data = data.map(r => {
    //         return {
    //             ...r,
    //             releaseOptionCode: optionCode
    //         }
    //     })
    //     props._onSubmit_changeReleaseOptionCodeForOrderItemListInBatch(data);
    //     onActionCloseReleaseOptionCodeModal();
    // }

    return (
        <>
            <Container>
                {(props.viewHeader && returnItemList) &&
                    <>
                        <div className="selector-box">
                            <SelectorButtonFieldView
                                releaseLocation={props.releaseLocation}
                                searchReleaseLocationValue={searchReleaseLocationValue}
                                onChangeReleaseLocationValue={onChangeReleaseLocationValue}
                            ></SelectorButtonFieldView>
                            <Tip></Tip>
                        </div>
                        <TableFieldView
                            tableScrollRef={tableScrollRef}

                            viewHeader={props.viewHeader}
                            returnItemList={returnItemList}
                            viewSize={viewSize}
                            selectedMatchCode={props.selectedMatchCode}
                        ></TableFieldView>
                    </>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
            {/* {(fixItemModalOpen && fixTargetItem) &&
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
            } */}

            {/* 옵션 코드 모달 */}
            {/* <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedReturnItemList={checkedReturnItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeOptionCode(optionCode)}
                ></OptionCodeModalComponent>
            </CommonModalComponent> */}

            {/* 옵션 코드 모달 */}
            {/* <CommonModalComponent
                open={releaseOptionCodeModalOpen}

                onClose={onActionCloseReleaseOptionCodeModal}
            >
                <ReleaseOptionCodeModalComponent
                    checkedReturnItemList={checkedReturnItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeReleaseOptionCode(optionCode)}
                ></ReleaseOptionCodeModalComponent>
            </CommonModalComponent> */}
        </>
    );
}

export default ReturnItemTableComponent;

const initialViewSize = 50;
const initialFixTargetItem = null;
const initialReturnItemList = [];
const initialSearchReleaseLocationValue = null;
const initialCheckedReturnItemList = null;

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

const returnItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReturnItemList;
        default: return initialReturnItemList;
    }
}

const searchReleaseLocationValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialSearchReleaseLocationValue;
    }
}
