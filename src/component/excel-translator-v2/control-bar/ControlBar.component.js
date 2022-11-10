import { useState, useEffect, useReducer } from 'react';
import queryString from 'query-string';

import { Container, HeaderContainer } from './ControlBar.styled';
import TitleSelectorFieldView from './TitleSelectorField.view';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateTranslatorHeaderModal from '../create-translator-header-modal/CreateTranslatorHeaderModal.component';
import ModifyTranslatorHeaderModal from '../modify-translator-header-modal/ModifyTranslatorHeaderModal.component';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorageHook } from '../../../hooks/local-storage/useLocalStorageHook';
import ExcelTranslatorFormControlModalComponent from '../excel-translator-form-control-modal/ExcelTranslatorFormControlModal.component';

const ControlBarComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    let pathname = location.pathname;
    let params = queryString.parse(location.search);

    const [selectedTranslatorHeader, dispatchSelectedTranslatorHeader] = useReducer(selectedTranslatorHeaderReducer, initialSelectedTranslatorHeader);
    const [createTranslatorHeaderModalOpen, setCreateTranslatorHeaderModalOpen] = useState(false);
    const [modifyTranslatorHeaderModalOpen, setModifyTranslatorHeaderModalOpen] = useState(false);

    const [excelTranslatorViewFormIds, setExcelTranslatorViewFormIds] = useLocalStorageHook("excelTranslatorViewOrder", []);
    const [excelTranslatorViewData, dispatchExcelTranslatorViewData] = useReducer(excelTranslatorViewDataReducer, initialExcelTranslatorViewData);
    const [excelTranslatorFormControlModalOpen, setExcelTranslatorFormControlModalOpen] = useState(false);

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
        if(!(excelTranslatorViewFormIds && props.excelTranslatorHeaderList)) {
            return;
        }

        let data = [];
        excelTranslatorViewFormIds.forEach(r =>{
            let matchedHeader = props.excelTranslatorHeaderList.filter(r2 => r === r2.id)[0];
            if(matchedHeader) data.push(matchedHeader);
        });
        
        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: data
        })
    }, [props.excelTranslatorHeaderList, excelTranslatorViewFormIds])

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

                // excelTranslatorViewOrder에 지금 생성한 헤더 추가
                setExcelTranslatorViewFormIds([...excelTranslatorViewFormIds, body.id]);
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

                if (window.confirm('삭제하시겠습니까?')) {
                    await props.onSubmitDeleteExcelTranslatorHeader(selectedTranslatorHeader.id);
                }
            }
        }
    }

    const onActionOpenExcelTranslatorFormControlModal = () => {
        setExcelTranslatorFormControlModalOpen(true);
    }

    const onActionCloseExcelTranslatorFormControlModal = () => {
        setExcelTranslatorFormControlModalOpen(false);
    }

    const onActionUpdateExcelTranslatorViewIds = (ids) => {
        setExcelTranslatorViewFormIds(ids);

        navigate({
            pathname: pathname
        }, {
            replace: true
        })

        onActionCloseExcelTranslatorFormControlModal();
        alert('저장되었습니다.');
    }

    return (
        <Container>
            <HeaderContainer>
                <TitleSelectorFieldView
                    excelTranslatorViewData={excelTranslatorViewData}
                    selectedTranslatorHeader={selectedTranslatorHeader}
                    disabledBtn={disabledBtn}

                    onChangeSelectedHeaderTitle={__selectedTranslatorHeader.action.selectAnotherHeader}
                    onCreateTranslatorHeaderModalOpen={__selectedTranslatorHeader.action.openCreateTranslatorHeaderModal}
                    onModifyTranslatorHeaderModalOpen={__selectedTranslatorHeader.action.openModifyTranslatorHeaderModal}
                    onActionDeleteTranslatorHeader={__selectedTranslatorHeader.submit.deleteTranslatorHeader}
                    onActionOpenExcelTranslatorFormControlModal={onActionOpenExcelTranslatorFormControlModal}
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

            {/* Excel Translator Control Modal */}
            {excelTranslatorFormControlModalOpen &&
                <CommonModalComponent
                    open={excelTranslatorFormControlModalOpen}
                    maxWidth={'md'}

                    onClose={onActionCloseExcelTranslatorFormControlModal}
                >
                    <ExcelTranslatorFormControlModalComponent
                        excelTranslatorData={props.excelTranslatorHeaderList}
                        excelTranslatorViewFormIds={excelTranslatorViewFormIds}

                        onActionCloseExcelTranslatorFormControlModal={onActionCloseExcelTranslatorFormControlModal}
                        onActionUpdateExcelTranslatorViewIds={onActionUpdateExcelTranslatorViewIds}
                    ></ExcelTranslatorFormControlModalComponent>
                </CommonModalComponent>
            }
        </Container>
    )
}
export default ControlBarComponent;

const initialSelectedTranslatorHeader = null;
const initialSelectedExcelTranslator = '';
const initialExcelTranslatorViewData = [];

const selectedTranslatorHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const selectedExcelTranslatorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedExcelTranslator;
        default: return initialSelectedExcelTranslator;
    }
}

const excelTranslatorViewDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedExcelTranslator;
        default: return initialSelectedExcelTranslator;
    }
}