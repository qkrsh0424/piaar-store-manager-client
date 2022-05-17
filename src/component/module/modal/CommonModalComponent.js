import { Dialog } from '@mui/material';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomDialog = styled(Dialog)`
    .MuiPaper-root::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .MuiPaper-root::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .MuiPaper-root::-webkit-scrollbar-thumb{
        background-color: #00000020;
        border-radius: 10px;
    }
`;

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth
 * @param {function} props.onClose
 * @returns 
 */
const CommonModalComponent = (props) => {
    return (
        <>
            <CustomDialog
                open={props.open ?? false}
                fullWidth={props.fullWidth ?? true}
                maxWidth={props.maxWidth ?? 'xs'}
                onClose={() => props.onClose() ?? {}}
                disableEnforceFocus
            >
                {props.children}
            </CustomDialog>
        </>
    );
}

CommonModalComponent.prototype = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool
}
export default CommonModalComponent;