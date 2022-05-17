import Ripple from "../../../../module/button/Ripple";
import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import { ViewDetailSelectBox } from "./EditField.styled";

const ViewDetailSelectModal = (props) => {
    return (
        <>
            <ViewDetailSelectBox>
                <div className='grid-wrapper'>
                    {props.defaultHeaderList.map((r, index) => {
                        return (
                            <div
                                key={r.matchedColumnName}
                                className='cellName-box'
                            >
                                <CustomCheckbox
                                    label={r.originCellName || ''}
                                    checked={props.selectedHeaderDetail.viewDetails.some(s => s.matchedColumnName === r.matchedColumnName) || false}
                                    name={r.matchedColumnName}
                                    onChange={(e) => props.onActionSelectColumn(e)}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className='button-wrapper'>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onClose}
                    >
                        닫기
                    </button>
                    <button
                        type='button'
                        className='button-el'
                        onClick={props.onActionAddViewDetails}
                    >
                        설정
                    </button>
                </div>
            </ViewDetailSelectBox>
        </>
    );
}
export default ViewDetailSelectModal;