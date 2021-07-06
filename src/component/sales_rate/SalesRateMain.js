import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// component
import DrawerNavbarMain from '../nav/DrawerNavbarMain';

const Container = styled.div`
    & .impact{
        color:red;
        font-weight: 600;
    }
`;
const ItemContainer = styled.div`
    border:2px solid #7d7ada;
    border-radius: 5px;
    padding:5px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const SalesRateMain = () => {
    const [fileFormData, setFileFormData] = useState(null);
    const [salesRateDataList, setSalesRateDataList] = useState(null);

    const __handleDataConnect = () => {
        return {
            postReadNaverExcel: async function () {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/v1/sales-rate/excel/naver/read`, fileFormData)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSalesRateDataList(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        }
    }

    const __handleEventControl = () => {
        return {
            fileOnChange: function (e) {
                let formData = new FormData();
                formData.append("file", e.target.files[0])
                setFileFormData(formData);
            },
            readNaverExcel: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postReadNaverExcel();
            },
        }
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <Container className='container mt-3'>
                <div className="alert alert-info" role="alert">
                    <div>(네이버 스마트 스토어 센터 :: 판매관리 :: 주문통합검색 :: 엑셀다운) 엑셀 데이터를 활용하세요.</div>
                    <div>클레임상태의 <span className='impact'>"취소완료"</span>건과 <span className='impact'>"반품완료"</span>건은 자동으로 카운팅에서 <span className='impact'>제외</span>됩니다.</div>
                </div>
                <form onSubmit={(e) => __handleEventControl().readNaverExcel(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>
                            <input type='file' className='form-control' onChange={(e) => __handleEventControl().fileOnChange(e)}></input>
                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>엑셀 읽기</button>
                        </div>
                    </div>
                </form>
                {salesRateDataList && salesRateDataList.map((r,index) => {
                    return (
                        <ItemContainer key={'item'+index}>
                            <h5>{r.prodName} | <span style={{ fontWeight: '700' }}>총 판매량 </span><span style={{ color: '#7d7ada', fontWeight: '700' }}>{r.unitSum}</span></h5>
                            <div className='table-responsive' style={{ width: '100%' }}>
                                <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col" width='50'>#</th>
                                            <th scope="col" width='200'>상품명</th>
                                            <th scope="col" width='200'>옵션명</th>
                                            <th scope="col" width='200'>판매량</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {r.optionInfos && r.optionInfos.map((r2, index2) => {
                                            return (
                                                <tr key={'subitem'+index2}>
                                                    <th scope="row">{index2 + 1}</th>
                                                    <td>{r2.prodName}</td>
                                                    <td>{r2.optionInfo}</td>
                                                    <td style={{ fontWeight: '800' }}>{r2.unitSum}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </ItemContainer>
                    );
                })}

            </Container>
        </>
    );
}

export default SalesRateMain;