import { useEffect, useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [defectiveProductConfirmModalOpen, setDefectiveProductConfirmModalOpen] = useState(false);
    const [defectiveProductCancelConfirmModalOpen, setDefectiveProductCancelConfirmModalOpen] = useState(false);
    const [completedConfirmModalOpen, setCompletedConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [orderItemReleaseData, dispatchOrderItemReleaseData] = useReducer(orderItemReleaseDataReducer, initialOrderItemReleaseData);

    useEffect(() => {
        if(!props.orderItemReleaseData) {
            return;
        }

        dispatchOrderItemReleaseData({
            type: 'INIT_DATA',
            payload: props.orderItemReleaseData
        })

    }, [props.orderItemReleaseData])

    const onActionOpenCompletedConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setCompletedConfirmModalOpen(true);
    }

    const onActionCloseCompletedConfirmModal = () => {
        setCompletedConfirmModalOpen(false);
    }

    const onActionConfirmCompleted = () => {
        let data = props.checkedReturnItemList.map(r => {
            return {
                ...r,
                returnCompleteYn: 'n',
                returnCompleteAt: null
            }
        })
        props._onSubmit_changeReturnCompleteYnForReturnItemList(data);
        onActionCloseCompletedConfirmModal();
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

    // 불량상품 처리
    const onActionOpenDefectiveProductConfirmModal = async () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if (props.checkedReturnItemList?.length > 1) {
            alert('불량상품은 단건 등록만 가능합니다.');
            return;
        }

        let defectiveDataId = props.checkedReturnItemList[0]?.erpOrderItem?.id;
        await props.__reqActionSearchReleaseData(defectiveDataId);
        setDefectiveProductConfirmModalOpen(true);
    }

    const onActionCloseDefectiveProductConfirmModal = (e) => {
        e.preventDefault();

        dispatchOrderItemReleaseData({ type : 'CLEAR' });
        setDefectiveProductConfirmModalOpen(false);
    }

    const onSubmitDefectiveProduct = (e, memo) => {
        e.preventDefault();

        let uniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if (r.defectiveYn === 'y') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`이미 불량상품 처리된 데이터가 있습니다.\n불량상품 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseDefectiveProductConfirmModal(e);
            return;
        }

        props._onSubmit_reflectDefective(memo);
        onActionCloseDefectiveProductConfirmModal(e);
    }

    // 불량상품 취소 처리
    const onActionOpenDefectiveProductCancelConfirmModal = async () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if (props.checkedReturnItemList?.length > 1) {
            alert('불량상품 취소는 단건만 가능합니다.');
            return;
        }

        let defectiveDataId = props.checkedReturnItemList[0]?.erpOrderItem?.id;
        await props.__reqActionSearchReleaseData(defectiveDataId);

        setDefectiveProductCancelConfirmModalOpen(true);
    }

    const onActionCloseDefectiveProductCancelConfirmModal = (e) => {
        e.preventDefault();

        dispatchOrderItemReleaseData({ type : 'CLEAR' });
        setDefectiveProductCancelConfirmModalOpen(false);
    }

    // 불량상품 취소 처리
    const onSubmitCancelDefectiveProduct = (e, memo) => {
        e.preventDefault();

        let uniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if (r.defectiveYn === 'n') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`불량상품으로 처리되지 않은 데이터가 있습니다.\n불량상품이 아닌 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseDefectiveProductCancelConfirmModal(e);
            return;
        }

        props._onSubmit_cancelDefective(memo);
        onActionCloseDefectiveProductCancelConfirmModal(e);
    }

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenDefectiveProductConfirmModal={onActionOpenDefectiveProductConfirmModal}
                    onActionOpenDefectiveProductCancelConfirmModal={onActionOpenDefectiveProductCancelConfirmModal}
                    onActionOpenCompletedConfirmModal={onActionOpenCompletedConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                ></OperatorFieldView>
            </Container>

            {/* 불량상품 확인 모달 */}
            <ConfirmModalComponent
                open={defectiveProductConfirmModalOpen}
                title={'불량상품 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 불량상품으로 등록하시겠습니까?</div>
                    </>
                }
                memo={true}
                defaultMemo={orderItemReleaseData?.memo}

                _onSubmit={(e, memo) => onSubmitDefectiveProduct(e, memo)}
                onClose={onActionCloseDefectiveProductConfirmModal}
            ></ConfirmModalComponent>

            {/* 불량상품 취소 확인 모달 */}
            <ConfirmModalComponent
                open={defectiveProductCancelConfirmModalOpen}
                title={'불량상품 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 불량상품 반영을 취소하시겠습니까?</div>
                    </>
                }
                memo={true}
                defaultMemo={orderItemReleaseData?.memo}

                _onSubmit={(e, memo) => onSubmitCancelDefectiveProduct(e, memo)}
                onClose={onActionCloseDefectiveProductCancelConfirmModal}
            ></ConfirmModalComponent>

            {/* 처리완료 취소 확인 모달 */}
            <ConfirmModalComponent
                open={completedConfirmModalOpen}
                title={'처리완료 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 반품 처리완료 취소하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCompleted}
                onClose={onActionCloseCompletedConfirmModal}
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

const initialOrderItemReleaseData = null;

const orderItemReleaseDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderItemReleaseData;
        default: return initialOrderItemReleaseData;
    }
}
