const CapitalLetters = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ"
const LowerCasesLetters = "abcdefghyjklmnñopqrstuvwxyz"
const Numbers = "0123456789"

export function passSecurity(pass) {
    let security = 0;
    if (pass.length !== 0) {
        if (hasNumbers(pass) && hasLetters(pass)) {
            security += 30;
        }
        if (hasLowerCase(pass) && hasCapital(pass)) {
            security += 30;
        }
        if (pass.length >= 3 && pass.length <= 4) {
            security += 10;
        } else {
            if (pass.length >= 5 && pass.length <= 7) {
                security += 30;
            } else {
                if (pass.length > 7) {
                    security += 40;
                }
            }
        }
    }
    return security
}

function hasNumbers(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (Numbers.indexOf(texto.charAt(i), 0) !== -1) {
            return 1;
        }
    }
    return 0;
}

function hasLetters(texto) {
    texto = texto.toLowerCase();
    for (let i = 0; i < texto.length; i++) {
        if (LowerCasesLetters.indexOf(texto.charAt(i), 0) !== -1) {
            return 1;
        }
    }
    return 0;
}

function hasLowerCase(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (LowerCasesLetters.indexOf(texto.charAt(i), 0) !== -1) {
            return 1;
        }
    }
    return 0;
}

function hasCapital(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (CapitalLetters.indexOf(texto.charAt(i), 0) !== -1) {
            return 1;
        }
    }
    return 0;
}