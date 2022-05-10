import { useEffect, useState, useReducer } from 'react';

import { Container } from "./StockStatusModal.styled"
import HeaderFieldView from "./HeaderField.view";
import TableFieldView from "./TableField.view";
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import ModifyMemoModalComponent from '../modify-memo-modal/ModifyMemoModal.component';

const StockStatusModalComponent = (props) => {
    const [modifyMemoModalOpen, setModifyMemoModalOpen] = useState(false);
    const [selectedStatusData, dispatchSelectedStatusData] = useReducer(selectedStatusDataReducer, initialSelectedStatusData);

    const onActionOpenModifyMemoModal = (e, data) => {
        e.stopPropagation();

        dispatchSelectedStatusData({
            type: 'SET_DATA',
            payload: data
        });
        setModifyMemoModalOpen(true);
    }
    
    const onActionCloseModifyMemoModal = () => {
        setModifyMemoModalOpen(false);
    }

    const onActionChangeModifyMemo = (e) => {
        dispatchSelectedStatusData({
            type: 'CHANGE_DATA',
            payload: {
                name : e.target.name,
                value: e.target.value
            }
        });
    }

    const onSubmitModifyMemo = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(selectedStatusData.receiveUnit) {
            await props.onActionModifyReceiveStockStatusMemo(selectedStatusData);
        }else{
            await props.onActionModifyReleaseStockStatusMemo(selectedStatusData);
        }
        onActionCloseModifyMemoModal();
    }

    return (
        <Container>
            <HeaderFieldView
                onActionCloseStockStatusModal={() => props.onActionCloseStockStatusModal()}
            ></HeaderFieldView>

            <TableFieldView
                stockStatusListData={props.stockStatusListData}

                onActionOpenModifyMemoModal={(e, data) => onActionOpenModifyMemoModal(e, data)}
            ></TableFieldView>

            {/* StatusMemo Modify Modal */}
            <CommonModalComponent
                open={modifyMemoModalOpen}
                maxWidth={'sm'}
                fullWidth={true}

                onClose={onActionCloseModifyMemoModal}
            >
                <ModifyMemoModalComponent
                    selectedStatusData={selectedStatusData}

                    onActionCloseModifyMemoModal={() => onActionCloseModifyMemoModal()}
                    onActionChangeModifyMemo={(e) => onActionChangeModifyMemo(e)}
                    onSubmitModifyMemo={(e) => onSubmitModifyMemo(e)}
                ></ModifyMemoModalComponent>
            </CommonModalComponent>
        </Container>
    )
}

export default StockStatusModalComponent;

const initialSelectedStatusData = null;

const selectedStatusDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}
