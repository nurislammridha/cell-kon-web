export const initialVal = (arr, page, number = 5) => {
    let val = 0
    let l = arr?.length
    let lastPage = l % number === 0 ? Math.floor(l / number) : Math.floor(l / number) + 1
    if (l % number === 0 && lastPage === page) {
        val = page * number - (number + 1)
    } else if (lastPage === page) {
        val = page * number - ((l % number) + number)
    } else {
        val = page * number - number
    }
    return val
}
export const isLastPage = (arr, page, number) => {
    let flag = false
    let l = arr?.length
    if (l % number !== 0 && l / number >= page) {
        flag = true
    } else if (l % number === 0 && l / number >= (page + 1)) {
        flag = true
    }
    return flag
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
export const getDays = () => {
    return [
        { label: "01", value: 1 },
        { label: "02", value: 1 },
        { label: "03", value: 1 },
        { label: "04", value: 1 },
        { label: "05", value: 1 },
        { label: "06", value: 1 },
        { label: "07", value: 1 },
        { label: "08", value: 1 },
        { label: "09", value: 1 },
        { label: "10", value: 1 },
        { label: "11", value: 1 },
        { label: "12", value: 1 },
        { label: "13", value: 1 },
        { label: "14", value: 1 },
        { label: "15", value: 1 },
        { label: "16", value: 1 },
        { label: "17", value: 1 },
        { label: "18", value: 1 },
        { label: "19", value: 1 },
        { label: "20", value: 1 },
        { label: "21", value: 1 },
        { label: "22", value: 1 },
        { label: "23", value: 1 },
        { label: "24", value: 1 },
        { label: "25", value: 1 },
        { label: "26", value: 1 },
        { label: "27", value: 1 },
        { label: "28", value: 1 },
        { label: "29", value: 1 },
        { label: "30", value: 1 },
        { label: "31", value: 1 },
    ]
}
export const getMonth = () => {
    return [
        { label: "January", value: 1 },
        { label: "February", value: 1 },
        { label: "March", value: 1 },
        { label: "April", value: 1 },
        { label: "May", value: 1 },
        { label: "June", value: 1 },
        { label: "July", value: 1 },
        { label: "August", value: 1 },
        { label: "September", value: 1 },
        { label: "October", value: 1 },
        { label: "November", value: 1 },
        { label: "December", value: 1 },
    ]
}
export const getYear = () => {
    return [
        { label: "2020", value: 1 },
        { label: "2019", value: 1 },
        { label: "2018", value: 1 },
        { label: "2017", value: 1 },
        { label: "2016", value: 1 },
        { label: "2015", value: 1 },
        { label: "2014", value: 1 },
        { label: "2013", value: 1 },
        { label: "2012", value: 1 },
        { label: "2011", value: 1 },
        { label: "2010", value: 1 },
        { label: "2009", value: 1 },
        { label: "2008", value: 1 },
        { label: "2007", value: 1 },
        { label: "2006", value: 1 },
        { label: "2005", value: 1 },
        { label: "2004", value: 1 },
        { label: "2003", value: 1 },
        { label: "2002", value: 1 },
        { label: "2001", value: 1 },
        { label: "2000", value: 1 },
        { label: "1999", value: 1 },
        { label: "1998", value: 1 },
        { label: "1997", value: 1 },
        { label: "1996", value: 1 },
        { label: "1995", value: 1 },
        { label: "1994", value: 1 },
        { label: "1993", value: 1 },
        { label: "1992", value: 1 },
        { label: "1990", value: 1 },
        { label: "1989", value: 1 },
    ]
}
export const getBg = (item) => {
    let bg = ""
    if (item === "Created") {
        bg = "created_bg"
    } else if (item === "Confirmed") {
        bg = "confirm_bg"
    } else if (item === "Cancelled") {
        bg = "cancelled_bg"
    } else if (item === "Picked") {
        bg = "picked_bg"
    } else if (item === "Shipped") {
        bg = "shipped_bg"
    } else if (item === "Delivered") {
        bg = "delivered_bg"
    } else if (item === "Processing") {
        bg = "processing_bg"
    }
    return bg
}
export const orderByStatus = (list, status) => {
    let arr = []
    if (status !== "All" && list.length > 0) {
        list.forEach(val => {
            if (val.orderStatus === status) {
                arr.push(val)
            }
        });
    } else {
        arr = list
    }
    return arr
}
