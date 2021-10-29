import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

const Container = styled.div`
`;

const ItemGroup = styled.div`
    display: grid;
    grid-template-columns: 32% 32% 32%;
    padding:3px 8px;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
`;

const ItemBtn = styled.button`
    display: inline-block;
    border:1px solid #1199dc;
    border-radius: 5px;
    margin:5px 2px;
    padding:5px;
    background: none;
    color: #1199dc;
    font-weight: 600;
    @media only screen and (max-width:992px){
        font-size: 0.7rem;
    }

`;

const BodyWrapper = styled.div`
    padding:0 10px;
    overflow: auto;

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

    & .ref-stock-btn-active {
        background-color: #4682B4;
        color: white;
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
`;

const RefCheckBtn = styled.button`
    width:100px;
    margin-right:10px;
    padding:8px;
    background: white;
    border:1px solid #4682B4;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 2px #f1f1f1;
    color:#4682B4;
    font-weight: 700;
    float: right;
`;

const ProductModifyModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().product().modifyModalClose()}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().product().submitModifyData(e)}>
                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                            <GroupTitle>카테고리 <i className="icon-must" aria-label="필수항목"></i></GroupTitle>
                            <CategoryGroup className='mb-3'>
                                {props.categoryListData && props.categoryListData.map(r => {
                                    return (
                                        <CategorySelectBtn
                                            key={r.cid}
                                            type='button'
                                            className={props.productModifyData.productCategoryCid === r.cid ? `category-btn-active` : ''}
                                            onClick={() => props.__handleEventControl().product().modifyDataOnChangeCategoryValue(r.cid)}
                                        >
                                            {r.name}
                                        </CategorySelectBtn>
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
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='defaultName'
                                        value={props.productModifyData.defaultName}
                                        onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            관리상품명
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl
                                        type="text"
                                        className='form-control'
                                        name='managementName'
                                        value={props.productModifyData.managementName}
                                        onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)}
                                        required
                                    />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            메모
                                        </span>
                                    </div>
                                    <CommonInputEl type="text" className='form-control' name='memo' value={props.productModifyData.memo} onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)} />
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
                                    <CommonInputEl type="text" className='form-control' name='code' value={props.productModifyData.code} onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)} />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">제조번호</span>
                                    </div>
                                    <CommonInputEl type="text" className='form-control' name='manufacturingCode' value={props.productModifyData.manufacturingCode} onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">네이버 상품번호</span>
                                    </div>
                                    <CommonInputEl type="text" className='form-control' name='naverProductCode' value={props.productModifyData.naverProductCode} onChange={(e) => props.__handleEventControl().product().modifyDataOnChangeInputValue(e)} />
                                </div>
                            </KeyGroup>
                        </BodyWrapper>

                        <BodyWrapper style={{ borderBottom: '2px solid #f1f1f1' }}>
                            <GroupTitle>상품 이미지</GroupTitle>
                            <KeyGroup>
                                <div className="input-group mb-3">
                                    <UploadInputEl id="image-file-upload" type="file" accept="image/*" onClick={(e) => e.target.value = ''} onChange={(e) => props.__handleEventControl().product().postUploadImageFile(e)} />
                                    {props.productModifyData.imageUrl ?
                                        <div className="input-group-prepend">
                                            <ImageDeleteBtn className="btn btn-outline-secondary" type="button" onClick={() => props.__handleEventControl().product().deleteImageFile()}>삭제</ImageDeleteBtn>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <ImageWrapper>
                                    <ImageBox>
                                        {props.productModifyData.imageUrl ?
                                            <ImageEl name='imageFile' src={props.productModifyData.imageUrl} title={props.productModifyData.imageFileName} onClick={() => props.__handleEventControl().product().onClickImageButton()} />
                                            :
                                            <ImageEl name='imageFile' src='/images/icon/no-image.jpg' title='no-image' onClick={() => props.__handleEventControl().product().onClickImageButton()} />
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
                                    <CommonInputEl type="text" className='form-control' name='hsCode' value={props.productModifyData.hsCode} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />

                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">STYLE</span>
                                    </div>
                                    <CommonInputEl type="text" className='form-control' name='style' value={props.productModifyData.style} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">관세율</span>
                                    </div>
                                    <CommonInputEl type="text" className='form-control' name='tariffRate' value={props.productModifyData.tariffRate} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            SIZE_가로(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl type="number" className='form-control' name='defaultWidth' value={props.productModifyData.defaultWidth} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            SIZE_세로(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl type="number" className='form-control' name='defaultLength' value={props.productModifyData.defaultLength} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            SIZE_높이(cm)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl type="number" className='form-control' name='defaultHeight' value={props.productModifyData.defaultHeight} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            내품수량
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl type="number" className='form-control' name='defaultQuantity' value={props.productModifyData.defaultQuantity} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            무게(kg)
                                            <i className="icon-must" aria-label="필수항목"></i>
                                        </span>
                                    </div>
                                    <CommonInputEl type="number" className='form-control' name='defaultWeight' value={props.productModifyData.defaultWeight} onChange={(e) => props.__handleEventControl().productListData().onChangeInputValue(props.productModifyData.id, e)} />
                                </div>
                            </KeyGroup>
                        </BodyWrapper>
                        
                        <BodyWrapper>
                            <SubmitBtnGroup className='clearfix'>
                                <SubmitBtn type='submit'>수정하기</SubmitBtn>
                                <RefCheckBtn type='button' className={props.productModifyData.stockManagement ? `ref-stock-btn-active` : ''} onClick={() => {props.__handleEventControl().product().stockManagementCheck(props.productModifyData.id)}}>재고반영 {props.productModifyData.stockManagement ? 'O' : 'X'}</RefCheckBtn>
                            </SubmitBtnGroup>
                        </BodyWrapper>
                    </form>
                </Container>

            </Dialog>
        </>
    );
}

export default ProductModifyModal;