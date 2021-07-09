import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';

const Container = styled.div`
    & .impact{
        color:red;
        font-weight: 600;
    }
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

const CommonTh = styled.th`
    text-align: center;
    vertical-align: middle !important;
`;

const CommonTd = styled.td`
    text-align: center;
    vertical-align: middle !important;
`;
const SalesRateNaverMain = () => {
    const [fileFormData, setFileFormData] = useState(null);
    const [salesRateDataList, setSalesRateDataList] = useState(null);

    const [popularPageFileFormData, setPopularPageFileFormData] = useState(null);
    const [naProductPageViewDataList, setNaProductPageViewDataList] = useState(null);

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
                        let res = err.response;
                        if (res && res.status == 400) {
                            switch (res.data.message) {
                                case 'not_matched_file_error':
                                    alert('파일 종류 에러, 업로드 대상 파일을 다시 확인해 주세요.');
                                    break;
                                case 'extension_error':
                                    alert('파일 확장자를 다시 확인해주세요. xls or xlsx 파일만 읽기 가능.');
                                    break;
                                default:
                                    alert('undefined error. inner')
                                    break;
                            }
                        } else {
                            alert('undefined error. outter')
                        }
                    })
            },
            postGetProductPageView: async function () {
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/v1/page-view/na/popular-page/excel/read`, popularPageFileFormData)
                    .then(res => {
                        console.log(res);
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setNaProductPageViewDataList(res.data.data);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res && res.status == 400) {
                            switch (res.data.message) {
                                case 'not_matched_file_error':
                                    alert('파일 종류 에러, 업로드 대상 파일을 다시 확인해 주세요.');
                                    break;
                                case 'extension_error':
                                    alert('파일 확장자를 다시 확인해주세요. xls or xlsx 파일만 읽기 가능.');
                                    break;
                                default:
                                    alert('undefined error. inner')
                                    break;
                            }
                        } else {
                            alert('undefined error. outter')
                        }
                    })
            }
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
                if (fileFormData) {
                    setNaProductPageViewDataList(null);
                    await __handleDataConnect().postReadNaverExcel();
                }
            },
            popularPageFileFormDataOnChange: async function (e) {
                let formData = new FormData();
                formData.append("file", e.target.files[0])

                setPopularPageFileFormData(formData);
            },
            readNaverAnalyticsPopularPageExcel: async function (e) {
                e.preventDefault();
                if (fileFormData && popularPageFileFormData) {
                    await __handleDataConnect().postGetProductPageView();
                }
            },

        }
    }

    const getPageView = (prodNo) => {

        return naProductPageViewDataList.filter(r => r.prodNo == prodNo)[0].pageView;
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <Container className='container mt-3'>
                <TitleContainer>
                    <TitleHeaderEl>네이버 주문통합검색 판매량 추출기</TitleHeaderEl>
                </TitleContainer>

                <div className="alert alert-info" role="alert">
                    <div>(네이버 스마트 스토어 센터 :: 판매관리 :: 주문통합검색 :: 엑셀다운) 엑셀 데이터를 활용하세요.</div>
                    <div>클레임상태의 <span className='impact'>"취소완료"</span>건과 <span className='impact'>"반품완료"</span>건은 자동으로 카운팅에서 <span className='impact'>제외</span>됩니다.</div>
                </div>
                <form onSubmit={(e) => __handleEventControl().readNaverExcel(e)}>
                    <div className='row'>
                        <div className='form-group col-lg-6'>

                            <div className="custom-file mb-3">
                                <input type='file' className='custom-file-input' onChange={(e) => __handleEventControl().fileOnChange(e)} required></input>
                                <label className="custom-file-label">{fileFormData ? fileFormData.get('file').name : '네이버 주문통합검색 엑셀 선택...'}</label>
                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                            <div style={{ lineHeight: '1.2' }}>
                                <div style={{ color: 'red', fontWeight: '700', fontSize: '13px' }}>* 반드시 "네이버 주문통합검색" 엑셀만 업로드해주세요.</div>
                                <div>
                                    <small style={{ color: 'red', fontWeight: '700', fontSize: '8px', textDecoration: 'line-through' }}> 어차피 다른건 안됨 해보셈</small>
                                </div>
                            </div>

                        </div>
                        <div className='form-group col-lg-6'>
                            <button type='submit' className='btn btn-info btn-block'>주문조회 엑셀 읽기</button>
                        </div>
                    </div>
                </form>
                {salesRateDataList ?
                    (
                        <>
                            <form onSubmit={(e) => __handleEventControl().readNaverAnalyticsPopularPageExcel(e)}>
                                <div className='row'>
                                    <div className='form-group col-lg-6'>

                                        <div className="custom-file mb-3">
                                            <input type='file' className='custom-file-input' onChange={(e) => __handleEventControl().popularPageFileFormDataOnChange(e)} required></input>
                                            <label className="custom-file-label">{popularPageFileFormData ? popularPageFileFormData.get('file').name : '네이버 애널리틱스 엑셀 선택...'}</label>
                                            <div className="invalid-feedback">Example invalid custom file feedback</div>
                                        </div>
                                        <div style={{ lineHeight: '1.2' }}>
                                            <div style={{ color: 'red', fontWeight: '700', fontSize: '13px' }}>* 반드시 "네이버 애널리틱스" 엑셀만 업로드해주세요.</div>
                                            <div>
                                                <small style={{ color: 'red', fontWeight: '700', fontSize: '8px', textDecoration: 'line-through' }}> 어차피 다른건 안됨 해보셈</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group col-lg-6'>
                                        <button type='submit' className='btn btn-info btn-block'>유입량 엑셀 읽기</button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )
                    :
                    <></>
                }
                <div style={{ width: '100%', overflow: 'auto', maxHeight: '500px' }}>
                    <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                        <thead style={{ position: 'sticky', top: '-1px' }}>
                            <tr>
                                <CommonTh scope="col" width='200' style={{ background: '#f1f1f1' }}>상품명</CommonTh>
                                <CommonTh scope="col" width='200' style={{ background: '#f1f1f1' }}>옵션명</CommonTh>
                                <CommonTh scope="col" width='200' style={{ background: '#f1f1f1' }}>주문건수</CommonTh>
                                <CommonTh scope="col" width='200' style={{ background: '#f1f1f1' }}>판매량</CommonTh>
                            </tr>
                        </thead>
                        <tbody>
                            {salesRateDataList && salesRateDataList.map((r, index) => {
                                let pageView = naProductPageViewDataList ? getPageView(r.prodNo) : 0;
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <CommonTd colSpan={4} style={{ color: '#7d7ada', fontWeight: '800', fontSize: '1.1rem' }}>
                                                {r.prodName}
                                            </CommonTd>
                                        </tr>
                                        {r.optionInfos && r.optionInfos.map((r2, index2) => {
                                            return (
                                                <tr key={'subitem' + index2}>
                                                    <CommonTd>{r2.prodName}</CommonTd>
                                                    <CommonTd>{r2.optionInfo}</CommonTd>
                                                    <CommonTd style={{ fontWeight: '800' }}>{r2.salesCount}</CommonTd>
                                                    <CommonTd style={{ fontWeight: '800' }}>{r2.unitSum}</CommonTd>
                                                </tr>
                                            )
                                        })}
                                        <tr style={{ background: '#ff000020' }}>
                                            <CommonTh style={{ borderBottom: naProductPageViewDataList ? 'none' : '3px double #404040' }}><span style={{ fontWeight: '700' }}>-</span></CommonTh>
                                            <CommonTh style={{ borderBottom: naProductPageViewDataList ? 'none' : '3px double #404040' }}><span style={{ fontWeight: '700' }}>-</span></CommonTh>
                                            <CommonTh style={{ borderBottom: naProductPageViewDataList ? 'none' : '3px double #404040' }}><span style={{ fontWeight: '700' }}>총 주문건수 </span><span style={{ color: '#7d7ada', fontWeight: '700' }}>{r.salesCount}</span></CommonTh>
                                            <CommonTh style={{ borderBottom: naProductPageViewDataList ? 'none' : '3px double #404040' }}><span style={{ fontWeight: '700' }}>총 판매건수 </span><span style={{ color: '#7d7ada', fontWeight: '700' }}>{r.unitSum}</span></CommonTh>

                                        </tr>
                                        {naProductPageViewDataList ?
                                            (
                                                <tr style={{ background: '#00ff0020' }}>
                                                    <CommonTh colSpan={2} style={{ borderBottom: '3px double #404040' }}><span style={{ fontWeight: '700' }}> 유입량 <span style={{ color: 'red', fontWeight: '700' }}>{pageView}</span></span></CommonTh>
                                                    <CommonTh colSpan={2} style={{ borderBottom: '3px double #404040' }}>
                                                        <span style={{ fontWeight: '700' }}> 유입당 주문건수(구매전환율) <span style={{ color: 'red', fontWeight: '700' }}>{((r.salesCount / pageView) * 100).toFixed(2)}%</span></span>
                                                        <div></div>
                                                        <span style={{ fontWeight: '700' }}> 유입당 판매개수(판매전환율) <span style={{ color: 'red', fontWeight: '700' }}>{((r.unitSum / pageView) * 100).toFixed(2)}%</span></span>
                                                    </CommonTh>
                                                </tr>
                                            )
                                            :
                                            <></>
                                        }
                                    </React.Fragment>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </Container>
        </>
    );
}

export default SalesRateNaverMain;