import { useEffect, useState } from "react";

const useDisabledButtonHook = () =>{
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(()=>{
        if(disabledBtn){
            setTimeout(()=>{
                setDisabledBtn(false);
            },1000)
            return;
        }

        return () => clearTimeout();

    },[disabledBtn])

    return [disabledBtn, setDisabledBtn];
}

export { useDisabledButtonHook }