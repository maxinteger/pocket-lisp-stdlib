import { assert, assertInteger } from '../../utils/assert'
import { plString } from '../string/stringFn'
import { PLNumber } from './PLNumber'

export const plNumber = (value: number): PLNumber => new PLNumber(value)

export const parseNumber = (value: string): PLNumber => PLNumber.fromStr(plString(value))

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
  plNumber,
  parseNumber,
  modulo,
}
