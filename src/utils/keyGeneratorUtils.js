
// const NUMBER_BOUND = [49, 57];     // asci 49~57 => number 1~9
// const UPPER_CASE_BOUND = [65, 90];      // asci 65~90 => upper case A~Z
// const LOWER_CASE_BOUND = [97, 122];     // asci 97~122 => lower case a~z


function generateProdCode() {
    return Math.random().toString(36).substring(2, 8); 
}

function generateOptionManagementCode() {
    return Math.random().toString(36).substring(2, 10); 
}

export {
    generateProdCode,
    generateOptionManagementCode
}