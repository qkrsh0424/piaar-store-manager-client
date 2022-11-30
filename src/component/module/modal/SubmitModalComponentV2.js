import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { useDisabledButtonHook } from '../../../hooks/button-disabled/useDisabledButtonHook';
import PropTypes from 'prop-types';

const TitleBox = styled.div`
    padding: 10px 20px;

    .modal-title {
        font-size: 1.3rem;
        font-weight: 400;
        border-bottom: 1px solid #000;
        padding-bottom: 20px;
    }

    .header-close-button-box {
        display: flex;
        justify-content: flex-end;
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

const ElementBox = styled.div`
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    max-height: 70vh;
    overflow: auto;
    overflow-x: hidden;

    .data-wrapper-group {
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 992px) {
            flex-direction: column;
            gap: 20px;
            
            .data-wrapper {
                width: 90%;
            }
        }
    }

    .data-wrapper {
        margin: 0 20px;
        padding: 10px;
        flex: 1 1 0%;
        border-radius: 10px;
        overflow: hidden scroll;
        box-shadow: var(--defaultBoxShadow);
        background-color: white;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
`;

const ButtonBox = styled.div`
    .button-item{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        background: rgb(137, 145, 163);
        border: 1px solid #00000000;
        cursor: pointer;
        color: white;

        &.submit-btn {
            background-color: var(--piaar-main-color);
        }
    }
`;


/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth
 * @param {function} props._onSubmit
 * @param {function} props.onClose
 * @param {string} props.title
 * @param {string} props.element
 * @returns 
 */
const SubmitModalComponentV2 = ({ open, fullWidth, maxWidth, _onSubmit, onClose, title, element, ...props }) => {
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
                open={open ?? false}
                fullWidth={fullWidth ?? true}
                maxWidth={maxWidth || 'xs'}
                onClose={(e) => _onClose(e) || {}}
            >
                <div style={{ backgroundColor: 'var(--piaar-background-color)' }}>
                    <TitleBox>
                        <div className='header-close-button-box'>
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
                        <div className='modal-title'>{title || ''}</div>
                    </TitleBox>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <ElementBox>
                            {element || ''}
                        </ElementBox>
                        <ButtonWrapper>
                            <ButtonBox>
                                <button
                                    className='button-item'
                                    // style={{ color: '#d15120' }}
                                    onClick={(e) => _onClose(e) || {}}
                                >취소</button>
                            </ButtonBox>
                            <ButtonBox>
                                <button
                                    type='submit'
                                    className='button-item submit-btn'
                                    // style={{ color: '#2d7ed1' }}
                                    disabled={buttonDisabled}
                                >확인</button>
                            </ButtonBox>
                        </ButtonWrapper>
                    </form>
                </div>
            </Dialog>
        </>
    );
}

SubmitModalComponentV2.prototype = {
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    _onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    title: PropTypes.string,
    element: PropTypes.string
}
export default SubmitModalComponentV2;
