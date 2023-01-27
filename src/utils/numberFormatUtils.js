function numberWithCommas(x) {
    return x.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas2(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toPriceUnitFormat(price) {
    let priceSize = price?.toString().length;

    if(priceSize > 8) {
        return parseFloat((price / (10 ** 8)).toFixed(2)) + ' 억원';
    }else if(priceSize > 7) {
        return parseFloat((price / (10 ** 7)).toFixed(2)) + ' 천만원';
    }else if(priceSize > 6) {
        return parseFloat((price / (10 ** 6)).toFixed(2)) + ' 백만원';
    }else if(price > 4) {
        return parseFloat((price / (10 ** 4)).toFixed(2)) + ' 만원';
    }else {
        return price + '원';
    }
}

// com2에 대한 comp1의 상승 백분율
function getTrendPercentage(comp1, comp2) {
    // 유지
    if(comp1 === comp2) {
        return 0;
    }

    // comp2가 0이면 100% 감소
    if(comp2 === 0) {
        return -100;
    }
    return parseFloat(((comp1 - comp2) / comp2) * 100).toFixed(1);
}

export{
    numberWithCommas,
    numberWithCommas2,
    toPriceUnitFormat,
    getTrendPercentage
}
