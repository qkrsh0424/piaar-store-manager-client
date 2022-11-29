import { useCallback, useEffect, useState } from "react";
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import OptionCodeModalComponent from "../option-code-modal/OptionCodeModal.component";
import ReleaseOptionCodeModalComponent from "../release-option-code-modal/ReleaseOptionCodeModal.component";
import { Container } from "./CheckedOperator.styled";
import OperatorFieldView from "./OperatorField.view";
import ReleaseConfirmFieldView from "./ReleaseConfirmField.view";

const CheckedOperatorComponent = (props) => {

    const [salesConfirmModalOpen, setSalesConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [optionCodeModalOpen, setOptionCodeModalOpen] = useState(false);
    const [releaseConfirmModalOpen, setReleaseConfirmModalOpen] = useState(false);
    const [releaseOptionCodeModalOpen, setReleaseOptionCodeModalOpen] = useState(false);

    const [releaseTableItem, setReleaseTableItem] = useState(null);
    const [originReleaseTableItem, setOriginReleaseTableItem] = useState(null);
    const [releasePackageTableItem, setReleasePackageTableItem] = useState(null);
    const [checkedPackageItemList, setCheckedPackageItemList] = useState([]);

    useEffect(() => {
        if(!checkedPackageItemList) {
            return;
        }

        if(!releasePackageTableItem) {
            return;
        }

        onActionConvertPackageReleaseItemToReleaseTableItem();
    }, [checkedPackageItemList])

    const onActionOpenSalesConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }

        setSalesConfirmModalOpen(true);
    }

    const onActionCloseSalesConfirmModal = () => {
        setSalesConfirmModalOpen(false);
    }

    const onActionConfirmCancelSales = () => {
        let releasedCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.releaseYn === 'y') {
                releasedCodes.push(r.uniqueCode);
            } else {
                return;
            }
        })

        if (releasedCodes && (releasedCodes.length > 0)) {
            alert(`이미 출고된 데이터가 있습니다.\n[출고 상태 관리] 탭에서 해당 고유번호의 데이터를 <출고 취소> 진행 후 다시 시도해 주세요.\n\n고유번호:\n${releasedCodes.join('\n')}`);
            onActionCloseSalesConfirmModal();
            return;
        }

        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null
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
        let releasedCodes = [];
        props.checkedOrderItemList.forEach(r => {
            if (r.releaseYn === 'y') {
                releasedCodes.push(r.uniqueCode);
            } else {
                return;
            }
        })

        if (releasedCodes && (releasedCodes.length > 0)) {
            alert(`이미 출고된 데이터가 있습니다.\n[출고 상태 관리] 탭에서 해당 고유번호의 데이터를 <출고 취소> 진행 후 다시 시도해 주세요.\n\n고유번호:\n${releasedCodes.join('\n')}`);
            onActionCloseDeleteConfirmModal();
            return;
        }

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

    const onActionOpenReleaseConfirmModal = () => {
        if (props.checkedOrderItemList?.length <= 0) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        }
        
        // 출고 상품을 패키지상품, 일반상품으로 분리한다
        onActionCreateReleaseConfirmItem();
        setReleaseConfirmModalOpen(true);
    }

    const onActionCloseReleaseConfirmModal = () => {
        setReleaseTableItem(null);
        setReleasePackageTableItem(null);
        setCheckedPackageItemList([]);

        setReleaseConfirmModalOpen(false);
    }

    const onActionCreateReleaseConfirmItem = () => {
        let orderItem = props.checkedOrderItemList?.filter(r => r.optionPackageYn === 'n');
        let packageOrderItem = props.checkedOrderItemList?.filter(r => r.optionPackageYn === 'y');

        // 세트상품과 일반상품의 옵션들로 출고옵션코드별 총 출고전환 수량을 계산한다
        let items = [...new Set(orderItem?.map(r => r[props.selectedMatchCode]))].map(r => {
            return {
                code: r,
                unit: 0
            }
        });
        let packageItems = [...new Set(packageOrderItem?.map(r => r[props.selectedMatchCode]))].map(r => {
            return {
                code: r,
                unit: 0
            }
        });

        // 일반상품 출고확인 데이터
        orderItem.forEach(r => {
            items = items.map(r2 => {
                if(r2.code === r[props.selectedMatchCode]) {
                    return {
                        ...r2,
                        prodDefaultName: r.prodDefaultName,
                        optionDefaultName: r.optionDefaultName,
                        unit: parseInt(r2.unit) + parseInt(r.unit),
                        optionStockUnit: r.optionStockUnit,
                        optionPackageYn: r.optionPackageYn
                    }
                } else {
                    return r2;
                }
            })
        })

        // 패키지상품 출고확인 데이터
        packageOrderItem.forEach(r => {
            packageItems = packageItems.map(r2 => {
                if(r2.code === r[props.selectedMatchCode]) {
                    return {
                        ...r2,
                        prodDefaultName: r.prodDefaultName,
                        optionDefaultName: r.optionDefaultName,
                        unit: parseInt(r2.unit) + parseInt(r.unit),
                        optionStockUnit: r.optionStockUnit,
                        optionPackageYn: r.optionPackageYn
                    }
                } else {
                    return r2;
                }
            })
        })

        setReleaseTableItem([...items]);
        setOriginReleaseTableItem([...items]);
        setReleasePackageTableItem([...packageItems])

        // 패키지 옵션들로 구성옵션들의 출고데이터 추출
        props._onSubmit_searchReleaseConfirmPackageItem([...packageItems]);
    }

    const onActionConfirmRelease = () => {
        let data = props.checkedOrderItemList.map(r => {
            return {
                ...r,
                releaseYn: 'y',
                releaseAt: new Date()
            }
        })
        props._onSubmit_changeReleaseYnForOrderItemList(data);
        onActionCloseReleaseConfirmModal();
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

    const onActionCheckPackageOrderItem = (e, packageItem) => {
        e.stopPropagation();

        let data = [...checkedPackageItemList];
        let selectedCode = packageItem.code;
        if (checkedPackageItemList.some(r => r.code === selectedCode)) {
            data = data.filter(r => r.code !== selectedCode);
            
        } else {
            data.push(packageItem);
        }

        setCheckedPackageItemList(data);
    }

    const onActionConvertPackageReleaseItemToReleaseTableItem = () => {
        let originItems = [...originReleaseTableItem];

        let result = [...originItems];
        if (checkedPackageItemList.length > 0) {
            let checkedPackageItemCodes = checkedPackageItemList.map(r => r.code);
            let convertPackageItem = props.packageOptionReleaseItem.filter(r => checkedPackageItemCodes.includes(r.parentOptionCode));

            let packageAndOriginItems = [...convertPackageItem, ...originItems];
            result = [...new Set(packageAndOriginItems.map(r => r.code))].map(r => {
                return {
                    code: r,
                    unit: 0
                }
            });

            packageAndOriginItems.forEach(r => {
                result = result.map(r2 => {
                    if (r2.code === r.code) {
                        return {
                            ...r2,
                            prodDefaultName: r.prodDefaultName,
                            optionDefaultName: r.optionDefaultName,
                            unit: parseInt(r2.unit) + parseInt(r.unit),
                            optionStockUnit: r.optionStockUnit,
                            optionPackageYn: r.optionPackageYn
                        }
                    } else {
                        return r2;
                    }
                })
            })
        }

        setReleaseTableItem(result)
    }

    const isCheckedPackageItem = useCallback((code) => {
        return checkedPackageItemList.some(r => r.code === code);
    }, [checkedPackageItemList])

    const onActionCheckPackageItemAll = () => {
        if(isCheckedPackageItemAll()) {
            setCheckedPackageItemList([]);
        }else {
            let data = [...releasePackageTableItem];
            setCheckedPackageItemList(data);
        }
    }

    const isCheckedPackageItemAll = () => {
        let orderCodeList = [...releasePackageTableItem ?? []];
        orderCodeList.sort();
        
        let checkedCodeList = [...checkedPackageItemList ?? []];
        checkedCodeList.sort();

        if(orderCodeList.length === 0) return false;
        return JSON.stringify(orderCodeList) === JSON.stringify(checkedCodeList);
    }

    return (
        <>
            <Container>
                <OperatorFieldView
                    onActionOpenSalesConfirmModal={onActionOpenSalesConfirmModal}
                    onActionOpenDeleteConfirmModal={onActionOpenDeleteConfirmModal}
                    onActionOpenOptionCodeModal={onActionOpenOptionCodeModal}
                    onActionOpenReleaseConfirmModal={onActionOpenReleaseConfirmModal}
                    onActionOpenReleaseOptionCodeModal={onActionOpenReleaseOptionCodeModal}
                ></OperatorFieldView>
            </Container>
            {/* Modal */}
            <ConfirmModalComponent
                open={salesConfirmModalOpen}
                title={'판매 취소 확인 메세지'}
                message={`[ ${props.checkedOrderItemList?.length || 0} ] 건의 데이터를 판매 취소 하시겠습니까?`}

                onConfirm={onActionConfirmCancelSales}
                onClose={onActionCloseSalesConfirmModal}
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
            <ConfirmModalComponent
                open={releaseConfirmModalOpen}
                title={'출고 전환 확인 메세지'}
                message={
                    <ReleaseConfirmFieldView
                        selectedMatchCode={props.selectedMatchCode}
                        releaseTableItem={releaseTableItem}
                        releasePackageTableItem={releasePackageTableItem}
                        checkedOrderItemLength={props.checkedOrderItemList?.length}
                        onActionCheckPackageOrderItem={onActionCheckPackageOrderItem}
                        isCheckedPackageItem={isCheckedPackageItem}
                        isCheckedPackageItemAll={isCheckedPackageItemAll}
                        onActionCheckPackageItemAll={onActionCheckPackageItemAll}
                    />
                }
                onConfirm={onActionConfirmRelease}
                onClose={onActionCloseReleaseConfirmModal}
                maxWidth='md'
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
