import { ProductManageNavWrapper } from "./ProductManageNav.styled";
import { Link, useLocation } from 'react-router-dom';

const ProductManageNavFieldView = (props) => {
    let location = useLocation();

    let routerState = {
        prevUrl: location.pathname
    }

    return (
        <ProductManageNavWrapper>
            <div>
                <Link
                    className="nav-btn"
                    to={{ pathname: '/refactor/products/create' }}
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