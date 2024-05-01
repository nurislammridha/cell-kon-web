export const BdtCurrency = (data) => {
    let tk = 0;
    if (data) {
        data = parseInt(Math.ceil(data));
        tk = data.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    }
    return "৳ " + tk;
};
export const BdtCurrency2 = (data) => {
    let tk = 0;
    if (data) {
        data = parseInt(Math.ceil(data));
        tk = data.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    }
    return "BDT" + " " + tk;
};
export const conTwoDigitString = (val) => {
    console.log('val', val)
    let n = parseInt(val)
    let st = ""
    if (n < 10) {
        st = "0" + n.toString()
    } else {
        st = n.toString()
    }
    return st
}