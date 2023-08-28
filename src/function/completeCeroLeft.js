const CompleteCerosLeft = (number, length) => {
    const oldLength = parseInt(String(number).length)
    const newLength = parseInt(length)
    const difference = (newLength - oldLength)
    if (difference > 0) {
        let numberStr = String(number)
        for (let i = 0; i < difference; i++) {
            numberStr = "0" + numberStr
        }
        return numberStr
    } else {
        return number
    }
}

export default CompleteCerosLeft