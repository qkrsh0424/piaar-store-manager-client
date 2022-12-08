import { useState } from "react";
import useRouterHook from "../../../../hooks/router/useRouterHook";

export default function useSearchOperatorHook (props) {
    const [productSearchHeaderName, setProductSearchHeaderName] = useState('defaultName');
    const [optionSearchHeaderName, setOptionSearchHeaderName] = useState('defaultName');
    
    const [categorySearchQuery, setCategorySearchQuery] = useState(null);
    const [productSearchQuery, setProductSearchQuery] = useState(null);
    const [optionSearchQuery, setOptionSearchQuery] = useState(null);

    const {
        query,
        navigateParams,
        navigateClearParams,
    } = useRouterHook();

    const onChangeCategorySearchQuery = (e) => {
        setCategorySearchQuery(e.target.value);
    }

    const onChangeProductSearchHeader = (e) => {
        setProductSearchHeaderName(e.target.value);
        setProductSearchQuery(null);
    }

    const onChangeOptionSearchHeader = (e) => {
        setOptionSearchHeaderName(e.target.value);
        setOptionSearchQuery(null);
    }

    const onChangeProductSearchQuery = (e) => {
        setProductSearchQuery(e.target.value);     
    }

    const onChangeOptionSearchQuery = (e) => {
        setOptionSearchQuery(e.target.value);
    }

    const onSubmitRouteToSearch = (e) => {
        e.preventDefault();

        if (categorySearchQuery) {
            query.categorySearchQuery = categorySearchQuery;
        } else {
            delete query.categorySearchQuery;
            setCategorySearchQuery(null);
        }

        if (productSearchHeaderName) {
            query.productSearchHeaderName = productSearchHeaderName;

            if (productSearchQuery) {
                query.productSearchQuery = productSearchQuery;
            } else {
                delete query.productSearchQuery;
                setProductSearchQuery(null);
            }
        } else {
            delete query.productSearchHeaderName;
            delete query.productSearchQuery;

            setProductSearchHeaderName(null);
            setProductSearchQuery(null);
        }

        if (optionSearchHeaderName) {
            query.optionSearchHeaderName = optionSearchHeaderName;

            if (optionSearchQuery) {
                query.optionSearchQuery = optionSearchQuery;
            } else {
                delete query.optionSearchQuery;
                setOptionSearchQuery(null);
            }
        } else {
            delete query.optionSearchHeaderName;
            delete query.optionSearchQuery;

            setOptionSearchHeaderName(null);
            setOptionSearchQuery(null);
        }

        delete query.page;

        navigateParams({ replace: true})
    }

    const onActionClearRoute = () => {
        setCategorySearchQuery(null);
        setProductSearchHeaderName(null);
        setProductSearchQuery(null);
        setOptionSearchHeaderName(null);
        setOptionSearchQuery(null);

        navigateClearParams({ replace: true });
    }

    return {
        productSearchHeaderName,
        optionSearchHeaderName,
        categorySearchQuery,
        productSearchQuery,
        optionSearchQuery,

        onChangeCategorySearchQuery,
        onChangeProductSearchHeader,
        onChangeOptionSearchHeader,
        onChangeProductSearchQuery,
        onChangeOptionSearchQuery,
        onSubmitRouteToSearch,
        onActionClearRoute
    }
}