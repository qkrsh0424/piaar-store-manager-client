import { useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [completedConfirmModalOpen, setCompletedConfirmModalOpen] = useState(false);
    const [collectedConfirmModalOpen, setCollectedConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    // 수거완료 취소 처리
    const onActionOpenCollectedConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if (r.returnRejectYn === 'y') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });
        if (uniqueCodes.length > 0) {
            alert(`반품거절된 데이터가 있습니다.\n반품거절된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
            return;
        }
        setCollectedConfirmModalOpen(true);
    }

    const onActionCloseCollectedConfirmModal = () => {
        setCollectedConfirmModalOpen(false);
    }

    const onActionConfirmCollected = () => {
        let data = props.checkedReturnItemList.map(r => {
            return {
                ...r,
                collectCompleteYn: 'n',
                collectCompleteAt: null
            }
        })
        props._onSubmit_changeCollectCompleteYnForReturnItemList(data);
        onActionCloseCollectedConfirmModal();
    }

    // 반품완료 처리
    const onActionOpenCompletedConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        let uniqueCodes = [];
        props.checkedReturnItemList.forEach(r => {
            if (r.returnRejectYn === 'y') {
                uniqueCodes.push(r.erpOrderItem.uniqueCode);
            }
        });
        if (uniqueCodes.length > 0) {
            alert(`반품거절된 데이터가 있습니다.\n반품거절된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
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
                returnCompleteYn: 'y',
                returnCompleteAt: new Date()
            }
        })
        props._onSubmit_changeReturnCompleteYnForReturnItemList(data);
        onActionCloseCompletedConfirmModal();
    }

    // 영구 삭제
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

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenCompletedConfirmModal={onActionOpenCompletedConfirmModal}
                    onActionOpenCollectedConfirmModal={onActionOpenCollectedConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                ></OperatorFieldView>
            </Container>

            {/* 수거완료 취소 확인 모달 */}
            <ConfirmModalComponent
                open={collectedConfirmModalOpen}
                title={'수거완료 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 수거완료 처리를 취소하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCollected}
                onClose={onActionCloseCollectedConfirmModal}
            ></ConfirmModalComponent>

            {/* 반품완료 처리 확인 모달 */}
            <ConfirmModalComponent
                open={completedConfirmModalOpen}
                title={'반품완료 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 반품완료 처리하시겠습니까?</div>
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
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 <span style={{ color: '#FF605C' }}>반품 삭제</span> 합니다.</div>
                        <div>삭제된 데이터는 반품처리가 취소됩니다.</div>
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
