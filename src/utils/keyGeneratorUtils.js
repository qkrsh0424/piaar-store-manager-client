
const POSSIBLE_CHARACTER = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateProdCode() {
    let splitCode = "g";
    let randomTimeStr = (new Date().getTime()).toString(36).substring(0,8);
    let randomStr = [...Array(9)].reduce(a => a + POSSIBLE_CHARACTER[~~(Math.random()*POSSIBLE_CHARACTER.length)],'');
    
    let resultRandomStr = splitCode + randomTimeStr + randomStr;
    return resultRandomStr;
}

function generateOptionManagementCode() {
    let splitCode = "o";
    let randomTimeStr = (new Date().getTime()).toString(36).substring(0,8);
    let randomStr = [...Array(9)].reduce(a => a + POSSIBLE_CHARACTER[~~(Math.random()*POSSIBLE_CHARACTER.length)],'');
    
    let resultRandomStr = splitCode + randomTimeStr + randomStr;
    return resultRandomStr;
}

export {
    generateProdCode,
    generateOptionManagementCode
}