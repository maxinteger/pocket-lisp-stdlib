import {
  assertNumeric,
  isScientific,
  plNumber,
  simplifyDecimal,
  parseDecimalString,
  parseScientificString,
  expandDecimals,
  getDecimalString,
  modulo,
  plNumberConstructor,
} from './numberFn'
import { PLNumber } from './PLNumber'
import { plString } from '../string/stringFn'

const pln = plNumber

describe('stdlib/data/number/numberFn', () => {
  describe('plNumber', () => {
    it('should work for floats', () => {
      expect(pln(2.1)).toEqual(new PLNumber(21, 1))
      expect(pln(13.42)).toEqual(new PLNumber(1342, 2))
    })
    it('should work for integers', () => {
      expect(pln(2)).toEqual(new PLNumber(2, 0))
      expect(pln(23)).toEqual(new PLNumber(23, 0))
    })
    it('should construct decimal', () => {
      expect(pln(2, 1)).toEqual(new PLNumber(2, 1))
      expect(pln(13, 4)).toEqual(new PLNumber(13, 4))
    })
    it('should throw error if inputs are not correct', () => {
      expect(() => pln(0.2, 1)).toThrow("Expected integer number', but got '0.2'.")
      expect(() => pln(2, 0.3)).toThrow("Expected integer number', but got '0.3'.")
    })
    it('should extract integer value and decimals from string', () => {
      expect(pln('1e5').toJSON()).toStrictEqual({ intValue: 100_000, decimals: 0 })
      expect(pln('1e5').toJS()).toStrictEqual(100_000)
      expect(pln('2e-3').toJSON()).toStrictEqual({ intValue: 2, decimals: 3 })
      expect(pln('2e-3').toJS()).toStrictEqual(0.002)
      expect(pln('1.2234E-2').toJSON()).toStrictEqual({ intValue: 12_234, decimals: 6 })
      expect(pln('1.2234E-2').toJS()).toStrictEqual(0.012234)
      expect(pln('2.56E+3').toJSON()).toStrictEqual({ intValue: 2560, decimals: 0 })
      expect(pln('2.56E+3').toJS()).toStrictEqual(2560)
      expect(pln('.230').toJSON()).toStrictEqual({ intValue: 23, decimals: 2 })
      expect(pln('.230').toJS()).toStrictEqual(0.23)
      expect(pln('-0.3100').toJSON()).toStrictEqual({ intValue: -31, decimals: 2 })
      expect(pln('-0.3100').toJS()).toStrictEqual(-0.31)
      expect(pln('320.0').toJSON()).toStrictEqual({ intValue: 320, decimals: 0 })
      expect(pln('320.0').toJS()).toStrictEqual(320)
      expect(pln('-20').toJSON()).toStrictEqual({ intValue: -20, decimals: 0 })
      expect(pln('-20').toJS()).toStrictEqual(-20)
    })
    it('should throw error if input string is not numeric', () => {
      expect(() => pln('')).toThrow('Invalid number: ""')
      expect(() => pln('hello world')).toThrow('Invalid number: "hello world"')
      expect(() => pln('0.2hello')).toThrow('Invalid number: "0.2hello"')
      expect(() => pln('0.1.2')).toThrow('Invalid number: "0.1.2"')
      expect(() => pln('1 234')).toThrow('Invalid number: "1 234')
    })
  })

  describe('plNumberConstructor', () => {
    it('should return with plBool', () => {
      expect(plNumberConstructor(pln(1))).toEqual(pln(1))
      expect(() => plNumberConstructor(plString('1') as any)).toThrowError(`Expected 'Number', but got 'String'.`)
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

  describe('isScientific', () => {
    const fn = isScientific
    it('should check if string is in scientific format', () => {
      expect(fn('')).toBe(false)
      expect(fn('0e0')).toBe(true)
      expect(fn('0E0')).toBe(true)
      expect(fn('1e5')).toBe(true)
      expect(fn('0e10')).toBe(false)
      expect(fn('0.1e10')).toBe(false)
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

  describe('modulo', () => {
    it('should calculate modulo correctly', () => {
      expect(() => modulo(pln(-3), pln(1))).toThrow(`Number (-3) cannot be negative.`)
      expect(() => modulo(pln(4), pln(-1))).toThrow(`Modulo (-1) must be positive.`)
      const tests = [
        { num: 3, mod: 3, res: 0 },
        { num: 4, mod: 3, res: 1 },
        { num: 14, mod: 4, res: 2 },
        { num: 11, mod: 4, res: 3 },
        { num: 17, mod: 6, res: 5 },
      ]
      tests.map(({ num, mod, res }) => {
        expect(modulo(pln(num), pln(mod))).toEqual(pln(res))
      })
    })
  })
})
