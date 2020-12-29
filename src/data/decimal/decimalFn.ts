import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { PLDecimal } from './PLDecimal'

export function plDecimal(strValue: string): PLDecimal {
  return new PLDecimal(strValue)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isNumeric(strValue: any): boolean {
  return strValue !== '' && !isNaN(strValue)
}

export function getDecimalParts(strValue: string): Array<string> {
  if (!isNumeric(strValue)) {
    throw new StdRuntimeError('Invalid decimal number parameters!')
  }
  return strValue.split('.')
}

export function createSimplifiedDecimal(strValue: string): PLDecimal {
  const decimalParts = getDecimalParts(strValue)
  while (decimalParts.length == 2 && decimalParts[1].endsWith('0')) {
    if (decimalParts[1] === '0') {
      decimalParts.pop()
    } else {
      decimalParts[1] = decimalParts[1].substring(0, decimalParts[1].length - 1)
    }
  }
  return new PLDecimal(decimalParts.join('.'))
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
