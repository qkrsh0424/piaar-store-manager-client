import React, { useState } from "react";
import BasicSnackbarV2 from "../../component/module/snackbar/BasicSnackbarV2";

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
function BasicSnackbarHookComponentV2({
    open,
    message,
    onClose,
    severity,
    vertical,
    horizontal,
    duration
}) {
    return (
        <BasicSnackbarV2
            open={open}
            onClose={onClose}
            message={message}
            severity={severity}
            vertical={vertical}
            horizontal={horizontal}
            duration={duration}
        ></BasicSnackbarV2>
    );
}

const useBasicSnackbarHookV2 = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const onActionOpen = (data) => {
        setOpen(true);
        setMessage(data.message || '');
        setSeverity(data.severity || '');
    }

    const onActionClose = () => {
        setOpen(false);
        setMessage('');
    }
    
    return {
        open,
        message,
        severity,
        onActionOpen: onActionOpen,
        onActionClose: onActionClose
    }
}
export { useBasicSnackbarHookV2, BasicSnackbarHookComponentV2 };
