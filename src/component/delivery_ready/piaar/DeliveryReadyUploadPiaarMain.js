import {useEffect, useState, useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';

// data connect
import { deliveryReadyPiaarDataConnect } from '../../../data_connect/deliveryReadyPiaarDataConnect';

// component
import DrawerNavbarMain from '../../nav/DrawerNavbarMain';
import BackdropLoading from '../../loading/BackdropLoading';
import DeliveryReadyUploadPiaarBody from './DeliveryReadyUploadPiaarBody';

class DeliveryReadyPiaarHeader {
    constructor(cellNumber, cellName) {
        this.id = uuidv4();
        this.cellNumber = cellNumber;
        this.cellName = cellName;
        this.cellSize = 'default-cell';
    }

    toJSON() {
        return {
            id: this.id,
            cellNumber: this.cellNumber,
            cellName: this.cellName,
            cellSize: this.cellSize
        }
    }
}

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
            return action.payload;
        case 'SET_HEADER_LIST':
            return {
                ...state,
                headerDetail: action.payload
            }
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const DeliveryReadyUploadPiaarMain = (props) => {
    const [excelData, setExcelData] = useState(null);
    const [formData, setFormData] = useState([]);
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [piaarCustomizedHeaderListState, dispatchPiaarCutomizedHeaderListState] = useReducer(piaarCustomizedHeaderListStateReducer, initialPiaarCustomizedHeaderListState);


    useEffect(() => {
        function fetchInit() {
            let deliveryReadyPiaarCustomizedHeaderList = [];

            // 피아르 엑셀 헤더 생성
            for(var i = 0; i < DELIVERY_READY_PIAAR_HEADER_SIZE; i++) {
                deliveryReadyPiaarCustomizedHeaderList.push({
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
            uploadExcelFile: async function (e) {
                // 파일을 선택하지 않은 경우
                if(e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.set('file', addFiles[0]);

                await deliveryReadyPiaarDataConnect().postFile(uploadedFormData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setExcelData(res.data.data);
                            setFormData(uploadedFormData);
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                        setExcelData(null);
                        setFormData(null);
                    })
            },
            storeExcelFile: async function () {
                if(!excelData) {
                    alert('파일을 먼저 업로드 해주세요.');
                    return;
                }

                await deliveryReadyPiaarDataConnect().putFileData(formData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            alert('저장되었습니다.');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        alert(res?.data?.memo);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            uploadExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().uploadExcelFile(e);
                        setBackdropLoading(false);
                    },
                }
            },
            storeExcelData: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        setBackdropLoading(true);
                        await __handleDataConnect().storeExcelFile(e);
                        setBackdropLoading(false);                
                    }
                }
            },
            movePage: function () {
                return {
                    deliveryReadyView: async function () {
                        props.history.replace('/delivery-ready/piaar/view');
                    }
                }
            }
        }
    }

    return (
        <>
            <BackdropLoading open={backdropLoading} />
            <DrawerNavbarMain></DrawerNavbarMain>
            <DeliveryReadyUploadPiaarBody
                excelData={excelData}
                piaarCustomizedHeaderListState={piaarCustomizedHeaderListState}

                uploadExcelDataControl={(e) => __handleEventControl().uploadExcelData().submit(e)}
                storeExcelDataControl={(e) => __handleEventControl().storeExcelData().submit(e)}
                moveViewPageControl={() => __handleEventControl().movePage().deliveryReadyView()}
            ></DeliveryReadyUploadPiaarBody>
        </>
    )
}

export default withRouter(DeliveryReadyUploadPiaarMain);