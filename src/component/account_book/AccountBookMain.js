import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';

// handler
import { getStartDate, getEndDate, dateToYYMMDD } from '../../handler/dateHandler';

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
    const [dateRangePickerModalOpen, setDateRangePickerModalOpen] = useState(false);
    const [sumIncomeData, setSumIncomeData] = useState(null);
    const [sumExpenditureData, setSumExpenditureData] = useState(null);
    const [pagenation, setPagenation] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchAccountBookList();
            __handleDataConnect().searchBankTypeList();
            __handleDataConnect().searchSumOfIncome();
            __handleDataConnect().searchSumOfExpenditure();
        }
        fetchInit();
    }, [props.location])

    const __handleDataConnect = () => {
        return {
            searchAccountBookList: async function () {
                let accountBookType = query.accbType ? query.accbType : '';
                let bankType = query.bankType ? query.bankType : '';
                let startDate = query.startDate ? new Date(query.startDate).toUTCString() : null;
                let endDate = query.endDate ? new Date(query.endDate).toUTCString() : null;
                let currPage = query.currPage ? query.currPage : 1;

                await accountBookDataConnect().getAccountBookList(accountBookType, bankType, startDate, endDate, currPage)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setItemDataList(res.data.data);
                        }

                        if (res.status == 200 && res.data && res.data.pagenation) {
                            setPagenation(res.data.pagenation);
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
            },
            searchSumOfIncome: async function () {
                let accountBookType = query.accbType ? query.accbType : '';
                let bankType = query.bankType ? query.bankType : '';
                let startDate = query.startDate ? new Date(query.startDate).toUTCString() : null;
                let endDate = query.endDate ? new Date(query.endDate).toUTCString() : null;

                await accountBookDataConnect().getSumOfIncome(accountBookType, bankType, startDate, endDate)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSumIncomeData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : getAccountBookList');
                    })
            },
            searchSumOfExpenditure: async function () {
                let accountBookType = query.accbType ? query.accbType : '';
                let bankType = query.bankType ? query.bankType : '';
                let startDate = query.startDate ? new Date(query.startDate).toUTCString() : null;
                let endDate = query.endDate ? new Date(query.endDate).toUTCString() : null;

                await accountBookDataConnect().getSumOfExpenditure(accountBookType, bankType, startDate, endDate)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setSumExpenditureData(res.data.data);
                        }
                    })
                    .catch(err => {
                        alert('undefined error. : getAccountBookList');
                    })
            },
            removeAccountBookOne: async function (id) {
                await accountBookDataConnect().deleteAccountBookOne(id)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            __handleDataConnect().searchAccountBookList();
                            __handleDataConnect().searchSumOfIncome();
                            __handleDataConnect().searchSumOfExpenditure();
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status == 403) {
                            alert('권한이 없습니다.')
                        } else {
                            alert('undefined error. : deleteAccountBookOne')
                        }
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
                                props.history.push(`${pathname}?${queryString.stringify({ ...query })}`)
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
                                props.history.push(`${pathname}?${queryString.stringify({ ...query, bankType: '오프라인' })}`)
                                break;
                            case '오프라인':
                                delete query.bankType
                                props.history.push(`${pathname}?${queryString.stringify({ ...query})}`)
                                break;
                            default:
                                delete query.bankType
                                props.history.push(`${pathname}?${queryString.stringify({ ...query })}`)
                                break;

                        }
                    }
                }
            },
            dateRangePicker: function () {
                return {
                    open: function () {
                        setDateRangePickerModalOpen(true);
                    },
                    close: function () {
                        setDateRangePickerModalOpen(false);
                    },
                    adapt: function (data) {
                        this.close();
                        props.history.push(`${pathname}?${queryString.stringify({ ...query, startDate: getStartDate(data.startDate), endDate: getEndDate(data.endDate) })}`)
                    },
                    searchAll: function () {
                        this.close();
                        delete query.startDate
                        delete query.endDate
                        props.history.push(`${pathname}?${queryString.stringify({ ...query })}`)
                    }
                }
            },
            removeItemOne: async function (id) {
                if (window.confirm('정말로 삭제하시겠습니까?')) {
                    await __handleDataConnect().removeAccountBookOne(id);
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
                    sumIncomeData={sumIncomeData}
                    sumExpenditureData={sumExpenditureData}
                    pagenation={pagenation}

                    __handleEventControl={__handleEventControl}
                ></AccountBookBody>
            }
            <DateRangePickerModal
                open={dateRangePickerModalOpen}

                __handleEventControl={__handleEventControl}
            ></DateRangePickerModal>

        </>
    );
}

export default withRouter(AccountBookMain);