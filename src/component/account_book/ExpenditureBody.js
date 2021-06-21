import { withRouter } from 'react-router';
import styled from 'styled-components';

// handler
import { numberWithCommas } from '../../handler/numberHandler';

const BackBtn = styled.button`
    position: fixed;
    top:10px;
    left:10px;
    background: #FF6347;
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

        background:#FF4347;
    }
`;

const RegBtn = styled.button`
    position: fixed;
    bottom:30px;
    right:30px;
    background: #FF6347;
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

        background:#FF4347;
    }
`;

const Container = styled.div`
    margin-top: 80px;
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
`;

const ItemHeaderWrapper = styled.div`
    border-bottom: 1px solid #4682B488;
    padding:10px;
    overflow: auto;
    
`;
const IdentifyBtn = styled.button`
    width:140px;
    margin:5px;
    padding:5px;
    background: white;
    border: none;
    border-left:5px solid #FF6347;
    color:#FF6347;
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

const ItemBodyWrapper = styled.div`
    padding:10px;
    & .bank-btn-active{
        background: #FF6347;
        color:white;
    }
`;

const BankTypeGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1rem;
    @media only screen and (max-width:425px){
        font-size: 12px;
    }
`;

const BankBtnEl = styled.button`
    /* width:100px; */
    margin:5px;
    padding:5px;
    background: white;
    border:1px solid #FF6347;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 2px #f1f1f1;
    color:#333;
    font-weight: 600;
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
    background: #FF6347;
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

        background:#FF4347;
    }
`;
const CommonInputEl = styled.input`
    font-size: 1.3rem;
    border: 1px solid #ced4da;
    background: #fffde2;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;
const MoneyInputEl = styled.input`
    font-size: 1.3rem;
    border: 1px solid #ced4da;
    background: #fffde2;
    text-align: right;
    &:focus{
        outline: none;
        border: 1px solid #4662B4;
        background: white;
    }
`;

const ExpenditureBody = (props) => {
    return (
        <>
            <BackBtn type='button' onClick={() => props.history.replace('/account-book')}>
                <img className='back-button-img' src='/images/icon/back-button.png'></img>
            </BackBtn>

            <Container className='container'>
                <form onSubmit={(e) => props.__handleEventControl().submitItemDatas(e)}>
                    <RegBtn type='submit'>
                        <img className='button-img' src='/images/icon/add.png'></img>
                    </RegBtn>
                    {props.itemData && props.itemData.map(r => {
                        return (
                            <ItemContainer key={r.id}>
                                <ItemWrapper>
                                    <ItemHeaderWrapper>
                                        <IdentifyBtn disabled>{r.id.split('-')[0]}</IdentifyBtn>
                                        <DeleteBtn type='button' onClick={() => { props.__handleEventControl().itemDataChange().delete(r.id) }}>삭제</DeleteBtn>
                                    </ItemHeaderWrapper>
                                    <ItemBodyWrapper>
                                        <BankTypeGroup className='mb-2'>
                                            {props.bankTypes && props.bankTypes.map(r2 => {
                                                return (
                                                    <BankBtnEl key={r2.bankTypeId} type='button' className={r.bankType == r2.bankType ? `bank-btn-active` : ''} onClick={() => { props.__handleEventControl().itemDataChange().backType(r.id, r2.bankType) }}>{r2.bankType}</BankBtnEl>
                                                )
                                            })}
                                        </BankTypeGroup>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">지출내용</span>
                                            </div>
                                            <CommonInputEl type="text" className='form-control' value={r.desc} onChange={(e) => props.__handleEventControl().itemDataChange().desc(r.id, e)} />

                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">지출금액</span>
                                            </div>
                                            <MoneyInputEl type="text" className='form-control' value={r.money==0 ? '' : numberWithCommas(r.money)} onChange={(e) => props.__handleEventControl().itemDataChange().money(r.id, e)} placeholder='0' />
                                            <div className="input-group-append">
                                                <span className="input-group-text">원(₩)</span>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <button type='button' className='btn btn-outline-info btn-block' onClick={(e) => props.__handleEventControl().itemDataChange().expenditureMoneyOnPaste(r.id)}>금액 복/붙</button>
                                        </div>
                                    </ItemBodyWrapper>
                                </ItemWrapper>
                            </ItemContainer>
                        );
                    })}
                    <FormAddContainer>
                        <FormAddBtnEl type='button' onClick={() => props.__handleEventControl().itemDataChange().add()}>
                            <img className='button-img' src='/images/icon/plus.png'></img>
                        </FormAddBtnEl>
                    </FormAddContainer>
                </form>
            </Container>
        </>
    );
}

export default withRouter(ExpenditureBody);