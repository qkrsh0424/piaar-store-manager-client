import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import HeaderFieldView from "./HeaderField.view";
import InfoTextFieldView from "./InfoTextField.view";
import TableOperatorFieldView from "./TableOperatorField.view";
import DefaultTableFieldView from './DefaultTableField.view'
import { Container } from "./ViewHeaderSettingModal.styled";
import { useEffect, useReducer } from "react";
import CreateTableFieldView from "./CreateTableField.view";
import _ from "lodash";
import valueUtils from "../../../../../utils/valueUtils";
import SelectorFieldView from "./SelectorField.view";
import { v4 as uuidv4 } from 'uuid';
import ViewHeaderInputFieldView from "./ViewHeaderInputField.view";
import { getReturnDefaultHeaderDetails } from "../../../../../static-data/erpReturnItemStaticData";
import ReturnDefaultTableFieldView from "./ReturnDefaultTableField.view";

const defaultHeaderDetails = getReturnDefaultHeaderDetails().headerDetail.details;

const ViewHeaderSettingModalComponent = (props) => {

    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);      // 선택된 헤더
    const [createViewHeader, dispatchCreateViewHeader] = useReducer(createViewHeaderReducer, initialCreateViewHeader);      // 새로 생성하는 헤더
    const [viewHeaderTitle, dispatchViewHeaderTitle] = useReducer(viewHeaderTitleReducer, initialViewHeaderTitle);      // 생성 or 수정하려는 header title
    const [viewHeaderDetails, dispatchViewHeaderDetails] = useReducer(viewHeaderDetailsReducer, initialViewHeaderDetails);      // 생성 or 수정하려는 header detail

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
            dispatchViewHeaderDetails({
                type: 'CLEAR'
            })
            dispatchViewHeaderTitle({
                type: 'CLEAR'
            })
            return;
        }

        dispatchViewHeaderTitle({
            type: 'SET_DATA',
            payload: viewHeader.headerTitle
        })
        dispatchViewHeaderDetails({
            type: 'SET_DATA',
            payload: viewHeader.headerDetail.details
        })
    }, [viewHeader])

    // 새로 생성하는 뷰 헤더 컨트롤 시
    useEffect(() => {
        if(!createViewHeader) {
            dispatchViewHeaderTitle({
                type: 'CLEAR'
            })
            dispatchViewHeaderDetails({
                type: 'CLEAR'
            })
            return;
        }

        dispatchViewHeaderTitle({
            type: 'SET_DATA',
            payload: createViewHeader.headerTitle
        })
        dispatchViewHeaderDetails({
            type: 'SET_DATA',
            payload: createViewHeader.headerDetail.details
        })
    }, [createViewHeader])

    const __createReturnHeaderDetails = {
        submit: {
            /**
             * 저장 및 업데이트
             * with props._onSubmit_saveAndModifyViewHeader
             */
            saveAndModify: () => {
                try {
                    viewHeaderDetails.forEach((r, index) => {
                        if(valueUtils.isEmptyValues(r.customCellName)){
                            throw new Error(`순서 [${index+1}] 의 헤더명을 지정해 주세요.`);
                        }
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }

                if(!viewHeaderTitle) {
                    alert('뷰 헤더 이름을 먼저 설정해주세요.');
                    return;
                }
                
                let body = null;
                if(!createViewHeader){
                    body = {
                        ...viewHeader,
                        headerTitle: viewHeaderTitle,
                        headerDetail: {
                            details: viewHeaderDetails
                        }
                    }

                    props._onSubmit_modifyViewHeader(body);
                }else {
                    body = {
                        ...viewHeader,
                        id: uuidv4(),
                        headerTitle: viewHeaderTitle,
                        headerDetail: {
                            details: viewHeaderDetails
                        }
                    }

                    props._onSubmit_createViewHeader(body);
                }
            }
        },
        action: {
            sortByDefault: () => {
                let data = [...viewHeaderDetails];
                data.sort(function (a, b) {
                    return a.cellNumber - b.cellNumber;
                });

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            },
            removeOne: (index) => {
                let data = [...viewHeaderDetails];

                data = data.filter((r, rIndex) => rIndex !== index);

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                });
            },
            checkAll: () => {
                if (__createReturnHeaderDetails.return.isCheckedAll()) {
                    let data = viewHeaderDetails?.filter(r => r.matchedColumnName.startsWith('order_'));
                    dispatchViewHeaderDetails({
                        type: 'SET_DATA',
                        payload: data
                    })
                } else {
                    let details = viewHeaderDetails?.filter(r => r.matchedColumnName.startsWith('order_'));
                    let checkedDetails = defaultHeaderDetails.filter(r => !r.matchedColumnName.startsWith('order_'));
                    let data = [...details, ...checkedDetails];
                    dispatchViewHeaderDetails({
                        type: 'SET_DATA',
                        payload: data
                    })
                }
            },
            checkOne: (selectedData) => {
                let data = [...viewHeaderDetails];
                let selectedMatchedColumnName = selectedData.matchedColumnName;

                if (__createReturnHeaderDetails.return.isCheckedOne(selectedMatchedColumnName)) {
                    data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
                } else {
                    data.push(selectedData);
                }

                dispatchViewHeaderDetails({
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
                    viewHeaderDetails,
                    result.source.index,
                    result.destination.index
                )

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: newHeaderDetails
                })
            },
            valueOfName: (e, index) => {
                let name = e.target.name;
                let value = e.target.value;

                let data = [...viewHeaderDetails];

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

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            }
        },
        return: {
            isCheckedAll: () => {
                if (viewHeaderDetails.length <= 0) {
                    return false;
                }

                let returnDefaultHeader = defaultHeaderDetails.filter(r => !r.matchedColumnName.startsWith('order_'));
                let result = viewHeaderDetails.filter(r => !r.matchedColumnName.startsWith('order_'));

                return result.length === returnDefaultHeader.length;
            },
            isCheckedOne: (matchedColumnName) => {
                return viewHeaderDetails.some(r => r.matchedColumnName === matchedColumnName);
            }
        }
    }

    const __createHeaderDetails = {
        action: {
            sortByDefault: () => {
                let data = [...viewHeaderDetails];
                data.sort(function (a, b) {
                    return a.cellNumber - b.cellNumber;
                });

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            },
            removeOne: (index) => {
                let data = [...viewHeaderDetails];

                data = data.filter((r, rIndex) => rIndex !== index);

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                });
            },
            checkAll: () => {
                if (__createHeaderDetails.return.isCheckedAll()) {
                    let data = viewHeaderDetails?.filter(r => !r.matchedColumnName.startsWith('order_'));
                    dispatchViewHeaderDetails({
                        type: 'SET_DATA',
                        payload: data
                    })
                } else {
                    let details = viewHeaderDetails?.filter(r => !r.matchedColumnName.startsWith('order_'));
                    let checkedDetails = defaultHeaderDetails.filter(r => r.matchedColumnName.startsWith('order_'));
                    let data = [...details, ...checkedDetails];
                    dispatchViewHeaderDetails({
                        type: 'SET_DATA',
                        payload: data
                    })
                }
            },
            checkOne: (selectedData) => {
                let data = [...viewHeaderDetails];
                let selectedMatchedColumnName = selectedData.matchedColumnName;

                if (__createHeaderDetails.return.isCheckedOne(selectedMatchedColumnName)) {
                    data = data.filter(r => r.matchedColumnName !== selectedMatchedColumnName);
                } else {
                    data.push(selectedData);
                }

                dispatchViewHeaderDetails({
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
                    viewHeaderDetails,
                    result.source.index,
                    result.destination.index
                )

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: newHeaderDetails
                })
            },
            valueOfName: (e, index) => {
                let name = e.target.name;
                let value = e.target.value;

                let data = [...viewHeaderDetails];

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

                dispatchViewHeaderDetails({
                    type: 'SET_DATA',
                    payload: data
                })
            }
        },
        return: {
            isCheckedAll: () => {
                if (viewHeaderDetails.length <= 0) {
                    return false;
                }

                let orderDefaultHeader = defaultHeaderDetails.filter(r => r.matchedColumnName.startsWith('order_'));
                let result = viewHeaderDetails.filter(r => r.matchedColumnName.startsWith('order_'));
                
                return result.length === orderDefaultHeader.length;
            },
            isCheckedOne: (matchedColumnName) => {
                return viewHeaderDetails.some(r => r.matchedColumnName === matchedColumnName);
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

                props._onAction_updateDefaultHeader();
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
            }
        },
        change: {
            selectedHeader: (e) => {
                e.preventDefault();
                let headerId = e.target.value;
                props._onAction_updateDefaultHeader(headerId);
            },
            createHeaderValue: (e) => {
                e.preventDefault();

                dispatchViewHeaderTitle({
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
                    onActionCloseModal={props._onAction_closeHeaderSettingModal}
                ></HeaderFieldView>
                <SelectorFieldView
                    viewHeaderList={props.viewHeaderList}
                    viewHeader={viewHeader}
                    createViewHeader={createViewHeader}

                    onChangeSelectedViewHeaderTitle={__viewHeader.change.selectedHeader}
                    onActionCreateViewHeader={__viewHeader.action.createHeader}
                    onActionDeleteSelectedViewHeader={__viewHeader.action.deleteOne}
                ></SelectorFieldView>
                {viewHeaderDetails &&
                    <>
                        <ViewHeaderInputFieldView
                            viewHeader={viewHeader}
                            viewHeaderTitle={viewHeaderTitle}

                            onChangeInputValue={__viewHeader.change.createHeaderValue}
                            onSubmitViewHeader={__createReturnHeaderDetails.submit.saveAndModify}
                        ></ViewHeaderInputFieldView>
                        <InfoTextFieldView
                            element={
                                <div>* 반품 현황에서 확인할 데이터 항목을 선택해주세요.</div>
                            }
                        ></InfoTextFieldView>
                        <TableOperatorFieldView
                            element={
                                <>
                                    <div className='default-header-title'>* 반품 기본 헤더</div>
                                    <CustomCheckbox
                                        checked={__createReturnHeaderDetails.return.isCheckedAll()}
                                        size={'20px'}
                                        label={'전체 선택'}
                                        labelSize={'16px'}

                                        onChange={() => __createReturnHeaderDetails.action.checkAll()}
                                    ></CustomCheckbox>
                                </>
                            }
                        ></TableOperatorFieldView>
                        <ReturnDefaultTableFieldView
                            defaultHeaderDetails={defaultHeaderDetails}
                            isCheckedOne={__createReturnHeaderDetails.return.isCheckedOne}

                            onActionCheckHeaderDetail={__createReturnHeaderDetails.action.checkOne}
                        ></ReturnDefaultTableFieldView>

                        <TableOperatorFieldView
                            element={
                                <>
                                    <div className='default-header-title'>* ERP 기본 헤더</div>
                                    <CustomCheckbox
                                        checked={__createHeaderDetails.return.isCheckedAll()}
                                        size={'20px'}
                                        label={'전체 선택'}
                                        labelSize={'16px'}

                                        onChange={() => __createHeaderDetails.action.checkAll()}
                                    ></CustomCheckbox>
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
                {viewHeaderDetails &&
                    <CreateTableFieldView
                        viewHeaderDetails={viewHeaderDetails}

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

const initialViewHeaderDetails = null;
const initialViewHeader = null;
const initialCreateViewHeader = null;
const initialViewHeaderTitle = null;

const viewHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewHeaderDetails;
        default: return initialViewHeaderDetails;
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

const viewHeaderTitleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewHeaderTitle;
        default: return initialViewHeaderTitle;
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
