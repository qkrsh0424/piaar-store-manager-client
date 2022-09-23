import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Container, TipFieldWrapper } from "./ReturnItemTable.styled";
import SelectorButtonFieldView from "./SelectorButtonField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import ReturnProductImageModalComponent from "../return-product-image-modal/ReturnProductImageModal.component";

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
    const [selectedReturnItem, dispatchSelectedReturnItem] = useReducer(selectedReturnItemReducer, initialSelectedReturnItem);
    
    const [viewSize, dispatchViewSize] = useReducer(viewSizeReducer, initialViewSize);
    const [fixTargetItem, dispatchFixTargetItem] = useReducer(fixTargetItemReducer, initialFixTargetItem);

    const [fixItemModalOpen, setFixItemModalOpen] = useState(false);
    const [returnProductImageModalOpen, setReturnProductImageModalOpen] = useState(false);
    
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
            if ((sortedData[i].erpOrderItem.receiver === sortedData[i + 1].erpOrderItem.receiver)
                && sortedData[i].erpOrderItem.receiverContact1 === sortedData[i + 1].erpOrderItem.receiverContact1) {
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

    const isCheckedOne = useCallback((id) => {
        return props.checkedReturnItemList.some(r => r.id === id);
    }, [props.checkedReturnItemList])

    const onActionOpenFixItemModal = (e, returnItem) => {
        e.stopPropagation();
        let targetData = {...returnItem};

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
        
        if (!fixTargetItem.returnReasonType) {
            alert('[반품요청사유] 는 필수 입력 값 입니다.');
            return;
        }
        props._onSubmit_updateErpReturnItemOne(fixTargetItem);
        onActionCloseFixItemModal();
    }

    const onActionCheckReturnItem = (e, returnItem) => {
        e.stopPropagation();
        props._onAction_checkReturnItem(e, returnItem);
    }

    const onActionCheckReturnItemAll = () => {
        props._onAction_checkReturnItemAll();
    }

    const onActionReleaseReturnItemAll = () => {
        props._onAction_releaseReturnItemAll();
    }

    const onActionOpenReturnProductImageModal = async (e, returnItem) => {
        e.stopPropagation();

        // 현재 returnItem이 가리키는 erpOrderItem의 releaseOptionCode와 매칭되는 productOptionId를 추출.
        let optionId = props.productOptionList?.filter(r => r.code === returnItem.erpOrderItem.releaseOptionCode)[0]?.id;

        returnItem = {
            ...returnItem,
            productOptionId: optionId
        }

        dispatchSelectedReturnItem({
            type: 'SET_DATA',
            payload: returnItem
        })

        await props._onAction_searchReturnProductImage(returnItem.id);
        setReturnProductImageModalOpen(true);
    }

    const onActionCloseReturnProductImageModal = () => {
        setReturnProductImageModalOpen(false);
    }

    const onSubmitCreateReturnProductImage = (imageList) => {
        props._onSubmit_createReturnProductImage(imageList);
        onActionCloseReturnProductImageModal();
    }

    const onActionDeleteReturnProductImage = async (id) => {
        await props._onAction_deleteReturnProudctImage(id);
        await props._onAction_searchReturnProductImage(selectedReturnItem.id);
    }

    return (
        <>
            <Container>
                {(props.viewHeader && returnItemList) &&
                    <>
                        <div className="selector-box">
                            <SelectorButtonFieldView
                                releaseLocation={props.releaseLocation}

                                onActionCheckReturnItemAll={onActionCheckReturnItemAll}
                                onActionReleaseReturnItemAll={onActionReleaseReturnItemAll}
                            ></SelectorButtonFieldView>
                            <Tip></Tip>
                        </div>
                        <TableFieldView
                            tableScrollRef={tableScrollRef}

                            viewHeader={props.viewHeader}
                            returnItemList={returnItemList}
                            viewSize={viewSize}

                            isCheckedOne={isCheckedOne}
                            onActionCheckReturnItem={onActionCheckReturnItem}
                            onActionOpenFixItemModal={onActionOpenFixItemModal}
                            onActionOpenReturnProductImageModal={onActionOpenReturnProductImageModal}
                        ></TableFieldView>
                    </>
                }
                {!props.viewHeader &&
                    <div style={{ textAlign: 'center', padding: '100px 0', fontWeight: '600' }}>뷰 헤더를 먼저 설정해 주세요.</div>
                }
            </Container>
            
            {/* 단건 수정 모달 */}
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

            {/* 반품 이미지 등록 모달 */}
            <CommonModalComponent
                open={returnProductImageModalOpen}

                onClose={onActionCloseReturnProductImageModal}
            >
                <ReturnProductImageModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    returnProductImageList={props.returnProductImageList}
                    selectedReturnItem={selectedReturnItem}

                    onSubmitCreateReturnProductImage={onSubmitCreateReturnProductImage}
                    onActionDeleteReturnProductImage={onActionDeleteReturnProductImage}
                    onActionCloseReturnProductImageModal={onActionCloseReturnProductImageModal}
                ></ReturnProductImageModalComponent>
            </CommonModalComponent>
        </>
    );
}

export default ReturnItemTableComponent;

const initialViewSize = 50;
const initialFixTargetItem = null;
const initialReturnItemList = [];
const initialSelectedReturnItem = null;

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

const selectedReturnItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedReturnItem;
        default: return initialSelectedReturnItem;
    }
}
