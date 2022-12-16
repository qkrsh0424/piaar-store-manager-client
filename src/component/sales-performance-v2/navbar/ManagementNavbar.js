import { Link } from "react-router-dom";
import styled from "styled-components";
import useRouterHook from "../../../hooks/router/useRouterHook";
import { dateToYYYYMMDD, getStartDateOfMonth, setStartDateOfPeriod } from "../../../utils/dateFormatUtils";

const Container = styled.div`
    .group-box {
        margin-bottom: 40px;
    }

    .nav-title {
        font-size: 1.1rem;
        font-weight: 600;
        padding: 10px 0;
        border-bottom: 1px solid var(--defaultBorderColor);
    }

    .link-box {
        margin-top: 15px;
    }

    .link-box .button-el {
        border: none;
        background-color: inherit;
        color: #aaa;
    }

    .link-box .button-active{
        color: #c6c6f7 !important;
        font-weight: 600 !important;
    }
`;

const NavbarBox = styled.div`
    
    .selector-control-button {
        width: 25px;
        height: 64px;
        position: relative;
        overflow: hidden;
        padding: 0;
        transition: 0.15s;

        border-radius: 0 5px 5px 0;

        border: 1px solid #455265;
        background-color: #455265;
    }

    .navbar-item {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 200px;
        max-width: 200px;
        margin-top: 64px;
        background-color: #455265;
        color: #fff;
        box-shadow: var(--defaultBoxShadow);
        padding-bottom: 100px;
        overflow: pre;
        z-index: 11;
        padding: 20px;
        
        &.navbar-item-open {
            /* left: -200px; */
            left: 0;
        }
        
        &.navbar-item-close {
            transition-delay: 0.5s;
            left: -200px;
        }
    }

    .selector-button-box {
        position: absolute;
        left: 199px;
        top: 0px;
    }

    .slide-right {
        animation-name: slide-right;
        animation-duration: 0.5s;
    }

    .slide-left {
        animation-name: slide-left;
        animation-duration: 0.5s;
    }
`;

const TODAY = dateToYYYYMMDD(new Date());
const PREV_2WEEKS_DATE = dateToYYYYMMDD(setStartDateOfPeriod(TODAY, 0, 0, -13));
// const START_DAY_OF_MONTH = dateToYYYYMMDD(getStartDateOfMonth(TODAY));

const thisRouters = [
    {
        title: '판매성과 요약',
        page: [
            {
                name: '대시보드',
                pathname: '/sales-performance/dashboard'
            }
        ]
    },
    {
        title: '판매성과 상세',
        page: [
            {
                name: '총 매출액 & 판매 건',
                pathname: '/sales-performance/total',
                params: `?startDate=${PREV_2WEEKS_DATE}&endDate=${TODAY}`
            },
            {
                name: '판매스토어별',
                pathname: '/sales-performance/sales-channel',
                params: `?startDate=${PREV_2WEEKS_DATE}&endDate=${TODAY}`
            },
            {
                name: '카테고리별',
                pathname: '/sales-performance/product-category',
                params: `?startDate=${PREV_2WEEKS_DATE}&endDate=${TODAY}`
            },
            {
                name: '상품별',
                pathname: '/sales-performance/product',
                params: `?startDate=${PREV_2WEEKS_DATE}&endDate=${TODAY}`
            },
        ]
    },
]

const ManagementNavbar = (props) => {
    const {
        location
    } = useRouterHook();

    return (
        <Container>
            <NavbarBox>
                <div className={`navbar-item ${props.navbarOpen ? 'navbar-item-open slide-right' : 'navbar-item-close slide-left'}`}>
                    {props.navbarOpen ?
                        <div className='selector-button-box'>
                            <button
                                type='button'
                                className='selector-control-button'
                                onClick={() => props.onActionCloseNavbar()}
                            >
                                <img
                                    className='button-icon'
                                    src='/assets/icon/left_arrow_default_ffffff.svg'
                                    style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                />
                            </button>
                        </div>
                        :
                        <div className='selector-button-box'>
                            <button
                                type='button'
                                className='selector-control-button'
                                onClick={() => props.onActionOpenNavbar()}
                            >
                                <img
                                    className='button-icon'
                                    src='/assets/icon/right_arrow_default_ffffff.svg'
                                    style={{ width: '25px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                                />
                            </button>
                        </div>
                    }
                    {thisRouters.map(r => {
                        return (
                            <div className='group-box' key={'navbar-' + r.title}>
                                <div className='nav-title'>{r.title}</div>
                                {r.page?.map(navPage => {
                                    return (
                                        <div key={navPage.name} className='link-box'>
                                            <Link
                                                to={navPage.pathname + (navPage.params || '')}
                                                replace={true}
                                            >
                                                <button
                                                    type='button'
                                                    className={`button-el ${location.pathname === navPage.pathname ? 'button-active' : ''}`}
                                                >
                                                    {navPage.name}
                                                </button>
                                            </Link>

                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                    }
                </div>
            </NavbarBox>
        </Container>
    )
}

export default ManagementNavbar;