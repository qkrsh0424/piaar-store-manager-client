import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container = styled.div`
    overflow: auto;
    background-color: rgba(122, 123, 218, 0.125);
`;

const DownloadBar = styled.div`
    color: white;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    height: auto;
    overflow: auto;
    margin-bottom: 10px;
`;

const Form = styled.form`
    margin: 0 20px;
`;

const FormBox = styled.span`
    /* 992px, 768px, 576px, 320px */    
    @media only screen and (max-width:768px){
        display: block;
    }
`;

const DownloadButton = styled.button`
    margin: 5px;
    border: 1px solid transparent;
    font-size: 16px;
    padding: 8px;
    color: white;
    width: 200px;
    border-radius: 3px;
    font-weight: bold;
    background-color: rgba(122, 146, 218, 0.88);
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:992px){
        font-size: 14px;
        width: 150px;
        margin: 2px;
    }

    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 48%;
    }

    @media only screen and (max-width:578px){
        font-size: 12px;
    }
    
    /* @media only screen and (max-width:578px){
        font-size: 12px;
        width: 50%;
        margin: 2px;
    }

    @media only screen and (max-width:320px){
        font-size: 10px;
        width: 110px;
        margin: 2px;
    } */
`;

const StoreInfoText = styled.input`
    margin: 5px;
    border: 1px solid #a7a7a740;
    text-align: center;
    padding: 5px 0;

    @media only screen and (max-width:992px){
        font-size: 14px;
        width: 150px;
        margin: 2px;
    }
    
    @media only screen and (max-width:768px){
        font-size: 14px;
        width: 48%;
    }

    @media only screen and (max-width:578px){
        font-size: 12px;
    }
`;

const PageControlDiv = styled.div`
    width: 100%;
    overflow: auto;
`;

const PageControlBtn = styled.button`
    display: block;
    height: 50px;
    float: right;
    font-size: 14px;
    width: 220px;
    padding: 6px;
    color: #555;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: rgba(122, 123, 218);
        cursor: pointer;
    }

    @media only screen and (max-width:700px){
        font-size: 12px;
    }
`;

const DeliveryReadyViewBar = (props) => {
    const userRdx = useSelector(state => state.user);
    return (
        <>
            {userRdx.isLoading === false &&
            <Container>
                    <PageControlDiv>
                        <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().deliveryReadyUpload()}>배송준비 파일 업로드 <KeyboardArrowRightIcon /></PageControlBtn>
                    </PageControlDiv>
                    <Form>
                        <FormBox>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().hansanFormDownload(e)}>한산 발주서 다운</DownloadButton>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().tailoFormDownload(e)}>테일로 발주서 다운</DownloadButton>
                        </FormBox>
                        <FormBox>
                            <StoreInfoText type="text" name="storeName" placeholder="스토어명" onChange={(e) => props.__handleEventControl().storeInfo().modifyStoreNameOnChangeInputValue(e)} value={props.storeInfoData.storeName} required></StoreInfoText>
                            <StoreInfoText type="text" name="storeContact" placeholder="스토어 전화번호" onChange={(e) => props.__handleEventControl().storeInfo().modifyStoreContactOnChangeInputValue(e)} value={props.storeInfoData.storeContact} required></StoreInfoText>
                        </FormBox>
                    </Form>
            </Container>
            }
        </>
    )
}

export default DeliveryReadyViewBar;