import { assert, typeCheck } from '../../utils/assert'
import { PLNumber, PLNumberInput } from './PLNumber'
import Decimal from 'decimal.js'

export interface DecimalResult {
  d: number[]
  e: number
  s: number
}

export function plNumber(value: PLNumberInput): PLNumber {
  return new PLNumber(value)
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

export function modulo(dividend: PLNumber, divisor: PLNumber): PLNumber {
  return plNumber(Decimal.mod(dividend.data, divisor.data))
}

export default {
  modulo,
}
