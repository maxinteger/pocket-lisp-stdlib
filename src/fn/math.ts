import { PLNumber } from '../data/number/PLNumber'
import { typeCheck } from '../utils/assert'
import { isBelowEpsilon } from '../utils/math'
import { plNumber } from '../data/number/numberFn'
import { StdRuntimeError } from '../utils/StdRuntimeError'

const plNumFn1 = (fn: (x: number) => number) => (x: PLNumber) => {
  typeCheck(PLNumber, x)
  try {
    return plNumber(fn(x.value))
  } catch (error) {
    throw new StdRuntimeError(`Invalid argument for ${fn.name}: ${x.value}`)
  }
}

const plNumFn2 = (fn: (x: number, y: number) => number) => (x: PLNumber, y: PLNumber) => {
  typeCheck(PLNumber, x)
  typeCheck(PLNumber, y)
  return plNumber(fn(x.value, y.value))
}

/// constants

export const E = plNumber(Math.E)
export const LN2 = plNumber(Math.LN2)
export const LN10 = plNumber(Math.LN10)
export const LOG2E = plNumber(Math.LOG2E)
export const LOG10E = plNumber(Math.LOG10E)
export const PI = plNumber(Math.PI)
export const SQRT1_2 = plNumber(Math.SQRT1_2)
export const SQRT2 = plNumber(Math.SQRT2)

/// base

export const abs = plNumFn1(Math.abs)
export const sign = plNumFn1(Math.sign)

export const min = plNumFn2((a: number, b: number) => Math.min(a, b))
export const max = plNumFn2((a: number, b: number) => Math.max(a, b))

export const floor = plNumFn1(Math.floor)
export const round = plNumFn1(Math.round)
export const ceil = plNumFn1(Math.ceil)
export const trunc = plNumFn1(Math.trunc)

/// arithmetic

export const cbrt = plNumFn1(Math.cbrt)
export const sqrt = plNumFn1(Math.sqrt)

export const exp = plNumFn1(Math.exp)
export const pow = plNumFn2(Math.pow)

export const log = plNumFn1(Math.log)
export const log2 = plNumFn1(Math.log2)
export const log10 = plNumFn1(Math.log10)

/// trigonometry

const DEG_TO_RAD = Math.PI / 180

export const deg2rad = (x: PLNumber): PLNumber => x.multiple(plNumber(DEG_TO_RAD))
export const rad2deg = (x: PLNumber): PLNumber => x.divide(plNumber(DEG_TO_RAD))

export const sin = plNumFn1((val) => {
  const rem = val % Math.PI
  return isBelowEpsilon(rem) || isBelowEpsilon(rem - Math.PI) ? 0 : Math.sin(val)
})
export const asin = plNumFn1(Math.asin)
export const asinh = plNumFn1(Math.asinh)

export const cos = plNumFn1(Math.cos)
export const acos = plNumFn1(Math.acos)
export const acosh = plNumFn1(Math.acosh)

export const tan = plNumFn1(Math.tan)
export const atan = plNumFn1(Math.atan)
export const atan2 = plNumFn2(Math.atan2)
export const atanh = plNumFn1(Math.atanh)
