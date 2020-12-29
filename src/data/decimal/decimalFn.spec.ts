import {
  isNumeric,
  plDecimal,
  createSimplifiedDecimal,
  getDecimalParts,
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

  describe('isNumeric', () => {
    const fn = isNumeric
    it('should check if string is numeric', () => {
      expect(fn('')).toBe(false)
      expect(fn('0')).toBe(true)
      expect(fn('.12')).toBe(true)
      expect(fn('1.2')).toBe(true)
      expect(fn('12.')).toBe(true)
      expect(fn('12.0')).toBe(true)
      expect(fn('12,0')).toBe(false)
      expect(fn('x12.0')).toBe(false)
      expect(fn(' 12.0')).toBe(true)
      expect(fn('12.0 ')).toBe(true)
      expect(fn('12 0')).toBe(false)
    })
  })

  describe('getDecimalParts', () => {
    const fn = getDecimalParts
    it('should create get decimal parts correctly', () => {
      expect(fn('1')).toEqual(['1'])
      expect(fn('21')).toEqual(['21'])
      expect(fn('1.0')).toEqual(['1', '0'])
      expect(fn('-6.78')).toEqual(['-6', '78'])
      expect(fn('-67.80')).toEqual(['-67', '80'])
      expect(fn('2.1000')).toEqual(['2', '1000'])
    })
    it('should throw error if the parameters are invalid', () => {
      expect(() => pld('')).toThrow('Invalid decimal number parameters!')
      expect(() => pld('0.1.2')).toThrow('Invalid decimal number parameters!')
      expect(() => pld('1 234')).toThrow('Invalid decimal number parameters!')
    })
  })

  describe('createSimplifiedDecimal', () => {
    const fn = createSimplifiedDecimal
    it('should create simplified decimal', () => {
      expect(fn('1.0')).toEqual(pld('1'))
      expect(fn('-6.78')).toEqual(pld('-6.78'))
      expect(fn('-67.80')).toEqual(pld('-67.8'))
      expect(fn('2.1000')).toEqual(pld('2.1'))
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
