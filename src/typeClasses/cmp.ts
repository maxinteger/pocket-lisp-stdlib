import type { PLBool } from '../data/bool/PLBool'
import { assertType } from '../utils/assert'
import { plBool } from '../data/bool/boolFn'
import { Ordering, PartialEq, PartialOrd } from './cmpType'

export const equals: <T>(a: PartialEq<T>, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  return a.equals(b)
}
export const notEquals: <T>(a: PartialEq<T>, b: T) => PLBool = (a, b) => {
  return equals(a, b).not()
}

///

export const lessThen: <T extends PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const lt = a.lt
  return typeof lt === 'function' ? lt(b) : plBool(a.partialCmp(b) === Ordering.Less)
}

export const lessOrEqual: <T extends PartialOrd<any> & PartialEq<any>>(a: T, b: T) => PLBool = (a, b) => {
  return plBool(equals(a, b).value || lessThen(a, b).value)
}

export const greaterThen: <T extends PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const gt = a.gt
  return typeof gt === 'function' ? gt(b) : plBool(a.partialCmp(b) === Ordering.Greater)
}

export const greaterOrEqual: <T extends PartialOrd<any> & PartialEq<any>>(a: T, b: T) => PLBool = (a, b) => {
  return plBool(equals(a, b).value || greaterThen(a, b).value)
}

export default {
  '==': equals,
  '!=': notEquals,
  '<': lessThen,
  '<=': lessOrEqual,
  '>': greaterThen,
  '>=': greaterOrEqual,
}
