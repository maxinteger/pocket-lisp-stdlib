import {
  assertNumeric,
  isScientific,
  plDecimal,
  createSimplifiedDecimal,
  parseDecimalString,
  parseScientificString,
  parseNumString,
  expandDecimals,
  getDecimalString,
} from './decimalFn'
import { PLDecimal } from './PLDecimal'

const pld = plDecimal

describe('stdlib/data/decimal/decimalFn', () => {
  describe('plDecimal', () => {
    it('should construct decimal', () => {
      expect(pld('0')).toEqual(new PLDecimal('0'))
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
    const fn = parseNumString
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid decimal number: ""')
      expect(() => fn('0.1.2')).toThrow('Invalid decimal number: "0.1.2"')
      expect(() => fn('1 234')).toThrow('Invalid decimal number: "1 234')
      expect(Object.values(fn('1e5'))).toStrictEqual([100_000, 0])
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
    const fn = createSimplifiedDecimal
    it('should create simplified decimal', () => {
      expect(fn(10, 1)).toEqual(pld('1'))
      expect(fn(-678, 2)).toEqual(pld('-6.78'))
      expect(fn(-6780, 2)).toEqual(pld('-67.8'))
      expect(fn(21_000, 4)).toEqual(pld('2.1'))
    })
  })

  describe('expandDecimals', () => {
    const fn = expandDecimals
    it('should expand decimals to same digits', () => {
      expect(Object.values(fn(pld('1.0'), pld('0')))).toEqual([1, 10, 0])
      expect(Object.values(fn(pld('-6.78'), pld('67.8')))).toEqual([2, -678, 6780])
      expect(Object.values(fn(pld('-67.80'), pld('0.678')))).toEqual([3, -67_800, 678])
      expect(Object.values(fn(pld('2.1000'), pld('2.1')))).toEqual([4, 21_000, 21_000])
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
