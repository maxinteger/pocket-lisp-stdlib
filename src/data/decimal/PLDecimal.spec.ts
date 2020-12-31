import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { plDecimal } from './decimalFn'
import { Ordering } from '../../typeClasses/cmpType'
import { PLDecimal } from './PLDecimal'

const pld = plDecimal
const plb = plBool
const pls = plString

describe('stdlib/data/PLDecimal', () => {
  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', '12,0', '1,2E-2', 'x12.0', '12 0', '1.2Exp10', '0.1.2', '1 234', '1.2Exp10']

      tests.map((input) => {
        expect(() => pld(input)).toThrow(`Invalid decimal number: "${input}"`)
      })
    })

    it('should accept valid inputs', () => {
      const tests = [
        { strValue: '0', intValue: 0, decimals: 0 },
        { strValue: '1', intValue: 1, decimals: 0 },
        { strValue: '1.', intValue: 1, decimals: 0 },
        { strValue: '-.9', intValue: -9, decimals: 1 },
        { strValue: '1.0', intValue: 10, decimals: 1 },
        { strValue: '1.2', intValue: 12, decimals: 1 },
        { strValue: '0.03', intValue: 3, decimals: 2 },
        { strValue: '1.3e5', intValue: 130_000, decimals: 0 },
        { strValue: '-1.3e-5', intValue: -13, decimals: 6 },
        { strValue: '-0.00013', intValue: -13, decimals: 5 },
        { strValue: '-10.560000', intValue: -10_560_000, decimals: 6 },
      ]

      tests.map(({ strValue, intValue, decimals }) => {
        expect(pld(strValue)).toStrictEqual(new PLDecimal(intValue, decimals))
      })
    })
  })

  describe('with new', () => {
    it('should have same result as the factory function', () => {
      expect(new PLDecimal(1, 2)).toEqual(pld('0.01'))
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = pld('1.2')
      expect(actual.intValue).toBe(12)
      expect(actual.decimals).toBe(1)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(pld('-1.20').toJS()).toEqual({ intValue: -12, decimals: 1 })
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(pld('-1.20').debugTypeOf()).toEqual(pls(PLDecimal.kind))
    })
  })

  describe('equals', () => {
    it('should compare two decimals', () => {
      expect(pld('0').equals(pld('0.0000'))).toStrictEqual(plb(true))
      expect(pld('-12.34').equals(pld('0'))).toStrictEqual(plb(false))
      expect(pld('-0.').equals(pld('.0'))).toStrictEqual(plb(true))
      expect(pld('10').equals(pld('10.0'))).toStrictEqual(plb(true))
      expect(pld('10').equals(pld('1.0'))).toStrictEqual(plb(false))
      expect(pld('-120.80').equals(pld('-120.8'))).toStrictEqual(plb(true))
    })
  })

  describe('negate', () => {
    it('should negate decimals', () => {
      expect(pld('0').negate().equals(pld('-0'))).toStrictEqual(plb(true))
      expect(pld('10.').negate().equals(pld('-10'))).toStrictEqual(plb(true))
      expect(pld('-1.0').negate().equals(pld('1.0'))).toStrictEqual(plb(true))
      expect(pld('-120.80').negate().equals(pld('120.80'))).toStrictEqual(plb(true))
    })
  })

  describe('add', () => {
    it('should add two decimals', () => {
      expect(pld('0').add(pld('0.0000'))).toStrictEqual(pld('0'))
      expect(pld('12.0020').add(pld('-3.12000'))).toStrictEqual(pld('8.882'))
      expect(pld('.0020').add(pld('30000.1'))).toStrictEqual(pld('30000.102'))
    })
  })

  describe('subtract', () => {
    it('should subtract two decimals', () => {
      expect(pld('.0').subtract(pld('0.0000'))).toStrictEqual(pld('0'))
      expect(pld('12.0020').subtract(pld('-3.12000'))).toStrictEqual(pld('15.122'))
      expect(pld('.0020').subtract(pld('30000.1'))).toStrictEqual(pld('-30000.098'))
    })
  })

  describe('multiple', () => {
    it('should multiple two decimals', () => {
      expect(pld('.0').multiple(pld('0.0000'))).toStrictEqual(pld('0'))
      expect(pld('12.0020').multiple(pld('-3.12000'))).toStrictEqual(pld('-37.44624'))
      expect(pld('.0020').multiple(pld('30000.1'))).toStrictEqual(pld('60.0002'))
    })
  })

  describe('divide', () => {
    it('should divide two decimals', () => {
      expect(() => pld('1').divide(pld('0.0'))).toThrow('Cannot divide by zero!')
      expect(pld('-66.63600').divide(pld('-12.34'))).toStrictEqual(pld('5.4'))
      expect(pld('12.0020').divide(pld('-3.12000'))).toStrictEqual(pld('-3.846794871795'))
      expect(pld('.0020').divide(pld('30000.1'))).toStrictEqual(pld('0.000000066666'))
    })
  })

  describe('partialCmp', () => {
    it('should compare numbers', () => {
      expect(pld('1.2').partialCmp(pld('1.20'))).toBe(Ordering.Equal)
      expect(pld('1.20').partialCmp(pld('1.21'))).toBe(Ordering.Less)
      expect(pld('-1.20').partialCmp(pld('-1.21'))).toBe(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plDecimal('-1.20')
      const copiedValue = originalValue.copy()
      expect(originalValue.intValue).toBe(copiedValue.intValue)
      expect(originalValue.decimals).toBe(copiedValue.decimals)
      expect(originalValue).not.toBe(copiedValue)
    })
  })
})
