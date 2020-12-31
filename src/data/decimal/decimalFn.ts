import { assert } from '../../utils/assert'
import { PLDecimal } from './PLDecimal'

export function plDecimal(strValue: string): PLDecimal {
  const decimalObj = parseNumString(strValue)
  return new PLDecimal(decimalObj.intValue, decimalObj.decimals)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assertNumeric(strValue: any): any {
  return assert(strValue === '' || isNaN(strValue), `Invalid decimal number: "${strValue}"`)
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

export function parseNumString(strValue: string): any {
  assertNumeric(strValue)
  return isScientific(strValue) ? parseScientificString(strValue) : parseDecimalString(strValue)
}

export function simplifyDecimal(intValueOld: number, decimalsOld: number): any {
  while (intValueOld % 10 === 0 && decimalsOld > 0) {
    intValueOld /= 10
    decimalsOld -= 1
  }
  return { intValue: intValueOld, decimals: decimalsOld }
}

export function expandDecimals(d1: PLDecimal, d2: PLDecimal): any {
  const maxDecimal = Math.max(d1.decimals, d2.decimals)
  const intValue1 = d1.intValue * Math.pow(10, maxDecimal - d1.decimals)
  const intValue2 = d2.intValue * Math.pow(10, maxDecimal - d2.decimals)
  return { maxDecimal: maxDecimal, intValue1: intValue1, intValue2: intValue2 }
}

export function getDecimalString(intValue: number, decimals: number): string {
  return (intValue / Math.pow(10, decimals)).toFixed(decimals)
}
