import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Container = styled.div`
    overflow: auto;
    background-color: rgba(122, 123, 218, 0.125);
`;

const Form = styled.form`
    margin: 0 20px;
`;

const FormBox = styled.span`
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
    font-size: 14px;
    padding: 15px 20px;
    color: #555;
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: rgba(122, 123, 218);
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 12px;
    }

    @media only screen and (max-width:576px){
        padding: 10px 0px 0px 10px;
    }
`;

const DataDownloadBtn = styled.button`
    margin: 10px;
    margin-right: 20px;
    border: 1px solid transparent;
    font-size: 16px;
    padding: 6px;
    color: white;
    width: 150px;
    float: right;
    border-radius: 3px;
    background-color: rgba(132, 149, 201, 0.8);
    transition: opacity 0.1s linear;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    @media only screen and (max-width:992px){
        width: 100px;
    }

    @media only screen and (max-width:768px){
        font-size: 12px;
        margin-right: 40px;
    }

    @media only screen and (max-width:576px){
        width: 70px;
        font-size: 10px;
        margin: 10px 25px 10px 0px;
    }
`;

const DeliveryReadyViewCoupangBar = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
            <Container>
                    <PageControlDiv>
                        <PageControlBtn type="button" onClick={() => props.__handleEventControl().movePage().deliveryReadyUpload()}><KeyboardArrowLeftIcon /> 쿠팡 배송준비 파일 업로드</PageControlBtn>
                        <DataDownloadBtn type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().coupangExcelDownload(e)}>엑셀 다운</DataDownloadBtn>
                    </PageControlDiv>
                    <Form>
                        <FormBox>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().hansanFormDownload(e)}>한산 발주서 다운</DownloadButton>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().tailoFormDownload(e)}>테일로 발주서 다운</DownloadButton>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().lotteFormDownload(e)}>롯데 발주서 다운</DownloadButton>
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

export default DeliveryReadyViewCoupangBar;