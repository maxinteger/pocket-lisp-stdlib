import { assert, assertInteger } from '../../utils/assert'
import { PLNumber } from './PLNumber'

export interface DecimalResult {
  intValue: number
  decimals: number
}

export function plFloat(x: number): PLNumber {
  return parseNumber(x.toString())
}

export function plNumber(intValue: number, decimals = 0): PLNumber {
  assertInteger(intValue)
  assertInteger(decimals)
  return new PLNumber(intValue, decimals)
}

export function parseNumber(strValue: string): PLNumber {
  assertNumeric(strValue)
  const decimalObj = isScientific(strValue) ? parseScientificString(strValue) : parseDecimalString(strValue)
  return plNumber(decimalObj.intValue, decimalObj.decimals)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assertNumeric(strValue: any): boolean {
  return assert(strValue === '' || isNaN(strValue), `Invalid number: "${strValue}"`)
}

export const isRational = (x: number): boolean => {
  const decimalStr = x.toString().split('.').pop()
  const decimalLen = decimalStr ? decimalStr.length : 0
  const isFraction = /\..*(\d)\1{12,}\d$/g.test(x.toString())
  return decimalLen < 12 ? true : isFraction
}

export function isScientific(strValue: string): boolean {
  return /^[-+]?[1-9](\.\d+)?[eE][-+]?\d+$/.test(strValue)
}

export function parseScientificString(strValue: string): DecimalResult {
  assert(!isScientific(strValue), `Input is not in scientific form: "${strValue}"`)
  const parts = strValue.split(/[eE]/)
  const decimcalObject = parseDecimalString(parts[0])
  const exponential = parseInt(parts[1])
  if (decimcalObject.decimals > exponential) {
    decimcalObject.decimals -= exponential
  } else {
    decimcalObject.intValue *= Math.pow(10, exponential - decimcalObject.decimals)
    decimcalObject.decimals = 0
  }
  return decimcalObject
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

export default {
  modulo,
}
