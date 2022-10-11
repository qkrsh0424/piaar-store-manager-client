import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import HeaderFieldView from "./HeaderField.view";
import InfoTextFieldView from "./InfoTextField.view";
import TableOperatorFieldView from "./TableOperatorField.view";
import DefaultTableFieldView from './DefaultTableField.view'
import { Container } from "./ViewHeaderSettingModal.styled";
import { getDefaultHeaderDetails } from "../../../../../static-data/erp/staticData";
import { useEffect, useReducer } from "react";
import CreateTableFieldView from "./CreateTableField.view";
import _ from "lodash";
import valueUtils from "../../../../../utils/valueUtils";

const defaultHeaderDetails = getDefaultHeaderDetails();

const ViewHeaderSettingModalComponent = (props) => {
    const [createHeaderDetails, dispatchCreateHeaderDetails] = useReducer(createHeaderDetailsReducer, initialCreateHeaderDetails);

    useEffect(() => {
        if (!props.viewHeader) {
            return;
        }

        dispatchCreateHeaderDetails({
            type: 'SET_DATA',
            payload: _.cloneDeep(props.viewHeader.headerDetail.details)
        })
    }, [props.viewHeader]);

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

                props._onSubmit_saveAndModifyViewHeader(createHeaderDetails);
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
                        type: 'CLEAR'
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
    return (
        <>
            <Container>
                <HeaderFieldView
                    onSubmitSaveAndModify={__createHeaderDetails.submit.saveAndModify}
                ></HeaderFieldView>
                <InfoTextFieldView
                    element={
                        <div>* 주문 현황에서 확인할 데이터 항목을 선택해주세요.</div>
                    }
                ></InfoTextFieldView>
                <TableOperatorFieldView
                    element={
                        <CustomCheckbox
                            checked={__createHeaderDetails.return.isCheckedAll()}
                            size={'20px'}
                            label={'전체 선택'}
                            labelSize={'16px'}

                            onChange={() => __createHeaderDetails.action.checkAll()}
                        ></CustomCheckbox>
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
                {(createHeaderDetails && createHeaderDetails.length > 0) &&
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

const initialCreateHeaderDetails = [];

const createHeaderDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}