import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

// data connect
import { productDetailConnect } from "../../data_connect/productDetailConnect";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";

// component
import ProductInformationBody from "./ProductInformationBody";
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import { productDataConnect } from '../../data_connect/productDataConnect';

const ProductInformationMain = (props) => {
    const [categoryListData, setCategoryListData] = useState(null);
    const [productListData, setProductListData] = useState(null);
    const [productViewData, setProductViewData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [optionViewData, setOptionViewData] = useState([]);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchProductListFj();
            __handleDataConnect().searchCategoryList();
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchCategoryList: async function () {
                await productCategoryDataConnect().searchList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setCategoryListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchCategoryList');
                    })
            },
            searchProductListFj: async function () {
                await productDataConnect().getListFj()
                    .then(res => {
                        if(res.status == 200 && res.data && res.data.message == 'success') {
                            setProductListData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : searchProductListFj');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            productViewData: function () {
                return {
                    onChangeCategoryValue: function (categoryCid, categoryId) {
                        let category = categoryListData.filter(r => categoryId === r.id)[0];
                        setSelectedCategory(category.cid);

                        setProductViewData(productListData.filter(r => r.category.id === category.id));
                        setOptionViewData([]);
                    },
                    onClickProductData: function (productCid) {
                        setOptionViewData(productViewData.filter(r => r.product.cid === productCid)[0].options);
                    }
                }
            }
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <ProductInformationBody
                categoryListData={categoryListData}
                productViewData={productViewData}
                selectedCategory={selectedCategory}
                optionViewData={optionViewData}

                __handleEventControl = {__handleEventControl}
            ></ProductInformationBody>
        </>
    )
}

export default withRouter(ProductInformationMain);