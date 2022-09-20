import { useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [collectingConfirmModalOpen, setCollectingConfirmModalOpen] = useState(false);
    const [collectedConfirmModalOpen, setCollectedConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

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
                collectYn: 'n',
                collectAt: null
            }
        })
        props._onSubmit_changeCollectYnForReturnItemList(data);
        onActionCloseCollectingConfirmModal();
    }

    const onActionOpenCollectedConfirmModal = () => {
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
                collectCompleteYn: 'y',
                collectCompleteAt: new Date()
            }
        })
        props._onSubmit_changeCollectCompleteYnForReturnItemList(data);
        onActionCloseCollectedConfirmModal();
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

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenCollectingConfirmModal={onActionOpenCollectingConfirmModal}
                    onActionOpenCollectedConfirmModal={onActionOpenCollectedConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                ></OperatorFieldView>
            </Container>
            
            {/* 수거중 취소 확인 모달 */}
            <ConfirmModalComponent
                open={collectingConfirmModalOpen}
                title={'수거중 취소 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 수거중 처리를 취소하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCollecting}
                onClose={onActionCloseCollectingConfirmModal}
            ></ConfirmModalComponent>

            {/* 수거완료 처리 확인 모달 */}
            <ConfirmModalComponent
                open={collectedConfirmModalOpen}
                title={'수거완료 처리 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedReturnItemList?.length || 0} ] 건의 데이터를 수거완료 처리하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmCollected}
                onClose={onActionCloseCollectedConfirmModal}
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
