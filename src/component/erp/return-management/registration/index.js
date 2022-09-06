import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from 'query-string';
import { getEndDate, getStartDate } from "../../../../utils/dateFormatUtils";
import HeaderComponent from "./header/Header.component";
import ReturnItemTableComponent from "./return-item-table/ReturnItemTable.component";
import SearchOperatorComponent from "./search-operator/SearchOperator.component";
import { useReducer, useState } from "react";
import { erpReturnItemDataConnect } from "../../../../data_connect/erpReturnItemDataConnect";
import { getReturnDefaultHeaderDetails } from "../../../../static-data/erpReturnItemStaticData";
import { useEffect } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import CommonModalComponent from "../../../module/modal/CommonModalComponent";
import ViewHeaderSettingModalComponent from "./view-header-setting-modal-v3/ViewHeaderSettingModal.component";

const Container = styled.div`
    margin-bottom: 100px;
`;

const DEFAULT_HEADER_FIELDS = getReturnDefaultHeaderDetails();

const RegistrationComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const [returnItemPage, dispatchReturnItemPage] = useReducer(returnItemPageReducer, initialReturnItemPage);
    const [viewHeader, dispatchViewHeader] = useReducer(viewHeaderReducer, initialViewHeader);

    const [headerSettingModalOpen, setHeaderSettingModalOpen] = useState(false);

    const __reqSearchReturnItemList = async () => {
        let startDate = query.startDate ? getStartDate(query.startDate) : null;
        let endDate = query.endDate ? getEndDate(query.endDate) : null;
        let searchColumnName = query.searchColumnName || null;
        let searchQuery = query.searchQuery || null;
        let periodType = query.periodType || null;
        let page = query.page || null;
        let size = query.size || null;
        let sortBy = query.sortBy || null;
        let sortDirection = query.sortDirection || null;
        // let sort = sortFormatUtils().getSortWithSortElements(DEFAULT_HEADER_FIELDS, sortBy, sortDirection);
        let sort = null;
        let matchedCode = query.matchedCode || null;

        let params = {
            salesYn: 'n',
            releaseYn: 'n',
            startDate: startDate,
            endDate: endDate,
            periodType: periodType,
            searchColumnName: searchColumnName,
            searchQuery: searchQuery,
            page: page,
            size: size,
            sort: sort,
            matchedCode: matchedCode
        }

        await erpReturnItemDataConnect().searchBatchByPage(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchReturnItemPage({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    useEffect(() => {
      async function fetchInit() {
        onActionOpenBackdrop();
        await __reqSearchReturnItemList();
        onActionCloseBackdrop();
      }

      fetchInit();
    }, [location])

    const _onAction_openHeaderSettingModal = () => {
        setHeaderSettingModalOpen(true);
    }

    const _onAction_closeHeaderSettingModal = () => {
        setHeaderSettingModalOpen(false);
    }

    return (
        <>
        {/* TODO :: 소켓통신 설정해야 함 */}
            {/* {connected && */}
                <Container>
                    <HeaderComponent
                        _onAction_openHeaderSettingModal={_onAction_openHeaderSettingModal}
                    ></HeaderComponent>
                    <SearchOperatorComponent
                        viewHeader={viewHeader}
                    ></SearchOperatorComponent>
                    <ReturnItemTableComponent
                        viewHeader={viewHeader}
                        returnItemList={returnItemPage?.content}
                        
                    ></ReturnItemTableComponent>
                </Container>
            {/* } */}

            {/* Modal */}
            <CommonModalComponent
                open={headerSettingModalOpen}
                maxWidth={'lg'}

                onClose={_onAction_closeHeaderSettingModal}
            >
                <ViewHeaderSettingModalComponent
                    viewHeader={viewHeader}
                    // viewHeaderList={viewHeaderList}

                    // _onSubmit_createViewHeader={_onSubmit_createViewHeader}
                    // _onSubmit_modifyViewHeader={_onSubmit_modifyViewHeader}
                    _onAction_closeHeaderSettingModal={_onAction_closeHeaderSettingModal}
                    // _onAction_deleteSelectedViewHeader={_onAction_deleteSelectedViewHeader}

                    // _onAction_updateDefaultHeader={_onAction_updateDefaultHeader}
                ></ViewHeaderSettingModalComponent>
            </CommonModalComponent>

            {/* Backdrop */}
            <BackdropHookComponent
                open={backdropOpen}
            />
        </>
    )
}

export default RegistrationComponent;

const initialViewHeader = DEFAULT_HEADER_FIELDS;
const initialReturnItemPage = null;

const returnItemPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return initialReturnItemPage;
    }
}

const viewHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialViewHeader;
        default: return initialViewHeader;
    }
}
