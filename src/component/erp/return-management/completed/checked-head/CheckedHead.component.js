import Ripple from "../../../../module/button/Ripple";
import { Container, TitleFieldWrapper } from "./CheckedHead.styled";

function TitleField({
    checkedReturnItemList,
    onActionCheckedReturnItemListAll
}) {
    return (
        <TitleFieldWrapper>
            <div className='title-box'>
                선택된 데이터 ({checkedReturnItemList?.length || 0})
            </div>
            <div className='button-box'>
                <button
                    type='button'
                    className='button-el'
                    onClick={onActionCheckedReturnItemListAll}
                >
                    전체 해제
                    <Ripple color={'#d1d1d1'} duration={1000}></Ripple>
                </button>
            </div>
        </TitleFieldWrapper>
    );
}

const CheckedHeadComponent = (props) => {
    return (
        <>
            <Container>
                <TitleField
                    checkedReturnItemList={props.checkedReturnItemList}
                    onActionCheckedReturnItemListAll={props._onAction_checkedReturnItemListAll}
                />
            </Container>
        </>
    );
}
export default CheckedHeadComponent;