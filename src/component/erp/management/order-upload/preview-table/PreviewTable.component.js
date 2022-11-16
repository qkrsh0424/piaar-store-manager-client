import { useReducer, useState } from "react";
import { getDefaultHeaderDetails } from "../../../../../static-data/erp/staticData";
import { dateToYYYYMMDDhhmmssWithInvalid } from "../../../../../utils/dateFormatUtils";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import FixOrderItemModalComponent from "../fix-order-item-modal/FixOrderItemModal.component";
import { Container } from "./PreviewTable.styled";
import TableFieldView from "./TableField.view";

function Layout({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
}

const defaultHeaderDetails = getDefaultHeaderDetails().slice(0, 36);

const PreviewTableComponent = (props) => {
    const [fixTargetItem, dispatchFixTargetItem] = useReducer(fixTargetItemReducer, initialFixTargetItem);
    const [fixItemModalOpen, setFixItemModalOpen] = useState(false);

    const onActionOpenFixItemModal = (e, orderItem) => {
        e.stopPropagation();
        let targetData = {...orderItem};

        targetData.channelOrderDate = dateToYYYYMMDDhhmmssWithInvalid(orderItem.channelOrderDate, '');
        dispatchFixTargetItem({
            type: 'SET_DATA',
            payload: targetData
        })
        setFixItemModalOpen(true);
    }

    const onActionDeleteDataOne = (e, index) => {
        e.stopPropagation();
        props._onAction_deleteDataOne(index);
    }

    const onActionConfirmUpdateFixOrderItem = (e) => {
        e.preventDefault();

        if (!fixTargetItem.prodName) {
            alert('[상품명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.optionName) {
            alert('[옵션정보] 는 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.unit || fixTargetItem.unit <= 0 || isNaN(fixTargetItem.unit)) {
            alert('[수량]  은 필수 항목이며, 1 이상의 숫자값만 허용됩니다.');
            return;
        }

        if (!fixTargetItem.receiver) {
            alert('[수취인명] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.receiverContact1) {
            alert('[전화번호1] 은 필수 입력 값 입니다.');
            return;
        }

        if (!fixTargetItem.destination) {
            alert('[주소] 는 필수 입력 값 입니다.');
            return;
        }

        props._onAction_updateErpOrderItemOne(fixTargetItem);
        onActionCloseFixItemModal();
    }

    const onChangeFixTargetItem = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        dispatchFixTargetItem({
            type: 'CHANGE_DATA',
            payload: {
                name: name,
                value: value
            }
        })
    }

    const onActionCloseFixItemModal = () => {
        dispatchFixTargetItem({
            type: 'CLEAR'
        })
        setFixItemModalOpen(false);
    }

    const onActionCopyErpOrderItem = (e, targetId) => {
        e.stopPropagation();
        
        props._onAction_copyErpOrderItemOne(targetId);
    }

    return (
        <>
            <Layout>
                <TableFieldView
                    excelDataList={props.excelDataList}
                    erpOrderUploadDefaultHeader={defaultHeaderDetails}

                    onActionDeleteDataOne={onActionDeleteDataOne}
                    onActionOpenFixItemModal={onActionOpenFixItemModal}
                    onActionCopyErpOrderItem={onActionCopyErpOrderItem}
                ></TableFieldView>
            </Layout>

            {(fixItemModalOpen && fixTargetItem) &&
                <CommonModalComponent
                    open={fixItemModalOpen}
                    fullWidth={true}
                    maxWidth={'sm'}

                    onClose={onActionCloseFixItemModal}
                >
                    <FixOrderItemModalComponent
                        fixTargetItem={fixTargetItem}

                        onChangeFixTargetItem={onChangeFixTargetItem}
                        onActionCloseFixItemModal={onActionCloseFixItemModal}
                        onActionConfirmUpdateFixOrderItem={onActionConfirmUpdateFixOrderItem}
                    ></FixOrderItemModalComponent>
                </CommonModalComponent>
            }
        </>
    );
}

export default PreviewTableComponent;

const initialFixTargetItem = null;

const fixTargetItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialFixTargetItem;
        default: return initialFixTargetItem;
    }
}
