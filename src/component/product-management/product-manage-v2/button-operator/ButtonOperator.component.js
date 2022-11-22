import { useEffect, useState } from "react";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import ControlFieldView from "./ControlField.view";
import useRouterHook from "../../../../hooks/router/useRouterHook";
import CreateProductReceiveModalComponent from "../modal/create-product-receive-modal/CreateProductReceiveModal.component";
import CreateProductReleaseModalComponent from "../modal/create-product-release-modal/CreateProductReleaseModal.component";
import SearchProductReceiveAndReleaseModalComponent from "../modal/search-product-receive-and-release-modal-v2/SearchProductReceiveAndReleaseModal.component";
import { BasicSnackbarHookComponentV2, useBasicSnackbarHookV2 } from "../../../../hooks/snackbar/useBasicSnackbarHookV2";

const ButtonOperatorComponent = (props) => {
    const [sortByName, setSortByName] = useState(null);

    const [createProductReceiveModalOpen, setCreateProductReceiveModalOpen] = useState(false);
    const [createReceiveData, setCreateReceiveData] = useState(null);

    const [createProductReleaseModalOpen, setCreateProductReleaseModalOpen] = useState(false);
    const [createReleaseData, setCreateReleaseData] = useState(null);

    const [searchProductReceiveAndReleaseModalOpen, setSearchProductReceiveAndReleaseModalOpen] = useState(false);

    const {
        query,
        navigateParams
    } = useRouterHook();

    const {
        open: snackbarOpen,
        message: snackbarMessage,
        severity: snackbarSeverity,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar,
    } = useBasicSnackbarHookV2();

    useEffect(() => {
        let sortBy = query.sortBy;
        let sortDirection = query.sortDirection;

        let sortByName = sortDirection + "_" + sortBy;
        setSortByName(sortByName);
    }, [])

    const __handle = {
        action: {
            changeSortByAndSortDirection: (e) => {
                let newSortBy = e.target.value;
                let newSortDirection = 'asc';
                let sortByValue = newSortBy.replace('asc_', '');

                if (newSortBy.startsWith("desc_")) {
                    sortByValue = newSortBy.replace('desc_', '');
                    newSortDirection = 'desc';
                }

                setSortByName(newSortBy);

                query.sortBy = sortByValue;
                query.sortDirection = newSortDirection;

                navigateParams({ replace: true })
            },
            openCreateProductReceiveModal: () => {
                if(props.checkedOptionIdList.length === 0) {
                    alert('입고 등록할 상품을 먼저 선택해주세요.');
                    return;
                }

                let receiveData = [];
                props.productManagementList.forEach(r => {
                    r.options.forEach(option => {
                        if(props.checkedOptionIdList.includes(option.id)) {
                            let data = {
                                product: r.product,
                                option: option,
                                memo: '',
                                receiveUnit: 0
                            }
                            receiveData.push(data);
                        }
                    })
                })

                setCreateReceiveData(receiveData);
                setCreateProductReceiveModalOpen(true);
            },
            closeCreateProductReceiveModal: () => {
                setCreateProductReceiveModalOpen(false);
            },
            openCreateProductReleaseModal: () => {
                if(props.checkedOptionIdList.length === 0) {
                    alert('출고 등록할 상품을 먼저 선택해주세요.');
                    return;
                }

                let releaseData = [];
                props.productManagementList.forEach(r => {
                    r.options.forEach(option => {
                        if(props.checkedOptionIdList.includes(option.id)) {
                            let data = {
                                product: r.product,
                                option: option,
                                memo: '',
                                releaseUnit: 0
                            }
                            releaseData.push(data);
                        }
                    })
                })

                setCreateReleaseData(releaseData);
                setCreateProductReleaseModalOpen(true);
            },
            closeCreateProductReleaseModal: () => {
                setCreateProductReleaseModalOpen(false);
            },
            openSearchProductReceiveAndReleaseModal: () => {
                if(props.checkedOptionIdList.length === 0) {
                    alert('입출고현황을 확인할 상품을 먼저 선택해주세요.');
                    return;
                }

                setSearchProductReceiveAndReleaseModalOpen(true);
            },
            closeSearchProductReceiveAndReleaseModal: () => {
                setSearchProductReceiveAndReleaseModalOpen(false);
            },
            openSnackbar: (snackbarSetting) => {
                onActionOpenSnackbar(snackbarSetting);
            }
        }
    }

    return (
        <Container>
            <ControlFieldView
                onActionOpenCreateProductReceiveModal={__handle.action.openCreateProductReceiveModal}
                onActionOpenCreateProductReleaseModal={__handle.action.openCreateProductReleaseModal}
                onActionOpenSearchProductReceiveAndReleaseModal={__handle.action.openSearchProductReceiveAndReleaseModal}
            />
            
            <SortButtonFieldView
                sortByName={sortByName}
                onChangeSortBy={__handle.action.changeSortByAndSortDirection}
            />

            {/* Create ProductReceive Modal */}
            {createProductReceiveModalOpen &&
                <CreateProductReceiveModalComponent
                    modalOpen={createProductReceiveModalOpen}
                    createReceiveData={createReceiveData}
                    
                    onActionCloseModal={__handle.action.closeCreateProductReceiveModal}
                    reqSearchProductAndOptionList={props.reqSearchProductAndOptionList}
                    onActionOpenSnackbar={__handle.action.openSnackbar}
                />
            }

            {/* Create ProductRelease Modal */}
            {createProductReleaseModalOpen && 
                <CreateProductReleaseModalComponent 
                    modalOpen={createProductReleaseModalOpen}
                    createReleaseData={createReleaseData}
                    
                    onActionCloseModal={__handle.action.closeCreateProductReleaseModal}
                    reqSearchProductAndOptionList={props.reqSearchProductAndOptionList}
                    onActionOpenSnackbar={__handle.action.openSnackbar}
                />
            }

            {/* Search ProductReceive And Release Modal */}
            {searchProductReceiveAndReleaseModalOpen && 
                <SearchProductReceiveAndReleaseModalComponent
                    modalOpen={searchProductReceiveAndReleaseModalOpen}
                    checkedOptionIdList={props.checkedOptionIdList}
                    onActionCloseModal={__handle.action.closeSearchProductReceiveAndReleaseModal}

                    optionReceiveStatus={props.optionReceiveStatus}
                    optionReleaseStatus={props.optionReleaseStatus}
                />
            }

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

export default ButtonOperatorComponent;
