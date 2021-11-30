import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from "react";
import {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const MemoContainer = styled.div`
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    margin-bottom: 10px;

    .close-button {
        float: right;
        top: -5px;
    }
`;

const NameGroup = styled.div`
    & .input-group{
        padding: 15px;
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
    border-top: 1px solid #efefef;

    @media only screen and (max-width:992px){
        padding: 15px 0;
    }
`;
const SubmitBtn = styled.button`
    float: right;
    background:#99cccc;
    border:1px solid #99cccc;
    border-radius:3px;
    color:white;
    font-weight:700;
    padding:5px 20px;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

const DeliveryReadyReceiveMemoModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.__handleEventControl().deliveryReadyReceiveMemo().close()}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <MemoContainer>
                        <GroupTitle>재고반영 취소 메모 작성
                            <IconButton aria-label="close" className="close-button" onClick={() => props.__handleEventControl().deliveryReadyReceiveMemo().close()}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>
                        <form onSubmit={(e) => props.__handleEventControl().releaseCheckedOrderList().cancelReflectedStockUnit(e)}>
                            <NameGroup>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            메모
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='receiveMemo'
                                        value={props.releaseCompletedMemo.receiveMemo}
                                        onChange={(e) => props.__handleEventControl().deliveryReadyReceiveMemo().writeReceiveMemo(e)}
                                    />
                                </div>
                            </NameGroup>
                            <SubmitBtnGroup className="clearfix">
                                <SubmitBtn type='submit' disabled={props.isObjectSubmitted.cancelReflectedUnit}>등록</SubmitBtn>
                            </SubmitBtnGroup>
                        </form>
                </MemoContainer>
            </Dialog>
        </>
    )
}

export default DeliveryReadyReceiveMemoModal;