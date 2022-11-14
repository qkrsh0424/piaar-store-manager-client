import { Link } from "react-router-dom";
import styled from "styled-components";
import useRouterHook from "../../../hooks/router/useRouterHook";

const Container = styled.div`
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
    z-index: 2;
    padding: 20px;

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

// const thisRouters = [
//     {
//         name: '카테고리 생성',
//         pathname: '/product-category/create'
//     },
//     {
//         name: '상품 생성',
//         pathname: '/products/create'
//     }
// ]

const thisRouters = [
    {
        title: '상품 생성 관리',
        page: [
            {
                name: '카테고리 생성',
                pathname: '/product-category/create'
            },
            {
                name: '상품 생성',
                pathname: '/products/create'
            }
        ]
    },
    {
        title: '상품 관리',
        page: [
            {
                name: '카테고리 수정',
                pathname: '/product-category/modify'
            },
            {
                name: '상품 조회 / 수정',
                pathname: '/products'
            }
        ]
    },
    {
        title: '입출고 관리',
        page: [
            {
                name: '입고 등록',
                pathname: '/products/receive'
            },
            {
                name: '출고 등록',
                pathname: '/products/release'
            },
            {
                name: '입출고 현황',
                pathname: '/products/stock-status'
            }
        ]
    }
]

const ProductManagementNavbar = () => {

    const {
        location
    } = useRouterHook();

    return (
        <Container>
            {/* <div className='nav-title'>상품 등록 관리</div>
            {thisRouters.map(r => {
                return (
                    <div key={r.name} className='link-box'>
                        <Link
                            to={r.pathname}
                            replace={true}
                        >
                            <button
                                type='button'
                                className={`button-el ${location.pathname === r.pathname ? 'button-active' : ''}`}
                            >
                                {r.name}
                            </button>
                        </Link>
                        
                    </div>
                )
            })} */}

            {thisRouters.map(r => {
                return (
                    <div className='group-box' key={'navbar-' + r.title}>
                        <div className='nav-title'>{r.title}</div>
                        {r.page?.map(navPage => {
                            return (
                                <div key={navPage.name} className='link-box'>
                                    <Link
                                        to={navPage.pathname}
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
            })}
        </Container>
    )
}

export default ProductManagementNavbar;