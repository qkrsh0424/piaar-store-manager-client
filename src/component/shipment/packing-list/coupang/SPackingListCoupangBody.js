import React from "react";
import styled from "styled-components";

const Container = styled.div`
    overflow:hidden;
    margin-bottom: 200px;
`;

const TitleContainer = styled.div`
    margin:20px 0;
`;

const TitleHeaderEl = styled.div`
    border-left: 5px solid #7d7ada ;
    padding: 5px 10px;
    font-size: 1.5rem;
    font-weight: 800;

    @media only screen and (max-width:576px){
        font-size: 1.3rem;
    }

    @media only screen and (max-width:340px){
        font-size: 1.1rem;
    }
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
                <TitleContainer>
                    <TitleHeaderEl>쿠팡 배송준비 데이터 추출기</TitleHeaderEl>
                </TitleContainer>
                <div className="alert alert-info" role="alert">
                    <div>(쿠팡 윙 판매자센터 :: 상품준비중 :: 상품준비중 목록 :: 엑셀다운) 엑셀 데이터를 활용하세요.</div>
                </div>
                <form onSubmit={(e) => props.__handleEventControl().readCoupangExcel(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>
                            <div className="custom-file mb-3">
                                <input type='file' className='custom-file-input' onChange={(e) => props.__handleEventControl().fileOnChange(e)} required></input>
                                <label className="custom-file-label">{props.fileFormData ? props.fileFormData.get('file').name : '쿠팡 배송준비 엑셀 선택...'}</label>
                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                            <div style={{ lineHeight: '1.2' }}>
                                <div style={{ color: 'red', fontWeight: '700', fontSize: '13px' }}>* 반드시 "쿠팡 배송준비" 엑셀만 업로드해주세요.</div>
                                <div>
                                    <small style={{ color: 'red', fontWeight: '700', fontSize: '8px', textDecoration: 'line-through' }}> 어차피 다른건 안됨 해보셈</small>
                                </div>
                            </div>
                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>배송준비 엑셀 읽기</button>
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
                                            <td colSpan={3} style={{ fontWeight: '800', textAlign: 'center', color: '#7d7ada', fontSize: '1.1rem' }}>{r.prodName}</td>
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
                                        <tr style={{ background: '#ff000010' }}>
                                            <td colSpan={2} style={{ fontWeight: '800', borderBottom: '2px solid black', textAlign: 'center' }}>총 개수</td>
                                            <td style={{ fontWeight: '800', borderBottom: '2px solid black', color: 'red' }}>{r.unitSum}</td>
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