import { useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [returnRejectConfirmModalOpen, setReturnRejectConfirmModalOpen] = useState(false);
    const [returnRejectCancelConfirmModalOpen, setReturnRejectCancelConfirmModalOpen] = useState(false);
    const [completedConfirmModalOpen, setCompletedConfirmModalOpen] = useState(false);
    const [collectedConfirmModalOpen, setCollectedConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    // 반품거절 처리
    const onActionOpenReturnRejectConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

       // 반품 처리 여부
       let uniqueCodes = [];
       props.checkedReturnItemList.forEach(r => {
           if (r.returnRejectYn === 'y') {
               uniqueCodes.push(r.erpOrderItem.uniqueCode);
           }
       });

       if (uniqueCodes.length > 0) {
           alert(`이미 반품거절된 데이터가 있습니다.\n반품거절된 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
           onActionCloseReturnRejectConfirmModal();
           return;
       }

        setReturnRejectConfirmModalOpen(true);
    }

    const onActionCloseReturnRejectConfirmModal = () => {
        setReturnRejectConfirmModalOpen(false);
    }

    const onActionConfirmReturnReject = () => {
        let data = props.checkedReturnItemList.map(r => {
            return {
                ...r,
                returnRejectYn: 'y',
                returnRejectAt: new Date()
            }
        })
        props._onSubmit_changeReturnRejectYnForReturnItemList(data);
        onActionCloseReturnRejectConfirmModal();
    }

    // 반품거절 취소처리
    const onActionOpenReturnRejectCancelConfirmModal = () => {
        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

       // 반품 처리 여부
       let uniqueCodes = [];
       props.checkedReturnItemList.forEach(r => {
           if (r.returnRejectYn === 'n') {
               uniqueCodes.push(r.erpOrderItem.uniqueCode);
           }
       });

       if (uniqueCodes.length > 0) {
           alert(`반품 거절되지 않은 데이터가 있습니다.\n반품거절 처리되지 않은 데이터를 제외 후 다시 시도해 주세요.\n\n고유번호:\n${uniqueCodes.join('\n')}`);
           onActionCloseReturnRejectCancelConfirmModal();
           return;
       }

        setReturnRejectCancelConfirmModalOpen(true);
    }

    const onActionCloseReturnRejectCancelConfirmModal = () => {
        setReturnRejectCancelConfirmModalOpen(false);
    }

    const onActionCancelConfirmReturnReject = () => {
        let data = props.checkedReturnItemList.map(r => {
            return {
                ...r,
                returnRejectYn: 'n',
                returnRejectAt: null
            }
        })
        props._onSubmit_changeReturnRejectYnForReturnItemList(data);
        onActionCloseReturnRejectCancelConfirmModal();
    }

    // 수거완료 취소 처리
    const onActionOpenCollectedConfirmModal = () => {
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

        if (props.checkedReturnItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
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
                    onActionOpenReturnRejectConfirmModal={onActionOpenReturnRejectConfirmModal}
                    onActionOpenReturnRejectCancelConfirmModal={onActionOpenReturnRejectCancelConfirmModal}
                    onActionOpenCompletedConfirmModal={onActionOpenCompletedConfirmModal}
                    onActionOpenCollectedConfirmModal={onActionOpenCollectedConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                ></OperatorFieldView>
            </Container>


            {/* 반품거절 확인 모달 */}
            <ConfirmModalComponent
                open={returnRejectConfirmModalOpen}
                title={'반품거절 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 반품거절하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmReturnReject}
                onClose={onActionCloseReturnRejectConfirmModal}
            ></ConfirmModalComponent>

            {/* 반품거절 취소 확인 모달 */}
            <ConfirmModalComponent
                open={returnRejectCancelConfirmModalOpen}
                title={'반품거절 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 반품거절 데이터를 취소하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionCancelConfirmReturnReject}
                onClose={onActionCloseReturnRejectCancelConfirmModal}
            ></ConfirmModalComponent>

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
