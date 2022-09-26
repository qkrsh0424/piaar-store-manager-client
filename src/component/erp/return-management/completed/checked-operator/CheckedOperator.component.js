import { useEffect, useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [completedConfirmModalOpen, setCompletedConfirmModalOpen] = useState(false);

    const onActionOpenCompletedConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        let stockReflectUniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if(r.defectiveYn === 'y') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
            if(r.stockReflectYn === 'y') {
                stockReflectUniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });

        if (uniqueCodes.length > 0) {
            alert(`불량상품으로 등록된 데이터가 있습니다.\n불량상품으로 등록된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            return;
        }
        if (stockReflectUniqueCodes.length > 0) {
            alert(`재고반영된 데이터가 있습니다.\n재고반영된 데이터를 제외 후 다시 시도해 주세요..\n\n고유번호:\n${stockReflectUniqueCodes.join('\n')}`);
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

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenCompletedConfirmModal={onActionOpenCompletedConfirmModal}
                ></OperatorFieldView>
            </Container>

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
