import { useState, useEffect, useReducer } from 'react';
import queryString from 'query-string';

import { Container, HeaderContainer } from './ControlBar.styled';
import TitleSelectorFieldView from './TitleSelectorField.view';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateTranslatorHeaderModal from '../create-translator-header-modal/CreateTranslatorHeaderModal.component';
import ModifyTranslatorHeaderModal from '../modify-translator-header-modal/ModifyTranslatorHeaderModal.component';
import { useLocation, useNavigate } from 'react-router-dom';

const ControlBarComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    let pathname = location.pathname;
    let params = queryString.parse(location.search);

    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);
    const [createTranslatorHeaderModalOpen, setCreateTranslatorHeaderModalOpen] = useState(false);
    const [modifyTranslatorHeaderModalOpen, setModifyTranslatorHeaderModalOpen] = useState(false);

    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!props.excelTranslatorHeaderList) {
            return;
        }

        if (!params.headerId) {
            dispatchSelectedTranslatorHeader({
                type: 'CLEAR'
            });
            return;
        }

        let headerId = params.headerId;
        let headerTitleState = props.excelTranslatorHeaderList?.filter(r => r.id === headerId)[0];

        dispatchSelectedTranslatorHeader({
            type: 'INIT_DATA',
            payload: headerTitleState
        });
    }, [params.headerId, props.excelTranslatorHeaderList]);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [disabledBtn]);

    const __selectedTranslatorHeader = {
        action: {
            selectAnotherHeader: (e) => {
                let headerId = e.target.value;

                let selectedHeader = props.excelTranslatorHeaderList.filter(r => r.id === headerId)[0];

                navigate(
                    {
                        pathname: pathname,
                        search: `?${queryString.stringify({
                            ...params,
                            headerId: selectedHeader.id
                        })}`
                    },
                    {
                        replace: true
                    }
                )
            },
            openCreateTranslatorHeaderModal: () => {
                setCreateTranslatorHeaderModalOpen(true);
            },
            closeCreateTranslatorHeaderModal: () => {
                setCreateTranslatorHeaderModalOpen(false)
            },
            openModifyTranslatorHeaderModal: () => {
                if (!selectedTranslatorHeader) {
                    alert('엑셀 형식을 먼저 선택해주세요.');
                    return;
                }

                setModifyTranslatorHeaderModalOpen(true);
            },
            closeModifyTranslatorHeaderModal: () => {
                setModifyTranslatorHeaderModalOpen(false);
            }
        },
        submit: {
            createTranslatorHeader: async (body) => {
                await props.onSubmitCreateTranslatorHeader(body);

                __selectedTranslatorHeader.action.closeCreateTranslatorHeaderModal();
            },
            modifyTranslatorHeader: async (body) => {
                await props.onSubmitModifyExcelTranslatorHeader(body);

                __selectedTranslatorHeader.action.closeModifyTranslatorHeaderModal();
            },
            deleteTranslatorHeader: async () => {
                setDisabledBtn(true);

                if (!selectedTranslatorHeader) {
                    alert('삭제하려는 엑셀 형식을 먼저 선택해주세요.');
                    return;
                }

                if (window.confirm('정말 삭제하시겠습니까?')) {
                    await props.onSubmitDeleteExcelTranslatorHeader(selectedTranslatorHeader.id);
                }
            }
        }
    }

    return (
        <Container>
            <HeaderContainer>
                <TitleSelectorFieldView
                    excelTranslatorHeaderList={props.excelTranslatorHeaderList}
                    selectedTranslatorHeader={selectedTranslatorHeader}
                    disabledBtn={disabledBtn}

                    onChangeSelectedHeaderTitle={__selectedTranslatorHeader.action.selectAnotherHeader}
                    onCreateTranslatorHeaderModalOpen={__selectedTranslatorHeader.action.openCreateTranslatorHeaderModal}
                    onModifyTranslatorHeaderModalOpen={__selectedTranslatorHeader.action.openModifyTranslatorHeaderModal}
                    onActionDeleteTranslatorHeader={__selectedTranslatorHeader.submit.deleteTranslatorHeader}
                />
            </HeaderContainer>

            {/* ExcelTranslatorHeader Create Modal */}
            {createTranslatorHeaderModalOpen &&
                <CommonModalComponent
                    open={createTranslatorHeaderModalOpen}
                    onClose={__selectedTranslatorHeader.action.closeCreateTranslatorHeaderModal}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <CreateTranslatorHeaderModal
                        onSubmitCreateExcelTranslatorHeader={__selectedTranslatorHeader.submit.createTranslatorHeader}
                    />
                </CommonModalComponent>
            }

            {modifyTranslatorHeaderModalOpen &&
                <CommonModalComponent
                    open={modifyTranslatorHeaderModalOpen}
                    onClose={__selectedTranslatorHeader.action.closeModifyTranslatorHeaderModal}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <ModifyTranslatorHeaderModal
                        selectedTranslatorHeader={selectedTranslatorHeader}

                        onSubmitModifyExcelTranslatorHeader={__selectedTranslatorHeader.submit.modifyTranslatorHeader}
                    />
                </CommonModalComponent>
            }
        </Container>
    )
}
export default ControlBarComponent;

const initialSelectedTranslatorHeader = null;

const selectedTranslatorHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}