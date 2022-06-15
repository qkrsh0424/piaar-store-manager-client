import { useState, useEffect, useReducer } from 'react';

import ConditionSearchFieldView from "./ConditionSearchField.view";
import ConditionSelectorFieldView from "./ConditionSelectorField.view";
import { Container } from "./Operator.styled";
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

const OperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);
    const [selectedCategoryCid, setSelectedCategoryCid] = useState(null);
    const [searchInputValueState, dispatchSearchInputValueState] = useReducer(searchInputValueReducer, initialSearchInputValueState);

    useEffect(() => {
        if (!searchInputValueState) {
            return;
        }

        if(searchInputValueState.searchColumn === 'total') {
            dispatchSearchInputValueState({
                type: 'CLEAR'
            })
        }

        props._onAction_changeSearchInput(searchInputValueState);
    }, [searchInputValueState]);

    useEffect(() => {
        if(!query.categoryCid) {
            return;
        }

        setSelectedCategoryCid(query.categoryCid);
    }, [query.categoryCid]);

    const onChangeCategorySelector = (e) => {
        let category = e.target.value;
        query.categoryCid = category;

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    const onChangeSearchColumn = (e) => {
        dispatchSearchInputValueState({
            type: 'CHANGE_DATA',
            payload: {
                name: 'searchColumn',
                value: e.target.value
            }
        })
    }

    const onChangeSearchInputValue = (e) => {
        dispatchSearchInputValueState({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    const onActionClearRoute = () => {
        dispatchSearchInputValueState({
            type: 'CLEAR'
        });
    }

    return (
        <Container>
            <ConditionSelectorFieldView
                productCategoryList={props.productCategoryList}
                selctedCategoryCid={selectedCategoryCid}

                onChangeCategorySelector={(e) => onChangeCategorySelector(e)}
            ></ConditionSelectorFieldView>

            {searchInputValueState &&
                <ConditionSearchFieldView
                    searchInputValueState={searchInputValueState}

                    onChangeSearchColumn={(e) => onChangeSearchColumn(e)}
                    onChangeSearchInputValue={(e) => onChangeSearchInputValue(e)}
                    onActionClearRoute={() => onActionClearRoute()}
                ></ConditionSearchFieldView>
            }
        </Container>
    )
}

export default OperatorComponent;

const initialSearchInputValueState = {
    searchColumn: 'total',
    searchValue: ''
};

const searchInputValueReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return{
                ...state,
                [action.payload.name] : action.payload.value
            }
        case 'CLEAR':
            return initialSearchInputValueState;
        default: return { ...state }
    }
}
