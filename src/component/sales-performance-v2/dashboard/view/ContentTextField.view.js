import { ContentTextFieldWrapper } from "../Dashboard.styled";

export default function ContentTextFieldView () {
    return (
        <ContentTextFieldWrapper>
            <div className='vertical-box'>
                <div className='vertical-box-info'>어제</div>
            </div>
            <div className='vertical-box'>
                <div className='vertical-box-info'>오늘</div>
            </div>
        </ContentTextFieldWrapper>
    )
}