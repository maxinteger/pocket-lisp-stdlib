import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { plNumber } from './numberFn'
import { Ordering } from '../../typeClasses/cmpType'
import { PLNumber } from './PLNumber'
import { floatEq } from '../../utils/math'
import { parseNumber } from '../number/numberFn'

const pln = parseNumber
const plb = plBool
const pls = plString

describe('stdlib/data/PLNumber', () => {
  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', '12,0', '1,2E-2', 'x12.0', '12 0', '1.2Exp10', '0.1.2', '1 234', '1.2Exp10']

      tests.map((input) => {
        expect(() => parseNumber(input)).toThrow(`Invalid decimal number: "${input}"`)
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
        expect(parseNumber(strValue)).toStrictEqual(new PLNumber(intValue, decimals))
      })
    })
  })

  describe('with new', () => {
    it('should have same result as the factory function', () => {
      expect(new PLNumber(1, 2)).toEqual(plNumber(0.01))
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = pln('1.2')
      expect(actual.intValue).toBe(12)
      expect(actual.decimals).toBe(1)
      expect(floatEq(actual.value, 1.2)).toBe(true)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(pln('-1.20').toJS()).toEqual({ intValue: -12, decimals: 1 })
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(pln('-1.20').debugTypeOf()).toEqual(pls(PLNumber.kind))
    })
  })

  describe('equals', () => {
    it('should compare two decimals', () => {
      expect(pln('0').equals(pln('0.0000'))).toStrictEqual(plb(true))
      expect(pln('-12.34').equals(pln('0'))).toStrictEqual(plb(false))
      expect(pln('-0.').equals(pln('.0'))).toStrictEqual(plb(true))
      expect(pln('10').equals(pln('10.0'))).toStrictEqual(plb(true))
      expect(pln('10').equals(pln('1.0'))).toStrictEqual(plb(false))
      expect(pln('-120.80').equals(pln('-120.8'))).toStrictEqual(plb(true))
    })
  })

  describe('negate', () => {
    it('should negate decimals', () => {
      expect(pln('0').negate().equals(pln('-0'))).toStrictEqual(plb(true))
      expect(pln('10.').negate().equals(pln('-10'))).toStrictEqual(plb(true))
      expect(pln('-1.0').negate().equals(pln('1.0'))).toStrictEqual(plb(true))
      expect(pln('-120.80').negate().equals(pln('120.80'))).toStrictEqual(plb(true))
    })
  })

  describe('add', () => {
    it('should add two decimals', () => {
      expect(pln('0').add(pln('0.0000'))).toStrictEqual(pln('0'))
      expect(pln('12.0020').add(pln('-3.12000'))).toStrictEqual(pln('8.882'))
      expect(pln('.0020').add(pln('30000.1'))).toStrictEqual(pln('30000.102'))
    })
  })

  describe('subtract', () => {
    it('should subtract two decimals', () => {
      expect(pln('.0').subtract(pln('0.0000'))).toStrictEqual(pln('0'))
      expect(pln('12.0020').subtract(pln('-3.12000'))).toStrictEqual(pln('15.122'))
      expect(pln('.0020').subtract(pln('30000.1'))).toStrictEqual(pln('-30000.098'))
    })
  })

  describe('multiple', () => {
    it('should multiple two decimals', () => {
      expect(pln('.0').multiple(pln('0.0000'))).toStrictEqual(pln('0'))
      expect(pln('12.0020').multiple(pln('-3.12000'))).toStrictEqual(pln('-37.44624'))
      expect(pln('.0020').multiple(pln('30000.1'))).toStrictEqual(pln('60.0002'))
    })
  })

  describe('divide', () => {
    it('should divide two decimals', () => {
      expect(() => pln('1').divide(pln('0.0'))).toThrow('Cannot divide by zero!')
      expect(pln('-66.63600').divide(pln('-12.34'))).toStrictEqual(pln('5.4'))
      expect(pln('12.0020').divide(pln('-3.12000'))).toStrictEqual(pln('-3.846794871795'))
      expect(pln('.0020').divide(pln('30000.1'))).toStrictEqual(pln('0.000000066666'))
    })
  })

  describe('partialCmp', () => {
    it('should compare numbers', () => {
      expect(pln('1.2').partialCmp(pln('1.20'))).toBe(Ordering.Equal)
      expect(pln('1.20').partialCmp(pln('1.21'))).toBe(Ordering.Less)
      expect(pln('-1.20').partialCmp(pln('-1.21'))).toBe(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = pln('-1.20')
      const copiedValue = originalValue.copy()
      expect(originalValue.intValue).toBe(copiedValue.intValue)
      expect(originalValue.decimals).toBe(copiedValue.decimals)
      expect(originalValue).not.toBe(copiedValue)
    })
  })
})
