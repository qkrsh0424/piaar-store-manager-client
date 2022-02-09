import {useEffect, useState, useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';
import styled from "styled-components";

// data connect
import { deliveryReadyPiaarDataConnect } from '../../../data_connect/deliveryReadyPiaarDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import BackdropLoading from '../../loading/BackdropLoading';
import DeliveryReadyViewPiaarBar from './DeliveryReadyViewPiaarBar';
import DeliveryReadyOrderStatusPiaarBody from './DeliveryReadyOrderStatusPiaarBody';

const Container = styled.div`
    height: 100vh;
    /* background-color: #f2f5ff; */
`;

// class DeliveryReadyPiaarHeader {
//     constructor(cellNumber, cellName) {
//         this.id = uuidv4();
//         this.cellNumber = cellNumber;
//         this.cellName = cellName;
//         this.cellSize = 'default';
//     }

//     toJSON() {
//         return {
//             id: this.id,
//             cellNumber: this.cellNumber,
//             cellName: this.cellName,
//             cellSize: this.cellSize
//         }
//     }
// }

const DELIVERY_READY_PIAAR_HEADER_SIZE = 40;

const deliveryReadyPiaarHeaderName = [
    '피아르 고유번호',
    '주문번호1',
    '주문번호2',
    '주문번호3',
    '상품명',
    '옵션명',
    '수량',
    '수취인명',
    '전화번호1',
    '전화번호2',
    '주소',
    '우편번호',
    '배송방식',
    '배송메세지',
    '상품고유번호1',
    '상품고유번호2',
    '옵션고유번호1',
    '옵션고유번호2',
    '피아르 상품코드',
    '피아르 옵션코드',
    '관리메모1',
    '관리메모2',
    '관리메모3',
    '관리메모4',
    '관리메모5',
    '관리메모6',
    '관리메모7',
    '관리메모8',
    '관리메모9',
    '관리메모10',
    '관리메모11',
    '관리메모12',
    '관리메모13',
    '관리메모14',
    '관리메모15',
    '관리메모16',
    '관리메모17',
    '관리메모18',
    '관리메모19',
    '관리메모20'
];

const initialPiaarCustomizedHeaderListState = null;

const piaarCustomizedHeaderListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return {
                headerDetails: action.payload
            }
        case 'SET_HEADER_DETAIL_DATA':
            return {
                ...state,
                headerDetails: action.payload
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const DeliveryReadyViewPiaarMain = (props) => {
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [piaarCustomizedHeaderListState, dispatchPiaarCutomizedHeaderListState] = useReducer(piaarCustomizedHeaderListStateReducer, initialPiaarCustomizedHeaderListState);


    useEffect(() => {
        function fetchInit() {
            let deliveryReadyPiaarCustomizedHeaderList = [];

            // 피아르 엑셀 헤더 생성
            for(var i = 0; i < DELIVERY_READY_PIAAR_HEADER_SIZE; i++) {
                deliveryReadyPiaarCustomizedHeaderList.push({
                    id: uuidv4(),
                    cellNumber : i,
                    cellName : deliveryReadyPiaarHeaderName[i],
                    cellSize : 'default'
                });
            }

            dispatchPiaarCutomizedHeaderListState({
                type: 'INIT_DATA',
                payload: deliveryReadyPiaarCustomizedHeaderList
            });
        }

        fetchInit();
    }, []);
    
    const __handleDataConnect = () => {
        return {
            
        }
    }

    const __handleEventControl = () => {
        return {
            movePage: function () {
                return {
                    deliveryReadyUpload: async function () {
                        props.history.replace('/delivery-ready/piaar');
                    }
                }
            },
        }
    }

    return (
        <>
            <Container>
                {/* Backdrop */}
                <BackdropLoading open={backdropLoading} />
                <DrawerNavbarMain></DrawerNavbarMain>

                {/* 피아르 엑셀 컨트롤 바 */}
                <DeliveryReadyViewPiaarBar

                    moveUploadPageControl={() => __handleEventControl().movePage().deliveryReadyUpload()}
                ></DeliveryReadyViewPiaarBar>

                {/* 주문현황 데이터 보드 */}
                <DeliveryReadyOrderStatusPiaarBody
                    piaarCustomizedHeaderListState={piaarCustomizedHeaderListState}

                ></DeliveryReadyOrderStatusPiaarBody>

            </Container>
        </>
    )
}

export default withRouter(DeliveryReadyViewPiaarMain);