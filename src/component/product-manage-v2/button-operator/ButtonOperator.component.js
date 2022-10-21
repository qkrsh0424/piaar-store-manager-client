import { useEffect, useState } from "react";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import ControlFieldView from "./ControlField.view";
import useRouterHook from "../../../hooks/router/useRouterHook";

const ButtonOperatorComponent = (props) => {
    const [sortByName, setSortByName] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

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

                setSortByName(newSortBy)
                setSortBy(sortByValue);
                setSortDirection(newSortDirection);

                query.sortBy = sortByValue;
                query.sortDirection = newSortDirection;

                navigateParams({ replace: true })
            }
        }
    }

    return (
        <Container>
            <ControlFieldView />
            
            <SortButtonFieldView
                sortByName={sortByName}
                onChangeSortBy={__handle.action.changeSortByAndSortDirection}
            />
        </Container>
    )
}

export default ButtonOperatorComponent;
