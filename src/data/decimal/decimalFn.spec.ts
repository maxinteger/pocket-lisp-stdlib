import { isNumeric, plDecimal } from './decimalFn'
import { PLDecimal } from './PLDecimal'

describe('stdlib/data/decimal/decimalFn', () => {
  describe('plDecimal', () => {
    it('should construct decimal', () => {
      expect(plDecimal('0')).toEqual(new PLDecimal('0'))
    })
  })

  describe('isNumeric', () => {
    it('should check if string is numeric', () => {
      expect(isNumeric('')).toBe(false)
      expect(isNumeric('0')).toBe(true)
      expect(isNumeric('.12')).toBe(true)
      expect(isNumeric('1.2')).toBe(true)
      expect(isNumeric('12.')).toBe(true)
      expect(isNumeric('12.0')).toBe(true)
      expect(isNumeric('12,0')).toBe(false)
      expect(isNumeric('x12.0')).toBe(false)
      expect(isNumeric(' 12.0')).toBe(true)
      expect(isNumeric('12.0 ')).toBe(true)
      expect(isNumeric('12 0')).toBe(false)
    })
  })
})
