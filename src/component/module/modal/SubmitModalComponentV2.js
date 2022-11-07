import { Dialog } from '@mui/material';
import styled from 'styled-components';
import { useDisabledButtonHook } from '../../../hooks/button-disabled/useDisabledButtonHook';
import PropTypes from 'prop-types';

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

const ElementBox = styled.div`
    padding: 20px 10px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
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
                <form onSubmit={(e) => onSubmit(e)}>
                    <ElementBox>
                        {element || ''}
                    </ElementBox>
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
