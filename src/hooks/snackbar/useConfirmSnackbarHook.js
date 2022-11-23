import React, { useState } from "react";
import ConfirmSnackbar from "../../component/module/snackbar/ConfirmSnackbar";
import styled from "styled-components";

const ButtonBox = styled.div`
    /* width: 100%; */

    .button-el {
        margin-left: 5px;
        width: 50px;
        border-radius: 3px;
        background-color: #455265;
        color: #fff;
        padding: 5px;
        transition: 0.15s;
        border: 1px solid #fff;
    }

    .confirm-button {
        background-color: #fff;
        color: #455265;
    }
`;

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open - [true, false]
 * @param {string} props.message
 * @param {function} props.onClose
 * @param {string} props.severity - [success, error, warning, info]
 * @param {string} props.vertical - [top, bottom]
 * @param {string} props.horizontal - [left, center, right]
 * @param {number} props.duration - [1000, 2000 ...] ms
 * @returns 
 */
function ConfirmSnackbarHookComponent({
    open,
    message,
    onClose,
    vertical,
    horizontal,
    onConfirm
}) {

    const _onConfirm = () => {
        onConfirm();
        onClose();
    }

    return (
        <ConfirmSnackbar
            open={open}
            onClose={onClose}
            message={message}
            vertical={vertical}
            horizontal={horizontal}
            action={
                <ButtonBox>
                    <button
                        className='button-el'
                        onClick={() => onClose()}
                    >
                        취소
                    </button>
                    <button
                        className='button-el confirm-button'
                        onClick={() => _onConfirm()}
                    >
                        확인
                    </button>
                </ButtonBox>
            }
        ></ConfirmSnackbar>
    );
}


const useConfirmSnackbarHook = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    /**
    * 
    * @param {String} message
    * @param {function} confirmAction
    */
    const onActionOpen = (message, confirmAction) => {
        setMessage(message || '');
        setOpen(true);
        
        if(typeof confirmAction === 'function') {
            setConfirmAction(confirmAction);
        }
    }

    const onActionClose = () => {
        setOpen(false);
        setMessage('');
    }

    return {
        open,
        message,
        confirmAction,
        onActionOpen: onActionOpen,
        onActionClose: onActionClose
    }
}
export { useConfirmSnackbarHook, ConfirmSnackbarHookComponent };