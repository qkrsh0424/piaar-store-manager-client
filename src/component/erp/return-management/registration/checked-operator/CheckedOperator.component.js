import { useReducer, useState } from "react";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";

const CheckedOperatorComponent = (props) => {
    const [collectingConfirmModalOpen, setCollectingConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

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


    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenCollectingConfirmModal={onActionOpenCollectingConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                ></OperatorFieldView>
            </Container>
            
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
