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

const DefaultInfo = styled.div`
    color: red;
    padding: 0 15px 15px 15px;
`;

const ProductDetailAddModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().productDetail().addModalClose()}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().productDetail().submitAddData(e)}>
                        <BodyWrapper>
                            <GroupTitle>
                                상세추가
                            </GroupTitle>
                            <DefaultInfo>* 기본으로 주어지는 데이터는 상품에 등록된 기본값입니다.</DefaultInfo>
                            <NameGroup>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            사이즈_가로(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='detailWidth'
                                        value={props.productDetailAddData.detailWidth}
                                        onChange={(e) => props.__handleEventControl().productDetail().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            사이즈_세로(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='detailLength'
                                        value={props.productDetailAddData.detailLength}
                                        onChange={(e) => props.__handleEventControl().productDetail().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            사이즈_높이(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='detailHeight'
                                        value={props.productDetailAddData.detailHeight}
                                        onChange={(e) => props.__handleEventControl().productDetail().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            내품수량
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='detailQuantity'
                                        value={props.productDetailAddData.detailQuantity}
                                        onChange={(e) => props.__handleEventControl().productDetail().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            무게(kg)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='detailWeight'
                                        value={props.productDetailAddData.detailWeight}
                                        onChange={(e) => props.__handleEventControl().productDetail().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                            </NameGroup>
                        </BodyWrapper>
                        <BodyWrapper>
                            <SubmitBtnGroup className='clearfix'>
                                <SubmitBtn type='submit'>상세추가</SubmitBtn>
                            </SubmitBtnGroup>
                        </BodyWrapper>
                    </form>
                </Container>

            </Dialog>
        </>
    );
}

export default ProductDetailAddModal;