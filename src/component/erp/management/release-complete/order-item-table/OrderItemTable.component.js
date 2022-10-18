import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { dateToYYYYMMDDhhmmssWithInvalid } from "../../../../../utils/dateFormatUtils";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import { Container, TipFieldWrapper } from "./OrderItemTable.styled";
import SelectorButtonFieldView from "./SelectorButtonField.view";
import TableFieldView from "./TableField.view";
import { v4 as uuidv4 } from 'uuid';
import SelectorRadioFieldView from "./SelectorRadioField.view";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";
import { useImageFileUploaderHook } from "../../../../../hooks/uploader/useImageFileUploaderHook";
import SubmitModalComponent from "../../../../module/modal/SubmitModalComponent";
import { getDefaultDeliveryChargeReturnType } from "../../../../../static-data/erp/erpReturnItemStaticData";

function Tip({selectedMatchCode}) {
    return (
        <TipFieldWrapper>
            <div>
                <div>
                    <span className='highlight'>{selectedMatchCode === 'optionCode' ? '[피아르 옵션코드]' : '[출고 옵션코드]'}</span>를 기준으로 매칭된 상품 데이터 정보를 불러옵니다.
                </div>
                <div>
                    <span className='highlight'>{selectedMatchCode === 'optionCode' ? '[피아르 옵션코드]' : '[출고 옵션코드]'}</span>에 매칭된 상품의 재고가 반영됩니다.
                </div>
            </div>
        </TipFieldWrapper>
    );
}

const DEFAULT_DELIVERY_CHARGE_RETURN_TYPE = getDefaultDeliveryChargeReturnType();

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

    const [returnConfirmModalOpen, setReturnConfirmModalOpen] = useState(false);
    const [returnRegistrationInfo, dispatchReturnRegistrationInfo] = useReducer(returnRegistrationReducer, initialReturnRegistration);
    const [returnProductImageList, dispatchReturnProductImageList] = useReducer(returnProductImageListReducer, initialReturnProductImageList);

    const {
        __reqUploadBatchImageFile: __reqUploadBatchImageFile
    } = useImageFileUploaderHook();

    useEffect(() => {
        if (!props.orderItemList || props.orderItemList?.length <= 0) {
            dispatchOrderItemList({
                type:'CLEAR'
            })
            return;
        }

        if (tableScrollRef && tableScrollRef.current) {
            tableScrollRef.current.scrollTop = 0;
        }

        let data = [...props.orderItemList];
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
    }, [props.orderItemList])

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

        if (data[0].returnYn === 'y') {
            alert('반품처리된 데이터는 옵션코드 및 출고옵션코드를 변경할 수 없습니다.');
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

        if (data[0].returnYn === 'y') {
            alert('반품처리된 데이터는 옵션코드 및 출고옵션코드를 변경할 수 없습니다.');
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

    const onActionOpenReturnConfirmModal = (e, itemId) => {
        e.stopPropagation();

        let data = orderItemList.filter(r => r.id === itemId)[0];

        if (!data) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if(data.stockReflectYn === 'n') {
            alert('재고 미반영 데이터는 반품등록이 불가능합니다.');
            return;
        }

        // erp order item값을 참고해 설정하는 값
        // 반품 택배사, 반품 배송방식, 반품 입고지
        let returnInfo = {
            courier: data.courier,
            transportType: data.transportType,
            receiveLocation: data.optionReleaseLocation,
            erpOrderItemId: data.id
        }
        
        dispatchReturnRegistrationInfo({
            type: 'INIT_DATA',
            payload: returnInfo
        });
        setReturnConfirmModalOpen(true);
    }

    const onActionCloseReturnConfirmModal = () => {
        setReturnConfirmModalOpen(false);

        dispatchReturnRegistrationInfo({ type: 'CLEAR' })
        dispatchReturnProductImageList({ type: 'CLEAR' })
    }

    const onChangeSelectReturnType = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;

        dispatchReturnRegistrationInfo({
            type: 'SET_DATA',
            payload: {
                name: targetName,
                value: targetValue
            }
        })

        // 입금타입에 따라 입금여부를 세팅
        if(targetName === 'deliveryChargeReturnType') {
            let returnYn = (targetValue === '미청구') ? 'y' : 'n';

            dispatchReturnRegistrationInfo({
                type: 'SET_DATA',
                payload: {
                    name: 'deliveryChargeReturnYn',
                    value: returnYn
                }
            })
        }
    }

    const onActionConfirmReturn = (e) => {
        e.preventDefault();

        if(!returnRegistrationInfo || !returnRegistrationInfo.returnReasonType) {
            alert('반품 요청 사유는 필수값입니다. 다시 시도해주세요.');
            return;
        }

        // erp return item, 반품 상품 이미지 등록
        let data = {
            erpReturnItemDto: returnRegistrationInfo,
            imageDtos: returnProductImageList
        }

        // 반품 데이터 생성
        props._onSubmit_createReturnItem(data)
        onActionCloseReturnConfirmModal();
    }

    const onActionClickReturnProductImageButton = () => {
        document.getElementById("rpi_uploader").click();
    }

    const onActionUploadReturnProductImageFile = async (e) => {
        e.preventDefault();

        if(e.target.files.length === 0) return;

        props.onActionOpenBackdrop();
        let imageInfo = await __reqUploadBatchImageFile(e);
        props.onActionCloseBackdrop();

        let erpOrderItem = orderItemList.filter(r => r.id === returnRegistrationInfo.erpOrderItemId)[0];
        let optionList = props.productOptionList?.map(r => r.option);
        let optionId = optionList?.filter(r => r.code === erpOrderItem.releaseOptionCode)[0]?.id;
        
        let addData = imageInfo?.map(info => {
            return {
                id: uuidv4(),
                imageUrl: info.imageUrl,
                imageFileName: info.imageFileName,
                productOptionId: optionId,
                erpReturnItemId: returnRegistrationInfo.erpOrderItemId
            }
        });
        
        dispatchReturnProductImageList({
            type: 'INIT_DATA',
            payload: addData
        });
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
                            onActionCheckOrderItem={onActionCheckOrderItem}
                            onActionCheckOrderItemAll={onActionCheckOrderItemAll}
                            onActionfetchMoreOrderItems={onActionfetchMoreOrderItems}
                            onActionOpenFixItemModal={onActionOpenFixItemModal}

                            onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                            onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                            onActionOpenReturnConfirmModal={onActionOpenReturnConfirmModal}
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

            {/* 반품 처리 서밋 모달 */}
            <SubmitModalComponent
                open={returnConfirmModalOpen}
                title={'반품 접수'}
                message={
                    <>
                        <div className='info-wrapper'>
                            <div className='info-box'>
                                <span className='input-title'>반품 택배사</span>
                                <div className='input-value'>
                                    <input
                                        type='text'
                                        name='courier'
                                        value={returnRegistrationInfo?.courier || ''}
                                        onChange={onChangeSelectReturnType}
                                    />
                                </div>
                            </div>
                            <div className='info-box'>
                                <span className='input-title'>반품 배송방식</span>
                                <div className='input-value'>
                                    <input
                                        type='text'
                                        name='transportType'
                                        value={returnRegistrationInfo?.transportType || ''}
                                        onChange={onChangeSelectReturnType}
                                    />
                                </div>
                            </div>
                            <div className='info-box'>
                                <span className='input-title'>반품배송비 입금방식</span>
                                <div>
                                    <select
                                        className='select-item'
                                        name='deliveryChargeReturnType'
                                        value={returnRegistrationInfo?.deliveryChargeReturnType || ''}
                                        onChange={onChangeSelectReturnType}
                                        required
                                    >
                                        <option value=''>선택</option>
                                        {DEFAULT_DELIVERY_CHARGE_RETURN_TYPE.map((r, idx) => {
                                            return(
                                                <option key={'type-idx' + idx} value={r.typeName}>{r.typeName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='info-box'>
                                <span className='input-title'>반품 입고지</span>
                                <div className='input-value'>
                                    <input
                                        type='text'
                                        name='receiveLocation'
                                        value={returnRegistrationInfo?.receiveLocation || ''}
                                        onChange={onChangeSelectReturnType}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='info-wrapper'>
                            <div className='info-box'>
                                <div className='input-title'>
                                    <span style={{ color: 'red' }}>* </span>
                                    <span className='input-title'>반품 요청사유</span>
                                </div>
                                <div>
                                    <select
                                        className='select-item'
                                        name='returnReasonType'
                                        value={returnRegistrationInfo?.returnReasonType || ''}
                                        onChange={onChangeSelectReturnType}
                                        required
                                    >
                                        <option value=''>선택</option>
                                        {props.returnTypeList?.map(r => {
                                            return (
                                                <option key={`return-type-idx` + r.cid} value={r.type}>{r.type}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='info-box'>
                                <div className='input-title'>
                                    <span className='input-title'>반품 상세사유</span>
                                </div>
                                <div>
                                    <textarea
                                        className='text-input'
                                        name='returnReasonDetail'
                                        onChange={onChangeSelectReturnType}
                                        value={returnRegistrationInfo?.returnReasonDetail || ''}
                                        placeholder={`반품요청 상세 사유를 입력해 주세요.\n(300자 이내)`}
                                    />
                                </div>
                            </div>
                            
                            <div className='info-box'>
                                <div className='input-title'>
                                    <span className='input-title'>반품 상품 이미지</span>
                                </div>
                                <div className='upload-box'>
                                    <div>
                                        <button
                                            type='button'
                                            className='button-el'
                                            onClick={onActionClickReturnProductImageButton}
                                        >이미지 등록</button>
                                        <input type="file" accept="image/*"
                                            id={'rpi_uploader'}
                                            onClick={(e) => e.target.value = ''}
                                            onChange={onActionUploadReturnProductImageFile}
                                            multiple
                                        />
                                    </div>
                                    <span>({returnProductImageList?.length || 0} 개)</span>
                                </div>
                            </div>
                        </div>
                        <div>선택된 데이터를 반품 처리 하시겠습니까? </div>
                    </>
                }

                maxWidth={'sm'}
                _onSubmit={onActionConfirmReturn}
                onClose={onActionCloseReturnConfirmModal}
            />
        </>
    );
}

export default OrderItemTableComponent;

const initialViewSize = 50;
const initialFixTargetItem = null;
const initialOrderItemList = [];
const initialSearchReleaseLocationValue = null;
const initialCheckedOrderItemList = null;
const initialReturnRegistration = null;
const initialReturnProductImageList = null;

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

const returnRegistrationReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialReturnRegistration;
        default: return initialReturnRegistration;
    }
}

const returnProductImageListReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReturnProductImageList;
        default: return initialReturnProductImageList;
    }
}
