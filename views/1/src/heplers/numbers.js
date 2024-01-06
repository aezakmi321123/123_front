export const getFixedNumber = (value, fractionDigits= 8) => parseFloat(parseFloat(isNaN(value) ? 0 : value).toFixed(fractionDigits))
