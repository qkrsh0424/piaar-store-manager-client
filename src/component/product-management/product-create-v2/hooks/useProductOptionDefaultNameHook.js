import { useState } from "react"

const OPTION_BATCH_MAX_SIZE = 3;

export default function useProductOptionDefaultNameHook() {
    const [defaultNameList, setDefaultNameList] = useState([
        {
            defaultName: ''
        },
        {
            defaultName: ''
        }
    ])

    const onChangeValueOfNameById = (e, idx) => {
        let data = defaultNameList.map((r, index) => {
            return (index === idx) ?
                {
                    ...r,
                    [e.target.name]: e.target.value
                }
                :
                r
                ;
        })

        setDefaultNameList(data);
    }

    const onActionAddRow = () => {
        let newData = {defaultName: ''};
        let data = [...defaultNameList, newData];

        if(data.length > OPTION_BATCH_MAX_SIZE) {
            alert('더이상 추가할 수 없습니다.');
            return;
        }

        setDefaultNameList(data);
    }

    const onActionDeleteRow = (idx) => {
        let data = defaultNameList.filter((r, index) => index !== idx);
        
        setDefaultNameList(data);
    }

    return {
        defaultNameList,

        onChangeValueOfNameById,
        onActionAddRow,
        onActionDeleteRow
    }
}