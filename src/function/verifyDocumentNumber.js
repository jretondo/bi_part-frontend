const types = [20, 23, 24, 25, 26, 27, 30, 33, 34]
const productDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]

export const verifyDocumentNumber = (documentNumber) => {
    const verifyNumber = documentNumber.substring(0, 10)
    const documentType = documentNumber.substring(0, 2)
    const digVer = parseInt(documentNumber.substring(10, 11))
    const largo = documentNumber.length
    const found = types.find(e => e === parseInt(documentType))

    if (found === undefined) {
        return {
            isValid: false,
            message: "Cuit erroneo. No corresponde a un tipo."
        }
    } else if (largo !== 11) {
        return {
            isValid: false,
            message: "Cuit erroneo. El CUIT debe tener 11 digitos."
        }
    } else {
        let sum = 0

        for (let i = 0; i < verifyNumber.length; i++) {
            const num = verifyNumber.substring(i, i + 1)
            const product = parseInt(num) * productDigit[i]
            sum = sum + product
        }

        const modulo = (sum % 11)
        const trueDigitVerify = 11 - modulo

        if (trueDigitVerify === digVer) {
            return {
                isValid: true,
                message: "Cuit correcto."
            }
        } else {
            return {
                isValid: false,
                message: "Cuit erroneo. Verifique el número colocado."
            }
        }
    }
} 