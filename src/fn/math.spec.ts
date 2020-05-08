import { expect } from 'chai'
import * as plMath from './math'
import { plNumber } from '../data/PLNumber'

describe('stdlib/fn/math', () => {
  describe('constants', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plMath.E, expected: plNumber(Math.E) },
        { actual: plMath.LN2, expected: plNumber(Math.LN2) },
        { actual: plMath.LN10, expected: plNumber(Math.LN10) },
        { actual: plMath.LOG2E, expected: plNumber(Math.LOG2E) },
        { actual: plMath.LOG10E, expected: plNumber(Math.LOG10E) },
        { actual: plMath.PI, expected: plNumber(Math.PI) },
        { actual: plMath.SQRT1_2, expected: plNumber(Math.SQRT1_2) },
        { actual: plMath.SQRT2, expected: plNumber(Math.SQRT2) }
      ]
      tests.map(({ actual, expected }) => expect(actual).deep.equal(expected))
    })
  })

  describe('base functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plMath.abs(plNumber(-1.5)), expected: plNumber(1.5) },
        { actual: plMath.sign(plNumber(1.5)), expected: plNumber(1) },
        { actual: plMath.min(plNumber(1.5), plNumber(0)), expected: plNumber(0) },
        { actual: plMath.max(plNumber(1.5), plNumber(1)), expected: plNumber(1.5) },
        { actual: plMath.floor(plNumber(1.5)), expected: plNumber(1) },
        { actual: plMath.round(plNumber(1.5)), expected: plNumber(2) },
        { actual: plMath.ceil(plNumber(1.5)), expected: plNumber(2) },
        { actual: plMath.trunc(plNumber(1.5)), expected: plNumber(1) }
      ]
      tests.map(({ actual, expected }) => expect(actual).deep.equal(expected))
    })
  })

  describe('arithmetic functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plMath.cbrt(plNumber(1.5)), expected: plNumber(Math.cbrt(1.5)) },
        { actual: plMath.sqrt(plNumber(1.5)), expected: plNumber(Math.sqrt(1.5)) },
        { actual: plMath.exp(plNumber(1.5)), expected: plNumber(Math.exp(1.5)) },
        { actual: plMath.pow(plNumber(1.5), plNumber(10)), expected: plNumber(Math.pow(1.5, 10)) },
        { actual: plMath.log(plNumber(1.5)), expected: plNumber(Math.log(1.5)) },
        { actual: plMath.log2(plNumber(1.5)), expected: plNumber(Math.log2(1.5)) },
        { actual: plMath.log10(plNumber(1.5)), expected: plNumber(Math.log10(1.5)) }
      ]
      tests.map(({ actual, expected }) => expect(actual).deep.equal(expected))
    })
  })

  describe('trigonometry functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plMath.deg2rad(plNumber(180)), expected: plMath.PI },
        { actual: plMath.rad2deg(plMath.PI), expected: plNumber(180) },
        { actual: plMath.sin(plNumber(1.5)), expected: plNumber(Math.sin(1.5)) },
        { actual: plMath.asin(plNumber(1.5)), expected: plNumber(Math.asin(1.5)) },
        { actual: plMath.asinh(plNumber(1.5)), expected: plNumber(Math.asinh(1.5)) },
        { actual: plMath.cos(plNumber(1.5)), expected: plNumber(Math.cos(1.5)) },
        { actual: plMath.acos(plNumber(1.5)), expected: plNumber(Math.acos(1.5)) },
        { actual: plMath.acosh(plNumber(1.5)), expected: plNumber(Math.acosh(1.5)) },
        { actual: plMath.tan(plNumber(1.5)), expected: plNumber(Math.tan(1.5)) },
        { actual: plMath.atan(plNumber(1.5)), expected: plNumber(Math.atan(1.5)) },
        {
          actual: plMath.atan2(plNumber(1.5), plNumber(19)),
          expected: plNumber(Math.atan2(1.5, 19))
        },
        { actual: plMath.atanh(plNumber(1.5)), expected: plNumber(Math.atanh(1.5)) }
      ]
      tests.map(({ actual, expected }) => expect(actual).deep.equal(expected))
    })
  })
})
