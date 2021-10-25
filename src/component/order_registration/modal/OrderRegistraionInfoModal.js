import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from "react";
import {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

    .close-button {
        float: right;
        top: -5px;
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

const OrderRegistrationInfoModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.__handleEventControl().orderRegistrationInfo().close()}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().orderRegistrationInfo().submitModifyData(e)}>
                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                            <GroupTitle>발주 등록 데이터 수정
                                <IconButton aria-label="close" className="close-button" onClick={() => props.__handleEventControl().orderRegistrationInfo().close()}>
                                    <CloseIcon />
                                </IconButton>
                            </GroupTitle>
                            <NameGroup>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            배송방식
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='transportType'
                                        value={props.orderRegistrationItem.transportType}
                                        onChange={(e) => props.__handleEventControl().orderRegistrationInfo().modifyDataChangeInputValue(e)}
                                        required
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            택배사
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='deliveryService'
                                        value={props.orderRegistrationItem.deliveryService}
                                        onChange={(e) => props.__handleEventControl().orderRegistrationInfo().modifyDataChangeInputValue(e)}
                                        required
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
    )
}

export default OrderRegistrationInfoModal;