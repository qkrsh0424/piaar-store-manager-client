
function checkFileNameFormat(fileName) {
    let notAllowCharIdx = fileName.search(/[\\\/:*?%."<>\|]/gi);
    return notAllowCharIdx < 0;
}

// 소수점 허용 X
function isNumberFormat(number) {
    var notNumberIdx = (number.toString()).search(/[^0-9]/g);
    return (notNumberIdx === -1);
}

export{
    checkFileNameFormat,
    isNumberFormat
}