import styled, { css } from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from "react";
import {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const OptionContainer = styled.div`
`;

const OptionHeader = styled.li`
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px;

    background: rgb(147, 167, 194, 0.7);
`;

const OptionLi = styled.li`
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px;

    // 체크 항목 하이라이트
    ${(props) => props.checked ?
        css`
            background-color: #9bb6d150;
        `
        :
        css`
            &:hover{
                background: #9bb6d130;
                cursor: pointer;
            }
        `
    }
`;

const OptionInfoLi = styled.li`
    display: flex;
    border-radius: 10px;
    margin-bottom: 5px;

    .info-title {
        background: rgb(255, 253, 226);
        font-size: large;
    }
`;

const OptionInfoTitle = styled.div`
    padding: 2px;
    margin-bottom: 15px;
    border-bottom: 2px solid rgb(241, 241, 241);
`;

const GroupTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding:15px;
    margin-bottom: 10px;

    .closeButton {
        float: right;
        top: -5px;
    }
`;

const NameGroup = styled.div`
    padding: 0 15px;
`;

const ModalText = styled.div`
    overflow: hidden;
    min-height: 30px;
    height: auto;
    font-size: 15px;
    border: 1px solid #ced4da;
    background: rgb(147, 167, 194, 0.2);
    width: 25%;
    padding: 2px;
    text-align: center;
    margin-bottom: 2px;
`;

const ChangeBtn = styled.button`
    margin: 10px;
    float: right;
    width: 100px;
    vertical-align: middle;
    font-size: 15px;
    border-radius: 3px;
    border: 1px solid #a7a7a7;
    overflow: auto;
    height: 4vh;
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:400px){
        width: 80px;
    }
`;

const OptionDataList = styled.div`
    height: 50vh;
    overflow: auto;
`;

const ChangeBox = styled.div`
    width: 100%;
    display: inline-block;
`;

const DeliveryReadyOptionInfoModal = (props) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.__handleEventControl().deliveryReadyOptionInfo().close()}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <OptionContainer>
                    <div style={{ borderBottom: '2px solid #f1f1f1' }}>
                        <GroupTitle>옵션리스트
                            <IconButton aria-label="close" className="closeButton" onClick={() => props.__handleEventControl().deliveryReadyOptionInfo().close()}>
                                <CloseIcon />
                            </IconButton>
                        </GroupTitle>
                        <NameGroup>
                            <OptionInfoTitle>
                                <OptionInfoLi>
                                    <ModalText className="info-title">
                                        <span>현재</span>
                                    </ModalText>
                                    <ModalText className="info-title">
                                        <span>{props.originOptionManagementCode}</span>
                                    </ModalText>
                                    <ModalText className="info-title">
                                        <span>변경</span>
                                    </ModalText>
                                    <ModalText className="info-title">
                                        <span>{props.changedOptionManagementCode}</span>
                                    </ModalText>
                                </OptionInfoLi>
                                <ChangeBox>
                                    <ChangeBtn onClick={() => props.__handleEventControl().deliveryReadyOptionInfo().changeItemsOption()} className="update-all">
                                        <span>일괄 변경</span>
                                    </ChangeBtn>
                                    <ChangeBtn onClick={() => props.__handleEventControl().deliveryReadyOptionInfo().changeItemOption()}>
                                        <span>변경</span>
                                    </ChangeBtn>
                                </ChangeBox>
                            </OptionInfoTitle>
                            <OptionHeader className="input-group">
                                <ModalText><span>옵션관리코드</span></ModalText>
                                <ModalText><span>상품명</span></ModalText>
                                <ModalText><span>옵션명1</span></ModalText>
                                <ModalText><span>옵션명2</span></ModalText>
                            </OptionHeader>
                            <OptionDataList>
                            {props.deliveryReadyOptionInfo?.map((data, index) => {
                                return (
                                    <OptionLi 
                                        key={'optionInfo' + index}
                                        className="input-group"
                                        onClick={() => props.__handleEventControl().deliveryReadyOptionInfo().checkOneLi(data.optionCode)}
                                    >
                                        <ModalText className="form-control">
                                            <span>
                                                {data.optionCode}
                                            </span>
                                        </ModalText>
                                        <ModalText className="form-control">
                                            <span>
                                                {data.prodDefaultName}
                                            </span>
                                        </ModalText>
                                        <ModalText className="form-control">
                                            <span>
                                                {data.optionDefaultName}
                                            </span>
                                        </ModalText>
                                        <ModalText className="form-control">
                                            <span>
                                                {data.optionManagementName}
                                            </span>
                                        </ModalText>
                                    </OptionLi>
                                )
                            })}
                            </OptionDataList>
                        </NameGroup>
                    </div>
                </OptionContainer>
            </Dialog>
        </>
    )
}

export default DeliveryReadyOptionInfoModal;