import { useState } from "react";

export default function useBatchRegTooltipHook(props) {
    const [batchRegTooltipOpen, setBatchRegTooltipOpen] = useState({
        salesPrice: false,
        totalPurchasePrice: false,
        releaseLocation: false,
        status: false,
        memo: false,
        safetyStockUnit: false
    });
    
    const [batchRegInput, setBatchRegInput] = useState({
        salesPrice: '',
        totalPurchasePrice: '',
        releaseLocation: '',
        status: '',
        memo: '',
        safetyStockUnit: ''
    });

    const onActionOpenBatchRegToolTip = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let name = e.target.name;

        let tooltipOpen = {
            salesPrice: false,
            totalPurchasePrice: false,
            releaseLocation: false,
            status: false,
            memo: false,
            safetyStockUnit: false
        }

        setBatchRegTooltipOpen({
            ...tooltipOpen,
            [name]: true
        });
    }

    const onActionCloseBatchRegTooltip = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let name = e.target.name;

        setBatchRegTooltipOpen({
            ...batchRegTooltipOpen,
            [name]: false
        });
    }
    
    const onChangeBatchRegInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setBatchRegInput({
            ...batchRegInput,
            [name]: value
        })
    }

    return {
        batchRegTooltipOpen,
        batchRegInput,

        onActionOpenBatchRegToolTip,
        onActionCloseBatchRegTooltip,
        onChangeBatchRegInput
    }
}