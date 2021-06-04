
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// components
import IncomeBody from './IncomeBody';

const IncomeMain = () => {
    const [itemData, setItemData] = useState([
        {
            id: uuidv4(),
            bankType: '우리은행',
            desc:'',
            money: ''
        }
    ])

    const __handleEventControl = () => {
        return {
            itemDataChange: function () {
                return {
                    add: function () {
                        const newItemData = {
                            id: uuidv4(),
                            bankType: '우리은행',
                            money: 0
                        }
                        setItemData(itemData.concat(newItemData))
                    },
                    delete: function(id){
                        const newItemData = itemData.filter(r=>r.id!=id);
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
                    desc: function(id, e){
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
                                        money: result
                                    }
                                    :
                                    r
                            )
                        }))
                    }
                }
            }
        }
    }
    return (
        <>
            <IncomeBody
                itemData={itemData}

                __handleEventControl={__handleEventControl}
            ></IncomeBody>
        </>
    );
}

export default IncomeMain;