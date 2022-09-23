import Ripple from "../../../../module/button/Ripple";
import { HeaderFieldWrapper } from "./Header.styled";

export default function HeaderFieldView(props) {
    return (
        <HeaderFieldWrapper>
            <div className='common-box'>
                <div className='title'>반품 수거완료</div>
            </div>
            <div className='common-box'>
                <div
                    className='button-el'
                    onClick={props.onActionOpenHeaderSettingModal}
                >
                    뷰 헤더 설정
                    <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                </div>
            </div>
        </HeaderFieldWrapper>
    );
}