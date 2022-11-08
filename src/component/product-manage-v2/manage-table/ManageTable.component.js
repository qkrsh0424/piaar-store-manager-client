import { useState } from "react";
import OptionPackageModalComponent from "../modal/option-package-modal/OptionPackageModal.component";
import SubOptionCodeModalComponent from "../modal/sub-option-code-modal/SubOptionCodeModal.component";
import { Container, SelectedInfoFieldWrapper } from "./ManageTable.styled";
import ManageTableFieldView from "./ManageTableField.view";

function SelectedInfoFieldView({ size }) {
    return (
        <SelectedInfoFieldWrapper>
            <span>선택된 데이터 : </span>
            <span>{size || 0}개</span>
        </SelectedInfoFieldWrapper>
    )
}
const ManageTableComponent = (props) => {
    const [subOptionCodeModalOpen, setSubOptionCodeModalOpen] = useState(false);
    const [optionPackageModalOpen, setOptionPackageModalOpen] = useState(false);
    const [option, setOption] = useState(null);

    const __handle = {
        action: {
            openSubOptionCodeModal: (e, optionId) => {
                e.stopPropagation();

                // 대체코드 조회
                props.productManagementList.forEach(r => {
                    let option = r.options?.filter(option => option.id === optionId)[0];
                    
                    if(option){
                        setOption(option);
                    }
                });
                
                setSubOptionCodeModalOpen(true);
            },
            closeSubOptionCodeModal: () => {
                setOption(null);
                setSubOptionCodeModalOpen(false);
            },
            openOptionPackageModal: (e, optionId) => {
                e.stopPropagation();

                props.productManagementList.forEach(r => {
                    let option = r.options?.filter(option => option.id === optionId)[0];

                    if(option) {
                        setOption(option);
                    }
                })
                setOptionPackageModalOpen(true);
            },
            closeOptionPackageModal: () => {
                setOption(null);
                setOptionPackageModalOpen(false);
            }
        }
    }

    return (
        props.productManagementList &&
        <Container>
            <SelectedInfoFieldView size={props.checkedOptionIdList?.length} />
            
            <ManageTableFieldView
                productManagementList={props.productManagementList}

                isCheckedOne={props.isCheckedOne}
                isCheckedAll={props.isCheckedAll}
                onActionCheckOne={props.onActionCheckOne}
                onActionCheckAll={props.onActionCheckAll}
                isProductCheckedOne={props.isProductCheckedOne}
                onActionProductCheckOne={props.onActionProductCheckOne}
                onSubmitDeleteProductOne={props.onSubmitDeleteProductOne}
                onActionModifyProduct={props.onActionModifyProduct}
                onActionModifyOptions={props.onActionModifyOptions}
                
                onActionOpenSubOptionCodeModal={__handle.action.openSubOptionCodeModal}
                onActionOpenOptionPackageModal={__handle.action.openOptionPackageModal}
            />

            {/* SubOptionCode Control Modal */}
            {subOptionCodeModalOpen && option && 
                <SubOptionCodeModalComponent
                    option={option}
                    onActionCloseModal={__handle.action.closeSubOptionCodeModal}
                />
            }

            {/* OptionPackage Control Modal */}
            {optionPackageModalOpen && option &&
                <OptionPackageModalComponent
                    option={option}
                    onActionCloseModal={__handle.action.closeOptionPackageModal}
                />
            }
        </Container>
    )
}

export default ManageTableComponent;