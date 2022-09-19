import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { dateToYYYYMMDD } from '../../../../utils/dateFormatUtils';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';

const Container = styled.div`
    padding: 10px;
    border: 1px solid #e1e1e1;
`;

const DesktopNavbarBox = styled.div`
    display:flex;
    justify-content: flex-end;
    -webkit-justify-content:flex-end;
    align-items: center;
    overflow: auto;

    @media all and (max-width:992px){
        display: none;
    }
`;

const MobileNavbarBox = styled.div`
    display: none;

    @media all and (max-width:992px){
        display: flex;
        justify-content: end;
    }
`;

const ButtonBox = styled.div`
    .button-item{
        width: 130px;
        padding: 5px 0;
        word-break: keep-all;

        background: white;
        border: 1px solid #00000000;
        /* border-radius: 3px; */

        font-size: 14px;

        cursor: pointer;

        &:hover{
            /* background: #2C73D290; */
            background: #e1e1e160;
            /* color:white; */
        }
        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .button-active{
        background: var(--piaar-main-color) !important;
        color:white !important;
        font-weight: 600 !important;
    }
`;

const ModalButtonBox = styled.div`
    .button-item{
        width:100%;
        background: white;
        border: none;
        padding: 15px 0;
        font-size: 14px;
    }
    .button-active{
        background: var(--piaar-main-color) !important;
        color:white !important;
        font-weight: 600 !important;
    }
`;

const startDate = dateToYYYYMMDD(new Date());
const endDate = dateToYYYYMMDD(new Date());
const registrationDefaultPeriodType = 'registration';
const collectingDefaultPeriodType = 'collecting';
const collectedDefaultPeriodType = 'collected';
const completedDefaultPeriodType = 'completed';

const thisRouters = [
    {
        name: '반품 접수',
        pathname: '/erp/return-management/registration',
        params: `?periodType=${registrationDefaultPeriodType}&startDate=${startDate}&endDate=${endDate}`
    },
    {
        name: '수거중',
        pathname: '/erp/return-management/collecting',
        params: `?periodType=${collectingDefaultPeriodType}&startDate=${startDate}&endDate=${endDate}`
    },
    {
        name: '수거완료',
        pathname: '/erp/return-management/collected',
        params: `?periodType=${collectedDefaultPeriodType}&startDate=${startDate}&endDate=${endDate}`
    },
    {
        name: '처리완료',
        pathname: '/erp/return-management/completed',
        params: `?periodType=${completedDefaultPeriodType}&startDate=${startDate}&endDate=${endDate}`
    }
]

const ErpReturnManagementNavbar = (props) => {
    const location = useLocation();

    const [mobileRouterSelectorOpen, setMobileRouterSelectorOpen] = useState(false);

    const _onMobileRouterSelectorOpen = () => {
        setMobileRouterSelectorOpen(true);
    }

    const _onMobileRouterSelectorClose = () => {
        setMobileRouterSelectorOpen(false);
    }

    return (
        <>
            <Container>
                <DesktopNavbarBox>
                    {thisRouters.map(r => {
                        return (
                            <ButtonBox
                                key={r.name}
                            >
                                <Link
                                    to={r.pathname + (r.params || '')}
                                    replace={true}
                                >
                                    <button
                                        type='button'
                                        className={`button-item ${location.pathname === r.pathname ? 'button-active' : ''}`}
                                    >{r.name}</button>
                                </Link>
                            </ButtonBox>
                        );
                    })}

                </DesktopNavbarBox>
                <MobileNavbarBox>
                    <ButtonBox>
                        <button
                            type='button'
                            className={`button-item button-active`}
                            onClick={() => _onMobileRouterSelectorOpen()}
                        >{thisRouters.filter(r => r.pathname === location.pathname)[0].name}</button>
                    </ButtonBox>
                </MobileNavbarBox>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={mobileRouterSelectorOpen}

                onClose={() => _onMobileRouterSelectorClose()}
            >
                {thisRouters.map((r) => (
                    <Link
                        key={r.name}
                        to={r.pathname + (r.params || '')}
                        replace={true}
                    >
                        <ModalButtonBox>
                            <button
                                type='button'
                                className={`button-item ${location.pathname === r.pathname ? 'button-active' : ''}`}
                            >{r.name}</button>
                        </ModalButtonBox>
                    </Link>
                ))}
                {/* </List> */}
            </CommonModalComponent>
        </>
    );
}
export default ErpReturnManagementNavbar;
