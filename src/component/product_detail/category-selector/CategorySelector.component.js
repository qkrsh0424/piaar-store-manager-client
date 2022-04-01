import { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

import { Container } from "./CategorySelector.styled";
import CategorySelectorFieldView from './CategorySelectorField.view';

const CategorySelectorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const history = useHistory();

    const [categoryCid, dispatchCategoryCid] = useReducer(categoryCidReducer, initialCategoryCid);

    useEffect(() => {
        if(query.categoryCid !== 0 && !query.categoryCid) {
            return;
        }

        dispatchCategoryCid({
            type: 'SET_DATA',
            payload: query.categoryCid
        });
    }, []);

    useEffect(() => {
        if(!(categoryCid === '0' || categoryCid)) {
            return;
        }

        onActionRouteToCategorySearch();
    }, [categoryCid]);

    const onChangeCategoryCidValue = (value) => {
        dispatchCategoryCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    const onActionRouteToCategorySearch = () => {
        delete query.categoryCid;
        delete query.productCid;
        delete query.optionCid;

        query.categoryCid = categoryCid;

        history.replace({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    return(
        <Container>
            <CategorySelectorFieldView
                categoryCid={categoryCid}
                categoryList={props.categoryList}
                onChangeCategoryCidValue={(value) => onChangeCategoryCidValue(value)}
            ></CategorySelectorFieldView>
        </Container>
    )
}

export default CategorySelectorComponent;

const initialCategoryCid = '';

const categoryCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}