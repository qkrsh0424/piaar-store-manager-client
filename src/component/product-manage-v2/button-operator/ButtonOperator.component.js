import { useEffect, useState } from "react";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import ControlFieldView from "./ControlField.view";
import useRouterHook from "../../../hooks/router/useRouterHook";
import CreateProductReceiveModalComponent from "../modal/create-product-receive/CreateProductReceiveModal.component";

const ButtonOperatorComponent = (props) => {
    const [sortByName, setSortByName] = useState(null);

    const [createProductReceiveModalOpen, setCreateProductReceiveModalOpen] = useState(false);
    const [createReceiveData, setCreateReceiveData] = useState(null);

    const {
        query,
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
            }
        },
        submit: {
            createProductReceive: (data) => {
                props.onSubmitCreateProductReceive(data);
                __handle.action.closeCreateProductReceiveModal();
            }
        }
    }

    return (
        <Container>
            <ControlFieldView 
                onActionOpenCreateProductReceiveModal={__handle.action.openCreateProductReceiveModal}
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
        </Container>
    )
}

export default ButtonOperatorComponent;
