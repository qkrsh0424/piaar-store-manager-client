import { useEffect, useReducer, useState } from "react";
import { subOptionCodeDataConnect } from "../../../data_connect/subOptionCodeDataConnect";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import CreateSubOptionCodeModalComponent from "../create-sub-option-code-modal/CreateSubOptionCodeModal.component";
import ModifySubOptionCodeModalComponent from "../modify-sub-option-code-modal/ModifySubOptionCodeModal.component";
import HeaderFieldView from "./HeaderField.view";
import ProductOptionCodeInfoFieldView from "./ProductOptionCodeInfoField.view";
import { Container } from "./SubOptionCodeModal.styled";
import TableFieldView from "./TableField.view";

const SubOptionCodeModalComponent = (props) => {
    const [subOptionCode, dispatchSubOptionCode] = useReducer(subOptionCodeReducer, initialSubOptionCode);
    const [createSubOptionCodeModalOpen, setCreateSubOptionCodeModalOpen] = useState(false);
    const [modifySubOptionCodeModalOpen, setModifySubOptionCodeModalOpen] = useState(false);
    const [selectedSubOptionCode, setSelectedSubOptionCode] = useState(null);

    useEffect(() => {
        if(!props.selectedProductOptionData) {
            return;
        }

        async function init() {
            await __reqSearchSubOptionCode();
        }
        init();
    }, [props.selectedProductOptionData])

    const __reqSearchSubOptionCode = async () => {
        await subOptionCodeDataConnect().searchListByProductOptionId(props.selectedProductOptionData.id)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    dispatchSubOptionCode({
                        type: 'SET_DATA',
                        payload: res.data.data
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqCreateSubOptionCode = async (data) => {
        await subOptionCodeDataConnect().postOne(data)
            .then(res => {
                if (res.status == 200 && res.data && res.data.message == 'success') {
                    alert('등록되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqModifySubOptionCode = async (data) => {
        await subOptionCodeDataConnect().putOne(data)
        .then(res => {
            if (res.status == 200 && res.data && res.data.message == 'success') {
                alert('수정되었습니다.');
            }
        })
        .catch(err => {
            let res = err.response;
            alert(res?.data?.memo);
        })
    }

    const onActionOpenCreateSubOptionCodeModal = (e) => {
        e.preventDefault();
        setCreateSubOptionCodeModalOpen(true);
    }

    const onActionCloseCreateSubOptionCodeModal = () => {
        setCreateSubOptionCodeModalOpen(false);
    }

    const onActionOpenModifySubOptionCodeModal = (e, id) => {
        e.preventDefault();
        let selectedData = subOptionCode.filter(r => r.id === id)[0];
        setSelectedSubOptionCode(selectedData);
        setModifySubOptionCodeModalOpen(true);
    }

    const onActionCloseModifySubOptionCodeModal = () => {
        setModifySubOptionCodeModalOpen(false);
    }

    const onActionDeleteSubOptionCode = async (e, subOptionCodeId) => {
        e.preventDefault();

        if (window.confirm('삭제하시겠습니까?')) {
            await props.onActionDeleteSubOptionCode(subOptionCodeId);
            await __reqSearchSubOptionCode();
            return;
        }
    }

    const onSubmitCreateSubOptionCode = async (data) => {
        await __reqCreateSubOptionCode(data);
        await __reqSearchSubOptionCode();
        onActionCloseCreateSubOptionCodeModal();
    }

    const onSubmitModifySubOptionCode = async (data) => {
        await __reqModifySubOptionCode(data);
        await __reqSearchSubOptionCode();
        onActionCloseModifySubOptionCodeModal();
    }

    return (
        subOptionCode &&
        <>
            <Container>
                <HeaderFieldView
                    onActionCloseSubOptionCodeModal={() => props.onActionCloseSubOptionCodeModal()}
                ></HeaderFieldView>
                <ProductOptionCodeInfoFieldView
                    optionData={props.selectedProductOptionData}
                ></ProductOptionCodeInfoFieldView>
                <TableFieldView
                    subOptionCode={subOptionCode}

                    onActionOpenCreateSubOptionCodeModal={(e) => onActionOpenCreateSubOptionCodeModal(e)}
                    onActionOpenModifySubOptionCodeModal={(e, id) => onActionOpenModifySubOptionCodeModal(e, id)}
                    onActionDeleteSubOptionCode={(e, id) => onActionDeleteSubOptionCode(e, id)}
                ></TableFieldView>

                <CommonModalComponent
                    open={createSubOptionCodeModalOpen}
                    maxWidth={'md'}
                    fullWidth={true}

                    onClose={onActionCloseCreateSubOptionCodeModal}
                >
                    <CreateSubOptionCodeModalComponent
                        selectedProductOptionData={props.selectedProductOptionData}

                        onActionCloseCreateSubOptionCodeModal={() => onActionCloseCreateSubOptionCodeModal()}
                        onSubmitCreateSubOptionCode={(data) => onSubmitCreateSubOptionCode(data)}
                    ></CreateSubOptionCodeModalComponent>
                </CommonModalComponent>

                <CommonModalComponent
                    open={modifySubOptionCodeModalOpen}
                    maxWidth={'md'}
                    fullWidth={true}

                    onClose={onActionCloseModifySubOptionCodeModal}
                >
                    <ModifySubOptionCodeModalComponent
                        selectedSubOptionCode={selectedSubOptionCode}

                        onActionCloseModifySubOptionCodeModal={() => onActionCloseModifySubOptionCodeModal()}
                        onSubmitModifySubOptionCode={(data) => onSubmitModifySubOptionCode(data)}
                    ></ModifySubOptionCodeModalComponent>
                </CommonModalComponent>
            </Container>
        </>
    )
}

export default SubOptionCodeModalComponent;

const initialSubOptionCode = null;

const subOptionCodeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialSubOptionCode;
        default: return { ...state };
    }
}
