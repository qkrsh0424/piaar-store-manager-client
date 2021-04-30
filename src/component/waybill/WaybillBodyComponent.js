import React, { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const ProductContainer = styled.div`
    margin:30px 0;
`;

const ProductWrapper = styled.div`
    border:3px solid #606060;
    border-radius:5px;
`;
const ScrollBtn = styled.button`
    margin: 8px 0;
`;

const ScrollToTopBtn = styled.button`
    position:fixed;
    bottom:5%;
    right:5%;
    z-index:999;
    padding:20px;
`;

const WaybillBodyComponent = (props) => {
    const topRef = useRef();
    const refs = props.waybillData.reduce((acc, value) => {
        acc[value.uuid] = React.createRef();

        return acc;
    }, {});

    const handleClickToScroll = () => {
        return {
            toAnyEl: function (id) {
                refs[id].current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                refs[id].current.classList.add('myFocus')
                setTimeout(() => {
                    refs[id].current.classList.remove('myFocus')
                }, 4000)
            },
            toTop: function () {
                topRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    }
    return (
        <>
            <ScrollToTopBtn type='button' className='btn btn-outline-info' onClick={() => handleClickToScroll().toTop()}>TOP</ScrollToTopBtn>
            <Container
                ref={topRef}
                className='container'
            >
                {props.waybillData && props.waybillData.map(r => {
                    return (
                        <div key={r.uuid}>
                            <ScrollBtn type='button' className='btn btn-sm btn-outline-primary' onClick={() => handleClickToScroll().toAnyEl(r.uuid)}>{r.prodName}</ScrollBtn>
                        </div>
                    );
                })}
                {props.waybillData && props.waybillData.map(r => {
                    return (
                        <ProductContainer
                            key={r.uuid}
                            ref={refs[r.uuid]}
                        >
                            <ProductWrapper>
                                <h4>{r.prodName}<button type='button' onClick={()=>props.__handleEventControl().logenExcelDownload(r.uuid)}>로젠다운</button></h4>
                                <div>
                                    <div className='table-responsive' style={{ width: '100%', height: '500px' }}>
                                        <table className="table table-sm" style={{ tableLayout: 'fixed' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" width='50'>#</th>
                                                    <th scope="col" width='200'>수하인명</th>
                                                    <th scope="col" width='300'>옵션정보</th>
                                                    <th scope="col" width='200'>수하인주소</th>
                                                    <th scope="col" width='200'>수하인전화번호</th>
                                                    <th scope="col" width='200'>수하인핸드폰번호</th>
                                                    <th scope="col" width='200'>품목명</th>
                                                    <th scope="col" width='200'>배송메세지</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {r.list && r.list.map((r2, r2Index) => {
                                                    return (
                                                        <tr key={r2Index}>
                                                            <td>{r2Index + 1}</td>
                                                            <td>{r2.receiver}</td>
                                                            <td>
                                                                {r2.optionInfos && r2.optionInfos.map((r3, r3Index) => {
                                                                    return (
                                                                        // <ul>
                                                                        //     <li>{r3.optionInfo ? r3.optionInfo : 'none'} - {r3.unit}</li>

                                                                        // </ul>
                                                                        <div key={r3Index}>
                                                                            {r3.optionInfo ? r3.optionInfo : 'none'} - {r3.unit}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </td>
                                                            <td>{r2.destination}</td>
                                                            <td>{r2.receiverContact1}</td>
                                                            <td>{r2.receiverContact1}</td>
                                                            <td>{r2.prodName}</td>
                                                            <td>{r2.deliveryMessage}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </ProductWrapper>
                        </ProductContainer>
                    );
                })}
            </Container>
        </>
    );
}

export default WaybillBodyComponent;