import { Dialog } from "@material-ui/core";
import PropTypes from 'prop-types';

const SalesAnalysisCommonModal = (props) => {
    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.onClose()}
                maxWidth={props.maxWidth || 'xs'}
                fullWidth={props.fullWidth || true}
                disableEnforceFocus
            >
                {props.children}
            </Dialog>
        </>
    )
}

SalesAnalysisCommonModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool
}

export default SalesAnalysisCommonModal;