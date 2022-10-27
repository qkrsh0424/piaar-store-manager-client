import { useEffect, useState } from "react";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import ControlFieldView from "./ControlField.view";
import useRouterHook from "../../../hooks/router/useRouterHook";
import CreateProductReceiveModalComponent from "../modal/create-product-receive-modal/CreateProductReceiveModal.component";
import CreateProductReleaseModalComponent from "../modal/create-product-release-modal/CreateProductReleaseModal.component";
import SearchProductReceiveAndReleaseModalComponent from "../modal/search-product-receive-and-release-modal/SearchProductReceiveAndReleaseModal.component";

const ButtonOperatorComponent = (props) => {
    const [sortByName, setSortByName] = useState(null);

    const [createProductReceiveModalOpen, setCreateProductReceiveModalOpen] = useState(false);
    const [createReceiveData, setCreateReceiveData] = useState(null);

    const [createProductReleaseModalOpen, setCreateProductReleaseModalOpen] = useState(false);
    const [createReleaseData, setCreateReleaseData] = useState(null);

    const [searchProductReceiveAndReleaseModalOpen, setSearchProductReceiveAndReleaseModalOpen] = useState(false);

    const {
        location,
        query,
        navigateUrl,
        navigateParams
    } = useRouterHook();

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

                let startDate = new Date();
                let endDate = new Date();
                props.onActionSearchProductReceiveAndRelease({startDate, endDate});
                
                setSearchProductReceiveAndReleaseModalOpen(true);
            },
            closeSearchProductReceiveAndReleaseModal: () => {
                setSearchProductReceiveAndReleaseModalOpen(false);
            },
            routeProductCreatePage: () => {
                let data = {
                    pathname: '/products/create',
                    state: {
                        routerUrl: location.pathname + location.search
                    }
                }
                navigateUrl(data);
            }
        },
        submit: {
            createProductReceive: (data) => {
                if(window.confirm('입고등록을 진행하시겠습니까?')) {
                    props.onSubmitCreateProductReceive(data);
                    __handle.action.closeCreateProductReceiveModal();
                }
            },
            createProductRelease: (data) => {
                if (window.confirm('출고등록을 진행하시겠습니까?')) {
                    props.onSubmitCreateProductRelease(data);
                    __handle.action.closeCreateProductReleaseModal();
                }
            }
        }
    }

    return (
        <Container>
            <ControlFieldView 
                onActionRouteProductCreatePage={__handle.action.routeProductCreatePage}
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
                    onActionCloseModal={__handle.action.closeCreateProductReceiveModal}
                    onSubmitCreateProductReceive={__handle.submit.createProductReceive}

                    createReceiveData={createReceiveData}
                />
            }

            {/* Create ProductRelease Modal */}
            {createProductReleaseModalOpen && 
                <CreateProductReleaseModalComponent 
                    modalOpen={createProductReleaseModalOpen}
                    onActionCloseModal={__handle.action.closeCreateProductReleaseModal}
                    onSubmitCreateProductRelease={__handle.submit.createProductRelease}

                    createReleaseData={createReleaseData}
                />
            }

            {/* Search ProductReceive And Release Modal */}
            {searchProductReceiveAndReleaseModalOpen && 
                <SearchProductReceiveAndReleaseModalComponent
                    modalOpen={searchProductReceiveAndReleaseModalOpen}
                    onActionCloseModal={__handle.action.closeSearchProductReceiveAndReleaseModal}
                    onActionSearchProductReceiveAndRelease={props.onActionSearchProductReceiveAndRelease}

                    optionReceiveStatus={props.optionReceiveStatus}
                    optionReleaseStatus={props.optionReleaseStatus}
                />
            }
        </Container>
    )
}

export default ButtonOperatorComponent;
