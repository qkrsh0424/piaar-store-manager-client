
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

// data connect
import { bankTypeDataConnect } from '../../data_connect/bankTypeDataConnect';
import { accountBookDataConnect } from '../../data_connect/accountBookDataConnect';
// components
import IncomeBody from './IncomeBody';

const IncomeMain = (props) => {
    const [bankTypes, setBankTypes] = useState(null);
    const [itemData, setItemData] = useState([
        {
            id: uuidv4(),
            accountBookType:'income',
            bankType: '우리은행',
            desc: '',
            money: 0,
            regDate: new Date()
        }
    ])

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchBankTypeList();
        }
        fetchInit();
    }, [])

    const __handleDataConnect = () => {
        return {
            searchBankTypeList: async function () {
                await bankTypeDataConnect().getBankTypeList()
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            setBankTypes(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error');
                    })
            },
            insertAccountBookList: async function () {
                await accountBookDataConnect().postAccountBookList(itemData)
                    .then(res=>{
                        if(res.status == 200 && res.data && res.data.message == 'success'){
                            props.history.replace('/account-book');
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        alert('undefined error');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            itemDataChange: function () {
                return {
                    add: function () {
                        const newItemData = {
                            id: uuidv4(),
                            accountBookType:'income',
                            bankType: '우리은행',
                            desc: '',
                            money: 0,
                            regDate: new Date()
                        }
                        setItemData(itemData.concat(newItemData))
                    },
                    delete: function (id) {
                        const newItemData = itemData.filter(r => r.id != id);
                        setItemData(newItemData);
                    },
                    backType: function (id, type) {
                        setItemData(itemData.map(r => {
                            return (
                                r.id == id ?
                                    {
                                        ...r,
                                        bankType: type
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    desc: function (id, e) {
                        setItemData(itemData.map(r => {
                            return (
                                r.id == id ?
                                    {
                                        ...r,
                                        desc: e.target.value
                                    }
                                    :
                                    r
                            )
                        }))
                    },
                    money: function (id, e) {
                        const result = (e.target.value).replace(/\D/g, "");
                        setItemData(itemData.map(r => {
                            return (
                                r.id == id ?
                                    {
                                        ...r,
                                        money: Number(result)
                                    }
                                    :
                                    r
                            )
                        }))
                    }
                }
            },
            submitItemDatas: async function (e) {
                e.preventDefault();
                if (window.confirm('수입내용을 등록하시겠습니까?')) {
                    await __handleDataConnect().insertAccountBookList();
                }

            }
        }
    }
    return (
        <>
            {(itemData && bankTypes) &&
                <IncomeBody
                    bankTypes={bankTypes}
                    itemData={itemData}

                    __handleEventControl={__handleEventControl}
                ></IncomeBody>}

        </>
    );
}

export default withRouter(IncomeMain); 