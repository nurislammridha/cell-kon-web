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
const getGroup = (groups, categoryName, categoryId, categoryMap) => {
    let group = groups.find(g => g.categoryId === categoryId);
    if (!group) {
        const safeName = categoryName || ""
        let iconName = safeName.replace(/[^a-zA-Z]+/g, '')
        const category = categoryMap ? categoryMap.get(categoryId) : null;
        group = ({
            iconName,
            categoryName: safeName,
            categoryId,
            categoryIcon: category?.categoryIcon || "",
            categoryHoverIcon: category?.categoryHoverIcon || "",
            children: []
        });
        groups.push(group);
    }
    return group;
}
export const flatToNestedArr = (arr, categories = []) => {
    let grouped = []
    const categoryMap = new Map();
    Array.isArray(categories) && categories.forEach((item) => {
        if (item?._id) {
            categoryMap.set(item._id, item);
            const safeName = item.categoryName || ""
            const iconName = safeName.replace(/[^a-zA-Z]+/g, '')
            grouped.push({
                iconName,
                categoryName: safeName,
                categoryId: item._id,
                categoryIcon: item?.categoryIcon || "",
                categoryHoverIcon: item?.categoryHoverIcon || "",
                children: []
            })
        }
    })
    arr && arr.length > 0 && arr.forEach(item => getGroup(grouped, item.categoryName, item.categoryId, categoryMap).children.push(item))
    //  let r = "AA18 n's & fg,hj".replace(/[^a-zA-Z]+/g, '');
    return grouped
}
