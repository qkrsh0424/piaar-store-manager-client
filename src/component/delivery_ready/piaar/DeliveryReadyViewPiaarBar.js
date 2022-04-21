import React, { useMemo } from 'react';
import styled from 'styled-components';
// import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Container = styled.div`
    overflow: auto;
    /* background-color: rgba(122, 123, 218, 0.125); */
`;

const Form = styled.form`
    margin: 0 20px;
`;

const FormBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    @media only screen and (max-width:992px){
        font-size: 14px;
        grid-template-columns: repeat(1, 1fr);
    }

    @media only screen and (max-width:576px){
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
    background-color: rgba(122, 123, 218, 0.001);
    font-weight: 600;
    border: none;
    transition: opacity 0.1s linear;

    &:hover {
        color: #2C73D2;
        cursor: pointer;
    }

    @media only screen and (max-width:768px){
        font-size: 12px;
    }

    @media only screen and (max-width:576px){
        padding: 10px 0px 0px 10px;
    }
`;

const DeliveryReadyViewPiaarBar = (props) => {
    const userRdx = useSelector(state => state.user);

    return (
        <>
            {userRdx.isLoading === false &&
            <Container>
                    <PageControlDiv>
                        <PageControlBtn type="button" onClick={() => props.moveUploadPageControl()}><KeyboardArrowLeftIcon /> 피아르 배송준비 파일 업로드</PageControlBtn>
                        {/* <DataDownloadBtn type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().naverExcelDownload(e)}>엑셀 다운</DataDownloadBtn> */}
                    </PageControlDiv>
                    <Form>
                        <FormBox>
                            {/* <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().hansanFormDownload(e)}>한산 발주서 다운</DownloadButton>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().tailoFormDownload(e)}>테일로 발주서 다운</DownloadButton>
                            <DownloadButton type="button" onClick={(e) => props.__handleEventControl().downloadOrderFormData().lotteFormDownload(e)}>롯데 발주서 다운</DownloadButton>
                            <StoreInfoText type="text" name="storeName" placeholder="스토어명" onChange={(e) => props.__handleEventControl().storeInfo().modifyStoreNameOnChangeInputValue(e)} value={props.storeInfoData.storeName} required></StoreInfoText>
                            <StoreInfoText type="text" name="storeContact" placeholder="스토어 전화번호" onChange={(e) => props.__handleEventControl().storeInfo().modifyStoreContactOnChangeInputValue(e)} value={props.storeInfoData.storeContact} required></StoreInfoText> */}
                        </FormBox>
                    </Form>
            </Container>
            }
        </>
    )
}

export default DeliveryReadyViewPiaarBar;