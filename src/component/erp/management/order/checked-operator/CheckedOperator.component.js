import { useReducer, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import ReleaseOptionCodeModalComponent from "../../sales/release-option-code-modal/ReleaseOptionCodeModal.component";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import { Container, TableFieldWrapper } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";


function TableFieldView({salesConfirmItem}) {
    return (
        <TableFieldWrapper>
            <div
                className='table-box'
            >
                <table cellSpacing="0">
                    <thead>
                        <tr className='fixed-header'>
                            <th width='200'>피아르 옵션코드</th>
                            <th width='200'>$피아르 상품관리명</th>
                            <th width='200'>$피아르 옵션관리명</th>
                            <th width='150'>총 판매전환 수량</th>
                            <th width='150'>$재고수량</th>
                            <th width='150' style={{color: '#ff4949'}}>[판매 부족 수량]</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesConfirmItem?.map((r, idx) => {
                            let isOutOfStock = r.optionStockUnit != null && (r.optionStockUnit - r.unit < 0);
                            return (
                                <tr
                                    key={'sales-item-idx' + idx}
                                    className={`${isOutOfStock && 'tr-highlight'}`}
                                >
                                    <td>{r.optionCode}</td>
                                    <td>{r.prodDefaultName}</td>
                                    <td>{r.optionDefaultName}</td>
                                    <td>{r.unit}</td>
                                    <td>{r.optionStockUnit}</td>
                                    <td className={`${isOutOfStock && 'td-highlight'}`}>{isOutOfStock && Math.abs(r.optionStockUnit - r.unit)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </TableFieldWrapper>
    )
}
const CheckedOperatorComponent = (props) => {
    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [salesConfirmItem, dispatchSalesConfirmItem] = useReducer(salesConfirmItemReducer, initialSalesConfirmItem);
    const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);

    const onActionOpenSalesConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        // 판매 부족 수량 계산
        let optionCode = new Set(props.checkedOrderItemList?.map(r => r.optionCode));
        let salesItem = [...optionCode].map(r =>{
            return {
                optionCode: r,
                unit: 0
            }
        })

        props.checkedOrderItemList?.forEach(r => {
            salesItem = salesItem.map(r2 => {
                if(r2.optionCode === r.optionCode) {
                    return {
                        ...r2,
                        prodDefaultName: r.prodDefaultName,
                        optionDefaultName: r.optionDefaultName,
                        unit: parseInt(r2.unit) + parseInt(r.unit),
                        optionStockUnit: r.optionStockUnit
                    }
                }else {
                    return r2;
                }
            })
        })

        dispatchSalesConfirmItem({
            type: 'INIT_DATA',
            payload: salesItem
        })

        setSalesConfirmModalOpen(true);
    }

    const onActionCloseSalesConfirmModal = () => {
        setSalesConfirmModalOpen(false);
    }

    const onActionConfirmSales = () => {
        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                salesYn: 'y',
                salesAt: new Date()
            }
        })
        props._onSubmit_changeSalesYnForOrderItemList(data);
        onActionCloseSalesConfirmModal();
    }

    const onActionOpenDeleteConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setDeleteConfirmModalOpen(true);
    }

    const onActionCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const onActionConfirmDelete = () => {
        props._onSubmit_deleteOrderItemList(props.checkedOrderItemList);
        onActionCloseDeleteConfirmModal();
    }

    const onActionOpenOptionCodeModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setOptionCodeModalOpen(true);
    }

    const onActionCloseOptionCodeModal = () => {
        setOptionCodeModalOpen(false);
    }

    const onActionChangeOptionCode = (optionCode) => {
        let data = [...props.checkedOrderItemList];
        data = data.map(r => {
            return {
                ...r,
                optionCode: optionCode
            }
        })
        props._onSubmit_changeOptionCodeForOrderItemListInBatch(data);
        onActionCloseOptionCodeModal();
    }

    const onActionOpenReleaseOptionCodeModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        setReleaseOptionCodeModalOpen(true);
    }

    const onActionCloseReleaseOptionCodeModal = () => {
        setReleaseOptionCodeModalOpen(false);
    }

    const onActionChangeReleaseOptionCode = (optionCode) => {
        let data = [...props.checkedOrderItemList];
        data = data.map(r => {
            return {
                ...r,
                releaseOptionCode: optionCode
            }
        })
        props._onSubmit_changeReleaseOptionCodeForOrderItemListInBatch(data);
        onActionCloseReleaseOptionCodeModal();
    }

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenSalesConfirmModal={onActionOpenSalesConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                    onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                    onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                ></OperatorFieldView>
            </Container>

            {/* Modal */}
            <ConfirmModalComponent
                open={salesConfirmModalOpen}
                title={'판매 전환 확인 메세지'}
                message={
                    <>
                        <div className='info-text'>* [판매 부족 수량]을 확인해주세요.</div>
                        <TableFieldView salesConfirmItem={salesConfirmItem}></TableFieldView>
                        <div>[ {props.checkedOrderItemList?.length || 0} ] 건의 데이터를 판매 전환 하시겠습니까?</div>
                    </>
                }
                onConfirm={onActionConfirmSales}
                onClose={onActionCloseSalesConfirmModal}
                maxWidth='md'
            ></ConfirmModalComponent>
            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                title={'데이터 삭제 확인 메세지'}
                message={
                    <>
                        <div>[ {props.checkedOrderItemList?.length || 0} ] 건의 데이터를 <span style={{ color: '#FF605C' }}>영구 삭제</span> 합니다.</div>
                        <div>삭제된 데이터는 복구되지 않습니다.</div>
                        <div>계속 진행 하시겠습니까?</div>
                    </>
                }

                onConfirm={onActionConfirmDelete}
                onClose={onActionCloseDeleteConfirmModal}
            ></ConfirmModalComponent>

            {/* 옵션 코드 모달 */}
            <CommonModalComponent
                open={optionCodeModalOpen}

                onClose={onActionCloseOptionCodeModal}
            >
                <OptionCodeModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeOptionCode(optionCode)}
                ></OptionCodeModalComponent>
            </CommonModalComponent>

            {/* 출고 옵션 코드 모달 */}
            <CommonModalComponent
                open={releaseOptionCodeModalOpen}

                onClose={onActionCloseReleaseOptionCodeModal}
            >
                <ReleaseOptionCodeModalComponent
                    checkedOrderItemList={props.checkedOrderItemList}
                    productOptionList={props.productOptionList}

                    onConfirm={(optionCode) => onActionChangeReleaseOptionCode(optionCode)}
                ></ReleaseOptionCodeModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default CheckedOperatorComponent;

const initialSalesConfirmItem = null;

const salesConfirmItemReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSalesConfirmItem;
        default: return initialSalesConfirmItem;
    }
}