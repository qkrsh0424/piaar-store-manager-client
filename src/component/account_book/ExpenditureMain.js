import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// component
import ExpenditureBody from './ExpenditureBody';

const ExpenditureMain = () => {
    const [bankTypes, setBankTypes] = useState([
        {
            id: uuidv4(),
            bankType: '우리은행'
        },
        {
            id: uuidv4(),
            bankType: '농협'
        },
        {
            id: uuidv4(),
            bankType: '카카오뱅크'
        }
    ]);
    const [itemData, setItemData] = useState([
        {
            id: uuidv4(),
            bankType: '우리은행',
            desc: '',
            money: 0,
            date: new Date()
        }
    ]);

    const __handleEventControl = () => {
        return {
            itemDataChange: function () {
                return {
                    add: function () {
                        const newItemData = {
                            id: uuidv4(),
                            bankType: '우리은행',
                            desc: '',
                            money: 0,
                            date: new Date()
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
                                        money: Number(-result)
                                    }
                                    :
                                    r
                            )
                        }))
                    }
                }
            },
            submitItemDatas: async function () {
                console.log(itemData)
            }
        }
    }
    return (
        <>
            {(itemData && bankTypes) &&
                <ExpenditureBody
                    bankTypes={bankTypes}
                    itemData={itemData}

                    __handleEventControl={__handleEventControl}
                ></ExpenditureBody>}
        </>
    );
}

export default ExpenditureMain;