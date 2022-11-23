import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import { Grow } from '@mui/material';

const Container = styled.div`
    ${props => {
        let bgColor = '#455265';
        let color = '#fff'

        return css`
            & .MuiSnackbarContent-root{
                background-color:${bgColor};
            }

            & .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root {
                flex-direction: column;
                color: ${color};
                font-size: 16px;
            }
        `;
    }}

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
const ConfirmSnackbar = ({
    open,
    message,
    onClose,
    vertical,
    horizontal,
    action
}) => {

    return (
        <>
            <Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: vertical || 'top',
                        horizontal: horizontal || 'center'
                    }}
                    open={open || false}
                    onClose={onClose instanceof Function ? () => onClose() : () => { }}
                    message={message || 'no message'}
                    key={(vertical || 'top') + (horizontal || 'center')}
                    action={action}
                    TransitionComponent={props => 
                        <Grow {...props}/>
                    }
                />
            </Container>
        </>
    );

}

export default ConfirmSnackbar;