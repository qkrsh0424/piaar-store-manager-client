import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import { Grow } from '@mui/material';

const Container = styled.div`
    ${props => {
        let severity = props.severity;
        let bgColor = '#323232';
        let color = '#fff'

        switch (severity) {
            case 'success':
                bgColor = '#4caf50';
                break;
            case 'error':
                bgColor = '#ff545c';
                break;
            case 'warning':
                bgColor = '#ff9800';
                break;
            case 'info':
                bgColor = '#455265';
                break;
            default:
                bgColor = '#323232';
                break;
        }

        return css`
            & .MuiSnackbarContent-root{
                background-color:${bgColor};
            }

            & .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root {
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
const BasicSnackbarV2 = ({
    open,
    message,
    onClose,
    severity,
    vertical,
    horizontal,
    duration,
}) => {
    return (
        <>
            <Container
                severity={severity || null}
            >
                <Snackbar
                    anchorOrigin={{
                        vertical: vertical || 'top',
                        horizontal: horizontal || 'center'
                    }}
                    open={open || false}
                    onClose={onClose instanceof Function ? () => onClose() : () => { }}
                    message={message || 'no message'}
                    autoHideDuration={duration || 4000}
                    key={(vertical || 'top') + (horizontal || 'center')}
                    TransitionComponent={(props) => <Grow {...props}/>}
                    
                />
            </Container>
        </>
    );

}

export default BasicSnackbarV2;