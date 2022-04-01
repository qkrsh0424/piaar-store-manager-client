import { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import ArrowField from './ArrowField.view';

import { Container } from "./ItemSelector.styled";
import ProductListFieldView from './ProductListField.view';
import OptionListFieldView from './OptionListField.view';
import ProductModifyModal from '../../product_manage/modal/ProductModifyModal';
import CommonModalComponent from '../../module/modal/CommonModalComponent';

const ItemSelectorComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const history = useHistory();

    const [productCid, dispatchProductCid] = useReducer(productCidReducer, initialProductCid);
    const [optionCid, dispatchOptionCid] = useReducer(optionCidReducer, initialOptionCid);
    
    const [productModifyModalOpen, setProductModifyModalOpen] = useState(false);
    const [productModifyData, setProductModifyData] = useState(null);

    // 카테고리 변경 시 product, option값 초기화
    useEffect(() => {
        if(query.productCid || query.productCid === 0) {
            dispatchProductCid({
                type: 'CLEAR'
            });
            return;
        }

        dispatchProductCid({
            type: 'SET_DATA',
            payload: query.productCid
        });
    } ,[query.categoryCid]);

    useEffect(() => {
        if(query.optionCid || query.optionCid === 0) {
            dispatchOptionCid({
                type: 'CLEAR'
            });
            return;
        }

        dispatchOptionCid({
            type: 'SET_DATA',
            payload: query.optionCid
        });
    } ,[query.productCid]);

    useEffect(() => {
        dispatchOptionCid({
            type: 'CLEAR'
        });

        if(productCid || productCid === 0) {
            onActionRouteToProductSearch();
        }
    }, [productCid]);

    useEffect(() => {
        if(optionCid || optionCid === 0) {
            onActionRouteToOptionSearch();
        }
    }, [optionCid]);

    const onChangeProductCidValue = (value) => {
        dispatchProductCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    const onChangeOptionCidValue = (value) => {
        dispatchOptionCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    // category 선택 시
    const onActionRouteToProductSearch = () => {
        delete query.productCid;
        delete query.optionCid;
        delete query.detailCid;

        query.productCid = productCid;

        history.replace({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    // product 선택 시
    const onActionRouteToOptionSearch = () => {
        delete query.optionCid;
        delete query.detailCid;

        query.optionCid = optionCid;

        history.replace({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    const onActionOpenProductModifyModal = () => {
        if (!query.productCid) {
            alert('상품을 먼저 선택해주세요.');
            return;
        }

        let data = props.productViewList.filter(r => r.cid === parseInt(query.productCid))[0];
        setProductModifyData(data);
        setProductModifyModalOpen(true);
    }

    const onActionCloseProductModifyModal = () => {
        setProductModifyModalOpen(false);
    }

    const onActionDeleteProduct = async () => {
        if(!query.productCid) {
            alert('상품을 먼저 선택해주세요.');
            return;
        }

        if (window.confirm('상품을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProduct(query.productCid);
        }
    }

    const onActionDeleteProductOption = async () => {
        if(!query.optionCid) {
            alert('옵션을 먼저 선택해주세요.');
            return;
        }

        if (window.confirm('옵션을 삭제하면 하위 데이터들도 모두 삭제됩니다. 정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProductOption(query.optionCid);
        }
    }

    return(
        <Container>
            <ProductListFieldView
                productCid={productCid}
                productViewList={props.productViewList}

                onChangeProductCidValue={(value) => onChangeProductCidValue(value)}
                onActionOpenProductModifyModal={() => onActionOpenProductModifyModal()}
                onActionDeleteProduct={() => onActionDeleteProduct()}
            ></ProductListFieldView>

            <ArrowField></ArrowField>

            <OptionListFieldView
                optionCid={optionCid}
                optionViewList={props.optionViewList}

                onChangeOptionCidValue={(value) => onChangeOptionCidValue(value)}
                onActionDeleteProductOption={() => onActionDeleteProductOption()}
            ></OptionListFieldView>

            {/* TODO :: 모달 컨트롤 */}
            {/* Modal */}
            <CommonModalComponent
                open={productModifyModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseProductModifyModal}
            >
                <ProductModifyModal
                    categoryList={props.categoryList}
                    productModifyData={productModifyData}
                ></ProductModifyModal>
            </CommonModalComponent>

            {/* <CommonModalComponent
                open={optionModifyModalOpen}
                maxWidth={'md'}
                fullWidth={true}

                onClose={onActionCloseOptionModifyModal}
            >
                <ProductOptionModifyModal
                ></ProductOptionModifyModal>
            </CommonModalComponent> */}
        </Container>
    )
}

export default ItemSelectorComponent;

const initialProductCid = '';
const initialOptionCid = '';
// const initialModifyProduct = '';

const productCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

const optionCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}

// const modifyProductReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_DATA':
//             return action.payload;
//         case 'CLEAR':
//             return null;
//         default: return { ...state };
//     }
// }