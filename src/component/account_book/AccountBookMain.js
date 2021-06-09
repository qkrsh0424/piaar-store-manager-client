import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

// data connect
import { accountBookDataConnect } from '../../data_connect/accountBookDataConnect';
import { bankTypeDataConnect } from '../../data_connect/bankTypeDataConnect';

// components
import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import AccountBookBody from './AccountBookBody';
import AccountBookNav from './AccountBookNav';
import DateRangePickerModal from './modal/DateRangePickerModal';


const AccountBookMain = (props) => {
    let pathname = window.location.pathname;
    let query = queryString.parse(window.location.search);

    const [itemDataList, setItemDataList] = useState(null);
    const [bankTypeList, setBankTypeList] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchAccountBookList();
            __handleDataConnect().searchBankTypeList();
        }
        fetchInit();
    }, [props.location])

    const __handleDataConnect = () => {
        return {
            searchAccountBookList: async function () {
                let accountBookType = query.accbType ? query.accbType : '';
                let bankType = query.bankType ? query.bankType : '';

                await accountBookDataConnect().getAccountBookList(accountBookType, bankType)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setItemDataList(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : getAccountBookList');
                    })
            },
            searchBankTypeList: async function () {
                await bankTypeDataConnect().getBankTypeList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setBankTypeList(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error')
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            searchOptionChange: function () {
                return {
                    accountBookType: function (type) {
                        switch (type) {
                            case '전체':
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, accbType: 'income' })}`)
                                break;
                            case '수입':
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, accbType: 'expenditure' })}`)
                                break;
                            case '지출':
                                delete query.accbType
                                props.history.push(`${pathname}?${queryString.stringify({...query})}`)
                                break;

                        }
                    },
                    bankType: function (type) {
                        switch (type) {
                            case '전체':
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, bankType: '우리은행' })}`)
                                break;
                            case '우리은행':
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, bankType: '농협은행' })}`)
                                break;
                            case '농협은행':
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, bankType: '카카오뱅크' })}`)
                                break;
                            case '카카오뱅크':
                                delete query.bankType
                                props.history.push(`${pathname}?${queryString.stringify({...query})}`)
                                break;
                            default:
                                delete query.bankType
                                props.history.push(`${pathname}?${queryString.stringify({...query})}`)
                                break;

                        }
                    }
                }
            }
        }
    }
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <AccountBookNav></AccountBookNav>
            {itemDataList &&
                <AccountBookBody
                    bankTypeList={bankTypeList}
                    itemDataList={itemDataList}


                    __handleEventControl={__handleEventControl}
                ></AccountBookBody>
            }
            <DateRangePickerModal></DateRangePickerModal>

        </>
    );
}

export default withRouter(AccountBookMain);