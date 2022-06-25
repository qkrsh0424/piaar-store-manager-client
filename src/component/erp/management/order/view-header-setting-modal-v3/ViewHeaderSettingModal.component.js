import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import HeaderFieldView from "./HeaderField.view";
import InfoTextFieldView from "./InfoTextField.view";
import TableOperatorFieldView from "./TableOperatorField.view";
import DefaultTableFieldView from './DefaultTableField.view'
import qs from 'query-string';
import { Container } from "./ViewHeaderSettingModal.styled";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import { useEffect, useReducer } from "react";
import CreateTableFieldView from "./CreateTableField.view";
import _ from "lodash";
import valueUtils from "../../../../../utils/valueUtils";
import SelectorFieldView from "./SelectorField.view";
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import ViewHeaderInputFieldView from "./ViewHeaderInputField.view";

const defaultHeaderDetails = getDefaultHeaderDetails();

function Button({ element, onClick, style }) {
    return (
        <div className="button-box">
            <button
                className='button-el'
                type='button'
                onClick={() => onClick()}
                style={style}
            >{element}</button>
        </div>
    );
}

const ViewHeaderSettingModalComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    let pathname = location.pathname;
    const query = qs.parse(location.search);

    const [createHeaderDetails, dispatchCreateHeaderDetails] = useReducer(createHeaderDetailsReducer, initialCreateHeaderDetails);
    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);      // 선택된 헤더
    const [createViewHeader, dispatchCreateViewHeader] = useReducer(createViewHeaderReducer, initialCreateViewHeader);      // 새로 생성하는 헤더
    const [createViewHeaderTitle, dispatchCreateViewHeaderTitle] = useReducer(createViewHeaderTitleReducer, initialCreateViewHeaderTitle);      // 새로 생성하는 헤더의 타이틀
    
    useEffect(() => {
        if (!props.viewHeader) {
            dispatchViewHeader({
                type: 'CLEAR'
            })
            return;
        }

        dispatchViewHeader({
            type: 'INIT_DATA',
            payload: _.cloneDeep(props.viewHeader)
        })
    }, [props.viewHeader]);

    // 이미 존재하는 뷰 헤더 컨트롤 시
    useEffect(() => {
        if(!viewHeader) {
            dispatchCreateHeaderDetails({
                type: 'CLEAR'
            })
            dispatchCreateViewHeaderTitle({
                type: 'CLEAR'
            })
            return;
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: viewHeader.headerDetail.details
        })
        dispatchCreateViewHeaderTitle({
            type: 'SET_DATA',
            payload: viewHeader.headerTitle
        })
    }, [viewHeader])

    // 새로 생성하는 뷰 헤더 컨트롤 시
    useEffect(() => {
        if(!createViewHeader) {
            // dispatchCreateHeaderDetails({
            //     type: 'CLEAR'
            // })
            // dispatchCreateViewHeaderTitle({
            //     type: 'CLEAR'
            // })
            return;
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: createViewHeader.headerDetail.details
        })
        dispatchCreateViewHeaderTitle({
            type: 'SET_DATA',
            payload: createViewHeader.headerTitle
        })
    }, [createViewHeader])

    const __createHeaderDetails = {
        submit: {
            /**
             * 저장 및 업데이트
             * with props._onSubmit_saveAndModifyViewHeader
             */
            saveAndModify: () => {
                try {
                    createHeaderDetails.forEach((r, index) => {
                        if(valueUtils.isEmptyValues(r.customCellName)){
                            throw new Error(`순서 [${index+1}] 의 헤더명을 지정해 주세요.`);
                        }
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }

                let body = null;
                if(!createViewHeader){
                    body = {
                        ...viewHeader,
                        headerTitle: createViewHeaderTitle,
                        headerDetail: {
                            details: createHeaderDetails
                        }
                    }
                    props._onSubmit_modifyViewHeader(body);
                }else {
                    if(!createViewHeaderTitle) {
                        alert('뷰 헤더 이름을 먼저 설정해주세요.');
                        return;
                    }
                    body = {
                        ...viewHeader,
                        id: uuidv4(),
                        headerTitle: createViewHeaderTitle,
                        headerDetail: {
                            details: createHeaderDetails
                        }
                    }
                    props._onSubmit_createViewHeader(body);
                }
            }
        },
        action: {
            sortByDefault: () => {
                let data = [...createHeaderDetails];
                data.sort(function (a, b) {
                    return a.cellNumber - b.cellNumber;
                });

                dispatchCreateHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            },
            removeOne: (index) => {
                let data = [...createHeaderDetails];

                data = data.filter((r, rIndex) => rIndex !== index);

                dispatchCreateHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                });
            },
            checkAll: () => {
                if (__createHeaderDetails.return.isCheckedAll()) {
                    dispatchCreateHeaderDetails({
                        type: 'SET_DATA',
                        payload: []
                    })
                } else {
                    let data = [...defaultHeaderDetails];
                    dispatchCreateHeaderDetails({
                        type: 'SET_DATA',
                        payload: data
                    })
                }
            },
            checkOne: (selectedData) => {
                let data = [...createHeaderDetails];
                let selectedMatchedColumnName = selectedData.matchedColumnName;

                if (__createHeaderDetails.return.isCheckedOne(selectedMatchedColumnName)) {
                    data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
                } else {
                    data.push(selectedData);
                }

                dispatchCreateHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            }
        },
        change: {
            orderWithDragAndDrop: (result) => {
                if (!result.destination) {
                    return;
                }

                const newHeaderDetails = valueUtils.reorder(
                    createHeaderDetails,
                    result.source.index,
                    result.destination.index
                )

                dispatchCreateHeaderDetails({
                    type: 'SET_DATA',
                    payload: newHeaderDetails
                })
            },
            valueOfName: (e, index) => {
                let name = e.target.name;
                let value = e.target.value;

                let data = [...createHeaderDetails];

                data = data.map(r => {
                    if (data.indexOf(r) === index) {
                        return {
                            ...r,
                            [name]: value
                        }
                    } else {
                        return r;
                    }
                })

                dispatchCreateHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            }
        },
        return: {
            isCheckedAll: () => {
                if (createHeaderDetails.length <= 0) {
                    return false;
                }
                return defaultHeaderDetails.length === createHeaderDetails.length
            },
            isCheckedOne: (matchedColumnName) => {
                return createHeaderDetails.some(r => r.matchedColumnName === matchedColumnName);
            }
        }
    }

    const __viewHeader = {
        action: {
            createHeader: (e) => {
                e.preventDefault();

                dispatchViewHeader({
                    type: 'CLEAR'
                })

                // 선택된 헤더 리셋
                delete query.headerId;
                navigate({
                    pathname,
                    search: `?${qs.stringify({
                        ...query
                    })}`
                }, {
                    replace: true
                });

                let data = {
                    id: uuidv4(),
                    headerTitle: '',
                    headerDetail: {
                        details: []
                    }
                }

                dispatchCreateViewHeader({
                    type: 'INIT_DATA',
                    payload: data
                })
            },
            deleteOne: (e) => {
                e.preventDefault();

                if (!viewHeader?.id) {
                    alert('선택된 뷰 헤더가 없습니다.');
                    return;
                }

                if (window.confirm('선택된 뷰 헤더를 제거하시겠습니까?')) {
                    props._onAction_deleteSelectedViewHeader(viewHeader.id);

                    dispatchViewHeader({
                        type: 'CLEAR'
                    });
                }
            },
            updateDefaultHeader: () => {
                let selectedHeaderId = query.headerId;
                let headerId = props.viewHeaderList.filter(r => r.id === selectedHeaderId)[0].id;

                if (window.confirm('[주문 수집 관리]의 기본 헤더로 설정하시겠습니까?')) {
                    let params = {
                        orderHeaderId: headerId
                    }

                    if (props.erpDefaultHeader) {
                        props._onAction_changeDefaultHeader(params);
                    } else {
                        props._onAction_createDefaultHeader(params);
                    }
                }
            },
        },
        change: {
            selectedHeader: (e) => {
                e.preventDefault();
                let headerId = e.target.value;

                navigate({
                    pathname: pathname,
                    search: `?${qs.stringify({
                        ...query,
                        headerId: headerId
                    })}`
                }, {
                    replace: true
                })
            },
            createHeaderValue: (e) => {
                e.preventDefault();

                dispatchCreateViewHeaderTitle({
                    type: 'SET_DATA',
                    payload: e.target.value
                })
            }
        }
    }

    return(
        <>
        <Container>
            <HeaderFieldView
                    onSubmitSaveAndModify={__createHeaderDetails.submit.saveAndModify}
                    onActionCloseModal={props._onAction_closeHeaderSettingModal}
                ></HeaderFieldView>
                <SelectorFieldView
                    erpDefaultHeader={props.erpDefaultHeader}
                    viewHeaderList={props.viewHeaderList}
                    viewHeader={viewHeader}
                    createViewHeader={createViewHeader}

                    onChangeSelectedViewHeaderTitle={__viewHeader.change.selectedHeader}
                    onActionCreateViewHeader={__viewHeader.action.createHeader}
                    onActionDeleteSelectedViewHeader={__viewHeader.action.deleteOne}
                    onSubmitSaveAndModifyViewHeader={__createHeaderDetails.submit.saveAndModify}
                ></SelectorFieldView>
                {createHeaderDetails &&
                    <>
                        <ViewHeaderInputFieldView
                            erpDefaultHeader={props.erpDefaultHeader}
                            viewHeader={viewHeader}
                            createViewHeaderTitle={createViewHeaderTitle}

                            onChangeInputValue={__viewHeader.change.createHeaderValue}
                            onActionChangeDefaultHeader={__viewHeader.action.updateDefaultHeader}
                        ></ViewHeaderInputFieldView>
                        <InfoTextFieldView
                            element={
                                <div>* 주문 현황에서 확인할 데이터 항목을 선택해주세요.</div>
                            }
                        ></InfoTextFieldView>
                        <TableOperatorFieldView
                            element={
                                <>
                                    <CustomCheckbox
                                        checked={__createHeaderDetails.return.isCheckedAll()}
                                        size={'20px'}
                                        label={'전체 선택'}
                                        labelSize={'16px'}

                                        onChange={() => __createHeaderDetails.action.checkAll()}
                                    ></CustomCheckbox>
                                    <Button
                                        element={'저장'}
                                        onClick={__createHeaderDetails.submit.saveAndModify}
                                    ></Button>
                                </>
                            }
                        ></TableOperatorFieldView>
                        <DefaultTableFieldView
                            defaultHeaderDetails={defaultHeaderDetails}
                            isCheckedOne={__createHeaderDetails.return.isCheckedOne}

                            onActionCheckHeaderDetail={__createHeaderDetails.action.checkOne}
                        ></DefaultTableFieldView>
                        <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px 0' }}>
                            <img src='/assets/icon/down_arrow_icon.png' width={32}></img>
                        </div>
                        <InfoTextFieldView
                            element={
                                <>
                                    <div>* 선택한 양식의 헤더명과 순서를 변경할 수 있습니다.</div>
                                    <div>* 새롭게 체크 된 항목은 뒤에서 부터 추가 됩니다.</div>
                                </>
                            }
                        ></InfoTextFieldView>
                        <TableOperatorFieldView
                            element={
                                <button
                                    type='button'
                                    style={{ padding: '5px 10px', background: '#2c73d2', border: '1px solid #2c73d2', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: 14 }}
                                    onClick={__createHeaderDetails.action.sortByDefault}
                                >기준 양식으로 순서 정렬</button>
                            }
                        >
                        </TableOperatorFieldView>
                    </>
                }
                {createHeaderDetails &&
                    <CreateTableFieldView
                        createHeaderDetails={createHeaderDetails}

                        onChangeValueOfName={__createHeaderDetails.change.valueOfName}
                        onChangeOrderWithDragAndDrop={__createHeaderDetails.change.orderWithDragAndDrop}
                        onActionRemoveOne={__createHeaderDetails.action.removeOne}
                    ></CreateTableFieldView>
                }
            </Container>
        </>
    );
}

export default ViewHeaderSettingModalComponent;

// const initialCreateHeaderDetails = [];
const initialCreateHeaderDetails = null;
const initialViewHeader = null;
const initialCreateViewHeader = null;
const initialCreateViewHeaderTitle = null;
const initialViewHeaderTitleList = null;

const createHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCreateHeaderDetails;
        default: return initialCreateHeaderDetails;
    }
}

const viewHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialViewHeader;
        default: return initialViewHeader;
    }
}

const createViewHeaderTitleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCreateViewHeaderTitle;
        default: return initialCreateViewHeaderTitle;
    }
}

const createViewHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialCreateViewHeader;
        default: return initialCreateViewHeader;
    }
}
