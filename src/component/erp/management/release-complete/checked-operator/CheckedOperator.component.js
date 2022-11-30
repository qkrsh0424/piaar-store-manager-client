import { useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BackdropHookComponent, useBackdropHook } from "../../../../../hooks/backdrop/useBackdropHook";
import { useImageFileUploaderHook } from "../../../../../hooks/uploader/useImageFileUploaderHook";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import SubmitModalComponent from "../../../../module/modal/SubmitModalComponent";
import SubmitModalComponentV2 from "../../../../module/modal/SubmitModalComponentV2";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseListModalComponent from "../release-list-modal/ReleaseListModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";
import WaybillModalComponent from "../waybill-modal/WaybillModal.component";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";
import ReturnRegistrationFormFieldView from "./ReturnRegistrationForm.view";

const CheckedOperatorComponent = (props) => {
    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [releaseConfirmModalOpen, setReleaseConfirmModalOpen] = useState(false);
    const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);
    const [waybillModalOpen, setWaybillModalOpen] = useState(false);
    const [reflectStockConfirmModalOpen, setReflectStockConfirmModalOpen] = useState(false);
    const [cancelStockConfirmModalOpen, setCancelStockConfirmModalOpen] = useState(false);
    const [releaseListModalOpen, setReleaseListModalOpen] = useState(false);
    
    const [returnRegistrationInfo, setReturnRegistrationInfo] = useState(null);
    const [returnConfirmModalOpen, setReturnConfirmModalOpen] = useState(false);

    const [confirmModalInputValue, dispatchConfirmModalInputValue] = useReducer(confirmModalInputValueReducer, initialConfirmModalInputValue);
    
    const {
        __reqUploadBatchImageFile
    } = useImageFileUploaderHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const onActionOpenSalesConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setSalesConfirmModalOpen(true);
    }

    const onActionCloseSalesConfirmModal = () => {
        setSalesConfirmModalOpen(false);
    }

    const onActionConfirmSales = () => {
        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                salesYn: 'n',
                salesAt: null
            }
        })
        props._onSubmit_changeSalesYnForOrderItemList(data);
        onActionCloseSalesConfirmModal();
    }

    const onActionOpenDeleteConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setDeleteConfirmModalOpen(true);
    }

    const onActionCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const onActionConfirmDelete = () => {
        props._onSubmit_deleteOrderItemList(props.checkedOrderItemList);
        onActionCloseDeleteConfirmModal();
    }

    const onActionOpenOptionCodeModal = (e) => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.returnYn === 'y') {
                uniqueCodes.push(r.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`반품처리된 데이터가 있습니다.\n반품처리된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            return;
        }

        setOptionCodeModalOpen(true);
    }

    const onActionCloseOptionCodeModal = () => {
        setOptionCodeModalOpen(false);
    }

    const onActionChangeOptionCode = (optionCode) => {
        let data = [...props.checkedOrderItemList];
        data = data.map(r => {
            return {
                ...r,
                optionCode: optionCode
            }
        })
        props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
        onActionCloseOptionCodeModal();
    }

    const onActionOpenReleaseConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let alreadyReflected = props.checkedOrderItemList.filter(r => r.stockReflectYn === 'y');
        if (alreadyReflected && alreadyReflected.length > 0) {
            alert('이미 재고에 반영된 데이터가 있습니다. 해당 데이터의 재고 반영을 취소 후 진행해 주시기 바랍니다.');
            onActionCloseReleaseConfirmModal();
            return;
        }

        setReleaseConfirmModalOpen(true);
    }

    const onActionCloseReleaseConfirmModal = () => {
        setReleaseConfirmModalOpen(false);
    }

    const onActionConfirmRelease = () => {
        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                releaseYn: 'n',
                releaseAt: null
            }
        })
        props._onSubmit_changeReleaseYnForOrderItemList(data);
        onActionCloseReleaseConfirmModal();
    }

    const onActionOpenReleaseOptionCodeModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.returnYn === 'y') {
                uniqueCodes.push(r.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`반품처리된 데이터가 있습니다.\n반품처리된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            return;
        }
        
        setReleaseOptionCodeModalOpen(true);
    }

    const onActionCloseReleaseOptionCodeModal = () => {
        setReleaseOptionCodeModalOpen(false);
    }

    const onActionChangeReleaseOptionCode = (optionCode) => {
        let data = [...props.checkedOrderItemList];
        data = data.map(r => {
            return {
                ...r,
                releaseOptionCode: optionCode
            }
        })
        props._onSubmit_changeReleaseOptionCodeForOrderItemListInBatch(data);
        onActionCloseReleaseOptionCodeModal();
    }

    const onActionOpenWaybillModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setWaybillModalOpen(true);
    }

    const onActionCloseWaybillModal = () => {
        setWaybillModalOpen(false);
    }

    const onActionDownloadWaybillExcelSample = () => {
        props._onAction_downloadWaybillExcelSample();
    }

    const onActionRegisterWaybill = (uploadFile) => {
        var formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('orderItems', new Blob([JSON.stringify(props.checkedOrderItemList)], { type: 'application/json' }))

        props._onSubmit_changeWaybillForOrderItemList(formData);
        onActionCloseWaybillModal();
    }

    // 재고 반영 모달 OPEN
    const onActionOpenReflectStockConfirmModal = (e) => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.stockReflectYn === 'y') {
                uniqueCodes.push(r.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`이미 재고 반영된 데이터가 있습니다.\n재고에 반영된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseReflectStockConfirmModal(e);
            return;
        }

        setReflectStockConfirmModalOpen(true);
    }

    // 재고 반영 모달 CLOSE
    const onActionCloseReflectStockConfirmModal = (e) => {
        e.preventDefault();
        setReflectStockConfirmModalOpen(false);
        dispatchConfirmModalInputValue({ type : 'CLEAR' })
    }

    // 재고 반영 서밋
    const onSubmitReflectStock = (e) => {
        e.preventDefault();

        props._onAction_reflectStock(confirmModalInputValue);
        onActionCloseReflectStockConfirmModal(e);
    }

    // 재고 취소 모달 OPEN
    const onActionOpenCancelStockConfirmModal = (e) => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        let returnUniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.stockReflectYn === 'n') {
                uniqueCodes.push(r.uniqueCode);
            }

            if(r.returnYn === 'y') {
                returnUniqueCodes.push(r.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`재고에 반영되지 않은 데이터가 있습니다.\n재고 반영되지 않은 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseCancelStockConfirmModal();
            return;
        }

        if(returnUniqueCodes.length > 0) {
            alert(`반품처리된 데이터가 있습니다.\n반품처리된 데이터를 제외 후 다시 시도해주세요.\n\n고유번호:\n${returnUniqueCodes.join('\n')}`);
            onActionCloseCancelStockConfirmModal(e);
            return;
        }

        setCancelStockConfirmModalOpen(true);
    }

    // 재고 취소 모달 CLOSE
    const onActionCloseCancelStockConfirmModal = () => {
        setCancelStockConfirmModalOpen(false);
    }

    const onSubmitCancelStock = () => {
        props._onAction_cancelStock();
        onActionCloseCancelStockConfirmModal();
    }

    const onActionOpenReleaseListModal = () => {
        if(props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setReleaseListModalOpen(true);
    }

    const onActionCloseReleaseListModal = () => {
        setReleaseListModalOpen(false);
    }

    const onActionDownloadReleaseItemList = (data) => {
        props._onAction_downloadReleaseItemList(data);
    }
    
    const onChangeConfirmModalInputValue = (e) => {
        dispatchConfirmModalInputValue({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionOpenReturnConfirmModal = (e) => {
        e.stopPropagation();

        if(props.checkedOrderItemList?.length === 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if(props.checkedOrderItemList.some(r => r.returnYn === 'y')) {
            alert('이미 반품등록된 데이터가 포함되었습니다. 다시 시도해주세요.');
            return;
        }

        if(props.checkedOrderItemList.some(r => r.stockReflectYn === 'n')) {
            alert('재고 미반영 데이터가 포함되었습니다. 다시 시도해주세요.');
            return;
        }

        let returnInfo = props.checkedOrderItemList.map(r => {
            return {
                erpReturnItem: {
                    courier: r.courier,
                    transportType: r.transportType,
                    receiveLocation: r.optionReleaseLocation,
                    erpOrderItemId: r.id,
                    deliveryChargeReturnYn: 'n'
                }
            }
        });

        setReturnRegistrationInfo(returnInfo);
        setReturnConfirmModalOpen(true);
    }

    const onActionUploadReturnProductImageFile = async (e, erpOrderItemId) => {
        e.preventDefault();

        if(e.target.files.length === 0) return;

        onActionOpenBackdrop();
        let imageInfo = await __reqUploadBatchImageFile(e);
        onActionCloseBackdrop();

        let erpOrderItem = props.checkedOrderItemList?.filter(r => r.id === erpOrderItemId)[0];
        let optionId = props.productOptionList?.map(r => r.option)?.filter(r => r.code === erpOrderItem.releaseOptionCode)[0]?.id;

        let totalImageInfo = imageInfo?.map(info => {
            return {
                imageUrl: info.imageUrl,
                imageFileName: info.imageFileName,
                productOptionId: optionId
            }
        })

        let addData = returnRegistrationInfo.map(r => {
            if(r.erpReturnItem.erpOrderItemId === erpOrderItemId) {
                return {
                    ...r,
                    returnImages: totalImageInfo
                }
            }else {
                return r;
            }
        })

        setReturnRegistrationInfo([...addData]);
    }

    const onActionCloseReturnConfirmModal = () => {
        setReturnConfirmModalOpen(false);
    }

    const onChangeReturnItemValue = (e, erpOrderItemId) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;

        let data = returnRegistrationInfo.map(r => {
            if(r.erpReturnItem.erpOrderItemId === erpOrderItemId) {
                return {
                    ...r,
                    erpReturnItem: {
                        ...r.erpReturnItem,
                        [targetName]: targetValue
                    }
                }
            }else {
                return r;
            }
        })

        // 입금타입에 따라 입금여부를 세팅
        if(targetName === 'deliveryChargeReturnType') {
            let returnYn = (targetValue === '미청구') ? 'y' : 'n';

            data = data.map(r => {
                if(r.erpReturnItem.erpOrderItemId === erpOrderItemId) {
                    return {
                        ...r,
                        erpReturnItem: {
                            ...r.erpReturnItem,
                            deliveryChargeReturnYn: returnYn
                        }
                    }
                }else {
                    return r;
                }
            });
        }

        setReturnRegistrationInfo([...data]);
    }

    const onActionConfirmReturn = (e) => {
        e.preventDefault();

        if(!returnRegistrationInfo) {
            return;
        }

        for(let i = 0; i < returnRegistrationInfo.length; i++) {
            let data = returnRegistrationInfo[i]?.erpReturnItem;

            if(!data) {
                alert('[' + (i+1) + ']번 항목의 데이터가 올바르지 않습니다.');
                return;
            }

            if(!data.deliveryChargeReturnType) {
                alert('[' + (i+1) + ']번 항목의 반품배송비 입금방식이 미입력되었습니다. 다시 시도해주세요.');
                return;
            }

            if(!data.returnReasonType) {
                alert('[' + (i+1) + ']번 항목의 반품요청 사유가 미입력되었습니다. 다시 시도해주세요.');
                return;
            }
        }

        // 반품 데이터 생성
        props._onSubmit_createBatchReturnItem(returnRegistrationInfo)
        onActionCloseReturnConfirmModal();
    }

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenSalesConfirmModal={onActionOpenSalesConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                    onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                    onActionOpenReleaseConfirmModal={onActionOpenReleaseConfirmModal}
                    onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                    onActionOpenWaybillModal={onActionOpenWaybillModal}
                    onActionOpenReflectStockConfirmModal={onActionOpenReflectStockConfirmModal}
                    onActionOpenCancelStockConfirmModal={onActionOpenCancelStockConfirmModal}
                    onActionOpenReleaseListModal={onActionOpenReleaseListModal}
                    onActionCloseReleaseListModal={onActionCloseReleaseListModal}
                    onActionOpenReturnConfirmModal={onActionOpenReturnConfirmModal}
                />
            </Container>

            {/* Modal */}
            {/* 판매 취소 확인 모달 */}
            <ConfirmModalComponent
                open={salesConfirmModalOpen}
                title={'판매 취소 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 판매 취소 하시겠습니까?`}

                onConfirm={onActionConfirmSales}
                onClose={onActionCloseSalesConfirmModal}
            />
            {/* 데이터 삭제 확인 모달 */}
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 삭제 하시겠습니까?`}

                onConfirm={onActionConfirmDelete}
                onClose={onActionCloseDeleteConfirmModal}
            />
            {/* 출고 취소 확인 모달 */}
            <ConfirmModalComponent
                open={releaseConfirmModalOpen}
                title={'출고 취소 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 출고 취소 하시겠습니까?`}

                onConfirm={onActionConfirmRelease}
                onClose={onActionCloseReleaseConfirmModal}
            />

            {/* 옵션 코드 변경 모달 */}
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeOptionCode(optionCode)}
                />
            </CommonModalComponent>
            {/* 출고 옵션 코드 모달 */}
            <CommonModalComponent
                open={releaseOptionCodeModalOpen}

                onClose={onActionCloseReleaseOptionCodeModal}
            >
                <ReleaseOptionCodeModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeReleaseOptionCode(optionCode)}
                />
            </CommonModalComponent>
            {/* 운송장 등록 모달 */}
            <CommonModalComponent
                open={waybillModalOpen}

                onClose={onActionCloseWaybillModal}
            >
                <WaybillModalComponent
                    onActionDownloadWaybillExcelSample={onActionDownloadWaybillExcelSample}
                    onActionCloseWaybillModal={onActionCloseWaybillModal}
                    onActionRegisterWaybill={onActionRegisterWaybill}
                />
            </CommonModalComponent>
             {/* 재고 반영 모달 */}
            <SubmitModalComponent
                open={reflectStockConfirmModalOpen}
                title={'재고 반영 확인 메세지'}
                message={
                    <>
                        <div>{`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 재고 반영 하시겠습니까?`}</div>
                        <div className='memo-box'>
                            <div className='form-title'>메모</div>
                            <input type='text' placeholder='메모를 입력해주세요.' name='memo' onChange={onChangeConfirmModalInputValue} value={confirmModalInputValue?.memo || ''} />
                        </div>
                    </>
                }

                _onSubmit={onSubmitReflectStock}
                onClose={onActionCloseReflectStockConfirmModal}
            />
            {/* 재고 취소 모달 */}
            <ConfirmModalComponent
                open={cancelStockConfirmModalOpen}
                title={'재고 취소 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 재고 취소 하시겠습니까?`}

                onConfirm={onSubmitCancelStock}
                onClose={onActionCloseCancelStockConfirmModal}
            />

            {/* 출고 리스트 모달 */}
            <CommonModalComponent
                open={releaseListModalOpen}
                maxWidth={'md'}
                fullWidth={false}
                
                onClose={onActionCloseReleaseListModal}
            >
                <ReleaseListModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    selectedMatchCode={props.selectedMatchCode}

                    onActionDownloadReleaseItemList={onActionDownloadReleaseItemList}
                ></ReleaseListModalComponent>
            </CommonModalComponent>

            {/* 반품 처리 서밋 모달 */}
            <SubmitModalComponentV2
                 open={returnConfirmModalOpen}
                 title={'반품 접수'}
                 element={
                    <ReturnRegistrationFormFieldView
                        viewHeader={props.viewHeader}
                        returnRegistrationInfo={returnRegistrationInfo}
                        checkedOrderItemList={props.checkedOrderItemList}
                        returnTypeList={props.returnTypeList}
                        onActionUploadReturnProductImageFile={onActionUploadReturnProductImageFile}
                        onChangeReturnItemValue={onChangeReturnItemValue}
                    />
                }
                maxWidth={'lg'}

                _onSubmit={onActionConfirmReturn}
                onClose={onActionCloseReturnConfirmModal}
            />

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    );
}
export default CheckedOperatorComponent;

const initialConfirmModalInputValue = null;

const confirmModalInputValueReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialConfirmModalInputValue;
    }
}