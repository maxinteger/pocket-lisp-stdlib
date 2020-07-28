import { PLLiterals } from 'pocket-lisp'
import * as math from './fn/math'
import * as modules from './module'
import { plVector } from './data/PLVector'
import { plHashMap } from './data/PLHashMap'
import { parseBool, plBool } from './data/PLBool'
import { plNumber, parseNumber } from './data/PLNumber'
import { plFractionNumber, reciprocal, str2plFractionNumber } from './data/PLFractionNumber'
import { plString } from './data/PLString'
import { unboxing } from './fn/common'
import typeClassBaseFn from './typeClasses/base-fn'
import typeClassCmpFn from './typeClasses/cmp-fn'
import typeClassIter from './typeClasses/iter-fn'
import typeClassOps from './typeClasses/ops-fn'

export const identity: <T>(x: T) => T = (x: any): any => x

export const literals: PLLiterals = {
  bool: {
    parser: parseBool,
    factory: plBool
  },
  int: {
    parser: parseNumber,
    factory: plNumber
  },
  float: {
    parser: parseNumber,
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
  ...typeClassBaseFn,
  ...typeClassCmpFn,
  ...typeClassIter,
  ...typeClassOps,
  ...math,
  reciprocal,
  ...modules
}

export const utils = {
  unboxing
}

export { PLBool, plBool } from './data/PLBool'
export { PLNumber, plNumber } from './data/PLNumber'
export { PLFractionNumber, plFractionNumber } from './data/PLFractionNumber'
export { PLString, plString } from './data/PLString'
export { PLVector, plVector } from './data/PLVector'
export { PLHashMap, plHashMap } from './data/PLHashMap'
