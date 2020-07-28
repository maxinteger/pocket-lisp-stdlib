import * as op from './cmp-types'
import { PLBool } from '../data/PLBool'
import { assertType } from '../utils/assert'
import { not } from './ops-types'

export const equals: <T>(a: op.PartialEq<T>, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  return a[op.equals](b)
}
export const notEquals: <T>(a: op.PartialEq<T>, b: T) => PLBool = (a, b) => {
  return equals(a, b)[not]()
}

export const lessThen: <T extends op.PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const lt = a[op.lt]
  return typeof lt === 'function' ? lt(b) : new PLBool(a[op.partialCmp](b) === op.Ordering.Less)
}

export const lessOrEqual: <T extends op.PartialOrd<any> & op.PartialEq<any>>(
  a: T,
  b: T
) => PLBool = (a, b) => {
  return new PLBool(equals(a, b).value && lessThen(a, b).value)
}

export const greaterThen: <T extends op.PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const gt = a[op.gt]
  return typeof gt === 'function' ? gt(b) : new PLBool(a[op.partialCmp](b) === op.Ordering.Greater)
}

export const greaterOrEqual: <T extends op.PartialOrd<any> & op.PartialEq<any>>(
  a: T,
  b: T
) => PLBool = (a, b) => {
  return new PLBool(equals(a, b).value && greaterThen(a, b).value)
}

export default {
  '==': equals,
  '!=': notEquals,
  '<': lessThen,
  '<=': lessOrEqual,
  '>': greaterThen,
  '>=': greaterOrEqual
}
