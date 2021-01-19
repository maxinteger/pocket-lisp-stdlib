import * as plm from './math'
import { plNumber } from '../data/number/numberFn'

const plf = plNumber

describe('stdlib/fn/math', () => {
  describe('constants', () => {
    const actual = plm.SQRT2
    const expected = plf(Math.SQRT2)
    expect(actual).toEqual(expected)
    it('should be OK', () => {
      const tests = [
        { actual: plm.E, expected: plf(Math.E) },
        { actual: plm.LN2, expected: plf(Math.LN2) },
        { actual: plm.LN10, expected: plf(Math.LN10) },
        { actual: plm.LOG2E, expected: plf(Math.LOG2E) },
        { actual: plm.LOG10E, expected: plf(Math.LOG10E) },
        { actual: plm.PI, expected: plf(Math.PI) },
        { actual: plm.SQRT1_2, expected: plf(Math.SQRT1_2) },
        { actual: plm.SQRT2, expected: plf(Math.SQRT2) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('base functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plm.abs(plf(-1.5)), expected: plf(1.5) },
        { actual: plm.sign(plf(1.5)), expected: plf(1) },
        { actual: plm.min(plf(1.5), plf(0)), expected: plf(0) },
        { actual: plm.max(plf(1.5), plf(1)), expected: plf(1.5) },
        { actual: plm.floor(plf(1.5)), expected: plf(1) },
        { actual: plm.round(plf(1.5)), expected: plf(2) },
        { actual: plm.ceil(plf(1.5)), expected: plf(2) },
        { actual: plm.trunc(plf(1.5)), expected: plf(1) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('arithmetic functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plm.cbrt(plf(1.5)), expected: plf(Math.cbrt(1.5)) },
        { actual: plm.sqrt(plf(1.5)), expected: plf(Math.sqrt(1.5)) },
        { actual: plm.exp(plf(1.5)), expected: plf(Math.exp(1.5)) },
        { actual: plm.pow(plf(1.5), plf(10)), expected: plf(Math.pow(1.5, 10)) },
        { actual: plm.log(plf(1.5)), expected: plf(Math.log(1.5)) },
        { actual: plm.log2(plf(1.5)), expected: plf(Math.log2(1.5)) },
        { actual: plm.log10(plf(1.5)), expected: plf(Math.log10(1.5)) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('trigonometry functions', () => {
    it('should throw error if argument is out of range', () => {
      expect(() => plm.asin(plf(1.5))).toThrow('Invalid argument for asin: 1.5')
      expect(() => plm.acos(plf(1.5))).toThrow('Invalid argument for acos: 1.5')
      expect(() => plm.atanh(plf(1.5))).toThrow('Invalid argument for atanh: 1.5')
    })

    it('should convert DEG to RAD', () => {
      expect(Math.abs(plm.rad2deg(plm.PI).value - plf(180).value) < 1e-12).toBe(true)
      expect(Math.abs(plm.deg2rad(plf(180)).value - plm.PI.value) < 1e-12).toBe(true)
    })

    it('should be OK', () => {
      const tests = [
        { actual: plm.sin(plf(1.5)), expected: plf(Math.sin(1.5)) },
        { actual: plm.sin(plf(0)), expected: plf(0) },
        { actual: plm.sin(plf(Math.PI)), expected: plf(0) },
        { actual: plm.asin(plf(0.5)), expected: plf(Math.asin(0.5)) },
        { actual: plm.asinh(plf(1.5)), expected: plf(Math.asinh(1.5)) },
        { actual: plm.cos(plf(1.5)), expected: plf(Math.cos(1.5)) },
        { actual: plm.acos(plf(0.5)), expected: plf(Math.acos(0.5)) },
        { actual: plm.acosh(plf(1.5)), expected: plf(Math.acosh(1.5)) },
        { actual: plm.tan(plf(1.5)), expected: plf(Math.tan(1.5)) },
        { actual: plm.atan(plf(1.5)), expected: plf(Math.atan(1.5)) },
        {
          actual: plm.atan2(plf(1.5), plf(19)),
          expected: plf(Math.atan2(1.5, 19)),
        },
        { actual: plm.atanh(plf(0.5)), expected: plf(Math.atanh(0.5)) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })
})
