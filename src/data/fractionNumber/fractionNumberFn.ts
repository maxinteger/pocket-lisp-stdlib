import { assert, typeCheck } from '../../utils/assert'
import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { createSimplifiedFraction, PLFractionNumber } from './PLFractionNumber'
import { isValid } from './utils'
import type { PLNumber } from '../number/PLNumber'
import { plNumber } from '../number/numberFn'

export const plFractionNumber = (n: number, d: number): PLFractionNumber => {
  return new PLFractionNumber(n, d)
}

export const str2plFractionNumber = (str: string): PLFractionNumber => {
  const [n, d] = str.split('/').map(parseFloat)
  if (isValid(n, d)) {
    return new PLFractionNumber(n, d)
  } else {
    throw new StdRuntimeError(`Invalid fraction number: ${str}.`)
  }
}

export const reciprocal = (fn: PLFractionNumber): PLFractionNumber => {
  typeCheck(PLFractionNumber, fn)
  return plFractionNumber(fn.denominator, fn.numerator)
}

export const number2fraction = (accuracy: PLNumber, number: PLNumber): PLFractionNumber => {
  const acc = accuracy.value
  assert(acc < 1 || !Number.isInteger(acc), `Accuracy must be a positive integer number instead of ${acc}`)
  const base = number.value
  const denominator = Math.pow(10, acc)
  const numerator = Math.round(base * denominator)
  return createSimplifiedFraction(numerator, denominator)
}

export const fraction2number = (number: PLFractionNumber): PLNumber => {
  return plNumber(number.numerator / number.denominator)
}

export default {
  ['number-2-fraction']: number2fraction,
  ['fraction-2-number']: fraction2number,
  reciprocal,
}
