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

const TableTextField = styled.div`
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
const ReceiveAddModal = (props) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().receive().addModalClose()}
            >
                <Container>
                    <form onSubmit={(e) => props.__handleEventControl().receive().submitAddData(e)}>
                        <BodyWrapper>
                            <GroupTitle>
                                입고등록
                            </GroupTitle>
                            <KeyGroup>
                                <TableContainer>
                                    <table className="table" style={{ tableLayout: 'fixed' }}>
                                        <thead>
                                            <tr>
                                                <OptionTableTh scope="col" width='200'>관리상품명 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                <OptionTableTh scope="col" width='200'>옵션명 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                <OptionTableTh scope="col" width='200'>관리옵션명 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                                <OptionTableTh scope="col" width='100'>입고수량 <i className="icon-must" aria-label="필수항목"></i></OptionTableTh>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.receiveAddData.map(data => {
                                                return (
                                                    <React.Fragment key={data.productReceive.id}>
                                                        <tr>
                                                            <OptionTableTd>
                                                                <TableTextField>
                                                                    {data.product.managementName}
                                                                </TableTextField>
                                                            </OptionTableTd>
                                                            <OptionTableTd>
                                                                <TableTextField>
                                                                    {data.option.defaultName}
                                                                </TableTextField>
                                                            </OptionTableTd>
                                                            <OptionTableTd>
                                                                <TableTextField>
                                                                    {data.option.managementName}
                                                                </TableTextField>
                                                            </OptionTableTd>
                                                            <OptionTableTd>
                                                                <OptionInput
                                                                    type='number'
                                                                    value={data.productReceive.receiveUnit}
                                                                    name='receiveUnit'
                                                                    onChange={(e) => props.__handleEventControl().receive().addDataOnChangeInputValue(e, data.productReceive.id)}
                                                                    min={0}
                                                                ></OptionInput>
                                                            </OptionTableTd>
                                                        </tr>
                                                    </React.Fragment>

                                                )

                                            })}
                                        </tbody>
                                    </table>
                                </TableContainer>
                            </KeyGroup>
                        </BodyWrapper>
                        <BodyWrapper>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        입고 메모
                                    </span>
                                </div>
                                <CommonInputEl
                                    type="text"
                                    className='form-control'
                                    name='receiveAddMemo'
                                    value={props.receiveAddMemo}
                                    onChange={(e) => props.__handleEventControl().receive().addDataOnChangeMemoValue(e)}
                                />
                            </div>
                            <SubmitBtnGroup className='clearfix'>
                                <SubmitBtn type='submit'>입고등록</SubmitBtn>
                            </SubmitBtnGroup>
                        </BodyWrapper>
                    </form>
                </Container>

            </Dialog>
        </>
    );
}

export default ReceiveAddModal;