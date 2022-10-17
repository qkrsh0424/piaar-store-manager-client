import { ProductManageNavWrapper } from "./ProductManageNav.styled";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProductManageNavFieldView = (props) => {
    const userRdx = useSelector(state => state.user);

    let location = useLocation();

    let routerState = {
        routerUrl: location.pathname
    }

    return (
        <ProductManageNavWrapper>
            {userRdx.userInfo && !(userRdx.userInfo?.roles.includes("ROLE_LOGISTICS")) &&
                <>
                    <div>
                        <Link
                            className="nav-btn"
                            to={{ pathname: '/products/create' }}
                            state={routerState}
                        >상품등록</Link>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => props.onActionOpenCreateReleaseModal()}
                        >출고등록</button>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={() => props.onActionOpenCreateReceiveModal()}
                        >입고등록</button>
                    </div>
                </>
            }
            <div>
                <button
                    type='button'
                    onClick={() => props.onActionOpenReceiveAndReleaseModal()}
                >입출고현황</button>
            </div>
        </ProductManageNavWrapper>
    )
}

export default ProductManageNavFieldView;