import { useEffect, useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";
import { getEndDate, getStartDate, isSearchablePeriod } from "../../../../utils/dateFormatUtils";
import { Container } from "./ChannelSelector.styled";
import ButtonFieldView from "./view/ButtonField.view";
import CheckBoxFieldView from "./view/CheckBoxField.view";
import TextFieldView from "./view/TextField.view";

// 날짜검색 최대기간 90일
const SEARCHABLE_PERIOD = 90;

export default function ChannelSelectorComponent(props) {
    const [checkedChannel, setCheckedChannel] = useState([]);

    const {
        query,
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        __handle.action.checkedClear();
    }, [props.salesChannel])

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
            checkedClear: () => {
                setCheckedChannel([]);
                props.onActionUpdateSelectedChannel([]);
            }
        },
        submit: {
            searchChannelPerformance: (e) => {
                e.preventDefault();

                try{
                    if (query.startDate && !query.endDate) {
                        throw new Error('종료일 날짜를 선택해 주세요.')
                    }
    
                    if (!query.startDate && query.endDate) {
                        throw new Error('시작일 날짜를 선택해 주세요.')
                    }

                    if(!(query.startDate && query.endDate)) {
                        throw new Error('시작일과 종료일을 선택해 주세요.')
                    }
    
                    if ((query.endDate - query.startDate < 0)) {
                        throw new Error('조회기간을 정확히 선택해 주세요.')
                    }

                    if (!isSearchablePeriod(query.startDate, query.endDate, SEARCHABLE_PERIOD)) {
                        throw new Error('조회기간은 최대 90일까지 가능합니다.')
                    }

                    if(checkedChannel.length === 0) {
                        throw new Error('스토어를 1개 이상 선택해주세요.')
                    }
                } catch (err) {
                    let snackbarSetting = {
                        message: err?.message,
                        severity: 'error'
                    }
                    onActionOpenSnackbar(snackbarSetting);
                    return;
                }

                let startDate = query.startDate ? getStartDate(query.startDate) : null;
                let endDate = query.endDate ? getEndDate(query.endDate) : null;
                let dimension = 'date';
                let channel = checkedChannel.join(",");
    
                let params = {
                    startDate,
                    endDate,
                    dimension,
                    channel
                }

                props.onActionUpdateSelectedChannel(checkedChannel);
                props.onActionSearchChannelPerformance(params);
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

            <form onSubmit={(e) => __handle.submit.searchChannelPerformance(e)}>
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
