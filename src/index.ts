import type { PLLiterals } from 'pocket-lisp'
import baseFn from './fn/base'
import * as math from './fn/math'
import * as modules from './module'
import { parseBool, plBool } from './data/bool/boolFn'
import { plString } from './data/string/stringFn'
import { maybe } from './data/maybe/maybeFn'
import { default as hashMapFn, plHashMap } from './data/hashMap/hashMapFn'
import { default as numFn, plNumber } from './data/number/numberFn'
import { default as vectorFn, plVector } from './data/vector/vectorFn'
import { default as setFn } from './data/set/setFn'
import {
  default as fractionNumberFn,
  plFractionNumber,
  str2plFractionNumber,
} from './data/fractionNumber/fractionNumberFn'
import { unboxing } from './fn/common'

import typeClassBaseFn from './typeClasses/base'
import typeClassCmpFn from './typeClasses/cmp'
import typeClassIter from './typeClasses/iter'
import typeClassOps from './typeClasses/ops'

export const identity: <T>(x: T) => T = (x: any): any => x

export const literals: PLLiterals = {
  Bool: {
    parser: parseBool,
    factory: plBool,
  },
  Int: {
    parser: plNumber,
    factory: plNumber,
  },
  Float: {
    parser: plNumber,
    factory: plNumber,
  },
  FractionNumber: {
    parser: str2plFractionNumber,
    factory: plFractionNumber,
  },
  String: {
    parser: plString,
    factory: plString,
  },
  Vector: {
    parser: identity,
    factory: plVector,
  },
  HashMap: {
    parser: identity,
    factory: plHashMap,
  },
}

export const runtime = {
  ...typeClassBaseFn,
  ...typeClassCmpFn,
  ...typeClassIter,
  ...typeClassOps,
  ...baseFn,
  ...math,
  ...numFn,
  ...fractionNumberFn,
  ...vectorFn,
  ...hashMapFn,
  ...setFn,
  ...modules,
  maybe,
}

export const utils = {
  unboxing,
}

export { PLBool } from './data/bool/PLBool'
export { PLNumber } from './data/number/PLNumber'
export { PLFractionNumber } from './data/fractionNumber/PLFractionNumber'
export { PLString } from './data/string/PLString'
export { PLVector } from './data/vector/PLVector'
export { PLHashMap } from './data/hashMap/PLHashMap'
export * from './typeClasses'
export { plBool } from './data/bool/boolFn'
export { plString } from './data/string/stringFn'
export { plFractionNumber } from './data/fractionNumber/fractionNumberFn'
export { plHashMap } from './data/hashMap/hashMapFn'
export { plNumber } from './data/number/numberFn'
export { plVector } from './data/vector/vectorFn'
