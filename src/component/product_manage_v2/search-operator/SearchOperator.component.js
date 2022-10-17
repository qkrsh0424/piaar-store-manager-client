import { useReducer } from "react";
import { getOptionSearchHeader, getProductSearchHeader } from "../../../static-data/product-manage/productManageStaticData";
import ButtonFieldView from "./ButtonField.view";
import CategorySearchFieldView from "./CategorySearchField.view";
import OptionSearchFieldView from "./OptionSearchField.view";
import ProductSearchFieldView from "./ProductSearchField.view";
import { Container } from "./SearchOperator.styled";
import qs from 'query-string';
import { useLocation, useNavigate } from "react-router-dom";

const productSearchHeader = getProductSearchHeader();
const optionSearchHeader = getOptionSearchHeader();

const OperatorComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const [productSearchHeaderName, dispatchProductSearchHeaderName] = useReducer(productSearchHeaderNameReducer, initialProductSearchHeaderName);
    const [optionSearchHeaderName, dispatchOptionSearchHeaderName] = useReducer(optionSearchHeaderNameReducer, initialOptionSearchHeaderName);
    
    const [categorySearchQuery, dispatchCategorySearchQuery] = useReducer(categorySearchQueryReducer, initialCategorySearchQuery);
    const [productSearchQuery, dispatchProductSearchQuery] = useReducer(productSearchQueryReducer, initialProductSearchQuery);
    const [optionSearchQuery, dispatchOptionSearchQuery] = useReducer(optionSearchQueryReducer, initialOptionSearchQuery);

    const onChangeCategorySearchQuery = (e) => {
        dispatchCategorySearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const onChangeProductSearchHeader = (e) => {
        dispatchProductSearchHeaderName({
            type: 'SET_DATA',
            payload: e.target.value
        })

        dispatchProductSearchQuery({
            type: 'CLEAR'
        })
    }

    const onChangeOptionSearchHeader = (e) => {
        dispatchOptionSearchHeaderName({
            type: 'SET_DATA',
            payload: e.target.value
        })

        dispatchOptionSearchQuery({
            type: 'CLEAR'
        })
    }

    const onChangeProductSearchQuery = (e) => {
        dispatchProductSearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
        
    }

    const onChangeOptionSearchQuery = (e) => {
        dispatchOptionSearchQuery({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const onActionRouteToSearch = (e) => {
        e.preventDefault();

        if(categorySearchQuery) {
            query.categorySearchQuery = categorySearchQuery;
        } else {
            delete query.categorySearchQuery;
            dispatchCategorySearchQuery({ type: 'CLEAR' })
        }

        if (productSearchHeaderName) {
            query.productSearchHeaderName = productSearchHeaderName;

            if(productSearchQuery) {
                query.productSearchQuery = productSearchQuery;
            }else {
                delete query.productSearchQuery;
                dispatchProductSearchQuery({ type : 'CLEAR' })
            }
        } else {
            delete query.productSearchHeaderName;
            delete query.productSearchQuery;

            dispatchProductSearchHeaderName({ type: 'CLEAR' })
            dispatchProductSearchQuery({ type: 'CLEAR' })
        }

        if (optionSearchHeaderName) {
            query.optionSearchHeaderName = optionSearchHeaderName;

            if(optionSearchQuery) {
                query.optionSearchQuery = optionSearchQuery;
            }else {
                delete query.optionSearchQuery;
                dispatchOptionSearchQuery({ type: 'CLEAR' })
            }
        } else {
            delete query.optionSearchHeaderName;
            delete query.optionSearchQuery;

            dispatchOptionSearchHeaderName({ type: 'CLEAR' })
            dispatchOptionSearchQuery({ type: 'CLEAR' })
        }

        delete query.page;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        }),
            {
                replace: true
            }
        )
    }

    const onActionClearRoute = () => {
        dispatchCategorySearchQuery({ type: 'CLEAR' })
        dispatchProductSearchHeaderName({ type: 'CLEAR' })
        dispatchProductSearchQuery({ type: 'CLEAR' })
        dispatchOptionSearchHeaderName({ type: 'CLEAR' })
        dispatchOptionSearchQuery({ type: 'CLEAR' })

        navigate(location.pathname, {
            replace: true
        })
    }

    return (
        <Container>
            <form onSubmit={(e) => onActionRouteToSearch(e)}>
                <CategorySearchFieldView
                    categoryList={props.categoryList}
                    categorySearchQuery={categorySearchQuery}

                    onChangeCategorySearchQuery={onChangeCategorySearchQuery}
                ></CategorySearchFieldView>

                <ProductSearchFieldView
                    productSearchHeader={productSearchHeader}
                    productSearchHeaderName={productSearchHeaderName}
                    productSearchQuery={productSearchQuery}

                    onChangeProductSearchHeader={onChangeProductSearchHeader}
                    onChangeProductSearchQuery={onChangeProductSearchQuery}
                ></ProductSearchFieldView>

                <OptionSearchFieldView
                    optionSearchHeader={optionSearchHeader}
                    optionSearchHeaderName={optionSearchHeaderName}
                    optionSearchQuery={optionSearchQuery}

                    onChangeOptionSearchHeader={onChangeOptionSearchHeader}
                    onChangeOptionSearchQuery={onChangeOptionSearchQuery}
                ></OptionSearchFieldView>

                <ButtonFieldView
                    onActionClearRoute={onActionClearRoute}

                ></ButtonFieldView>
            </form>
        </Container>
    )
}

export default OperatorComponent;

const initialProductSearchHeaderName = null;
const initialOptionSearchHeaderName = null;
const initialCategorySearchQuery = null;
const initialProductSearchQuery = null;
const initialOptionSearchQuery = null;

const productSearchHeaderNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductSearchHeaderName;
        default: return initialProductSearchHeaderName;
    }
}

const optionSearchHeaderNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionSearchHeaderName;
        default: return initialOptionSearchHeaderName;
    }
}

const categorySearchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCategorySearchQuery;
        default: return initialCategorySearchQuery;
    }
}

const productSearchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductSearchQuery;
        default: return initialProductSearchQuery;
    }
}

const optionSearchQueryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOptionSearchQuery;
        default: return initialOptionSearchQuery;
    }
}