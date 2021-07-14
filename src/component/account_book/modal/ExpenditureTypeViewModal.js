import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { numberWithCommas2 } from '../../../handler/numberHandler';
const Container = styled.div`
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    padding:8px;
    border-bottom: 1px solid #f1f1f1;
`;
const ItemGroup = styled.div`
    display: grid;
    grid-template-columns: 49% 49% ;
    padding:3px 8px;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
    font-weight: 600;
    color:#333;

    @media only screen and (max-width:992px){
        grid-template-columns: 100%;
    }
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


const ExpenditureTypeSetModal = (props) => {
    const query = queryString.parse(window.location.search);

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const calcSum = () => {
        let sum = 0;
        props.expenditureTypeList && props.expenditureTypeList.forEach(element => {
            sum += element.sumValue;
        });
        return sum;
    }

    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().expenditureType().viewModalClose()}
            >
                <Title>지출내역상세</Title>
                <Container>
                    <ItemGroup>
                        {props.expenditureTypeList && props.expenditureTypeList.map(r => {
                            return (
                                <div key={r.expenditureTypeId} style={{ borderLeft: '3px solid #80808080', paddingLeft: '5px' }}>
                                    {r.expenditureType} : {numberWithCommas2(r.sumValue)} 원
                                </div>
                            );
                        })}
                    </ItemGroup>
                    <ItemGroup>
                        <div style={{ fontWeight: '800' }}>
                            기간내 미설정 : {props.sumExpenditureData ? `${numberWithCommas2(props.sumExpenditureData.sum - calcSum())} 원` : '계산중...'}
                        </div>
                        <div style={{ fontWeight: '800' }}>
                            기간내 총 지출 : {props.sumExpenditureData ? `${numberWithCommas2(props.sumExpenditureData.sum)} 원` : '계산중...'}
                        </div>
                    </ItemGroup>

                </Container>

            </Dialog>
        </>
    );
}

export default ExpenditureTypeSetModal;