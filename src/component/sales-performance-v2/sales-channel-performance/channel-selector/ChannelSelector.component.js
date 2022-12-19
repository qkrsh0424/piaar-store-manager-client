import { useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { Container } from "./ChannelSelector.styled";
import ButtonFieldView from "./view/ButtonField.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

export default function ChannelSelectorComponent(props) {
    const [checkedChannel, setCheckedChannel] = useState([]);

    const {
        location,
        query,
        navigateParams,
        navigateClearParams
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    const __handle = {
        action: {
            isCheckedOne: (channel) => {
                return checkedChannel.some(name => name === channel);
            },
            checkOne: (e, channel) => {
                e.stopPropagation();

                let data = [...checkedChannel];
                let selectedChannel = channel;

                if(checkedChannel.some(name => name === selectedChannel)) {
                    data = data.filter(name => name !== selectedChannel);
                } else {
                    data.push(selectedChannel);
                }

                setCheckedChannel(data);
            },
            checkedClear: (e) => {
                e.stopPropagation();

                setCheckedChannel([]);
            }
        }
    }

    return (
        <Container>
            <TextFieldView
            
            />

            <CheckBoxFieldView
                salesChannel={props.salesChannel}
                onActionIsCheckedOne={__handle.action.isCheckedOne}
                onActionCheckOne={__handle.action.checkOne}
            />

            <form >
                <ButtonFieldView
                    onActionClearRoute={__handle.action.checkedClear}
                />
            </form>

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
