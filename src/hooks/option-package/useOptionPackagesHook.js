import { useEffect, useState } from "react";

export default function useOptionPackagesHook(props) {
    const [optionPackages, setOptionPackages] = useState([]);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchOptionPackages(props.option.id);
        }

        fetchInit();
    }, [])

    const reqSearchOptionPackages = async (optionId) => {
        // await subOptionCodeDataConnect().searchBatchByProductOptionId(optionId)
        //     .then(res => {
        //         if(res.status === 200 && res.data && res.data.message === 'success') {
        //             setSubOptionCodes(res.data.data);
        //         }
        //     })
        //     .catch(err => {
        //         let res = err.response;
        //         if (res?.status === 500) {
        //             alert('undefined error.');
        //             return;
        //         }

        //         alert(res?.data.memo);
        //     })
    }

} 
