import { useEffect, useReducer, useState } from "react";
import CombineOperators from "./CombineOperators.view";
import DownloadButtonFieldView from "./DownloadButtonField.view";
import InfoTextFieldView from "./InfoTextField.view";
import PreviewTableView from "./PreviewTable.view";
import { Container } from "./ReleaseListModal.styled";
import TitleView from "./Title.view";

const ReleaseListModalComponent = (props) => {
    const [releaseItemList, dispatchReleaseItemList] = useReducer(releaseItemListReducer, initialReleaseItemList);
    const [releaseUnitMergeYn, setReleaseUnitMergeYn] = useState(true);

    useEffect(() => {
        if(!props.checkedOrderItemList) {
            return;
        }

        _onAction_combineReleaseItemList();
    }, [props.checkedOrderItemList])

    const _onSet_releaseItemList = (data) => {
        let sortedData = data.sort((a, b) => {
            let code1 = a.releaseOptionCode;
            let code2 = b.releaseOptionCode;
            return code1 < code2 ? -1 : code1 > code2 ? 1 : 0;
        });

        // 출고 리스트에서 확인할 데이터만 추출
        let releaseInfo = sortedData.map(r => {
            let data = {
                releaseOptionCode: r.releaseOptionCode,
                prodDefaultName: r.prodDefaultName,
                optionDefaultName: r.optionDefaultName,
                unit: r.unit
            }
            return data;
        })

        return releaseInfo;
    }

    // 출고 항목 병합
    const _onAction_combineReleaseItemList = () => {
        let orderItemList = [];

        let data = _onSet_releaseItemList(props.checkedOrderItemList);

        data.forEach(r => {
            orderItemList.push({...r})
        });

        let s = new Set(); // 출고옵션코드 중복 체크를 위한 Set
        let dataList = []; // 최종 결과물을 저장할 공간

        orderItemList.forEach((r, index) => {
            let code = r.releaseOptionCode;

            if(!code) {
                dataList.push(r);
            }else{
                if ((!s.has(code))) {
                    s.add(code);
                    dataList.push(r);
                }else{
                    let duplicationData = dataList.pop();
                    duplicationData = {
                        ...duplicationData,
                        unit: parseInt(duplicationData.unit) + parseInt(r.unit)
                    }
                    dataList.push(duplicationData);
                }
            }
        })

        dispatchReleaseItemList({
            type: 'INIT_DATA',
            payload: dataList
        })
        setReleaseUnitMergeYn(true);
    }

    const _onAction_insulateReleaseItemList = () => {
        let data = [...props.checkedOrderItemList];
 
        let result = _onSet_releaseItemList(data);
        
        dispatchReleaseItemList({
            type: 'INIT_DATA',
            payload: result
        })
        setReleaseUnitMergeYn(false);
    }

    const onActionDownloadExcel = () => {
        props.onActionDownloadReleaseItemList(releaseItemList);
    }

    return (
        <>
            <Container>
                <TitleView
                    title={'출고 리스트'}
                ></TitleView>
                <CombineOperators
                    releaseUnitMergeYn={releaseUnitMergeYn}
                    
                    _onAction_combineReleaseItemList={_onAction_combineReleaseItemList}
                    _onAction_insulateReleaseItemList={_onAction_insulateReleaseItemList}
                ></CombineOperators>
                <InfoTextFieldView
                    element={
                        <div>* 병합 기준은 출고 옵션코드입니다.</div>
                    }
                ></InfoTextFieldView>
                {(releaseItemList?.length > 0) &&
                    <>
                        <PreviewTableView
                            releaseItemList={releaseItemList}
                        ></PreviewTableView>
                    </>
                }
                <DownloadButtonFieldView
                    onActionDownloadExcel={onActionDownloadExcel}
                ></DownloadButtonFieldView>
            </Container>
        </>
    )
}

export default ReleaseListModalComponent;

const initialReleaseItemList = null;

const releaseItemListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialReleaseItemList;
        default: return state;
    }
}