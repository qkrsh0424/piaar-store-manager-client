import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import HeaderFieldView from "./HeaderField.view";
import InfoTextFieldView from "./InfoTextField.view";
import TableOperatorFieldView from "./TableOperatorField.view";
import DefaultTableFieldView from './DefaultTableField.view'
import queryString from 'query-string';
import { Container } from "./ViewHeaderSettingModal.styled";
import { getDefaultHeaderDetails } from "../../../../../static-data/staticData";
import { useEffect, useReducer } from "react";
import CreateTableFieldView from "./CreateTableField.view";
import _ from "lodash";
import valueUtils from "../../../../../utils/valueUtils";
import SelectorFieldView from "./SelectorField.view";
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";

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
    let params = queryString.parse(location.search);

    const [createHeaderDetails, dispatchCreateHeaderDetails] = useReducer(createHeaderDetailsReducer, initialCreateHeaderDetails);
    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);
    const [createViewHeader, dispatchCreateViewHeader] = useReducer(createViewHeaderReducer, initialCreateViewHeader);

    useEffect(() => {
        if (!props.viewHeader) {
            dispatchViewHeader({
                type: 'CLEAR'
            })
            // dispatchCreateHeaderDetails({
            //     type: 'CLEAR'
            // })
            dispatchCreateViewHeader({
                type: 'CLEAR'
            })
            return;
        }

        dispatchViewHeader({
            type: 'INIT_DATA',
            payload: _.cloneDeep(props.viewHeader)
        })
        
        onActionCancelCreateViewHeader();
    }, [props.viewHeader]);

    useEffect(() => {
        if(!viewHeader) {
            dispatchCreateHeaderDetails({
                type: 'CLEAR'
            })
            return;
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: viewHeader.headerDetail.details
        })
    }, [viewHeader])

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
                        headerDetail: {
                            details: createHeaderDetails
                        }
                    }
                    props._onSubmit_modifyViewHeader(body);
                }else {
                    if(!createViewHeader.headerTitle) {
                        alert('뷰 헤더 이름을 먼저 설정해주세요.');
                        return;
                    }
                    body = {
                        ...viewHeader,
                        id: uuidv4(),
                        headerTitle: createViewHeader.headerTitle,
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

    const onChangeSelectedViewHeaderTitle = (e) => {
        let headerId = e.target.value;
        
        // header선택안한 경우
        if(!headerId) {
            dispatchViewHeader({
                type: 'CLEAR'
            })
            dispatchCreateHeaderDetails({
                type: 'CLEAR'
            })
            return;
        }

        navigate({
            pathname: pathname,
            search: `?${queryString.stringify({
                ...params,
                headerId: headerId
            })}`
        }, {
            replace: true
        })
        props._onAction_searchSelectedViewHeader(headerId);
    }

    const onActionCreateViewHeader = (e) => {
        e.preventDefault();

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

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: data.headerDetail.details
        })

        dispatchViewHeader({
            type: 'CLEAR'
        })
    }

    const onActionDeleteSelectedViewHeader = (e) => {
        e.preventDefault();

        if(!viewHeader?.id) {
            alert('선택된 뷰 헤더가 없습니다.');
            return;
        }

        if(window.confirm('선택된 뷰 헤더를 제거하시겠습니까?')) {
            props._onAction_deleteSelectedViewHeader(viewHeader.id);

            delete params.headerId;

            navigate({
                pathname: pathname,
                search: `?${queryString.stringify({
                    ...params
                })}`
            }, {
                replace: true
            })

            dispatchViewHeader({
                type: 'CLEAR'
            });
            return;
        }
    }

    const onChangeViewHeaderTitle = (e) => {
        dispatchCreateViewHeader({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    const onActionCancelCreateViewHeader = () => {
        dispatchCreateViewHeader({
            type: 'CLEAR'
        });

        dispatchCreateHeaderDetails({
            type: 'CLEAR'
        })
    }

    return (
        <>
            <Container>
                <HeaderFieldView
                    onSubmitSaveAndModify={__createHeaderDetails.submit.saveAndModify}
                    onActionCloseModal={props._onAction_closeHeaderSettingModal}
                ></HeaderFieldView>
                <SelectorFieldView
                    viewHeaderTitleList={props.viewHeaderTitleList}
                    viewHeader={viewHeader}
                    createViewHeader={createViewHeader}

                    onChangeSelectedViewHeaderTitle={onChangeSelectedViewHeaderTitle}
                    onActionCreateViewHeader={onActionCreateViewHeader}
                    onActionDeleteSelectedViewHeader={onActionDeleteSelectedViewHeader}
                    onChangeViewHeaderTitle={onChangeViewHeaderTitle}
                    onActionCancelCreateViewHeader={onActionCancelCreateViewHeader}
                ></SelectorFieldView>
                {createHeaderDetails &&
                    <>
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
        case 'CLEAR':
            return initialViewHeader;
        default: return initialViewHeader;
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
