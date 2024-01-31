export const getFixedNumber = (value, fractionDigits = 8) =>
  parseFloat(parseFloat(isNaN(value) ? 0 : value).toFixed(fractionDigits));

export const wackyRound = (number, places = 2) => {
  var multiplier = Math.pow(10, places + 2); // get two extra digits
  var fixed = Math.floor(parseFloat(number) * multiplier); // convert to integer
  fixed += 44; // round down on anything less than x.xxx56
  fixed = Math.floor(fixed / 100); // chop off last 2 digits
  return fixed / Math.pow(10, places);
};
