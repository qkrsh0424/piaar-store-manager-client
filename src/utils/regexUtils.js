
function checkFileNameFormat(fileName) {
    let notAllowCharIdx = fileName.search(/[\\\/:*?%."<>\|]/gi);
    return notAllowCharIdx < 0;
}

// 소수점 허용 X
function checkNumberFormat(number) {
    var notNumberIdx = number.search(/[^0-9]/g);
    return (notNumberIdx === -1);
}

export{
    checkFileNameFormat,
    checkNumberFormat
}