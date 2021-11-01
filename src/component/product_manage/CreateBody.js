import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { browserName, CustomView, isMobile, isIOS, isSafari } from 'react-device-detect';

import { numberWithCommas } from '../../handler/numberHandler';
import { ContactPhoneOutlined } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`
    margin-top: 80px;
    margin-bottom: 120px;
`;

const BackBtn = styled.button`
    position: fixed;
    top:10px;
    left:10px;
    background: #4682B4;
    border:none;
    width:52px;
    height: 52px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    transition: 0.4s;
    z-index: 999;
    
    & .back-button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
        
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        background:#4662B4;
    }
`;

const CreateBtn = styled.button`
    position: fixed;
    bottom:30px;
    right:30px;
    background: #4682B4;
    border:none;
    width:70px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    z-index: 999;
    transition: 0.4s;
    & .button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        background:#4662B4;
    }
`;

const ItemContainer = styled.div`
    margin: 10px 0;

    animation: scaleOutToIn 0.8s;
    -moz-animation: scaleOutToIn 0.8s; /* Firefox */
    -webkit-animation: scaleOutToIn 0.8s; /* Safari and Chrome */
    -o-animation: scaleOutToIn 0.8s; /* Opera */
    
`;

const ItemWrapper = styled.div`
    background:white;
    border: 1px solid #4682B488;
    border-radius: 5px;

    padding-bottom: 15px;
`;

const ItemHeaderWrapper = styled.div`
    border-bottom: 1px solid #4682B488;
    padding:10px;
    overflow: auto;
    
    & .ref-stock-btn-active {
        background-color: #4682B4;
        color: white;
    }
`;

const BodyContainer = styled.div`

`;

const IdentifyBtn = styled.button`
    width:140px;
    margin:5px;
    padding:5px;
    background: white;
    border: none;
    border-left:5px solid #4682B4;
    color:#4682B4;
    font-weight: 600;
    float: left;
`;

const DeleteBtn = styled.button`
    width:70px;
    margin:5px;
    padding:5px;
    background: white;
    border:1px solid #dc3545;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px #f1f1f1;
    color:#dc3545;
    font-weight: 600;
    float: right;
`;

const RefCheckBtn = styled.button`
    width:100px;
    margin:5px;
    padding:5px;
    background: white;
    border:1px solid #4682B4;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px #f1f1f1;
    color:#4682B4;
    font-weight: 600;
    float: right;
`;

const FormAddContainer = styled.div`
    padding:10px;
    margin:10px;
    text-align: center;
`;
const FormAddBtnEl = styled.button`
    width:52px;
    height: 52px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    border:1px solid #f1f1f100;
    background: #4682B4;
    color:white;
    transition: 0.4s;
    & .button-img{
        width:32px;
        filter: invert(100%) sepia(1%) saturate(3%) hue-rotate(90deg) brightness(113%) contrast(89%);
    }

    &:hover{
        transform: scale(1.1);
    }

    &:active{
        transition: 0s;
        transform: scale(1.05);

        background:#4662B4;
    }
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

const OptionBodyWrapper = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #4682B417;

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

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1rem;
    padding:0 10px;
    column-gap: 5px;
    @media only screen and (max-width:425px){
        font-size: 12px;
        padding: 0;
    }

    & .category-btn-active{
        background: #4682B4;
        color:white;
    }
`;

const CategorySelectBtn = styled.button`
    /* width:100px; */
    /* margin:5px; */
    padding:5px;
    background: white;
    border:1px solid #4682B4;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 2px #f1f1f1;
    color:#333;
    font-weight: 600;
`;

const CommonInputEl = styled.input`
    font-size: 1.2rem;
    border: 1px solid #ced4da;
    background: #fffde2;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
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
    border:1px solid #f1f1f100;
    background: #4682B4;
    border-radius: 50%;
    padding: 10px;
    color: white;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

    &:hover{
         transform: scale(1.1);
     }

     &:active{
         transition: 0s;
         transform: scale(1.05);

         background:#4662B4;
     }
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
   width:25%;
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

const OptionAddBtn = styled.div`
    text-align: center;
    padding: 5px 0px;
`;

const OptionDeleteBtn = styled.button`
    border:1px solid #ef5350;
    color: #ef5350;
    font-weight: 600;
    padding: 7px 12px;
    border-radius: 50%;
    float: right;

    &:hover{
         transform: scale(1.1);
     }

     &:active{
         transition: 0s;
         transform: scale(1.05);

         background:#4662B4;
     }
`;

const CreateBody = (props) => {
    return (
        <>
            <BackBtn type='button' onClick={() => props.history.replace('/products')}>
                <img className='back-button-img' src='/images/icon/back-button.png'></img>
            </BackBtn>
            <Container className='container'>
                <form onSubmit={(e) => props.__handleEventControl().productListData().submit(e)}>
                <CreateBtn type='submit'>
                    <img className='button-img' src='/images/icon/add.png'></img>
                </CreateBtn>
                    {props.productListData && props.productListData.map(r => {
                        return (
                            <ItemContainer key={r.id}>
                                <ItemWrapper>
                                    <ItemHeaderWrapper>
                                        <IdentifyBtn disabled>{r.id.split('-')[0]}</IdentifyBtn>
                                        {/* <DeleteBtn type='button' onClick={() => { props.__handleEventControl().productListData().delete(r.id) }}>삭제</DeleteBtn> */}
                                        <RefCheckBtn type='button' className={r.stockManagement ? `ref-stock-btn-active` : ''} onClick={() => {props.__handleEventControl().productListData().stockManagementCheck(r.id)}}>재고반영 {r.stockManagement ? 'O' : 'X'}</RefCheckBtn>
                                    </ItemHeaderWrapper>
                                    <BodyContainer>
                                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                                            <GroupTitle>카테고리 <i className="icon-must" aria-label="필수항목"></i></GroupTitle>
                                            <CategoryGroup className='mb-3'>
                                                {props.categoryList && props.categoryList.map(r2 => {
                                                    return (
                                                        <CategorySelectBtn key={r2.cid} type='button' className={r.productCategoryCid === r2.cid ? `category-btn-active` : ''} onClick={() => { props.__handleEventControl().productListData().onChangeCategoryValue(r.id, r2.id) }}>{r2.name}</CategorySelectBtn>
                                                    )
                                                })}
                                            </CategoryGroup>
                                        </BodyWrapper>
                                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                                            <GroupTitle>상품명 <i className="icon-must" aria-label="필수항목"></i></GroupTitle>
                                            <NameGroup>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            상품명
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='defaultName' value={r.defaultName} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />

                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            관리상품명
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='managementName' value={r.managementName} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />

                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            메모
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='memo' value={r.memo} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)}/>
                                                
                                                </div>
                                            </NameGroup>
                                        </BodyWrapper>

                                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                                            <GroupTitle>상품식별번호</GroupTitle>
                                            <KeyGroup>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">상품코드</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='code' value={r.code} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />

                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">제조번호</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='manufacturingCode' value={r.manufacturingCode} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">네이버 상품번호</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='naverProductCode' value={r.naverProductCode} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                            </KeyGroup>
                                        </BodyWrapper>

                                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                                            <GroupTitle>상품 이미지</GroupTitle>
                                            <KeyGroup>
                                                <div className="input-group mb-3">
                                                    <UploadInputEl 
                                                        id={`i_pm_cb_uploader_${r.id}`}
                                                        type="file" 
                                                        accept="image/*" 
                                                        onClick={(e) => e.target.value=''}
                                                        onChange={(e) => props.__handleEventControl().productListData().postUploadImageFile(r.id, e)}
                                                    />
                                                    {r.imageUrl ?
                                                        <div className="input-group-prepend">
                                                            <ImageDeleteBtn className="btn btn-outline-secondary" type="button" onClick={() => props.__handleEventControl().productListData().deleteImageFile(r.id)}>삭제</ImageDeleteBtn>
                                                        </div>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                                <ImageWrapper>
                                                    <ImageBox>
                                                        {r.imageUrl ?
                                                            <ImageEl name='imageFile' type="file" src={r.imageUrl} title={r.imageFileName} onClick={() => props.__handleEventControl().productListData().onClickImageButton(r.id)}/>
                                                            :
                                                            <ImageEl name='imageFile' src='/images/icon/no-image.jpg' title='no-image' onClick={() => props.__handleEventControl().productListData().onClickImageButton(r.id)}/>
                                                        }
                                                    </ImageBox>
                                                </ImageWrapper>
                                            </KeyGroup>
                                        </BodyWrapper>

                                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                                            <GroupTitle>수입 정보</GroupTitle>
                                            <KeyGroup>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">HS CODE</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='hsCode' value={r.hsCode} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />

                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">STYLE</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='style' value={r.style} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">관세율</span>
                                                    </div>
                                                    <CommonInputEl type="text" className='form-control' name='tariffRate' value={r.tariffRate} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            SIZE_가로(cm)
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="number" className='form-control' name='defaultWidth' value={r.defaultWidth} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            SIZE_세로(cm)
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="number" className='form-control' name='defaultLength' value={r.defaultLength} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            SIZE_높이(cm)
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="number" className='form-control' name='defaultHeight' value={r.defaultHeight} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            내품수량
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="number" className='form-control' name='defaultQuantity' value={r.defaultQuantity} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            무게(kg)
                                                            <i className="icon-must" aria-label="필수항목"></i>
                                                        </span>
                                                    </div>
                                                    <CommonInputEl type="number" className='form-control' name='defaultWeight' value={r.defaultWeight} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(r.id, e)} />
                                                </div>
                                            </KeyGroup>
                                        </BodyWrapper>

                                        <BodyWrapper>
                                            <GroupTitle>
                                                옵션정보
                                                {/* <CommonFunctionalBtn type='button' className='btn btn-sm btn-outline-secondary' onClick={() => props.__handleEventControl().productOptionListData().add(r.id)}><AddIcon /></CommonFunctionalBtn> */}
                                            </GroupTitle>
                                            <KeyGroup>
                                                {r.productOptions && r.productOptions.map((optionData, optionIndex) => {
                                                    return (
                                                        <React.Fragment key={optionData.id}>
                                                            <OptionBodyWrapper>
                                                                <OptionDeleteBtn type='button' className='btn btn-outline-danger btn-sm' onClick={() => props.__handleEventControl().productOptionListData().delete(r.id, optionData.id)}>X</OptionDeleteBtn>
                                                                <KeyGroup>
                                                                    <div className="input-group mb-3">
                                                                        <UploadInputEl
                                                                            id={`i_pm_cb_po_uploader_${optionData.id}`}
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onClick={(e) => e.target.value = ''}
                                                                            onChange={(e) => props.__handleEventControl().productOptionListData().postUploadImageFile(r.id, optionData.id, e)}
                                                                        />
                                                                        {optionData.imageUrl ?
                                                                            <div className="input-group-prepend">
                                                                                <ImageDeleteBtn className="btn btn-outline-secondary" type="button" onClick={() => props.__handleEventControl().productOptionListData().deleteImageFile(r.id, optionData.id)}>삭제</ImageDeleteBtn>
                                                                            </div>
                                                                            :
                                                                            <></>
                                                                        }
                                                                    </div>
                                                                    <ImageWrapper>
                                                                        <ImageBox>
                                                                            {optionData.imageUrl ?
                                                                                <ImageEl name='imageFile' type="file" src={optionData.imageUrl} title={optionData.imageFileName} onClick={() => props.__handleEventControl().productOptionListData().onClickImageButton(optionData.id)} />
                                                                                :
                                                                                <ImageEl name='imageFile' src='/images/icon/no-image.jpg' title='no-image' onClick={() => props.__handleEventControl().productOptionListData().onClickImageButton(optionData.id)} />
                                                                            }
                                                                        </ImageBox>
                                                                    </ImageWrapper>
                                                                </KeyGroup>
                                                                <TableContainer>
                                                                    <table className="table" style={{ tableLayout: 'fixed', backgroundColor: 'white' }}>
                                                                        <thead>
                                                                            <tr>
                                                                                <OptionTableTh scope="col" width='50'>#</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>옵션명 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>관리옵션명 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>관리코드 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>노스노스 고유코드</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>판매가</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>재고수량</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>상태</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>비고</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>색상</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>CNY</OptionTableTh>
                                                                                <OptionTableTh scope="col" width='200'>KRW</OptionTableTh>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <OptionTableTh scope="row">
                                                                                    {optionIndex + 1}
                                                                                </OptionTableTh>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.defaultName} name='defaultName' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.managementName} name='managementName' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.code} name='code' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.nosUniqueCode} name='nosUniqueCode' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='number' value={optionData.salesPrice} name='salesPrice' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='number' value={optionData.stockUnit} name='stockUnit' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.status} disabled></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.memo} name='memo' onChange={(e) => props.__handleEventControl().productOptionListData().onChangeInputValue(e, r.id, optionData.id)}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.color}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.defaultCny}></OptionInput>
                                                                                </OptionTableTd>
                                                                                <OptionTableTd>
                                                                                    <OptionInput type='text' value={optionData.defaultKrw}></OptionInput>
                                                                                </OptionTableTd>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </TableContainer>
                                                            </OptionBodyWrapper>
                                                        </React.Fragment>
                                                    );})}
                                                    <OptionAddBtn>
                                                        <CommonFunctionalBtn type='button' className='btn btn-sm btn-outline-secondary' onClick={() => props.__handleEventControl().productOptionListData().add(r.id)}>
                                                            <AddIcon />
                                                        </CommonFunctionalBtn>
                                                    </OptionAddBtn>    
                                            </KeyGroup>
                                        </BodyWrapper>
                                    </BodyContainer>
                                </ItemWrapper>
                            </ItemContainer>
                        );
                    })}
                    {/* <FormAddContainer>
                        <FormAddBtnEl type='button' onClick={() => props.__handleEventControl().productListData().add()}>
                            <img className='button-img' src='/images/icon/plus.png'></img>
                        </FormAddBtnEl>
                    </FormAddContainer> */}
                </form>
            </Container>
        </>
    );
}

export default withRouter(CreateBody);