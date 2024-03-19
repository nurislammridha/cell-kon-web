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