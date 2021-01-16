import {
  assertNumeric,
  isRational,
  isScientific,
  plNumber,
  simplifyDecimal,
  parseDecimalString,
  parseScientificString,
  parseNumber,
  expandDecimals,
  getDecimalString,
} from './numberFn'
import { PLNumber } from './PLNumber'

const pln = parseNumber

describe('stdlib/data/decimal/decimalFn', () => {
  describe('plNumber', () => {
    it('should construct decimal', () => {
      expect(plNumber(0.2)).toEqual(new PLNumber(2, 1))
    })
  })

  describe('assertNumeric', () => {
    const fn = assertNumeric
    it('should assert if string is numeric', () => {
      expect(() => fn('')).toThrow('Invalid decimal number: ""')
      expect(() => fn('12,0')).toThrow('Invalid decimal number: "12,0"')
      expect(() => fn('x12.0')).toThrow('Invalid decimal number: "x12.0"')
      expect(() => fn('12 0')).toThrow('Invalid decimal number: "12 0"')
      expect(fn('0')).toBe(true)
      expect(fn('.12')).toBe(true)
      expect(fn('1.2')).toBe(true)
      expect(fn('12.')).toBe(true)
      expect(fn('12.0')).toBe(true)
      expect(fn(' 12.0')).toBe(true)
      expect(fn('12.0 ')).toBe(true)
      expect(fn('1.20E23')).toBe(true)
      expect(fn('12E-23')).toBe(true)
      expect(fn('12e1')).toBe(true)
      expect(fn('12.0e2')).toBe(true)
    })
  })

  describe('isRational', () => {
    it('should be OK', () => {
      const rationals = [1, 12.3, -0.999, 1 / 3, 1 / 9]
      rationals.map((x) => expect(isRational(x)).toEqual(true))

      const irrationals = [Math.PI, Math.E, Math.SQRT1_2]
      irrationals.map((x) => expect(isRational(x)).toEqual(false))
    })
  })

  describe('isScientific', () => {
    const fn = isScientific
    it('should check if string is in scientific format', () => {
      expect(fn('')).toBe(false)
      expect(fn('1e5')).toBe(true)
      expect(fn('0e10')).toBe(false)
      expect(fn('1.2E-2')).toBe(true)
      expect(fn('12.E+23')).toBe(false)
      expect(fn('2E+2.3')).toBe(false)
      expect(fn('1E-1.3')).toBe(false)
      expect(fn('1.2E+23')).toBe(true)
      // unsupported formats
      expect(fn('-1.2x10^12')).toBe(false)
      expect(() => fn('1,2E-2')).toThrow('Invalid decimal number: "1,2"')
      expect(() => fn('1.2Exp10')).toThrow('Invalid decimal number: "xp10"')
    })
  })

  describe('parseScientificString', () => {
    const fn = parseScientificString
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid decimal number: ""')
      expect(Object.values(fn('1e5'))).toStrictEqual([100_000, 0])
      expect(Object.values(fn('2e-3'))).toStrictEqual([2, 3])
      expect(Object.values(fn('1.2234E-2'))).toStrictEqual([12_234, 6])
      expect(Object.values(fn('2.56E+3'))).toStrictEqual([2560, 0])
      expect(Object.values(fn('-1.3e-5'))).toStrictEqual([-13, 6])
    })
  })

  describe('parseDecimalString', () => {
    const fn = parseDecimalString
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid decimal number: ""')
      expect(Object.values(fn('.230'))).toStrictEqual([230, 3])
      expect(Object.values(fn('-0.3100'))).toStrictEqual([-3100, 4])
      expect(Object.values(fn('320.0'))).toStrictEqual([3200, 1])
      expect(Object.values(fn('-20'))).toStrictEqual([-20, 0])
    })
  })

  describe('parseNumString', () => {
    const fn = parseNumber
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid decimal number: ""')
      expect(() => fn('0.1.2')).toThrow('Invalid decimal number: "0.1.2"')
      expect(() => fn('1 234')).toThrow('Invalid decimal number: "1 234')
      expect(Object.values(fn('1e5'))).toStrictEqual([0, 100_000])
      expect(Object.values(fn('2e-3'))).toStrictEqual([2, 3])
      expect(Object.values(fn('1.2234E-2'))).toStrictEqual([12_234, 6])
      expect(Object.values(fn('2.56E+3'))).toStrictEqual([2560, 0])
      expect(Object.values(fn('.230'))).toStrictEqual([230, 3])
      expect(Object.values(fn('-0.3100'))).toStrictEqual([-3100, 4])
      expect(Object.values(fn('320.0'))).toStrictEqual([3200, 1])
      expect(Object.values(fn('-20'))).toStrictEqual([-20, 0])
    })
  })

  describe('createSimplifiedDecimal', () => {
    const fn = simplifyDecimal
    it('should create simplified decimal', () => {
      expect(Object.values(fn(10, 1))).toEqual([1, 0])
      expect(Object.values(fn(-678, 2))).toEqual([-678, 2])
      expect(Object.values(fn(-6780, 2))).toEqual([-678, 1])
      expect(Object.values(fn(21_000, 4))).toEqual([21, 1])
    })
  })

  describe('expandDecimals', () => {
    const fn = expandDecimals
    it('should expand decimals to same digits', () => {
      expect(Object.values(fn(pln('1.0'), pln('0')))).toEqual([0, 1, 0])
      expect(Object.values(fn(pln('-6.78'), pln('67.8')))).toEqual([2, -678, 6780])
      expect(Object.values(fn(pln('-67.80'), pln('0.678')))).toEqual([3, -67_800, 678])
      expect(Object.values(fn(pln('2.1000'), pln('2.1')))).toEqual([1, 21, 21])
    })
  })

  describe('getDecimalString', () => {
    const fn = getDecimalString
    it('should create decimal string', () => {
      expect(fn(0, 0)).toBe('0')
      expect(fn(100, 0)).toBe('100')
      expect(fn(100, 1)).toBe('10.0')
      expect(fn(-100, 2)).toBe('-1.00')
      expect(fn(120, 2)).toBe('1.20')
      expect(fn(-3400, 5)).toBe('-0.03400')
    })
  })
})
