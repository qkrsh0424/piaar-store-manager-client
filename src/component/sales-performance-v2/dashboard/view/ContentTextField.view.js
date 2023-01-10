import { ContentTextFieldWrapper } from "../Dashboard.styled";

export default function ContentTextFieldView() {
    return (
        <ContentTextFieldWrapper>
            <div className='text-box'>
                <div className='vertical-box'>
                    <div className='vertical-box-info'>어제</div>
                </div>
                <div className='vertical-box'>
                    <div className='vertical-box-info'>오늘</div>
                </div>
            </div>

            <div className="text-icon-box">
                <div>
                    <span><i className="icon-box" aria-label="어제" style={{ backgroundColor: '#ffae4c' }} /> </span>
                    <span>어제</span>
                </div>
                <div>
                    <span><i className="icon-box" aria-label="오늘" style={{ backgroundColor: 'var(--piaar-main-color)' }} /> </span>
                    <span>오늘</span>
                </div>
            </div>
        </ContentTextFieldWrapper>
    )
}