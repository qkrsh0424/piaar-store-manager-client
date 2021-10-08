import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from "react";
import {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const OptionContainer = styled.div`
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    margin-bottom: 10px;

    .close-button {
        float: right;
        top: -5px;
    }
`;

const DeliveryReadyReleaseMemoModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.__handleEventControl().deliveryReadyReleaseMemo().close()}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <OptionContainer>
                        <GroupTitle>출고메모
                            <IconButton aria-label="close" className="close-button" onClick={() => props.__handleEventControl().deliveryReadyReleaseMemo().close()}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>
                </OptionContainer>
            </Dialog>
        </>
    )
}

export default DeliveryReadyReleaseMemoModal;