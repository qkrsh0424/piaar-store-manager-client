import { ViewHeaderInputFieldWrapper } from "./ViewHeaderSettingModal.styled";

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

export default function ViewHeaderInputFieldView(props) {
    return (
        <ViewHeaderInputFieldWrapper>
            <div className='view-header-title'>
                <div>뷰 헤더명 : </div>
                <div className='info-box'>
                    <div>
                        <input type='text'
                            name='headerTitle'
                            className='input-item'
                            value={props.viewHeaderTitle || ''}
                            onChange={props.onChangeInputValue}
                            placeholder='뷰 헤더 이름'
                            required
                        />
                    </div>
                    {props.viewHeader &&
                        <div>
                            {props.defaultHeader?.orderHeaderId === props.viewHeader.id ?
                                <button
                                    type='button'
                                    className='image-button-el'
                                >
                                    <img
                                        className='image-button-icon'
                                        src='/assets/icon/bookmark_black_icon.png'
                                        alt=""
                                    ></img>
                                </button>
                                :
                                <button
                                    type='button'
                                    className='image-button-el'
                                    onClick={props.onActionChangeDefaultHeader}
                                >
                                    <img
                                        className='image-button-icon'
                                        src='/assets/icon/bookmark_icon.png'
                                        alt=""
                                    ></img>
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
            <div>
                <Button
                    element={'저장'}
                    onClick={props.onSubmitViewHeader}
                ></Button>
            </div>
        </ViewHeaderInputFieldWrapper >
    );
}