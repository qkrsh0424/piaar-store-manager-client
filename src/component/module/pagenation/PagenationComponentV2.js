import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Ripple from '../button/Ripple';
import qs from 'query-string';
import { useState } from 'react';
import { queryByTestId } from '@testing-library/react';

const Container = styled.div`

`;

const Wrapper = styled.div`
    .flex-box{
        display: flex;
        justify-content: ${props => {
        if (!props.align) {
            return 'flex-start'
        }
        switch (props.align) {
            case 'left': return 'flex-start';
            case 'center': return 'center';
            case 'right': return 'flex-end';
            default: return 'flex-start'
        }
    }};
        align-items: center;
    }

    .number-box{
        margin:0 3px;
        font-size: 14px;
        font-weight: 600;
        
        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .page-box {
        display: flex;
        align-items: center;
        width: 150px;
        /* justify-content: center; */
        justify-content: space-around;
    }

    .button-box{
        margin:0 3px;
        width: 30px;
    }

    .circle-button-el{
        position: relative;
        overflow: hidden;
        width: 34px; 
        height: 34px;
        border-radius: 50%;
        border: 1px solid #00000000;
        background: inherit;

        cursor: pointer;

        &:hover{
            background: #e0e0e040;
        }

        @media all and (max-width:992px){
            width: 28px; 
            height: 28px;
        }
    }

    .button-icon-el{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 24px;
        height: 24px;

        @media all and (max-width:992px){
            width: 20px; 
            height: 20px;
        }
    }

    .button-disabled{
        cursor:default;

        &:hover{
            background: none;
        }
    }

    .select-box{
        margin:0 3px;
    }

    .select-el{
        /* width: 70px;
        height: 23px; */
        width: 80px;
        height: 30px;
        text-align: center;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 11px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        cursor: pointer;

        &:focus{
            outline: none;
        }
    }

    .button-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .button-header .button-el {
        width: 70px;
        border-radius: 2px;
        border: 1px solid #c8c8c8;
        background-color: #f7f7f7;
        color: #444;
        font-size: 14px;
        height: 30px;
    }
`;

const PageInputTooltipWrapper = styled.div`
    position: absolute;

    .tooltip-box {
        padding: 10px;
        border-radius: 3px;
        width: 160px;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        position: absolute;
        box-shadow: 0px 0px 6px 2px #d8d8d8;
        z-index: 12;
    }

    .tooltip-box .button-box {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
        width: 100%;
    }

    .input-el {
        border: 1px solid #c8c8c8;
    }

    .button-box .button-el {
        min-width: 70px;
        border-radius: 2px;
        border: 1px solid var(--defaultBorderColor);
        background-color: var(--defaultButtonColor);
        color: #444;
        font-size: 14px;
        height: 30px;
    }
`;

function PageInputTooltip({ pageInputFieldValue, inputType, currentPage, totalElementSize, tootipSize, onChangeInputValue, onActionCancel, onActionConfirm }) {
    return (
        <PageInputTooltipWrapper>
            <div className='tooltip-box' style={tootipSize}>
                <input
                    type={inputType}
                    className='input-el'
                    style={{ width: '100%' }}
                    onChange={(e) => onChangeInputValue(e)}
                    min={1}
                    max={totalElementSize}
                    value={pageInputFieldValue || currentPage}
                    autoFocus
                />
                <div className='button-box'>
                    <button type='button' className='button-el' onClick={(e) => onActionCancel(e)}>
                        취소
                    </button>
                    <button type='button' className='button-el' onClick={(e) => onActionConfirm(e)}>
                        확인
                    </button>
                </div>
            </div>
        </PageInputTooltipWrapper>
    )
}

const PagenationComponentV2 = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);

    const [pageInputFieldOpen, setPageInputFieldOpen] = useState(false);
    const [pageInputFieldValue, setPageInputFieldValue] = useState('');

    const onActionPrev = () => {
        if (props.isFirst) {
            return;
        }

        let pageIndex = props.pageIndex + 1;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                page: pageIndex - 1
            }
        }), {
            replace: true
        })

    }

    const onActionNext = () => {
        if (props.isLast) {
            return;
        }

        let pageIndex = props.pageIndex + 1;

        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                page: pageIndex + 1
            }
        }), {
            replace: true
        })
    }

    const onActionChangeSize = (e) => {
        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                size: e.target.value,
                page: 1
            }
        }), {
            replace: true
        })
    }

    const onActionOpenPageInput = () => {
        setPageInputFieldOpen(true);
    }

    const onChangePageInputValue = (e) => {
        setPageInputFieldValue(e.target.value)
    }

    const onActionCloseTooltip = () => {
        setPageInputFieldValue(null);
        setPageInputFieldOpen(false);
    }

    const onActionConfirmTooltip = () => {
        navigate(qs.stringifyUrl({
            url: location.pathname,
            query: {
                ...query,
                page: pageInputFieldValue
            }
        }), {
            replace: true
        })

        setPageInputFieldValue(null);
        setPageInputFieldOpen(false);
    }

    return (
        <>
            <Container>
                <Wrapper
                    align={props.align}
                    isFirst={props.isFirst}
                    isLast={props.isLast}
                >
                    <div className='flex-box'>
                        {props.sizeElements &&
                            <div className='select-box'>
                                <select className='select-el' onChange={onActionChangeSize}>
                                    {props.sizeElements.map((r, index) => {
                                        return (
                                            <option key={index} value={r}>{r} 개 보기</option>
                                        );
                                    })}
                                </select>
                            </div>
                        }
                        {props.sizeElements && 
                            <div className='button-header'>
                                <button
                                    className='button-el'
                                    onClick={() => onActionOpenPageInput()}
                                >입력</button>
                                {pageInputFieldOpen &&
                                    <PageInputTooltip
                                        inputType={'number'}
                                        tootipSize={{ width: '160px' }}
                                        pageInputFieldValue={pageInputFieldValue}
                                        currentPage={props.pageIndex+1}
                                        totalElementSize={props.totalPages}
                                        onChangeInputValue={onChangePageInputValue}
                                        onActionConfirm={onActionConfirmTooltip}
                                        onActionCancel={onActionCloseTooltip}
                                    />
                                }
                            </div>
                        }
                        <div className='page-box'>
                            <div className='button-box' >
                                {(!props.isFirst) &&
                                    <button className={`circle-button-el`} onClick={onActionPrev}>
                                        <img
                                            src='/assets/icon/left_navigation_icon.png'
                                            className='button-icon-el'
                                            alt='left navigation icon'
                                            loading='lazy'
                                        ></img>
                                        <Ripple color={'#e0e0e0'} duration={800}></Ripple>
                                    </button>
                                }
                            </div>
                            <div className='number-box'>
                                <span>{props.totalElements !== 0 ? props.pageIndex + 1 : '0'}</span> / <span>{props.totalPages || '0'}</span>
                            </div>
                            <div className='button-box'>
                                {(!props.isLast) &&
                                    <button className={`circle-button-el`} onClick={onActionNext}>
                                        <img
                                            src='/assets/icon/right_navigation_icon.png'
                                            className='button-icon-el'
                                            alt='right navigation icon'
                                            loading='lazy'
                                        ></img>
                                        <Ripple color={'#e0e0e0'} duration={800}></Ripple>
                                    </button>
                                }
                            </div>
                        </div>
                        <div className='number-box'>
                            TOTAL {props.totalElements || 0}
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default PagenationComponentV2;