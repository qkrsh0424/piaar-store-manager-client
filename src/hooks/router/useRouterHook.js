import { useLocation, useNavigate } from "react-router-dom";
import qs, { stringify } from 'query-string';

export default function useRouterHook (props) {
    const location = useLocation();
    const query = qs.parse(location.search);
    const navigate = useNavigate();

    const navigateUrl = (data) => {
        let replace = data.replace;

        navigate(qs.stringifyUrl(
            {
                url: location.pathname,
                query: { ...query }
            }),
            {
                replace
            }
        )
    }

    const navigateClearParams = (data) => {
        let replace = data.replace;
        navigate(location.pathname, {
            replace
        })
    }

    // TODO :: navigateUrl로 사용해보기.
    // component단에서 query.- 를 설정하고 navigateUrl 호출하기.
    const navigateParams = (data) => {
        let params = data.params;
        let replace = data.replace;

        navigate(qs.stringifyUrl(
            {
                url: location.pathname,
                query: `?${qs.stringify({
                    ...query,
                    params
                })}`
            }),
            {
                replace
            }
        )
    }

    return {
        location,
        query,
        navigateUrl,
        navigateParams,
        navigateClearParams
    }
}