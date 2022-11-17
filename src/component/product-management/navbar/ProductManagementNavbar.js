import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useRouterHook from "../../../hooks/router/useRouterHook";

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
        z-index: 2;
        padding: 20px;
        left: -200px;

        &.navbar-item-open {
            left: 0;
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
`;

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
    // {
    //     title: '입출고 관리',
    //     page: [
    //         {
    //             name: '입고 등록',
    //             pathname: '/products/receive'
    //         },
    //         {
    //             name: '출고 등록',
    //             pathname: '/products/release'
    //         },
    //         {
    //             name: '입출고 현황',
    //             pathname: '/products/stock-status'
    //         }
    //     ]
    // }
]

const ProductManagementNavbar = (props) => {
    const {
        location
    } = useRouterHook();

    return (
        <Container>
            <NavbarBox>
                <div className={`navbar-item ${props.navbarOpen && 'navbar-item-open slide-right'}`}>
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
                    })
                    }
                </div>
            </NavbarBox>
        </Container>
    )
}

export default ProductManagementNavbar;