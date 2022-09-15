import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import { formControlClasses } from '@mui/material';

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

const KeyGroup = styled.div`
    & .input-group{
        padding: 0 15px;
    }

    @media only screen and (max-width:992px){
        & .input-group{
            padding: 0;
        }
    }
`;

const CommonFunctionalBtn = styled.button`
    float:right;
`;

const TableContainer = styled.div`
	overflow: auto;
    & .fixedHeader {
        position: sticky;
        top: -1px;
        background: white;
    }
`;

const OptionTableTh = styled.th`
    padding:8px !important;
    border: 1px solid #dee2e6;
    text-align: center;
`;
const OptionTableTd = styled.td`
    padding:8px !important;
    border: 1px solid #dee2e6;
    text-align: center;
`;
const OptionInput = styled.input`
    border: none;
    text-align: center;
    font-weight: 700;
    width:100%;
    padding:5px;
`;

const UploadInputEl = styled.input`
    display: none;
`;

const ImageBox = styled.div`
   position: relative;
   padding-bottom: 100%; // 1:1
`;

const ImageWrapper = styled.div`
   width:20%;
   height:auto;
   padding: 10px 10px;

   @media only screen and (max-width:992px){
        width:35%;
   }
    @media only screen and (max-width:425px){
        width:50%;
    }

    &:hover {
        ${ImageBox} {
            opacity: 0.3;
        }
    }
`;

const ImageEl = styled.img`
   position: absolute;
   object-fit: cover;
   width: 90%;
   height: 90%;
   transition: .5s;
   border:1px solid #f1f1f1;
   border-radius: 8px;
   cursor: pointer;
`;

const ImageDeleteBtn = styled.button`
    color: #dc3545;
    border: 1px solid #ced4da;
    background-color: white;
`;

const ProductOptionAddModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().productOption().addModalClose()}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().productOption().submitAddData(e)}>
                        <BodyWrapper>
                            <GroupTitle>
                                옵션추가
                            </GroupTitle>
                            <NameGroup>
                            <div className="input-group mb-3">
                                    <UploadInputEl
                                        id={`i_pm_pom_uploader_${props.productOptionAddData.id}`}
                                        type="file"
                                        accept="image/*"
                                        onClick={(e) => e.target.value = ''}
                                        onChange={(e) => props.__handleEventControl().productOption().postUploadImageFile(e)}
                                    />
                                    {props.productOptionAddData.imageUrl ?
                                        <div className="input-group-prepend">
                                            <ImageDeleteBtn className="btn btn-outline-secondary" type="button"
                                            onClick={() => props.__handleEventControl().productOption().deleteImageFile()}
                                            >삭제</ImageDeleteBtn>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <ImageWrapper>
                                    <ImageBox>
                                        {props.productOptionAddData.imageUrl ?
                                            <ImageEl name='imageFile' type="file" src={props.productOptionAddData.imageUrl} title={props.productOptionAddData.imageFileName} onClick={() => props.__handleEventControl().productOption().onClickImageButton(props.productOptionAddData.id)} />
                                            :
                                            <ImageEl name='imageFile' src='/images/icon/no-image.jpg' title='no-image' onClick={() => props.__handleEventControl().productOption().onClickImageButton(props.productOptionAddData.id)} />
                                        }
                                    </ImageBox>
                                </ImageWrapper>
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
                                        value={props.productOptionAddData.defaultName}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
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
                                        value={props.productOptionAddData.managementName}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
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
                                        value={props.productOptionAddData.code}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            판매가
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='salesPrice'
                                        value={props.productOptionAddData.salesPrice}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            매입총합계
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='totalPurchasePrice'
                                        value={props.productOptionAddData.totalPurchasePrice}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            재고수량
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="number"
                                        className='form-control'
                                        name='stockUnit'
                                        value={props.productOptionAddData.stockUnit}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
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
                                        value={props.productOptionAddData.status}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
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
                                        value={props.productOptionAddData.memo}
                                        onChange={(e) => props.__handleEventControl().productOption().addDataOnChangeInputValue(e)}
                                    />
                                </div>
                            </NameGroup>
                        </BodyWrapper>
                        <BodyWrapper>
                            <SubmitBtnGroup className='clearfix'>
                                <SubmitBtn type='submit' disabled={props.isObjectSubmitted.optionAdd}>옵션추가</SubmitBtn>
                            </SubmitBtnGroup>
                        </BodyWrapper>
                    </form>
                </Container>

            </Dialog>
        </>
    );
}

export default ProductOptionAddModal;