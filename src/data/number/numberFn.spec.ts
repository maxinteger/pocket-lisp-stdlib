import {
  assertNumeric,
  isRational,
  isScientific,
  plNumber,
  plFloat,
  simplifyDecimal,
  parseDecimalString,
  parseScientificString,
  parseNumber,
  expandDecimals,
  getDecimalString,
} from './numberFn'
import { PLNumber } from './PLNumber'

describe('stdlib/data/decimal/decimalFn', () => {
  describe('plFloat', () => {
    const fn = plFloat
    it('should construct decimal', () => {
      expect(fn(2.1)).toEqual(new PLNumber(21, 1))
      expect(fn(13.42)).toEqual(new PLNumber(1342, 2))
    })
    it('should handle integers', () => {
      expect(fn(2)).toEqual(new PLNumber(2, 0))
      expect(fn(23)).toEqual(new PLNumber(23, 0))
    })
  })

  describe('plNumber', () => {
    const fn = plNumber
    it('should construct decimal', () => {
      expect(fn(2, 1)).toEqual(new PLNumber(2, 1))
      expect(fn(13, 4)).toEqual(new PLNumber(13, 4))
    })
    it('should handle integers', () => {
      expect(fn(2)).toEqual(new PLNumber(2, 0))
      expect(fn(23)).toEqual(new PLNumber(23, 0))
    })
    it('should throw error if inputs are not correct', () => {
      expect(() => fn(0.2)).toThrow("Expected integer number', but got '0.2'.")
      expect(() => fn(2, 0.3)).toThrow("Expected integer number', but got '0.3'.")
    })
  })

  describe('assertNumeric', () => {
    const fn = assertNumeric
    it('should assert if string is numeric', () => {
      expect(() => fn('')).toThrow('Invalid number: ""')
      expect(() => fn('12,0')).toThrow('Invalid number: "12,0"')
      expect(() => fn('x12.0')).toThrow('Invalid number: "x12.0"')
      expect(() => fn('12 0')).toThrow('Invalid number: "12 0"')
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
      expect(fn('1,2E-2')).toBe(false)
      expect(fn('1.2Exp10')).toBe(false)
    })
  })

  describe('parseScientificString', () => {
    const fn = parseScientificString
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('1x10^3')).toThrow('Input is not in scientific form: "1x10^3"')
      expect(fn('1e5')).toStrictEqual({ intValue: 100_000, decimals: 0 })
      expect(fn('2e-3')).toStrictEqual({ intValue: 2, decimals: 3 })
      expect(fn('1.2234E-2')).toStrictEqual({ intValue: 12_234, decimals: 6 })
      expect(fn('2.56E+3')).toStrictEqual({ intValue: 2560, decimals: 0 })
      expect(fn('-1.3e-5')).toStrictEqual({ intValue: -13, decimals: 6 })
    })
  })

  describe('parseDecimalString', () => {
    const fn = parseDecimalString
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid number: ""')
      expect(fn('.230')).toStrictEqual({ intValue: 230, decimals: 3 })
      expect(fn('-0.3100')).toStrictEqual({ intValue: -3100, decimals: 4 })
      expect(fn('320.0')).toStrictEqual({ intValue: 3200, decimals: 1 })
      expect(fn('-20')).toStrictEqual({ intValue: -20, decimals: 0 })
    })
  })

  describe('parseNumber', () => {
    const fn = parseNumber
    it('should extract integer value and decimals from string', () => {
      expect(() => fn('')).toThrow('Invalid number: ""')
      expect(() => fn('hello world')).toThrow('Invalid number: "hello world"')
      expect(() => fn('0.2hello')).toThrow('Invalid number: "0.2hello"')
      expect(() => fn('0.1.2')).toThrow('Invalid number: "0.1.2"')
      expect(() => fn('1 234')).toThrow('Invalid number: "1 234')
      expect(fn('1e5').toJS()).toStrictEqual({ intValue: 100_000, decimals: 0 })
      expect(fn('2e-3').toJS()).toStrictEqual({ intValue: 2, decimals: 3 })
      expect(fn('1.2234E-2').toJS()).toStrictEqual({ intValue: 12_234, decimals: 6 })
      expect(fn('2.56E+3').toJS()).toStrictEqual({ intValue: 2560, decimals: 0 })
      expect(fn('.230').toJS()).toStrictEqual({ intValue: 23, decimals: 2 })
      expect(fn('-0.3100').toJS()).toStrictEqual({ intValue: -31, decimals: 2 })
      expect(fn('320.0').toJS()).toStrictEqual({ intValue: 320, decimals: 0 })
      expect(fn('-20').toJS()).toStrictEqual({ intValue: -20, decimals: 0 })
    })
  })

  describe('createSimplifiedDecimal', () => {
    const fn = simplifyDecimal
    it('should create simplified decimal', () => {
      expect(fn(0, 10)).toEqual({ intValue: 0, decimals: 0 })
      expect(fn(10, 1)).toEqual({ intValue: 1, decimals: 0 })
      expect(fn(-678, 2)).toEqual({ intValue: -678, decimals: 2 })
      expect(fn(-6780, 2)).toEqual({ intValue: -678, decimals: 1 })
      expect(fn(21_000, 4)).toEqual({ intValue: 21, decimals: 1 })
    })
  })

  describe('expandDecimals', () => {
    const fn = expandDecimals
    const pln = parseNumber
    it('should expand decimals to same digits', () => {
      expect(fn(pln('1.0'), pln('0'))).toStrictEqual({ maxDecimal: 0, intValue1: 1, intValue2: 0 })
      expect(fn(pln('-6.78'), pln('67.8'))).toStrictEqual({ maxDecimal: 2, intValue1: -678, intValue2: 6780 })
      expect(fn(pln('-67.80'), pln('0.678'))).toStrictEqual({ maxDecimal: 3, intValue1: -67_800, intValue2: 678 })
      expect(fn(pln('2.1000'), pln('2.1'))).toStrictEqual({ maxDecimal: 1, intValue1: 21, intValue2: 21 })
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
