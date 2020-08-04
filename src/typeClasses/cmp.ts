import { PLBool } from '../data/PLBool'
import { assertType } from '../utils/assert'

/**
 * a.equals(a) === true (reflexivity)
 * a.equals(b) === b.equals(a) (symmetry)
 * If a.equals(b) and b.equals(c), then a.equals(c) (transitivity)
 */
export interface PartialEq<T> {
  // Setoid a => a ~> a -> Boolean
  equals(b: T): PLBool
}
export const equals: <T>(a: PartialEq<T>, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  return a.equals(b)
}
export const notEquals: <T>(a: PartialEq<T>, b: T) => PLBool = (a, b) => {
  return equals(a, b).not()
}

///

export enum Ordering {
  Less,
  Equal,
  Greater
}

export interface PartialOrd<T extends PartialEq<T>> {
  partialCmp(other: T): Ordering
  lt?(other: T): PLBool
  le?(other: T): PLBool
  gt?(other: T): PLBool
  ge?(other: T): PLBool
}

export const lessThen: <T extends PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const lt = a.lt
  return typeof lt === 'function' ? lt(b) : new PLBool(a.partialCmp(b) === Ordering.Less)
}

export const lessOrEqual: <T extends PartialOrd<any> & PartialEq<any>>(a: T, b: T) => PLBool = (
  a,
  b
) => {
  return new PLBool(equals(a, b).value && lessThen(a, b).value)
}

export const greaterThen: <T extends PartialOrd<any>>(a: T, b: T) => PLBool = (a, b) => {
  assertType(a, b)
  const gt = a.gt
  return typeof gt === 'function' ? gt(b) : new PLBool(a.partialCmp(b) === Ordering.Greater)
}

export const greaterOrEqual: <T extends PartialOrd<any> & PartialEq<any>>(a: T, b: T) => PLBool = (
  a,
  b
) => {
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
