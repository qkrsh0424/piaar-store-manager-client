import {useEffect, useState, useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';
import styled from "styled-components";

// data connect
import { deliveryReadyPiaarDataConnect } from '../../../data_connect/deliveryReadyPiaarDataConnect';
import { deliveryReadyPiaarViewHeaderDataConnect } from '../../../data_connect/deliveryReadyPiaarViewHeaderDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import BackdropLoading from '../../loading/BackdropLoading';
import DeliveryReadyViewPiaarBar from './DeliveryReadyViewPiaarBar';
import DeliveryReadyOrderStatusPiaarBody from './DeliveryReadyOrderStatusPiaarBody';

const Container = styled.div`
    height: 100vh;
    /* background-color: #f2f5ff; */
`;

const DeliveryReadyViewPiaarMain = (props) => {
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [viewHeaderDetailList, setViewHeaderDetailList] = useState(null);
    const [excelOrderList, setExcelOrderList] = useState(null);
    
    useEffect(() => {
        async function initViewHeaderDetailList() {

            if(excelOrderList) return;

            await __handleDataConnect().getViewExcelHeaderDetail();
            await __handleDataConnect().getExcelOrderList();
        }

        initViewHeaderDetailList();
    }, []);

    const __handleDataConnect = () => {
        return {
            getViewExcelHeaderDetail: async function () {
                await deliveryReadyPiaarViewHeaderDataConnect().searchOneByUser()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setViewHeaderDetailList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        // 등록된 헤더가 없는 경우
                        if (res.status === 404) return;
                        alert(res?.data?.message);
                    })
            },
            createViewExcelHeaderDetail: async function (headerDetails) {
                await deliveryReadyPiaarViewHeaderDataConnect().postOne(headerDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                            this.getViewExcelHeaderDetail();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.message);
                    })
            },
            changeViewExcelHeaderDetail: async function (headerDetails) {
                await deliveryReadyPiaarViewHeaderDataConnect().putOne(headerDetails)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                            this.getViewExcelHeaderDetail();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.message);
                    })
            },
            getExcelOrderList: async function () {
                await deliveryReadyPiaarDataConnect().getOrderList()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelOrderList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.message);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            movePage: function () {
                return {
                    deliveryReadyUpload: function () {
                        props.history.replace('/delivery-ready/piaar');
                    }
                }
            },
            piaarCustomizedHeader: function () {
                return {
                    createHeader: async function (headerDetails) {
                        await __handleDataConnect().createViewExcelHeaderDetail(headerDetails);
                    },
                    changeHeader: async function (headerDetails) {
                        await __handleDataConnect().changeViewExcelHeaderDetail(headerDetails);
                    }
                }
            }
        }
    }

    return (
        <>
            <Container>
                {/* Backdrop */}
                <BackdropLoading open={backdropLoading} />
                <DrawerNavbarMain></DrawerNavbarMain>

                {/* 피아르 엑셀 컨트롤 바 */}
                <DeliveryReadyViewPiaarBar

                    moveUploadPageControl={() => __handleEventControl().movePage().deliveryReadyUpload()}
                ></DeliveryReadyViewPiaarBar>

                {/* 주문현황 데이터 보드 */}
                <DeliveryReadyOrderStatusPiaarBody
                    viewHeaderDetailList={viewHeaderDetailList}
                    excelOrderList={excelOrderList}

                    getViewExcelHeaderDetailControl={() => __handleDataConnect().getViewExcelHeaderDetail()}
                    createPiaarCustomizedHeaderControl={(headerDetails) => __handleEventControl().piaarCustomizedHeader().createHeader(headerDetails)}
                    changePiaarCutomizedHeaderControl={(headerDetails) => __handleEventControl().piaarCustomizedHeader().changeHeader(headerDetails)}
                ></DeliveryReadyOrderStatusPiaarBody>

            </Container>
        </>
    )
}

export default withRouter(DeliveryReadyViewPiaarMain);