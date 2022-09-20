import { useEffect, useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [defectiveProductConfirmModalOpen, setDefectiveProductConfirmModalOpen] = useState(false);
    const [defectiveProductCancelConfirmModalOpen, setDefectiveProductCancelConfirmModalOpen] = useState(false);
    
    const [reflectStockConfirmModalOpen, setReflectStockConfirmModalOpen] = useState(false);
    const [cancelStockConfirmModalOpen, setCancelStockConfirmModalOpen] = useState(false);
    
    const [completedConfirmModalOpen, setCompletedConfirmModalOpen] = useState(false);
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

        let uniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if(r.defectiveYn === 'y') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`불량상품으로 등록된 데이터가 있습니다.\n불량상품으로 등록된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            onActionCloseCancelStockConfirmModal();
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
        await props._onAction_searchReleaseData(defectiveDataId);
        setDefectiveProductConfirmModalOpen(true);
    }

    const onActionCloseDefectiveProductConfirmModal = (e) => {
        e.preventDefault();

        dispatchOrderItemReleaseData({ type : 'CLEAR' });
        setDefectiveProductConfirmModalOpen(false);
    }

    const onSubmitDefectiveProduct = (e, params) => {
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

        props._onSubmit_reflectDefective(params);
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
        await props._onAction_searchReleaseData(defectiveDataId);

        setDefectiveProductCancelConfirmModalOpen(true);
    }

    const onActionCloseDefectiveProductCancelConfirmModal = (e) => {
        e.preventDefault();

        dispatchOrderItemReleaseData({ type : 'CLEAR' });
        setDefectiveProductCancelConfirmModalOpen(false);
    }

    // 불량상품 취소 처리
    const onSubmitCancelDefectiveProduct = (e, params) => {
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

        props._onSubmit_cancelDefective(params);
        onActionCloseDefectiveProductCancelConfirmModal(e);
    }

    // 재고 반영 모달 OPEN
    const onActionOpenReflectStockConfirmModal = async () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if (props.checkedReturnItemList?.length > 1) {
            alert('반품 재고반영은 단건만 가능합니다.');
            return;
        }

        let reflectStockId = props.checkedReturnItemList[0]?.erpOrderItem?.id;
        await props._onAction_searchReleaseData(reflectStockId);
        setReflectStockConfirmModalOpen(true);
    }

    // 재고 반영 모달 CLOSE
    const onActionCloseReflectStockConfirmModal = (e) => {
        e.preventDefault();

        dispatchOrderItemReleaseData({ type : 'CLEAR' });
        setReflectStockConfirmModalOpen(false);
    }

    // 재고 반영 서밋
    const onSubmitReflectStock = (e, params) => {
        e.preventDefault();

        let data = props.checkedReturnItemList[0];

        if(data.defectiveYn === 'y') {
            alert(`불량상품으로 등록된 데이터가 있습니다.\n불량상품으로 등록된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${data.uniqueCode}`);
            onActionCloseReflectStockConfirmModal(e);
            return;
        }

        if(data.stockReflectYn === 'y') {
            alert(`이미 재고 반영된 데이터가 있습니다.\n재고에 반영된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${data.uniqueCode}`);
            onActionCloseReflectStockConfirmModal(e);
            return;
        }

        if (data.erpOrderItem.unit < params.unit) {
            alert('반품 재고반영 수량은 출고상품 수량보다 클 수 없습니다.\n반품 수량을 한번 더 확인해주세요.');
            onActionCloseReflectStockConfirmModal(e);
            return;
        }

        props._onAction_reflectStock(params);
        onActionCloseReflectStockConfirmModal(e);
    }

    // 재고 취소 모달 OPEN
    const onActionOpenCancelStockConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        if (props.checkedReturnItemList?.length > 1) {
            alert('반품 재고반영 취소는 단건만 가능합니다.');
            return;
        }
        setCancelStockConfirmModalOpen(true);
    }

    // 재고 취소 모달 CLOSE
    const onActionCloseCancelStockConfirmModal = () => {
        setCancelStockConfirmModalOpen(false);
    }

    const onSubmitCancelStock = () => {
        let data = props.checkedReturnItemList[0];
        if(data.stockReflectYn === 'n') {
            alert(`재고에 반영되지 않은 데이터가 있습니다.\n재고 반영되지 않은 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${data.uniqueCode}`);
            onActionCloseReflectStockConfirmModal();
            return;
        }

        props._onAction_cancelStock();
        onActionCloseCancelStockConfirmModal();
    }


    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenDefectiveProductConfirmModal={onActionOpenDefectiveProductConfirmModal}
                    onActionOpenDefectiveProductCancelConfirmModal={onActionOpenDefectiveProductCancelConfirmModal}
                    onActionOpenCompletedConfirmModal={onActionOpenCompletedConfirmModal}
                    onActionOpenReflectStockConfirmModal={onActionOpenReflectStockConfirmModal}
                    onActionOpenCancelStockConfirmModal={onActionOpenCancelStockConfirmModal}
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

                _onSubmit={(e, params) => onSubmitDefectiveProduct(e, params)}
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

                _onSubmit={(e, params) => onSubmitCancelDefectiveProduct(e, params)}
                onClose={onActionCloseDefectiveProductCancelConfirmModal}
            ></ConfirmModalComponent>

            {/* 재고 반영 모달 */}
            <ConfirmModalComponent
                open={reflectStockConfirmModalOpen}
                title={'재고 반영 확인 메세지'}
                message={`[ ${props.checkedReturnItemList?.length || 0} ] 건의 데이터를 재고 반영 하시겠습니까?`}
                memo={true}
                defaultMemo={orderItemReleaseData?.memo}
                defaultUnit={orderItemReleaseData?.releaseUnit}

                _onSubmit={(e, params) => onSubmitReflectStock(e, params)}
                onClose={onActionCloseReflectStockConfirmModal}
            />
            {/* 재고 취소 모달 */}
            <ConfirmModalComponent
                open={cancelStockConfirmModalOpen}
                title={'재고 취소 확인 메세지'}
                message={`[ ${props.checkedReturnItemList?.length || 0} ] 건의 데이터를 재고 취소 하시겠습니까?`}

                onConfirm={onSubmitCancelStock}
                onClose={onActionCloseCancelStockConfirmModal}
            />

            {/* 반품완료 취소 확인 모달 */}
            <ConfirmModalComponent
                open={completedConfirmModalOpen}
                title={'반품완료 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 반품완료 데이터를 취소하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCompleted}
                onClose={onActionCloseCompletedConfirmModal}
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
