import * as plm from './math'
import { plNumber } from '../data/number/numberFn'

const pln = plNumber

describe('stdlib/fn/math', () => {
  describe('constants', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plm.E, expected: pln(Math.E) },
        { actual: plm.LN2, expected: pln(Math.LN2) },
        { actual: plm.LN10, expected: pln(Math.LN10) },
        { actual: plm.LOG2E, expected: pln(Math.LOG2E) },
        { actual: plm.LOG10E, expected: pln(Math.LOG10E) },
        { actual: plm.PI, expected: pln(Math.PI) },
        { actual: plm.SQRT1_2, expected: pln(Math.SQRT1_2) },
        { actual: plm.SQRT2, expected: pln(Math.SQRT2) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('base functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plm.abs(pln(-1.5)), expected: pln(1.5) },
        { actual: plm.sign(pln(1.5)), expected: pln(1) },
        { actual: plm.min(pln(1.5), pln(0)), expected: pln(0) },
        { actual: plm.max(pln(1.5), pln(1)), expected: pln(1.5) },
        { actual: plm.floor(pln(1.5)), expected: pln(1) },
        { actual: plm.round(pln(1.5)), expected: pln(2) },
        { actual: plm.ceil(pln(1.5)), expected: pln(2) },
        { actual: plm.trunc(pln(1.5)), expected: pln(1) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('arithmetic functions', () => {
    it('should be OK', () => {
      const tests = [
        { actual: plm.cbrt(pln(1.5)), expected: pln(Math.cbrt(1.5)) },
        { actual: plm.sqrt(pln(1.5)), expected: pln(Math.sqrt(1.5)) },
        { actual: plm.exp(pln(1.5)), expected: pln(Math.exp(1.5)) },
        { actual: plm.pow(pln(1.5), pln(10)), expected: pln(Math.pow(1.5, 10)) },
        { actual: plm.log(pln(1.5)), expected: pln(Math.log(1.5)) },
        { actual: plm.log2(pln(1.5)), expected: pln(Math.log2(1.5)) },
        { actual: plm.log10(pln(1.5)), expected: pln(Math.log10(1.5)) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })

  describe('trigonometry functions', () => {
    it('should throw error if argument is out of range', () => {
      expect(() => plm.asin(pln(1.5))).toThrow('Invalid argument for asin: 1.5')
      expect(() => plm.acos(pln(1.5))).toThrow('Invalid argument for acos: 1.5')
      expect(() => plm.atanh(pln(1.5))).toThrow('Invalid argument for atanh: 1.5')
    })

    it('should convert DEG to RAD', () => {
      expect(Math.abs(plm.rad2deg(plm.PI).value - pln(180).value) < 1e-12).toBe(true)
      expect(Math.abs(plm.deg2rad(pln(180)).value - plm.PI.value) < 1e-12).toBe(true)
    })

    it('should be OK', () => {
      const tests = [
        { actual: plm.sin(pln(1.5)), expected: pln(Math.sin(1.5)) },
        { actual: plm.sin(pln(0)), expected: pln(0) },
        { actual: plm.sin(pln(Math.PI)), expected: pln(0) },
        { actual: plm.asin(pln(0.5)), expected: pln(Math.asin(0.5)) },
        { actual: plm.asinh(pln(1.5)), expected: pln(Math.asinh(1.5)) },
        { actual: plm.cos(pln(1.5)), expected: pln(Math.cos(1.5)) },
        { actual: plm.acos(pln(0.5)), expected: pln(Math.acos(0.5)) },
        { actual: plm.acosh(pln(1.5)), expected: pln(Math.acosh(1.5)) },
        { actual: plm.tan(pln(1.5)), expected: pln(Math.tan(1.5)) },
        { actual: plm.atan(pln(1.5)), expected: pln(Math.atan(1.5)) },
        {
          actual: plm.atan2(pln(1.5), pln(19)),
          expected: pln(Math.atan2(1.5, 19)),
        },
        { actual: plm.atanh(pln(0.5)), expected: pln(Math.atanh(0.5)) },
      ]
      tests.map(({ actual, expected }) => expect(actual).toEqual(expected))
    })
  })
})
