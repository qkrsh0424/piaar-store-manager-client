import { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const Container = styled.div`
`;

const BodyWrapper = styled.div`
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

    .closeButton {
        float: right;
        top: -5px;
    }
`;

const NameGroup = styled.ul`
    list-style: none;
    padding:0 10px;
`;

const ReleaseLi = styled.li`
`;

const ModalText = styled.div`
    font-size: 1rem;
    border: 1px solid #ced4da;
    background: #fffde2;
`;

const ReleaseStatusModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    const onClose = () => {
        props.__handleEventControl().release().releaseModalClose();
    }

    return(
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open} 
                onClose={() => props.__handleEventControl().release().releaseModalClose()}
            >
                <Container>
                    <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                        <GroupTitle>
                            <span>출고현황</span>
                            <IconButton aria-label="close" className="closeButton" onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>
                        <NameGroup>
                            <ReleaseLi className="input-group mb-3">
                                <div className="form-control">
                                    <span>출고 날짜</span>
                                </div>
                                <div className="form-control">
                                    <span>출고 개수</span>
                                </div>
                                <div className="form-control">
                                    <span>메모</span>
                                </div>
                            </ReleaseLi>
                            {props && props.releaseStatusData.map((data) => {
                                return (
                                    <ReleaseLi className="input-group mb-3">
                                        <ModalText className="form-control">
                                            <span>
                                                {(data.createdAt).substring(0, 10)}
                                            </span>
                                        </ModalText>
                                        <ModalText className="form-control">
                                            <span>
                                                {data.releaseUnit}
                                            </span>
                                        </ModalText>
                                        <ModalText className="form-control">
                                            <span>
                                                {data.memo}
                                            </span>
                                        </ModalText>
                                    </ReleaseLi>
                                )
                            })}
                        </NameGroup>
                    </BodyWrapper>
                </Container>
            </Dialog>
        </>
    );
}

export default ReleaseStatusModal;