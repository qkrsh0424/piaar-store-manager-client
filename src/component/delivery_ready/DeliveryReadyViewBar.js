import React,{useMemo} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
    overflow: auto;
    background-color: rgba(122, 123, 218, 0.125);
`;

const DownloadBar = styled.div`
    color: white;
    height: 50px;
    display: flex;
    border-radius: 5px;
    margin-bottom: 5px;
    height: auto;
    overflow: auto;
`;

const Form = styled.form`
    margin: 10px;
    margin-left: 20px;
`;

const FormBox = styled.span`
    @media only screen and (max-width:900px){
        display: block;
    }
`;

const DownloadButton = styled.button`
    margin: 5px;
    display: inline-block;
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

    @media only screen and (max-width:450px){
        width: 150px;
    }
`;

const StoreInfoText = styled.input`
    margin: 5px;
    border: 1px solid #a7a7a740;
    text-align: center;
    height: 33px;

    @media only screen and (max-width:900px){
        width: 195px;
    }

    @media only screen and (max-width:450px){
        width: 150px;
    }
`;

const DeliveryReadyViewBar = (props) => {
    const userRdx = useSelector(state => state.user);

    return useMemo(() => (
        <>
            {userRdx.isLoading === false &&
            <Container>
                <DownloadBar>
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
                </DownloadBar>
            </Container>
            }
        </>
    ), [props.storeInfoData])
}

export default DeliveryReadyViewBar;