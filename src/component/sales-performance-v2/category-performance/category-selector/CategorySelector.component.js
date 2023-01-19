import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { Container } from "./CategorySelector.styled";
import CheckBoxControlView from "./view/CheckBoxControl.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function CategorySelectorComponent(props) {
    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    return (
        <Container>
            <TextFieldView />

            <CheckBoxControlView
                onActionCheckAll={props.onActionCheckAll}
                onActionCheckCancelAll={props.onActionCheckCancelAll}
            />

            <CheckBoxFieldView
                category={props.category}
                onActionIsCheckedOne={props.onActionIsCheckedOne}
                onActionCheckOne={props.onActionCheckOne}
            />

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponentV2
                    open={snackbarOpen}
                    message={snackbarMessage}
                    onClose={onActionCloseSnackbar}
                    severity={snackbarSeverity}
                    vertical={'top'}
                    horizontal={'right'}
                    duration={4000}
                ></BasicSnackbarHookComponentV2>
            }
        </Container>
    )
}
