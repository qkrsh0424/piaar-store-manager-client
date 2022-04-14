function numberWithCommas(x) {
    return x.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommas2(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export{
    numberWithCommas,
    numberWithCommas2
}
