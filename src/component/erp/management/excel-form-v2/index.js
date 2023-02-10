import _ from 'lodash';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { erpDownloadExcelHeaderDataConnect } from '../../../../data_connect/erpDownloadExcelHeaderDataConnect';
import EditFieldComponent from './edit-field/EditField.component';
import HeaderListComponent from './header-list/HeaderList.component';
import MainLayout from './layout/MainLayout';
import PageHeaderComponent from './page-header/PageHeader.component';

const Container = styled.div`

`;

const ErpManagementExcelFormV2 = (props) => {
    const [headerList, dispatchHeaderList] = useReducer(headerListReducer, initialHeaderList);
    const [selectedHeader, dispatchSelectedHeader] = useReducer(selectedHeaderReducer, initialSelectedHeader);

    const __reqSearchHeaderList = async () => {
        await erpDownloadExcelHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    console.log(res.data.data);
                    dispatchHeaderList({
                        type: 'SET_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    };

    const __reqCreateOne = async (body) => {
        await erpDownloadExcelHeaderDataConnect().createOne(body)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqDeleteOne = async (headerId) => {
        await erpDownloadExcelHeaderDataConnect().deleteOne(headerId)
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    const __reqUpdateOne = async (body) => {
        await erpDownloadExcelHeaderDataConnect().updateOne(body)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    alert('양식이 성공적으로 저장되었습니다.');
                }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    useEffect(() => {
        __reqSearchHeaderList();
    }, []);

    const _onSet_selectedHeader = (data) => {
        dispatchSelectedHeader({
            type: 'SET_DATA',
            payload: _.cloneDeep(data)
        })
    }

    const _onSubmit_create = async (body) => {
        await __reqCreateOne(body);
        await __reqSearchHeaderList();
    }

    const _onSubmit_deleteOne = async () => {
        let headerId = selectedHeader.id;
        await __reqDeleteOne(headerId);
        await __reqSearchHeaderList();
        dispatchSelectedHeader({
            type: 'CLEAR'
        })
    }

    const _onSubmit_updateOne = async (body) => {
        await __reqUpdateOne(body);
        await __reqSearchHeaderList();
    }
    return (
        <>
            <Container>
                <PageHeaderComponent />
                {headerList &&
                    <MainLayout>
                        <HeaderListComponent
                            headerList={headerList}
                            selectedHeader={selectedHeader}

                            _onSet_selectedHeader={_onSet_selectedHeader}
                            _onSubmit_create={_onSubmit_create}
                        />
                        {selectedHeader &&
                            <EditFieldComponent
                                selectedHeader={selectedHeader}

                                _onSubmit_updateOne={_onSubmit_updateOne}
                                _onSubmit_deleteOne={_onSubmit_deleteOne}
                            />
                        }
                    </MainLayout>
                }
            </Container>
        </>
    );
}

export default ErpManagementExcelFormV2;

const initialHeaderList = null;
const initialSelectedHeader = null;

const headerListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialHeaderList;
    }
}

const selectedHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedHeader;
        default: return initialSelectedHeader;
    }
}