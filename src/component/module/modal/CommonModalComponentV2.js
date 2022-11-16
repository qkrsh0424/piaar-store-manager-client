import { Dialog } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleBox = styled.div`
    padding: 10px 20px;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */

    .modal-title {
        font-size: 1.3rem;
        font-weight: 600;
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
    margin: 10px 0 20px 0;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    max-height: 70vh;
    overflow: auto;

    .data-wrapper-group {
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 992px) {
            flex-direction: column;

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

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth
 * @param {function} props.onClose
 * @param {string} props.title
 * @param {string} props.element
 * @returns 
 */
const CommonModalComponentV2 = ({ open, fullWidth, maxWidth, onClose, title, element, ...props }) => {
    
    const _onClose = (e) => {
        e.preventDefault();
        onClose(e);
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
                    {title &&
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
                    }
                    <ElementBox>
                        {element || ''}
                    </ElementBox>
                </div>
            </Dialog>
        </>
    );
}

CommonModalComponentV2.prototype = {
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func,
    title: PropTypes.string,
    element: PropTypes.string
}

export default CommonModalComponentV2;