import { useReducer } from "react";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import ControlFieldView from "./ControlField.view";
import useRouterHook from "../../../hooks/router/useRouterHook";

const ButtonOperatorComponent = (props) => {
    const [sortBy, dispatchSortBy] = useReducer(sortByReducer, initialSortBy);
    const [sortDirection, dispatchSortDirection] = useReducer(sortDirectionReducer, initialSortDirection);

    const {
        query,
        navigateUrl
    } = useRouterHook();

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

                dispatchSortBy({
                    type: 'INIT_DATA',
                    payload: newSortBy
                })

                dispatchSortDirection({
                    type: 'INIT_DATA',
                    payload: newSortDirection
                })

                query.sortBy = sortByValue;
                query.sortDirection = newSortDirection;

                navigateUrl({ replace: true })
            }
        }
    }

    return (
        <Container>
            <ControlFieldView />
            
            <SortButtonFieldView
                sortBy={sortBy}
                onChangeSortBy={__handle.action.changeSortByAndSortDirection}
            />
        </Container>
    )
}

export default ButtonOperatorComponent;

const initialSortBy = null;
const initialSortDirection = null;

const sortByReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSortBy;
        default: return initialSortBy;
    }
}

const sortDirectionReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSortDirection;
        default: return initialSortDirection;
    }
}