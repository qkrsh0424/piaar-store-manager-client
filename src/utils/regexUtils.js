const isIncludeBlank = (data) => {
    let regex = /(\s)/;
    return regex.test(data);
}

export {
    isIncludeBlank
}