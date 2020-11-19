import type { PLBase } from '../PLBase'
import type { PLVector } from '../vector/PLVector'
import { PLSet } from './PLSet'
import { plVector } from '../vector/vectorFn'

export const plSet: <T extends PLBase>(value: PLVector<T>) => PLSet<T> = (value) => new PLSet(value)

export function set2list<T extends PLBase>(set: PLSet<T>): PLVector<T> {
  return plVector<T>(...(set.value as T[]))
}

export function union<T extends PLBase>(a: PLSet<T>, b: PLSet<T>): PLSet<T> {
  return a.union(b)
}

export function difference<T extends PLBase>(a: PLSet<T>, b: PLSet<T>): PLSet<T> {
  return a.difference(b)
}

export function intersection<T extends PLBase>(a: PLSet<T>, b: PLSet<T>): PLSet<T> {
  return a.intersection(b)
}

export function symmetricDifference<T extends PLBase>(a: PLSet<T>, b: PLSet<T>): PLSet<T> {
  return a.symmetricDifference(b)
}

export default {
  Set: plSet,
  'set-2-list': set2list,
  'set-union': union,
  'set-diff': difference,
  'set-intersection': intersection,
  'set-symmetric-difference': symmetricDifference,
}
