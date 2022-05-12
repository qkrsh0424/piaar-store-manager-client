import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoadingTrue, setUserLoadingFalse, setUserInfo } from './redux/actions/user';
// component
import FullPageLoading from './component/loading/FullPageLoading';
import HomeMain from './component/home/HomeMain';
import OrderConfirmMain from './component/order_confirm/OrderConfirmMain';
import WaybillMain from './component/waybill/WaybillMain';
import LoginMain from './component/login/LoginMain';
import SalesRateNaverMain from './component/sales_rate/naver/SalesRateNaverMain';


// component : shipment
import SPackingListNaverMain from './component/shipment/packing-list/naver/SPackingListNaverMain';
import SPackingListCoupangMain from './component/shipment/packing-list/coupang/SPackingListCoupangMain';

// component : account book
import AccountBookMain from './component/account_book/AccountBookMain';
import IncomeMain from './component/account_book/IncomeMain';
import ExpenditureMain from './component/account_book/ExpenditureMain';

// component : product
import ProductManageMain from './component/product_manage/ProductManageMain';
import CreateMain from './component/product_manage/CreateMain';

// component : delivery-ready
import DeliveryReadyUploadNaverMain from './component/delivery_ready/naver/DeliveryReadyUploadNaverMain';
import DeliveryReadyViewNaverMain from './component/delivery_ready/naver/DeliveryReadyViewNaverMain';
import DeliveryReadyUploadCoupangMain from './component/delivery_ready/coupang/DeliveryReadyUploadCoupangMain';
import DeliveryReadyViewCoupangMain from './component/delivery_ready/coupang/DeliveryReadyViewCoupangMain';

// component : order-registration
import OrderRegistrationNaverMain from './component/order_registration/naver/OrderRegistrationNaverMain';

// product-information
import ProductDetailMain from './component/product_detail/ProductDetailMain';


// data connect
import { userDataConnect } from './data_connect/userDataConnect';
import CommuteRecordMain from './component/commute_record/CommuteRecordMain';
import ExcelTranslatorMain from './component/excel_translator/ExcelTranslatorMain';
import DeliveryReadyUploadPiaarMain from './component/delivery_ready/piaar/DeliveryReadyUploadPiaarMain';
import DeliveryReadyViewPiaarMain from './component/delivery_ready/piaar/DeliveryReadyViewPiaarMain';
import SalesAnalysisMain from './component/sales_analysis/SalesAnalysisMain';

// refactor
import SalesAnalysisPage from './pages/sales_analysis/SalesAnalysisPage';
import ProductDetailPage from './pages/product_detail/ProductDetailPage';
import ProductCreatePage from './pages/product_create/ProductCreatePage';
import ExcelTranslatorPage from './pages/excel_translator/ExcelTranslatorPage';
import ErpManagementOrderUploadPage from './pages/erp/management/order-upload/ErpManagementOrderUploadPage';
import ErpManagementOrderPage from './pages/erp/management/order/ErpManagementOrderPage';
import ErpManagementSalesPage from './pages/erp/management/sales/ErpManagementSalesPage';
import ErpManagementReleaseCompletePage from './pages/erp/management/release-complete/ErpManagementReleaseCompletePage';
import ErpManagementExcelFormPage from './pages/erp/management/excel/ErpManagementExcelFormPage';
import ProductManagePage from './pages/product_manage/ProductManagePage';


const theme = unstable_createMuiStrictModeTheme();

const AppContainer = styled.div`
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s; /* Firefox */
    -webkit-animation: fadein 1.5s; /* Safari and Chrome */
    -o-animation: fadein 1.5s; /* Opera */
`;

function App(props) {
    const userRdx = useSelector(state => state.user);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        async function userCheckInit() {
            await userDataConnect().loginCheck()
                .then(res => {
                    // console.log(res);
                    if (res.status == 200 && res.data.message == 'loged') {
                        dispatch(setUserInfo(res.data.data))
                    }
                })
                .catch(err => { 
                    console.log(err.response);
                })
            dispatch(setUserLoadingFalse());

        }
        userCheckInit();
    }, [location])
    return (
        <>
            <ThemeProvider theme={theme}>
                <Suspense fallback={<FullPageLoading></FullPageLoading>}>
                    <AppContainer>
                        {(userRdx.isLoading == false ? (
                            userRdx.userInfo ? (
                            <Routes>
                                {/* {console.log(userRdx.userInfo.roles.includes("ROLE_MANAGER"))} */}
                                {/* 올바르지 않은 url 입력 or 접근 제한되었을 때 */}
                                <Route path="*" element={<HomeMain />} />

                                {/* Home */}
                                <Route path="/" element={<HomeMain />} />

                                {/* OrderManage */}
                                <Route path="/order-confirm" element={<OrderConfirmMain />} />

                                <Route path="/waybill" element={<WaybillMain />} />

                                {/* Login Signup etc.. */}
                                <Route path='/login' element={<LoginMain />} />

                                {/* Account book */}
                                {(userRdx.userInfo.roles.includes("ROLE_ADMIN") || userRdx.userInfo.roles.includes("ROLE_MANAGER")) &&
                                    <>
                                        <Route path='/account-book' element={<AccountBookMain />} />
                                        <Route path='/account-book/income' element={<IncomeMain />} />
                                        <Route path='/account-book/expenditure' element={<ExpenditureMain />} />
                                    </>
                                }

                                {/* Sales Rate */}
                                <Route path='/sales-rate/naver' element={<SalesRateNaverMain />} />

                                {/* refactor page 5 - /products -> /ex/products */}
                                {/* Product Manage */}
                                <Route path='/ex/products' element={<ProductManageMain />} />
                                <Route path='/products' element={<ProductManagePage />} />

                                 {/* refactor page 3 - /product/create -> /ex/product/create */}
                                <Route path='/ex/products/create' element={<CreateMain />} />
                                <Route path='/products/create' element={<ProductCreatePage />} />
                                
                                {/* Shipment */}
                                <Route path='/shipment/packing-list/naver' element={<SPackingListNaverMain />} />
                                
                                <Route path='/shipment/packing-list/coupang' element={<SPackingListCoupangMain />} />

                                {/* DeliveryReady - NAVER */}
                                <Route path='/delivery-ready/naver' element={<DeliveryReadyUploadNaverMain />} />
                                
                                {/* DeliveryReady - COUPANG */}
                                <Route path='/delivery-ready/coupang' element={<DeliveryReadyUploadCoupangMain />} />

                                {/* DeliveryReady - PIAAR */}
                                <Route path='/delivery-ready/piaar' element={<DeliveryReadyUploadPiaarMain />} />

                                {(userRdx.userInfo.roles.includes("ROLE_ADMIN") || userRdx.userInfo.roles.includes("ROLE_MANAGER")) &&
                                    <>
                                        <Route path='/delivery-ready/naver/view' element={<DeliveryReadyViewNaverMain />} />
                                        <Route path='/delivery-ready/coupang/view' element={<DeliveryReadyViewCoupangMain />} />
                                        <Route path='/delivery-ready/piaar/view' element={<DeliveryReadyViewPiaarMain />} />
                                    </>
                                }

                                <Route path='/order-registration/naver' element={<OrderRegistrationNaverMain />} />

                                {/* refactor page 2 - /product-detail -> /ex/product-detail */}
                                <Route path='/ex/product-detail' element={<ProductDetailMain />} />
                                <Route path='/product-detail' element={<ProductDetailPage />} />

                                <Route path='/commute-record' element={<CommuteRecordMain />} />

                                {/* refactor page 4 - /excel-translator -> /ex/excel-translator */}
                                <Route path='/ex/excel-translator' element={<ExcelTranslatorMain />} />
                                <Route path='/excel-translator' element={<ExcelTranslatorPage />} />
                                
                                {/* refactor page 1 - /sales-analysis -> /ex/sales-analysis */}
                                <Route path='/ex/sales-analysis' element={<SalesAnalysisMain />} />
                                <Route path='/sales-analysis' element={<SalesAnalysisPage />} />

                                {/* PiaarErpManagement */}
                                <Route path='/erp/management/order-upload' element={<ErpManagementOrderUploadPage />} />
                                <Route path='/erp/management/order' element={<ErpManagementOrderPage />} />
                                <Route path='/erp/management/sales' element={<ErpManagementSalesPage />} />
                                <Route path='/erp/management/release-complete' element={<ErpManagementReleaseCompletePage />} />
                                <Route path='/erp/management/excel' element={<ErpManagementExcelFormPage />} />
                            </Routes>
                        ):
                        <>
                        <Routes>
                            <Route path="*" element={<LoginMain />} />
                        </Routes>
                        </>
                        )
                            :
                            (
                                <>로딩중</>
                            )
                        )}
                    </AppContainer>
                </Suspense>
            </ThemeProvider>
        </>
    );
}

export default App;
