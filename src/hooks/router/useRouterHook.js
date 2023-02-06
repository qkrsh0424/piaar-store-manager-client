import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import qs from 'query-string';

export default function useRouterHook (props) {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const navigateUrl = (data) => {
        let pathname = data.pathname;
        let state = data.state;

        navigate({
            pathname: pathname,
            search: `?${createSearchParams({...query})}`,
        },
        {
            state
        })
    }

    const navigateParams = (data) => {
        let replace = data.replace || false;

        navigate(qs.stringifyUrl(
            {
                url: location.pathname,
                query: { ...query }
            }),
            {
                state: location.state,
                replace
            }
        )
    }

    const navigateClearParams = (data) => {
        let replace = data.replace || false;
        navigate(location.pathname, {
            replace
        })
    }

    const navigatePrevPage = () => {
        navigate(-1);
    }

    const updateRouteState = (data) => {
        navigate({
            pathname: data.pathname,
            search: `?${createSearchParams({...query})}`,
        },
        {
            state: data,
            replace: false
        })
    }

    return {
        location,
        query,
        navigateUrl,
        navigateParams,
        navigateClearParams,
        navigatePrevPage,
        updateRouteState
    }
}