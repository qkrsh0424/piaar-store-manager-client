import { useReducer, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseListModalComponent from "../release-list-modal/ReleaseListModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";
import WaybillModalComponent from "../waybill-modal/WaybillModal.component";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

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
    const [returnConfirmModalOpen, setReturnConfirmModalOpen] = useState(false);

    const [returnReason, dispatchReturnReason] = useReducer(returnReasonReducer, initialReturnReason);

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

    const onActionOpenOptionCodeModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
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

        setReleaseConfirmModalOpen(true);
    }

    const onActionCloseReleaseConfirmModal = () => {
        setReleaseConfirmModalOpen(false);
    }

    const onActionConfirmRelease = () => {
        let alreadyReflected = props.checkedOrderItemList.filter(r => r.stockReflectYn === 'y');
        if (alreadyReflected && alreadyReflected.length > 0) {
            alert('이미 재고에 반영된 데이터가 있습니다. 해당 데이터의 재고 반영을 취소 후 진행해 주시기 바랍니다.');
            onActionCloseReleaseConfirmModal();
            return;
        }
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
    const onActionOpenReflectStockConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setReflectStockConfirmModalOpen(true);
    }

    // 재고 반영 모달 CLOSE
    const onActionCloseReflectStockConfirmModal = (e) => {
        e.preventDefault();
        setReflectStockConfirmModalOpen(false);
    }

    // 재고 반영 서밋
    const onSubmitReflectStock = (e, params) => {
        e.preventDefault();

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
        props._onAction_reflectStock(params);
        onActionCloseReflectStockConfirmModal(e);
    }

    // 재고 취소 모달 OPEN
    const onActionOpenCancelStockConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setCancelStockConfirmModalOpen(true);
    }

    // 재고 취소 모달 CLOSE
    const onActionCloseCancelStockConfirmModal = () => {
        setCancelStockConfirmModalOpen(false);
    }

    const onSubmitCancelStock = () => {
        let uniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.stockReflectYn === 'n') {
                uniqueCodes.push(r.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`재고에 반영되지 않은 데이터가 있습니다.\n재고 반영되지 않은 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseCancelStockConfirmModal();
            return;
        }
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

    const onActionOpenReturnConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setReturnConfirmModalOpen(true);
    }

    const onActionCloseReturnConfirmModal = () => {
        setReturnConfirmModalOpen(false);

        dispatchReturnReason({
            type: 'CLEAR'
        })
    }

    const onChangeSelectReturnType = (e) => {
        e.preventDefault();

        dispatchReturnReason({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const onActionConfirmReturn = () => {
        if(!returnReason || !returnReason.type) {
            alert('반품 요청 사유는 필수값입니다. 다시 시도해주세요.');
            onActionCloseReturnConfirmModal();
            return;
        }

        // 반품 처리 여부
        let returnedUniqueCodes = [];
        let notReflectedStockUniqueCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if(r.stockReflectYn === 'n') {
                notReflectedStockUniqueCodes.push(r.uniqueCode);
            }

            if (r.returnYn === 'y') {
                returnedUniqueCodes.push(r.uniqueCode);
            }
        });

        if (notReflectedStockUniqueCodes.length > 0) {
            alert(`재고 미반영 데이터가 있습니다.\n재고 미반영 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${notReflectedStockUniqueCodes.join('\n')}`);
            onActionCloseReturnConfirmModal();
            return;
        }

        if (returnedUniqueCodes.length > 0) {
            alert(`이미 반품처리된 데이터가 있습니다.\n반품된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${returnedUniqueCodes.join('\n')}`);
            onActionCloseReturnConfirmModal();
            return;
        }

        // 반품 데이터 생성
        let body = props.checkedOrderItemList?.map(r => {
            return {
                receiveLocation: r.optionReleaseLocation,
                returnReasonType: returnReason.type,
                returnReasonDetail: returnReason.detail,
                erpOrderItemId: r.id
            }
        });

        props._onSubmit_createReturnItem(body);
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
            {/* 반품 처리 확인 모달 */}
            <ConfirmModalComponent
                open={returnConfirmModalOpen}
                title={'반품 처리 확인 메세지'}
                message={
                    <>
                        <div className='info-wrapper'>
                            <div className='info-box'>
                                <span className='input-title'>반품 요청사유</span>
                                <div>
                                    <select
                                        className='select-item'
                                        name='type'
                                        value={returnReason?.type || ''}
                                        onChange={onChangeSelectReturnType}
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
                                <span className='input-title'>반품 상세사유</span>
                                <div>
                                    <textarea className='text-input' name='detail' onChange={onChangeSelectReturnType} value={returnReason?.detail || ''} placeholder='반품요청 상세 사유를 입력해 주세요.' />
                                </div>
                            </div>
                        </div>
                        <div>[ {props.checkedOrderItemList?.length || 0} ] 건의 데이터를 반품 처리 하시겠습니까? </div>
                    </>
                }

                maxWidth={'sm'}
                onConfirm={onActionConfirmReturn}
                onClose={onActionCloseReturnConfirmModal}
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
            <ConfirmModalComponent
                open={reflectStockConfirmModalOpen}
                title={'재고 반영 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 재고 반영 하시겠습니까?`}
                memo={true}

                _onSubmit={(e, params) => onSubmitReflectStock(e, params)}
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
        </>
    );
}
export default CheckedOperatorComponent;

const initialReturnReason = null;

const returnReasonReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialReturnReason;
        default: return initialReturnReason;
    }
}