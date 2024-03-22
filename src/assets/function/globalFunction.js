export const initialVal = (arr, page) => {
    let val = 0
    let lastPage = Math.floor(arr.length / 5) + 1
    if (lastPage === page) {
        val = page * 5 - ((arr.length % 5) + 5)
    } else {
        val = page * 5 - 5
    }
    return val
}

export const locationOption = (list) => {
    let arr = []
    if (list?.length > 0) {
        list?.forEach(item => {
            let obj = { value: item.id, label: item.name }
            arr.push(obj)
        });
    }
    return arr
}

export const getSubTotal = (list) => {
    let total = 0
    if (list.length) {
        list.forEach(item => {
            total = total + item.quantity * (Math.floor(item?.productDetails?.mrp - item?.productDetails?.mrp * item?.productDetails?.regularDiscount * 0.01))
        });
    }
    return total
}