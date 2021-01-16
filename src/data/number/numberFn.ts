import { assert, assertInteger } from '../../utils/assert'
import { PLNumber } from './PLNumber'

export function plNumber(value: number): PLNumber {
  const isInteger = value === parseInt(value.toString(), 10)
  return parseNumber(isInteger || ~isRational(value) ? value.toString() : value.toFixed(12))
}

export function parseNumber(strValue: string): any {
  assertNumeric(strValue)
  const decimalObj = isScientific(strValue) ? parseScientificString(strValue) : parseDecimalString(strValue)
  return new PLNumber(decimalObj.intValue, decimalObj.decimals)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assertNumeric(strValue: any): any {
  return assert(strValue === '' || isNaN(strValue), `Invalid number: "${strValue}"`)
}

export const isRational = (x: number): boolean => {
  const decimalStr = x.toString().split('.').pop()
  const decimalLen = decimalStr ? decimalStr.length : 0
  const isFraction = /\..*(\d)\1{12,}\d$/g.test(x.toString())
  return decimalLen < 12 ? true : isFraction
}

export function isScientific(strValue: string): boolean {
  const parts = strValue.split(/[eE]/)
  if (parts.length === 2 && assertNumeric(parts[0]) && assertNumeric(parts[1])) {
    const intValueRounded = Math.abs(parseInt(parts[0]))
    const exponential = parseFloat(parts[1])
    return intValueRounded >= 1 && intValueRounded <= 9 && exponential === parseInt(parts[1])
  } else {
    return false
  }
}

export function parseScientificString(strValue: string): any {
  if (!isScientific(strValue)) {
    return parseDecimalString(strValue)
  } else {
    const parts = strValue.split(/[eE]/)
    const decObj = parseDecimalString(parts[0])
    const exponential = parseInt(parts[1])
    if (decObj.decimals > exponential) {
      decObj.decimals -= exponential
    } else {
      decObj.intValue *= Math.pow(10, exponential - decObj.decimals)
      decObj.decimals = 0
    }
    return { intValue: decObj.intValue, decimals: decObj.decimals }
  }
}

export function parseDecimalString(strValue: string): any {
  assertNumeric(strValue)
  const parts = strValue.split('.')
  const decimals = parts.length === 1 ? 0 : parts[1].length
  const intValue = parseInt(strValue.replace('.', ''))
  return { intValue: intValue, decimals: decimals }
}

export function simplifyDecimal(intValueOld: number, decimalsOld: number): any {
  while (intValueOld > Number.MAX_SAFE_INTEGER || (intValueOld % 10 === 0 && decimalsOld > 0)) {
    const str = intValueOld.toString()
    intValueOld = parseInt(str.substring(0, str.length - 1))
    decimalsOld -= 1
  }
  return { intValue: intValueOld, decimals: decimalsOld }
}

export function expandDecimals(d1: PLNumber, d2: PLNumber): any {
  const maxDecimal = Math.max(d1.decimals, d2.decimals)
  const intValue1 = d1.intValue * Math.pow(10, maxDecimal - d1.decimals)
  const intValue2 = d2.intValue * Math.pow(10, maxDecimal - d2.decimals)
  return { maxDecimal: maxDecimal, intValue1: intValue1, intValue2: intValue2 }
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

export default {
  modulo,
}
