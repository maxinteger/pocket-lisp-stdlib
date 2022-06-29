import * as plm from './math'
import { plNumber } from '../data/number/numberFn'
import Decimal from 'decimal.js'

const plf = plNumber

describe('stdlib/fn/math', () => {
  describe('constants', () => {
    it.each([
      { name: 'E', actual: plm.E, expected: new Decimal(Math.E) },
      { name: 'LN2', actual: plm.LN2, expected: new Decimal(Math.LN2) },
      { name: 'LN10', actual: plm.LN10, expected: new Decimal(Math.LN10) },
      { name: 'LOG2E', actual: plm.LOG2E, expected: new Decimal(Math.LOG2E) },
      { name: 'LOG10E', actual: plm.LOG10E, expected: new Decimal(Math.LOG10E) },
      { name: 'PI', actual: plm.PI, expected: new Decimal(Decimal.acos(-1)) },
      { name: 'SQRT1_2', actual: plm.SQRT1_2, expected: new Decimal(Math.SQRT1_2) },
      { name: 'SQRT2', actual: plm.SQRT2, expected: new Decimal(Math.SQRT2) },
    ])('$name should match', ({ actual, expected }) => {
      expect(actual.data).toEqual(expected)
    })
  })

  describe('base functions', () => {
    it.each([
      { name: 'abs', actual: plm.abs(plf(-1.5)), expected: plf(1.5) },
      { name: 'sign', actual: plm.sign(plf(1.5)), expected: plf(1) },
      { name: 'min', actual: plm.min(plf(1.5), plf(0)), expected: plf(0) },
      { name: 'max', actual: plm.max(plf(1.5), plf(1)), expected: plf(1.5) },
      { name: 'floor', actual: plm.floor(plf(1.5)), expected: plf(1) },
      { name: 'round', actual: plm.round(plf(1.5)), expected: plf(2) },
      { name: 'ceil', actual: plm.ceil(plf(1.5)), expected: plf(2) },
      { name: 'trunc', actual: plm.trunc(plf(1.5)), expected: plf(1) },
    ])('$name should match', ({ actual, expected }) => {
      expect(actual).toEqual(expected)
    })
  })

  describe('arithmetic functions', () => {
    it.each([
      { name: 'cbrt', actual: plm.cbrt(plf(1.5)), expected: plf(Decimal.cbrt(1.5)) },
      { name: 'sqrt', actual: plm.sqrt(plf(1.5)), expected: plf(Decimal.sqrt(1.5)) },
      { name: 'exp', actual: plm.exp(plf(1.5)), expected: plf(Decimal.exp(1.5)) },
      { name: 'pow', actual: plm.pow(plf(1.5), plf(10)), expected: plf(Decimal.pow(1.5, 10)) },
      { name: 'log', actual: plm.log(plf(1.5)), expected: plf(Decimal.log(1.5)) },
      { name: 'log2', actual: plm.log2(plf(1.5)), expected: plf(Decimal.log2(1.5)) },
      { name: 'log10', actual: plm.log10(plf(1.5)), expected: plf(Decimal.log10(1.5)) },
    ])('$name should match', ({ actual, expected }) => {
      expect(actual).toEqual(expected)
    })
  })

  describe('trigonometry functions', () => {
    it('should convert DEG to RAD', () => {
      expect(Math.abs(plm.rad2deg(plm.PI).value - plf(180).value)).toBeLessThan(1e-12)
      expect(Math.abs(plm.deg2rad(plf(180)).value - plm.PI.value)).toBeLessThan(1e-12)
    })

    it.each([
      { name: 'sin', actual: plm.sin(plf(1.5)), expected: plf(Decimal.sin(1.5)) },
      { name: 'sin 0', actual: plm.sin(plf(0)), expected: plf(0) },
      { name: 'sin pi', actual: plm.sin(plm.PI), expected: plf(0) },
      { name: 'sin 2pi ', actual: plm.sin(plm.PI.multiple(plf(2))), expected: plf(0) },
      { name: 'cost', actual: plm.cos(plf(1.5)), expected: plf(Decimal.cos(1.5)) },
      { name: 'cos 0', actual: plm.cos(plf(0)), expected: plf(1) },
      { name: 'cos pi', actual: plm.cos(plm.PI), expected: plf(1) },
      { name: 'cos 2pi ', actual: plm.cos(plm.PI.multiple(plf(2))), expected: plf(1) },
      { name: 'asin', actual: plm.asin(plf(0.5)), expected: plf(Decimal.asin(0.5)) },
      { name: 'asinh', actual: plm.asinh(plf(1.5)), expected: plf(Decimal.asinh(1.5)) },
      { name: 'cos', actual: plm.cos(plf(1.5)), expected: plf(Decimal.cos(1.5)) },
      { name: 'acos', actual: plm.acos(plf(0.5)), expected: plf(Decimal.acos(0.5)) },
      { name: 'acosh', actual: plm.acosh(plf(1.5)), expected: plf(Decimal.acosh(1.5)) },
      { name: 'tan', actual: plm.tan(plf(1.5)), expected: plf(Decimal.tan(1.5)) },
      { name: 'atan', actual: plm.atan(plf(1.5)), expected: plf(Decimal.atan(1.5)) },
      {
        name: 'atan2',
        actual: plm.atan2(plf(1.5), plf(19)),
        expected: plf(Math.atan2(1.5, 19)),
      },
      { name: 'atanh', actual: plm.atanh(plf(0.5)), expected: plf(Math.atanh(0.5)) },
    ])('should be OK', ({ actual, expected }) => {
      expect(actual).toEqual(expected)
    })
  })
})
