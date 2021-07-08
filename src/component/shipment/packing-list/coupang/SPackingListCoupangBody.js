import React from "react";
import styled from "styled-components";

const Container = styled.div`

`;


const TableContainer = styled.div`
    height: 700px;
	overflow: auto;
    & .fixedHeader {
        position: sticky;
        top: -1px;
        background: white;
    }
`;

const SPackingListCoupangBody = (props) => {
    return (
        <>
            <Container className='container mt-3'>
                <div className="alert alert-info" role="alert">
                    <div>(네이버 스마트 스토어 센터 :: 판매관리 :: 발주(주문)확인/발송관리 :: 발주확인 완료 :: 엑셀다운) 엑셀 데이터를 활용하세요.</div>
                </div>
                <form onSubmit={(e) => props.__handleEventControl().readCoupangExcel(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>
                            <input type='file' className='form-control' onChange={(e) => props.__handleEventControl().fileOnChange(e)}></input>
                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>엑셀 읽기</button>
                        </div>
                    </div>
                </form>


                <TableContainer>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th className='fixedHeader' scope="col" width='200'>상품명</th>
                                <th className='fixedHeader' scope="col" width='200'>옵션명</th>
                                <th className='fixedHeader' scope="col" width='200'>주문개수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.salesRateDataList && props.salesRateDataList.map((r, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td colSpan={3} style={{ fontWeight: '800', textAlign: 'center', color:'#7d7ada', fontSize:'1.1rem' }}>{r.prodName}</td>
                                        </tr>
                                        {r.optionInfos && r.optionInfos.map((r2, index2) => {
                                            return (
                                                <tr key={'subitem' + index2}>
                                                    <td>{r2.prodName}</td>
                                                    <td>{r2.optionInfo}</td>
                                                    <td style={{ fontWeight: '800' }}>{r2.unitSum}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr style={{background:'#ff000010'}}>
                                            <td colSpan={2} style={{ fontWeight: '800', borderBottom: '2px solid black', textAlign: 'center' }}>총 개수</td>
                                            <td style={{ fontWeight: '800', borderBottom: '2px solid black', color:'red'}}>{r.unitSum}</td>
                                        </tr>
                                    </React.Fragment>
                                );


                            })}

                        </tbody>
                    </table>
                </TableContainer>

            </Container>
        </>
    );
}

export default SPackingListCoupangBody;