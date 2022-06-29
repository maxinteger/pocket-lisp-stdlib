import { PLNumber } from '../data/number/PLNumber'
import { typeCheck } from '../utils/assert'
import { plNumber } from '../data/number/numberFn'
import { Ordering } from '../typeClasses'
import Decimal from 'decimal.js'

const plNumFn1 =
  (fn: (num: PLNumber) => PLNumber) =>
  (x: PLNumber): PLNumber => {
    typeCheck(PLNumber, x)
    return fn(x)
  }
const plNumFn2 =
  (fn: (a: PLNumber, b: PLNumber) => PLNumber) =>
  (a: PLNumber, b: PLNumber): PLNumber => {
    typeCheck(PLNumber, a)
    typeCheck(PLNumber, b)
    return fn(a, b)
  }

/// constants

export const E = plNumber(Math.E)
export const LN2 = plNumber(Math.LN2)
export const LN10 = plNumber(Math.LN10)
export const LOG2E = plNumber(Math.LOG2E)
export const LOG10E = plNumber(Math.LOG10E)
export const PI = plNumber(Decimal.acos(-1))
export const SQRT1_2 = plNumber(Math.SQRT1_2)
export const SQRT2 = plNumber(Math.SQRT2)

/// base

export const abs = plNumFn1((num) => new PLNumber(num.data.abs()))
export const sign = plNumFn1((num) => new PLNumber(num.data.s))

export const min = plNumFn2((a, b) => (a.partialCmp(b) === Ordering.Greater ? b : a))
export const max = plNumFn2((a, b) => (a.partialCmp(b) === Ordering.Greater ? a : b))

export const floor = plNumFn1((num) => new PLNumber(num.data.floor()))
export const round = plNumFn1((num) => new PLNumber(num.data.round()))
export const ceil = plNumFn1((num) => new PLNumber(num.data.ceil()))
export const trunc = plNumFn1((num) => new PLNumber(num.data.trunc()))

/// arithmetic

export const cbrt = plNumFn1((num) => new PLNumber(num.data.cbrt()))
export const sqrt = plNumFn1((num) => new PLNumber(num.data.sqrt()))

export const exp = plNumFn1((num) => new PLNumber(num.data.exp()))
export const pow = plNumFn2((a, b) => new PLNumber(a.data.pow(b.data)))

export const log = plNumFn1((num) => new PLNumber(num.data.log()))
export const log2 = plNumFn1((num) => new PLNumber(Decimal.log2(num.data)))
export const log10 = plNumFn1((num) => new PLNumber(Decimal.log10(num.data)))

/// trigonometry

const DEG_TO_RAD = PI.data.div(180)

export const deg2rad = plNumFn1((num) => new PLNumber(num.data.mul(DEG_TO_RAD)))
export const rad2deg = plNumFn1((num) => new PLNumber(num.data.div(DEG_TO_RAD)))

export const sin = plNumFn1((num) => {
  if (num.data.mod(PI.data).isInteger()) {
    return new PLNumber(0)
  }
  return new PLNumber(num.data.sin())
})
export const asin = plNumFn1((num) => new PLNumber(num.data.asin()))
export const asinh = plNumFn1((num) => new PLNumber(num.data.asinh()))

export const cos = plNumFn1((num) => {
  if (num.data.mod(PI.data).isInteger()) {
    return new PLNumber(1)
  }
  return new PLNumber(num.data.cos())
})
export const acos = plNumFn1((num) => new PLNumber(num.data.acos()))
export const acosh = plNumFn1((num) => new PLNumber(num.data.acosh()))

export const tan = plNumFn1((num) => new PLNumber(num.data.tan()))
export const atan = plNumFn1((num) => new PLNumber(num.data.atan()))
export const atan2 = plNumFn2((a, b) => new PLNumber(Decimal.atan2(a.data, b.data)))
export const atanh = plNumFn1((num) => new PLNumber(num.data.atanh()))
