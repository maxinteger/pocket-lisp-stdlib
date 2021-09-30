import { assert, assertInteger, typeCheck } from '../../utils/assert'
import { PLNumber } from './PLNumber'

export interface DecimalResult {
  intValue: number
  decimals: number
}

export function plNumber(value: string): PLNumber
export function plNumber(value: number, decimals?: number): PLNumber
export function plNumber(value: number | string, decimals = 0): PLNumber {
  if (typeof value === 'string') {
    assertNumeric(value)
    const decimalObj = isScientific(value) ? parseScientificString(value) : parseDecimalString(value)
    return plNumber(decimalObj.intValue, decimalObj.decimals)
  } else if (Number.isInteger(value) || decimals !== 0) {
    assertInteger(value)
    assertInteger(decimals)
    return new PLNumber(value, decimals)
  } else {
    return plNumber(value.toString())
  }
}

export function plIntegerConstructor(value: PLNumber): PLNumber {
  typeCheck(PLNumber, value)
  assert(!value.isInteger().value, 'Expected integer, but got float number.')
  return value
}

export function plFloatConstructor(value: PLNumber): PLNumber {
  typeCheck(PLNumber, value)
  return value
}

export function assertNumeric(strValue: string): boolean {
  return assert(strValue === '' || isNaN(Number(strValue)), `Invalid number: "${strValue}"`)
}

export function isScientific(strValue: string): boolean {
  if (strValue.startsWith('0')) {
    return /^0[eE]0$/.test(strValue)
  } else {
    return /^[-+]?[1-9](\.\d+)?[eE][-+]?\d+$/.test(strValue)
  }
}

export function parseScientificString(strValue: string): DecimalResult {
  assert(!isScientific(strValue), `Input is not in scientific form: "${strValue}"`)
  const parts = strValue.split(/[eE]/)
  const decimalObject = parseDecimalString(parts[0])
  const exponential = parseInt(parts[1])
  if (decimalObject.decimals > exponential) {
    decimalObject.decimals -= exponential
  } else {
    decimalObject.intValue *= Math.pow(10, exponential - decimalObject.decimals)
    decimalObject.decimals = 0
  }
  return decimalObject
}

export function parseDecimalString(strValue: string): DecimalResult {
  assertNumeric(strValue)
  const [, fraction] = strValue.split('.')
  const decimals = fraction?.length ?? 0
  const intValue = parseInt(strValue.replace('.', ''))
  return { intValue, decimals }
}

export function simplifyDecimal(intValueOld: number, decimalsOld: number): DecimalResult {
  if (intValueOld === 0) {
    return { intValue: 0, decimals: 0 }
  }
  while (intValueOld > Number.MAX_SAFE_INTEGER || (intValueOld % 10 === 0 && decimalsOld > 0)) {
    const str = intValueOld.toString()
    intValueOld = parseInt(str.substring(0, str.length - 1))
    decimalsOld -= 1
  }
  return { intValue: intValueOld, decimals: decimalsOld }
}

export function expandDecimals(
  d1: PLNumber,
  d2: PLNumber,
): { maxDecimal: number; intValue1: number; intValue2: number } {
  const maxDecimal = Math.max(d1.decimals, d2.decimals)
  const intValue1 = d1.intValue * Math.pow(10, maxDecimal - d1.decimals)
  const intValue2 = d2.intValue * Math.pow(10, maxDecimal - d2.decimals)
  return { maxDecimal, intValue1, intValue2 }
}

export function getDecimalString(intValue: number, decimals: number): string {
  return (intValue / Math.pow(10, decimals)).toFixed(decimals)
}

export function modulo(dividend: PLNumber, divisor: PLNumber): PLNumber {
  const num = dividend.value
  const mod = divisor.value
  assertInteger(num)
  assertInteger(mod)
  assert(mod < 1, `Modulo (${mod}) must be positive.`)
  assert(num < 0, `Number (${num}) cannot be negative.`)
  const remainder = num % mod
  return plNumber(remainder)
}

export function isPowerOf10(n: number): boolean {
  while(n > 1 && n % 10 == 0){
      n /= 10;
  }
  return n == 1;
}

export default {
  modulo,
}
