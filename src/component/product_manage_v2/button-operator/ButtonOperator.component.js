import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "./ButtonOperator.styled";
import SortButtonFieldView from "./SortButtonField.view";
import qs from 'query-string';

const ButtonOperatorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();
    
    const [sortBy, dispatchSortBy] = useReducer(sortByReducer, initialSortBy);
    const [sortDirection, dispatchSortDirection] = useReducer(sortDirectionReducer, initialSortDirection);

    const onChangeSortBy = (e) => {
        let newSortBy = e.target.value;
        let newSortDirection = 'asc';
        let sortByValue = newSortBy.replace('asc_', '');

        if(newSortBy.startsWith("desc_")) {
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

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                sortBy: sortByValue,
                sortDirection: newSortDirection
            }
        }))
    }

    return (
        <Container>
            <SortButtonFieldView
                sortBy={sortBy}

                onChangeSortBy={onChangeSortBy}
            ></SortButtonFieldView>
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