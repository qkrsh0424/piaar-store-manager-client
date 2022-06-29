import { DefaultTableFieldWrapper } from "./ViewHeaderSettingModal.styled";

export default function DefaultTableFieldView(props) {
    return (
        <DefaultTableFieldWrapper>
            <div className='grid-wrapper'>
                {props.defaultHeaderDetails.map(r => {
                    let isChecked = props.isCheckedOne(r.matchedColumnName);
                    return (
                        <div
                            key={r.matchedColumnName}
                            className='grid-item'
                            style={{
                                background: isChecked && '#2c73d240',
                                fontWeight: isChecked && 600
                            }}
                            onClick={() => props.onActionCheckHeaderDetail(r)}
                        >
                            {r.originCellName}
                        </div>
                    );
                })}
            </div>
        </DefaultTableFieldWrapper >
    );
}