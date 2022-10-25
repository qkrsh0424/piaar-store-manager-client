import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { useDisabledButtonHook } from '../../../hooks/button-disabled/useDisabledButtonHook';

const Container = styled.div`

`;

const TitleBox = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .modal-title {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .button-el {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        padding: 0;

        border: none;
        background-color: inherit;
        border-radius: 50%;

        cursor: pointer;

        :hover {
            transition: 0.3s;
            background-color: #efefef;
        }
    }
`;

const MessageBox = styled.div`
    padding: 20px 10px 10px 10px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    
    .info-text {
        color: var(--erp-main-color);
        text-align: left;
        padding: 0 10px;
        font-size: 12px;
    }

    .highlight{
        display: inline-block;
        position:relative;
        font-weight: 800;
        color: #006dff;
    }

    .highlight:after{
        content:"";
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: 10px;
        display: inline-block;
        background: #b9c2e160;
    }

    .info-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 40px;
    }

    .info-box {
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .input-title {
        text-align: left;
        width: 140px;
    }

    .text-input {
        margin: 0 10px;
        width: 250px;
        height: 100px;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        font-size: 14px;
        box-sizing: border-box;
        resize: both;
    }

    .input-value input {
        width: 250px;
        height: 40px;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        font-size: 14px;
    }

    .select-item{
        margin: 0 10px;
        width: 250px;
        height: 45px;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/assets/icon/down_arrow_gray_icon.png') no-repeat right 5px center;

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
            margin: 10px 0 0 0;
        }
    }

    .receive-memo {
        padding: 15px;
        font-size: 14px;
        display: grid;
        width: 100%;
        grid-template-columns: 100px auto;
        align-items: center;

        .form-title {
            padding: 10px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
        }

        input {
            height: 30px;
            border: 1px solid #bdbdbd;
            padding: 10px;
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 3px;
        }
    }

    .upload-box {
        width: 250px;
        display: flex;
        align-items: center;
        gap: 10px;

        input {
            display: none;
        }
    }

    .button-el {
        border: 1px solid var(--erp-main-color);
        background-color: var(--erp-main-color);
        color: white;
        padding: 5px 10px;
        font-weight: 600;
        width: 100%;
    }

    .memo-box {
        padding: 15px;
        font-size: 14px;
        display: grid;
        width: 100%;
        grid-template-columns: 100px auto;
        align-items: center;

        .form-title {
            padding: 10px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
        }

        input {
            height: 30px;
            border: 1px solid #bdbdbd;
            padding: 10px;
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 3px;
        }
    }
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const ButtonBox = styled.div`
    .button-item{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: white;
        border: 1px solid #00000000;
        cursor: pointer;

        &:hover{
            background:#e1e1e160;
        }
    }
`;

const SubmitModalComponentV2 = ({ open, fullWidth, maxWidth, _onSubmit, onClose, title, message, ...props }) => {
    const [buttonDisabled, setButtonDisabled] = useDisabledButtonHook(false);

    const _onClose = (e) => {
        e.preventDefault();
        onClose(e);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setButtonDisabled(true);
        await _onSubmit(e);
    }

    return (
        <>
            <Dialog
                open={open || false}
                fullWidth={fullWidth || true}
                maxWidth={maxWidth || 'xs'}
                onClose={(e) => _onClose(e) || {}}
            >
                <TitleBox>
                    <div className='modal-title'>{title || ''}</div>
                    <div>
                        <button
                            type='button'
                            className='button-el'
                            onClick={(e) => _onClose(e) || {}}
                        >
                            <img
                                src='/assets/icon/close_default_000000.svg'
                                style={{ width: '30px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                alt=""
                                loading='lazy'
                            ></img>
                        </button>
                    </div>
                    
                </TitleBox>
                <MessageBox>
                    {message || ''}
                </MessageBox>
                <form onSubmit={(e) => onSubmit(e)}>
                    <ButtonWrapper>
                        <ButtonBox>
                            <button
                                className='button-item'
                                style={{ color: '#d15120' }}
                                onClick={(e) => _onClose(e) || {}}
                            >취소</button>
                        </ButtonBox>
                        <ButtonBox>
                            <button
                                type='submit'
                                className='button-item'
                                style={{ color: '#2d7ed1' }}
                                disabled={buttonDisabled}
                            >확인</button>
                        </ButtonBox>
                    </ButtonWrapper>
                </form>
            </Dialog>
        </>
    );
}
export default SubmitModalComponentV2;
