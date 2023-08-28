export function randomNumber() {
    const now = new Date()
    return now.getFullYear().toString() + (now.getMonth() + 1) + now.getDay().toString() + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString()
}

console.log('randomNumber :>> ', randomNumber());