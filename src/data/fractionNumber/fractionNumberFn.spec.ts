import { fraction2number, number2fraction, plFractionNumber, reciprocal } from './fractionNumberFn'
import { plFloat } from '../number/numberFn'

describe('stdlib/data/PLFractionNumber', () => {
  describe('reciprocal operator', () => {
    it('should reciprocal the number', () => {
      expect(reciprocal(plFractionNumber(1, 2))).toEqual(plFractionNumber(2, 1))
    })
  })

  describe('fraction-2-number', () => {
    it('should convert fraction to number', () => {
      expect(fraction2number(plFractionNumber(5, 10))).toEqual(plFloat(0.5))
    })
  })

  describe('number-2-fraction', () => {
    it('should throws error when the accuracy parameter invalid', () => {
      expect(() => number2fraction(plFloat(0), plFloat(0.5))).toThrowErrorMatchingInlineSnapshot(
        `"Accuracy must be a positive integer number instead of 0"`,
      )
      expect(() => number2fraction(plFloat(-1), plFloat(0.5))).toThrowErrorMatchingInlineSnapshot(
        `"Accuracy must be a positive integer number instead of -1"`,
      )
      expect(() => number2fraction(plFloat(1.5), plFloat(0.5))).toThrowErrorMatchingInlineSnapshot(
        `"Accuracy must be a positive integer number instead of 1.5"`,
      )
    })

    it('should convert number to fraction', () => {
      expect(number2fraction(plFloat(3), plFloat(0.5))).toEqual(plFractionNumber(1, 2))
      expect(number2fraction(plFloat(3), plFloat(0.1251))).toEqual(plFractionNumber(1, 8))
      expect(number2fraction(plFloat(3), plFloat(0.1255))).toEqual(plFractionNumber(63, 500))
      expect(number2fraction(plFloat(3), plFloat(0))).toEqual(plFractionNumber(0, 1))
    })
  })
})
