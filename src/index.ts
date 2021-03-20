import type { PLLiterals } from 'pocket-lisp'
import baseFn from './fn/base'
import * as math from './fn/math'
import * as modules from './module'
import { parseBool, plBool, plBoolConstructor } from './data/bool/boolFn'
import { plString, plStringConstructor } from './data/string/stringFn'
import { maybe } from './data/maybe/maybeFn'
import { default as hashMapFn, plHashMap, plHashMapConstructor } from './data/hashMap/hashMapFn'
import { default as numFn, plFloatConstructor, plIntegerConstructor, plNumber } from './data/number/numberFn'
import { default as vectorFn, plVector } from './data/vector/vectorFn'
import { default as setFn } from './data/set/setFn'
import {
  default as fractionNumberFn,
  plFractionNumber,
  plFractionNumberConstructor,
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
    nativeConstructor: plBool,
    langConstructor: plBoolConstructor,
  },
  Int: {
    parser: plNumber,
    nativeConstructor: plNumber,
    langConstructor: plIntegerConstructor,
  },
  Float: {
    parser: plNumber,
    nativeConstructor: plNumber,
    langConstructor: plFloatConstructor,
  },
  FractionNumber: {
    parser: str2plFractionNumber,
    nativeConstructor: plFractionNumber,
    langConstructor: plFractionNumberConstructor,
  },
  String: {
    parser: plString,
    nativeConstructor: plString,
    langConstructor: plStringConstructor,
  },
  Vector: {
    parser: identity,
    nativeConstructor: plVector,
    langConstructor: plVector,
  },
  HashMap: {
    parser: identity,
    nativeConstructor: plHashMap,
    langConstructor: plHashMapConstructor,
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
