
function checkFileNameFormat(fileName) {
    let notAllowCharIdx = fileName.search(/[\\\/:*?%."<>\|]/gi);
    return notAllowCharIdx < 0;
}

export{
    checkFileNameFormat
}