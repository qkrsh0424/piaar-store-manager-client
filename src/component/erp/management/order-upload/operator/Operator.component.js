import { useRef, useState, useReducer, useEffect } from "react";
import queryString from 'query-string';
import CommonModalComponent from "../../../../module/modal/CommonModalComponent";
import ExcelTranslatorSearchModalComponent from "../excel-translator-search-modal/ExcelTranslatorSearchModal.component"
import SingleAddModalComponent from "../single-add-modal/SingleAddModal.component";
import ControlButtonFieldView from "./ControlButtonField.view";
import { Container, TipFieldWrapper, Wrapper } from "./Operator.styled";
import { useLocation, useNavigate } from 'react-router-dom';
import ExcelTranslatorFormControlModalComponent from "../excel-translator-form-control-modal/ExcelTranslatorFormControlModal.component";
import { useLocalStorageHook } from "../../../../../hooks/local_storage/useLocalStorageHook";

function Layout({ children }) {
    return (
        <Container>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    );
}

function Tip() {
    return (
        <TipFieldWrapper>
            <div className='text-box'>
                TIP1 : [피아르 고유번호] 는 자동 생성되는 항목이니 비워두시기 바랍니다.
            </div>
            <div className='text-box'>
                TIP2 : [상품명], [옵션정보], [수량], [수취인명], [전화번호1], [주소] 은 필수 항목 입니다.
            </div>
            <div className='text-box'>
                TIP3 : 데이터 중복 업로드를 방지하시려면 [판매채널 주문번호1] 을 반드시 기입해 주세요.
            </div>
            <div className='text-box'>
                TIP4 : 피아르 상품 정보들과 자동으로 매칭되기를 원하시면 [피아르 옵션코드] 를 기입해 주세요.
            </div>
            <div className='text-box'>
                TIP5 : 판매액 및 순수익에 대한 보다 정확한 통계를 위해서는 [판매금액], [배송비] 를 기입해 주세요.
            </div>
            <div className='text-box'>
                TIP6 : 판매 채널별 통계자료를 얻기 위해서는 [판매채널] 을 기입해 주세요.
            </div>
        </TipFieldWrapper>
    );
}

const OperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    let pathname = location.pathname;
    let params = queryString.parse(location.search);

    const fileUploaderRef = useRef();

    const [singleAddModalOpen, setSingleAddModalOpen] = useState(false);
    const [selectedExcelTranslator, dispatchSelectedExcelTranslator] = useReducer(selectedExcelTranslatorReducer, initialSelectedExcelTranslator);
    const [excelTranslatorSearchModalOpen, setExcelTranslatorSearchodalOpen] = useState(false);

    const [excelTranslatorViewFormIds, setExcelTranslatorViewFormIds] = useLocalStorageHook("excelTranslatorViewOrder", []);

    const [excelTranslatorViewData, dispatchExcelTranslatorViewData] = useReducer(excelTranslatorViewDataReducer, initialExcelTranslatorViewData);
    const [excelTranslatorFormControlModalOpen, setExcelTranslatorFormControlModalOpen] = useState(false);

    useEffect(() => {
        let headerId = params.headerId;
        
        if(!headerId) {
            dispatchSelectedExcelTranslator({
                type: 'CLEAR'
            });
            return;
        }
        
        let excelTranslatorHeader = props.excelTranslatorData.filter(r => r.id === headerId)[0];
        dispatchSelectedExcelTranslator({
            type: 'SET_DATA',
            payload: excelTranslatorHeader
        });
    }, [location]);

    useEffect(() => {
        if(!excelTranslatorViewFormIds) {
            return;
        }

        let data = excelTranslatorViewFormIds.map(r => props.excelTranslatorData.filter(r2 => r2.id === r)[0]);

        dispatchExcelTranslatorViewData({
            type: 'SET_DATA',
            payload: data
        })
    }, [excelTranslatorViewFormIds])

    const onActionOpenFileUploader = () => {
        fileUploaderRef.current.click();
    }

    const onActionUploadExcelFile = (e) => {
        if (e.target.files.length === 0) {
            alert('업로드하실 엑셀 파일을 선택해 주세요.');
            return;
        }

        let files = e.target.files;
        let file = files[0];

        if (file.size > 1024 * 1024 * 10) {
            alert('10MB 이하 파일만 등록할 수 있습니다.\n\n' + '현재 파일 크기 : ' + (Math.round(file[0].size / 1024 / 1024 * 100) / 100) + 'MB');
            return;
        }

        var formData = new FormData();
        formData.append('file', files[0]);

        props._onSubmit_checkPasswordForUploadedExcelFile(formData);
    }

    const onActionSaveExcelData = () => {
        props._onSubmit_createOrderItems()
    }

    const onActionDownloadSampleForm = () => {
        props._onSubmit_downloadUploadExcelSample();
    }

    const onActionOpenSingleAddModal = () => {
        setSingleAddModalOpen(true);
    }

    const onActionCloseSingleAddModal = () => {
        setSingleAddModalOpen(false);
    }

    const onActionAddSingleData = (data) => {
        props._onSubmit_addSingleExcelData(data);
        onActionCloseSingleAddModal();
    }

    const onActionOpenExcelTranslatorSearchModal = () => {
        setExcelTranslatorSearchodalOpen(true);
    }

    const onActionCloseExcelTranslatorSearchModal = () => {
        setExcelTranslatorSearchodalOpen(false);
    }

    const onChangeExcelTranslator = (e) => {
        let headerId = e.target.value;

        let selectedHeader = props.excelTranslatorData.filter(r => r.id === headerId)[0];

        // 피아르(default) 선택 시
        if(!selectedHeader) {
            delete params.headerId;

            navigate({
                pathname: pathname,
                search: `?${queryString.stringify({
                    ...params
                })}`
            }, {
                replace: true
            })
        } else {
            navigate({
                pathname: pathname,
                search: `?${queryString.stringify({
                    ...params,
                    headerId: selectedHeader.id
                })}`
            }, {
                replace: true
            })
        }
    }

    const onActionOpenExcelTranslatorFormControlModal = () => {
        setExcelTranslatorFormControlModalOpen(true);
    }

    const onActionCloseExcelTranslatorFormControlModal = () => {
        setExcelTranslatorFormControlModalOpen(false);
    }

    return (
        <>
            <Layout>
                <input
                    ref={fileUploaderRef}
                    type="file"
                    accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onClick={(e) => e.target.value = ''}
                    onChange={(e) => onActionUploadExcelFile(e)}
                    hidden
                />
                <ControlButtonFieldView
                    excelTranslatorViewData={excelTranslatorViewData}
                    selectedExcelTranslator={selectedExcelTranslator}

                    onActionOpenFileUploader={onActionOpenFileUploader}
                    onActionSaveExcelData={onActionSaveExcelData}
                    onActionDownloadSampleForm={onActionDownloadSampleForm}
                    onActionOpenSingleAddModal={onActionOpenSingleAddModal}
                    onChangeExcelTranslator={onChangeExcelTranslator}
                    onActionOpenExcelTranslatorSearchModal={onActionOpenExcelTranslatorSearchModal}
                    onActionOpenExcelTranslatorFormControlModal={onActionOpenExcelTranslatorFormControlModal}
                ></ControlButtonFieldView>
                <Tip></Tip>
            </Layout>

            {/* Modal */}
            <CommonModalComponent
                open={singleAddModalOpen}
                maxWidth={'sm'}

                onClose={onActionCloseSingleAddModal}
            >
                <SingleAddModalComponent
                    onActionAddSingleData={onActionAddSingleData}
                ></SingleAddModalComponent>
            </CommonModalComponent>

            {/* Modal */}
            <CommonModalComponent
                open={excelTranslatorSearchModalOpen}
                maxWidth={'md'}

                onClose={onActionCloseExcelTranslatorSearchModal}
            >
                <ExcelTranslatorSearchModalComponent
                    selectedExcelTranslator={selectedExcelTranslator}

                    onActionCloseExcelTranslatorSearchModal={onActionCloseExcelTranslatorSearchModal}
                ></ExcelTranslatorSearchModalComponent>
            </CommonModalComponent>

            {/* Excel Translator Control Modal */}
            <CommonModalComponent
                open={excelTranslatorFormControlModalOpen}
                maxWidth={'md'}

                onClose={onActionCloseExcelTranslatorFormControlModal}
            >
                <ExcelTranslatorFormControlModalComponent
                    excelTranslatorData={props.excelTranslatorData}

                    onActionCloseExcelTranslatorFormControlModal={onActionCloseExcelTranslatorFormControlModal}
                ></ExcelTranslatorFormControlModalComponent>
            </CommonModalComponent>
        </>
    );
}

export default OperatorComponent;

const initialSelectedExcelTranslator = '';
const initialExcelTranslatorViewData = [];

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
