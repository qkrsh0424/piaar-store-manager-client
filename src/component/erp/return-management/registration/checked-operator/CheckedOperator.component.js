import { useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [collectingConfirmModalOpen, setCollectingConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const [returnReasonModalOpen, setReturnReasonModalOpen] = useState(false);
    const [returnReason, dispatchReturnReason] = useReducer(returnReasonReducer, initialReturnReason);

    // 확인모달 창 열기
    // 판매부족 수량 계산
    const onActionOpenCollectingConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setCollectingConfirmModalOpen(true);
    }

    const onActionCloseCollectingConfirmModal = () => {
        setCollectingConfirmModalOpen(false);
    }

    const onActionConfirmCollecting = () => {
        let data = props.checkedReturnItemList.map(r => {
            return {
                ...r,
                collectYn: 'y',
                collectAt: new Date()
            }
        })
        props._onSubmit_changeCollectYnForReturnItemList(data);
        onActionCloseCollectingConfirmModal();
    }

    const onActionOpenDeleteConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setDeleteConfirmModalOpen(true);
    }

    const onActionCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const onActionConfirmDelete = () => {
        props._onSubmit_deleteReturnItemList(props.checkedReturnItemList);
        onActionCloseDeleteConfirmModal();
    }

    const onActionOpenReturnReasonTypeModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if (props.checkedReturnItemList?.length > 1) {
            alert('반품 요청 사유 변경은 단건만 가능합니다.');
            return;
        }

        setReturnReasonModalOpen(true);
    }

    const onActionConfirmReturn = () => {
        if(!returnReason || !returnReason.type) {
            alert('반품 요청 사유는 필수값입니다. 다시 시도해주세요.');
            onActionCloseReturnConfirmModal();
            return;
        }

        // 반품 데이터 생성
        let body = props.checkedReturnItemList?.map(r => {
            return {
                ...r,
                returnReasonType: returnReason.type,
                returnReasonDetail: returnReason.detail
            }
        });

        props._onSubmit_changeReturnReasonForReturnItemListInBatch(body);
        onActionCloseReturnConfirmModal();
    }

    const onActionCloseReturnConfirmModal = () => {
        setReturnReasonModalOpen(false);

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

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenCollectingConfirmModal={onActionOpenCollectingConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                    onActionOpenReturnReasonTypeModal={onActionOpenReturnReasonTypeModal}
                ></OperatorFieldView>
            </Container>

            {/* 반품 요청 사유 변경 모달 */}
            <ConfirmModalComponent
                open={returnReasonModalOpen}
                title={'반품 요청 사유 변경'}
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
                                    <textarea className='text-input' name='detail' onChange={onChangeSelectReturnType} value={returnReason?.detail || ''} placeholder={`반품요청 상세 사유를 입력해 주세요.\n(300자 이내)`} />
                                </div>
                            </div>
                        </div>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터의 반품 요청 사유를 변경하시겠습니까? </div>
                    </>
                }

                maxWidth={'sm'}
                onConfirm={onActionConfirmReturn}
                onClose={onActionCloseReturnConfirmModal}
            />
            
            {/* 수거중 처리 확인 모달 */}
            <ConfirmModalComponent
                open={collectingConfirmModalOpen}
                title={'수거중 처리 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 수거중 처리 하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCollecting}
                onClose={onActionCloseCollectingConfirmModal}
            ></ConfirmModalComponent>
            
            {/* 데이터 일괄 삭제 확인 모달 */}
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 <span style={{ color: '#FF605C' }}>영구 삭제</span> 합니다.</div>
                        <div>삭제된 데이터는 복구되지 않습니다.</div>
                        <div>계속 진행 하시겠습니까?</div>
                    </>
                }

                onConfirm={onActionConfirmDelete}
                onClose={onActionCloseDeleteConfirmModal}
            ></ConfirmModalComponent>
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
