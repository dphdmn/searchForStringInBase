function convertToBase(value, base, precision) {
    const integerPart = Math.floor(value);
    let fractionalPart = value - integerPart;
    let integerDigits = integerPart.toString(base);
    let fractionalDigits = "";

    for (let i = 0; i < precision; i++) {
        fractionalPart *= base;
        const digit = Math.floor(fractionalPart);
        fractionalDigits += digit.toString(base);
        fractionalPart -= digit;
    }

    return integerDigits + (fractionalDigits ? "." + fractionalDigits : "");
}

function searchFor(mathFunction, searchString, maxValue, lazyOn) {
    let lastPercent = 0;

    for (let i = 1; i <= maxValue; i++) {
        if (i % Math.floor(maxValue / 10) === 0) {
            lastPercent += 10;
            console.log(`${lastPercent}% scanned, and nothing found`);

            if (lastPercent === 100) {
                console.log("Nothing found for the current limit");
            }
        }

        const piValue = mathFunction(i);

        for (let base = 16; base <= 36; base++) {
            const converted = convertToBase(piValue, base, 50);

            if (lazyOn && converted.includes(searchString)) {
                console.log(`[LAZY] ${mathFunction.name}(${i}) in base ${base}: ${converted}`);
            }

            const substringToCompare = converted.substring(2, searchString.length + 2);

            if (substringToCompare === searchString) {
                console.log(`${mathFunction.name}(${i}) in base ${base}: ${converted}`);
                return;
            }
        }
    }
}
//example
searchFor(Math.sin, "egg", 100000, true);
