import { ProductManageNavWrapper } from "./ProductManageNav.styled";
import { Link, useLocation } from 'react-router-dom';

const ProductManageNavFieldView = (props) => {
    let location = useLocation();

    let routerState = {
        prevUrl: location.pathname
    }

    return (
        <ProductManageNavWrapper>
            {/* <div> */}
                <div>
                    <Link
                        className="nav-btn"
                        to={{
                            pathname: '/products/create',
                            state: routerState
                        }}
                    >상품등록</Link>
                </div>
                <div>
                    <button
                        type='button'
                        onClick={() => props.__handleEventControl().release().addModalOpen()}
                    >출고등록</button>
                </div>
                <div>
                    <button
                        type='button'
                        onClick={() => props.__handleEventControl().receive().addModalOpen()}
                    >입고등록</button>
                </div>
                <div>
                    <button
                        type='button'
                        onClick={() => props.__handleEventControl().receiveAndRelease().receiveAndReleaseStatusModalOpen()}
                    >입출고확인</button>
                </div>
            {/* </div> */}
        </ProductManageNavWrapper>
    )
}

export default ProductManageNavFieldView;