import { plString } from '../string/stringFn'
import { PLNumber } from './PLNumber'

export const plNumber = (value: number): PLNumber => new PLNumber(value)

export const parseNumber = (value: string): PLNumber => PLNumber.fromStr(plString(value))

export function modulo(dividend: PLNumber, divisor: PLNumber): PLNumber {
  const remainder = dividend.value % divisor.value
  return plNumber(remainder)
}

export default {
  modulo,
}
