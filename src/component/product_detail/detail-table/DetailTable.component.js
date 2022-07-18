import { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

import DetailInfoTableFieldView from './DetailInfoTableField.view';
import { Container, DataBox } from "./DetailTable.styled";
import OptionInfoTableFieldView from './OptionInfoTableField.view';
import ProductInfoTableFieldView from './ProductInfoTableField.view';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CreateProductDetailModalComponent from '../create-product-detail-modal/CreateProductDetailModal.component';
import { PanoramaSharp } from '@material-ui/icons';
import ModifyProductDetailModalComponent from '../modify-product-detail-modal/ModifyProductDetailModal.component';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

class ProductDetail {
    constructor(productOptionId) {
        this.id = uuidv4();
        this.detailWidth = '';
        this.detailLength = '';
        this.detailHeight = '';
        this.detailQuantity = '';
        this.detailWeight = '';
        this.detailCbm = '';
        this.productOptionCid = null;
        this.productOptionId = productOptionId;
    }

    toJSON() {
        return {
            id: this.id,
            detailWidth: this.detailWidth,
            detailLength: this.detailLength,
            detailHeight: this.detailHeight,
            detailQuantity: this.detailQuantity,
            detailWeight: this.detailWeight,
            detailCbm: this.detailCbm,
            productOptionCid: this.productOptionCid,
            productOptionId: this.productOptionId
        }
    }
}

const DetailTableComponent = (props) => {
    const userRdx = useSelector(state => state.user);

    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);
    
    const [detailCid, dispatchDetailCid] = useReducer(detailCidReducer, initialDetailCid);
    const [createProductDetailModalOpen, setCreateProductDetailModalOpen] = useState(false);
    const [createProductDetailData, setCreateProductDetailData] = useState(null);
    
    const [modifyProductDetailModalOpen, setModifyProductDetailModalOpen] = useState(false);
    const [modifyProductDetailData, setModifyProductDetailData] = useState(null);

    // 옵션이 변경된 경우
    useEffect(() => {
        if(query.detailCid !== 0 && !query.detailCid) {
            dispatchDetailCid({
                type: 'CLEAR'
            });    
        }else {
            dispatchDetailCid({
                type: 'SET_DATA',
                payload: query.detailCid
            })
        }
    }, [query.optionCid])

    // 상세 선택이 변경된 경우
    useEffect(() => {
        if(!(detailCid === '0' || detailCid)) {
            return;
        }

        onActionRouteToDetailSearch();
    }, [detailCid])

    const onChangeDetailCidValue = (value) => {
        dispatchDetailCid({
            type: 'SET_DATA',
            payload: value
        });
    }

    // option 선택 시
    const onActionRouteToDetailSearch = () => {
        delete query.detailCid;

        query.detailCid = detailCid;

        navigate({
            pathname: query.pathname,
            search: `?${qs.stringify(query)}`
        });
    }

    const onActionDeleteProductDetail = async () => {
        if(!query.detailCid) {
            alert('상품상세를 먼저 선택해주세요.');
            return;
        }

        if (window.confirm('정말로 삭제하시겠습니까?')) {
            await props._onSubmit_deleteProductDetail(query.detailCid);
        }
    }

    const onActionOpenCreateProductDetailModal = () => {
        if(!query.optionCid) {
            alert('상품 옵션을 먼저 선택해주세요.');
            return;
        }

        // detail 데이터를 기본값으로 설정.
        let detail = new ProductDetail(props.selectedOption.id);
        detail = {
            ...detail,
            productOptionCid: query.optionCid,
            detailWidth: props.selectedProduct.defaultWidth ?? 0,
            detailLength: props.selectedProduct.defaultLength ?? 0,
            detailHeight: props.selectedProduct.defaultHeight ?? 0,
            detailQuantity: props.selectedProduct.defaultQuantity ?? 0,
            detailWeight: props.selectedProduct.defaultWeight ?? 0
        }

        setCreateProductDetailData(detail);
        setCreateProductDetailModalOpen(true);
    }

    const onActionCloseCreateProductDetailModal = () => {
        setCreateProductDetailModalOpen(false);
    }

    const onActionCreateProductDetail = async (detailData) => {
        await props._onSubmit_createProductDetail(detailData);
        onActionCloseCreateProductDetailModal();
    }

    const onActionOpenModifyProductDetailModal = () => {
        if(!query.detailCid) {
            alert('수정하려는 데이터를 먼저 선택해주세요.');
            return;
        }

        let detail = props.detailViewList?.filter(r => r.cid === parseInt(query.detailCid))[0];
        setModifyProductDetailData(detail);
        setModifyProductDetailModalOpen(true);
    }

    const onActionCloseModifyProductDetailModal = () => {
        setModifyProductDetailModalOpen(false);
    }

    const onActionModifyProductDetail = async (detailData) => {
        await props._onSubmit_modifyProductDetail(detailData);
        onActionCloseModifyProductDetailModal();
    }

    return (
        <Container>
            <DataBox>
                <ProductInfoTableFieldView
                    selectedProduct={props.selectedProduct}
                ></ProductInfoTableFieldView>

                {userRdx.userInfo && !(userRdx.userInfo?.roles.includes("ROLE_LOGISTICS")) &&
                    <>
                        <OptionInfoTableFieldView
                            selectedOption={props.selectedOption}
                        ></OptionInfoTableFieldView>

                        <DetailInfoTableFieldView
                            detailViewList={props.detailViewList}
                            detailCid={detailCid}

                            onChangeDetailCidValue={(value) => onChangeDetailCidValue(value)}
                            onActionDeleteProductDetail={() => onActionDeleteProductDetail()}
                            onActionOpenCreateProductDetailModal={() => onActionOpenCreateProductDetailModal()}
                            onActionOpenModifyProductDetailModal={() => onActionOpenModifyProductDetailModal()}
                        ></DetailInfoTableFieldView>
                    </>
                }
            </DataBox>

            {createProductDetailData &&
                <CommonModalComponent
                    open={createProductDetailModalOpen}
                    maxWidth={'md'}
                    fullWidth={true}

                    onClose={onActionCloseCreateProductDetailModal}
                >
                    <CreateProductDetailModalComponent
                        createProductDetailData={createProductDetailData}

                        onActionCloseCreateProductDetailModal={() => onActionCloseCreateProductDetailModal()}
                        onActionCreateProductDetail={(detailData) => onActionCreateProductDetail(detailData)}
                    ></CreateProductDetailModalComponent>
                </CommonModalComponent>
            }

            {modifyProductDetailData &&
                <CommonModalComponent
                    open={modifyProductDetailModalOpen}
                    maxWidth={'md'}
                    fullWidth={true}

                    onClose={onActionCloseModifyProductDetailModal}
                >
                    <ModifyProductDetailModalComponent
                        modifyProductDetailData={modifyProductDetailData}

                        onActionCloseModifyProductDetailModal={() => onActionCloseModifyProductDetailModal()}
                        onActionModifyProductDetail={(detailData) => onActionModifyProductDetail(detailData)}
                    ></ModifyProductDetailModalComponent>
                </CommonModalComponent>
            }
        </Container>
    )
}

export default DetailTableComponent;

const initialDetailCid = '';

const detailCidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state };
    }
}