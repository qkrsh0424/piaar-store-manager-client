import { useState } from "react"

const OPTION_BATCH_MAX_SIZE = 3;
const OPTION_BATCH_MIN_SIZE = 2;

export default function useProductOptionDefaultNameHook(props) {
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

    const onActionDeleteRow = (id) => {
        let data = defaultNameList.filter(r => r.id !== id);

        if(data.length < OPTION_BATCH_MIN_SIZE) {
            alert('더이상 삭제할 수 없습니다.')
            return;
        }

        setDefaultNameList(data);
    }

    return {
        defaultNameList,

        onChangeValueOfNameById,
        onActionAddRow,
        onActionDeleteRow
    }
}