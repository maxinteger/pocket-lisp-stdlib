import { PLBool, PLNumber } from '../index'
import * as op from './ops-types'
import { assertType } from '../utils/assert'

export const not: (a: op.Not) => PLBool = (a) => {
  return a[op.not]()
}

export const and: <T>(a: op.And<T>, b: T) => PLBool = (a, b) => {
  return a[op.and](b)
}

export const or: <T>(a: op.Or<T>, b: T) => PLBool = (a, b) => {
  return a[op.or](b)
}

export const negate: (a: op.Negate<any>) => PLBool = (a) => {
  return a[op.negate]()
}

export const add: <T>(a: op.Add<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a[op.add](b)
}

export const subtract: <T>(a: op.Subtract<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a[op.subtract](b)
}

export const multiple: <T>(a: op.Multiple<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a[op.multiple](b)
}

export const divide: <T>(a: op.Divide<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a[op.divide](b)
}

export const get: <Idx, Item>(data: op.Index<Idx, Item>, idx: Idx) => Item = (data, idx) => {
  assertType(idx, PLNumber)
  return data[op.index](idx)
}

export default { negate, not, and, or, '+': add, '-': subtract, '*': multiple, '/': divide, get }
