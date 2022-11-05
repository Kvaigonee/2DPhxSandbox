/**
 * Генерация массива простых чисел в пределах диапозона значений
 * @param range
 */
function getPrimeFactorArray(range: number) : Array<number> {
    let result : number[] = [];
    for (let k = 2; k < range; k++) {
        let hasDivider = false;
        for (let i = 2; i < range; i++) {
            if (k === i) break;
            if (k % i === 0) {
                hasDivider = true;
                break;
            }
        }

        if (!hasDivider) {
            result.push(k);
        }
    }
    return result;
}

console.log(getPrimeFactorArray(300));