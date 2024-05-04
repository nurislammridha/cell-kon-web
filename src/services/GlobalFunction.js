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
// var names =[
//     { name: 'b', parent: 'Brown' },
//     { name: 'a', parent: 'Brown' },
//     { name: 'h', parent: 'Green' },
//     { name: 'c', parent: 'Green' },
//     ];






// console.log(grouped)
const getGroup = (groups, categoryName, categoryId) => {
    let group = groups.find(g => g.categoryId === categoryId);
    if (!group) {
        let iconName = categoryName.replace(/[^a-zA-Z]+/g, '')
        group = ({ iconName, categoryName, categoryId, children: [] });
        groups.push(group);
    }
    return group;
}
export const flatToNestedArr = (arr) => {
    let grouped = []
    arr && arr.length > 0 && arr.forEach(item => getGroup(grouped, item.categoryName, item.categoryId).children.push(item))
    console.log('grouped', grouped)
    //  let r = "AA18 n's & fg,hj".replace(/[^a-zA-Z]+/g, '');
    return grouped
}