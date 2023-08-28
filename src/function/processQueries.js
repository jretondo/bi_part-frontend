export const processQueries = async (queriesArray = [{
    query: ""
}]) => {
    let queryString = ""
    if (queriesArray.length > 0) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line
            queriesArray.map((item, key) => {
                const obj = Object.keys(item)
                if (item[obj[0]]) {
                    if (queryString === "") {
                        queryString = `?${queryString}${obj[0]}=${item[obj[0]]}`
                    } else {
                        queryString = `${queryString}&${obj[0]}=${item[obj[0]]}`
                    }
                }
                if (key === queriesArray.length - 1) {
                    resolve(queryString)
                }
            })
        })
    }
}