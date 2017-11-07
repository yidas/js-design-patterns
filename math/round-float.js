/**
 * Round Float
 *
 * @example
 *  round(123.688689)     // 123
 *  round(123.688689, 0)  // 123
 *  round(123.688689, 1)  // 123.7
 *  round(123.688689, 2)  // 123.69
 *  round(123.688689, -2) // 100
 */

function round(value, precision) {
  if (Number.isInteger(precision)) {
    var shift = Math.pow(10, precision);
    return Math.round(value * shift) / shift;
  } else {
    return Math.round(value);
  }
} 
