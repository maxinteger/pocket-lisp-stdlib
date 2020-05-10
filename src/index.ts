import { PLLiterals } from 'pocket-lisp'
import * as math from './fn/math'
import * as modules from './module'
import ops from './fn/typeClass'
import { plVector } from './data/PLVector'
import { plHashMap } from './data/PLHashMap'
import { and, not, or, plBool, str2plBool } from './data/PLBool'
import { plNumber, str2PLNumber } from './data/PLNumber'
import { plFractionNumber, reciprocal, str2plFractionNumber } from './data/PLFractionNumber'
import { plString } from './data/PLString'
import { unboxing } from './fn/common'

export * from './types'
export { PLBool, plBool } from './data/PLBool'
export { PLNumber, plNumber } from './data/PLNumber'
export { PLFractionNumber, plFractionNumber } from './data/PLFractionNumber'
export { PLString, plString } from './data/PLString'
export { PLVector, plVector } from './data/PLVector'
export { PLHashMap, plHashMap } from './data/PLHashMap'

export const identity: <T>(x: T) => T = (x: any): any => x

export const literals: PLLiterals = {
  bool: {
    parser: str2plBool,
    factory: plBool
  },
  int: {
    parser: str2PLNumber,
    factory: plNumber
  },
  float: {
    parser: str2PLNumber,
    factory: plNumber
  },
  fractionNumber: {
    parser: str2plFractionNumber,
    factory: plFractionNumber
  },
  string: {
    parser: plString,
    factory: plString
  },
  vector: {
    parser: identity,
    factory: plVector
  },
  hashMap: {
    parser: identity,
    factory: plHashMap
  }
}

export const runtime = {
  ...ops,
  ...math,
  not,
  and,
  or,
  reciprocal,
  ...modules
}

export const utils = {
  unboxing
}
