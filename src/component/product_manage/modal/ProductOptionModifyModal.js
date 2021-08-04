import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

const Container = styled.div`
`;


const BodyWrapper = styled.div`
    padding:0 10px;

    .icon-dot, .icon-must {
        display: inline-block;
        background-color: #ff545c;
        border-radius: 50%;
        vertical-align: middle;
    }

    .icon-must {
        position: relative;
        /* top:-3px; */
        margin-left: 5px;
        width: 6px;
        height: 6px;
    }
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    @media only screen and (max-width:425px){
        padding: 15px 0;
    }
`;

const NameGroup = styled.div`
    & .input-group{
        padding: 0 15px;
    }

    @media only screen and (max-width:992px){
        & .input-group{
            padding: 0;
        }
    }
`;

const CommonInputEl = styled.input`
    font-size: 1rem;
    border: 1px solid #ced4da;
    background: #fffde2;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const SubmitBtnGroup = styled.div`
    padding: 15px;

    @media only screen and (max-width:992px){
        padding: 15px 0;
    }
`;
const SubmitBtn = styled.button`
    float: right;
    background:#7a7bda;
    border:1px solid #7a7bda;
    border-radius:3px;
    color:white;
    font-weight:700;
    padding:8px;
`;

const ProductOptionModifyModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().productOption().modifyModalClose()}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().productOption().submitModifyData(e)}>
                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                            <GroupTitle>옵션수정</GroupTitle>
                            <NameGroup>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            옵션명
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='defaultName'
                                        value={props.productOptionModifyData.defaultName}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            관리옵션명
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='managementName'
                                        value={props.productOptionModifyData.managementName}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            관리코드
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='code'
                                        value={props.productOptionModifyData.code}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            상품가격
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='salesPrice'
                                        value={props.productOptionModifyData.salesPrice}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            현재상태
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='status'
                                        value={props.productOptionModifyData.status}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            비고
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='memo'
                                        value={props.productOptionModifyData.memo}
                                        onChange={(e) => props.__handleEventControl().productOption().modifyDataOnChangeInputValue(e)}
                                    />
                                </div>
                            </NameGroup>
                        </BodyWrapper>
                        <BodyWrapper>
                            <SubmitBtnGroup className='clearfix'>
                                <SubmitBtn type='submit'>수정하기</SubmitBtn>
                            </SubmitBtnGroup>
                        </BodyWrapper>
                    </form>
                </Container>

            </Dialog>
        </>
    );
}

export default ProductOptionModifyModal;