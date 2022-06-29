import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { Ordering } from '../../typeClasses/cmpType'
import { PLNumber } from './PLNumber'
import { plNumber } from '../number/numberFn'

const pln = plNumber
const plb = plBool
const pls = plString

describe('stdlib/data/PLNumber', () => {
  describe('parser', () => {
    it.each(['', '12,0', '1,2E-2', 'x12.0', '12 0', '1.2Exp10', '0.1.2', '1 234', '1.2Exp10'])(
      'should throw error if the input is invalid: %s',
      (value) => {
        expect(() => plNumber(value)).toThrow(`Invalid number: "${value}"`)
      },
    )

    it.each([
      { strValue: '0', d: [0], e: 0, s: 1 },
      { strValue: '1', d: [1], e: 0, s: 1 },
      { strValue: '1.', d: [1], e: 0, s: 1 },
      { strValue: '-.9', d: [9000000], e: -1, s: -1 },
      { strValue: '1.0', d: [1], e: 0, s: 1 },
      { strValue: '1.2', d: [1, 2000000], e: 0, s: 1 },
      { strValue: '0.03', d: [300000], e: -2, s: 1 },
      { strValue: '1.3e5', d: [130_000], e: 5, s: 1 },
      { strValue: '-1.3e-5', d: [130], e: -5, s: -1 },
      { strValue: '-0.00013', d: [1300], e: -4, s: -1 },
      { strValue: '-10.560000', d: [10, 5600000], e: 1, s: -1 },
      { strValue: '100000', d: [100_000], e: 5, s: 1 },
      { strValue: '889892169', d: [88, 9892169], e: 8, s: 1 },
    ])('should work with $strValue', ({ strValue, d, e, s }) => {
      expect(plNumber(strValue).toJSON()).toStrictEqual({ d, e, s })
    })
  })

  describe('with new', () => {
    it('should have same result as the factory function', () => {
      expect(new PLNumber(200)).toEqual(plNumber(200))
      expect(new PLNumber(1)).toEqual(plNumber(1))
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const decimal = pln('1.2')
      expect(decimal.data.d).toEqual([1, 2000000])
      expect(decimal.data.e).toBe(0)
      expect(decimal.data.s).toBe(1)
      const integer = pln('20')
      expect(integer.value).toBe(20)
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
      expect(pln('12.0020').divide(pln('-3.12000'))).toStrictEqual(pln('-3.846794871794872'))
      expect(pln('.0020').divide(pln('30000.1'))).toStrictEqual(pln('0.00000006666644444518518'))
      expect(pln('889892169').divide(pln('100000'))).toStrictEqual(pln('8898.92169'))
    })
  })

  describe('partialCmp', () => {
    it('should compare numbers', () => {
      expect(pln('1.2').partialCmp(pln('1.20'))).toBe(Ordering.Equal)
      expect(pln('1.20').partialCmp(pln('1.21'))).toBe(Ordering.Less)
      expect(pln('-1.20').partialCmp(pln('-1.21'))).toBe(Ordering.Greater)
    })
  })

  describe('toJSON', () => {
    it('should return with the JS representation', () => {
      expect(pln('-1.20').toJSON()).toEqual({ d: [1, 2000000], e: 0, s: -1 })
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(pln('0.000').toJS()).toEqual({ d: [0], e: 0, s: 1 })
      expect(pln('5').toJS()).toEqual({ d: [5], e: 0, s: 1 })
      expect(pln('-120.0').toJS()).toEqual({ d: [120], e: 2, s: -1 })
    })
  })

  describe('toString', () => {
    it('should create decimal string', () => {
      expect(pln(0).toString()).toBe('0')
      expect(pln(100).toString()).toBe('100')
      expect(pln(10).toString()).toBe('10')
      expect(pln(-1).toString()).toBe('-1')
      expect(pln(1.2).toString()).toBe('1.2')
      expect(pln(-0.034).toString()).toBe('-0.034')
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(pln('-1.20').debugTypeOf()).toEqual(pls(PLNumber.kind))
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      expect(pln('-1.20').copy()).toStrictEqual(pln('-1.20'))
      expect(pln('1e5').copy()).toStrictEqual(pln('100000'))
    })
  })

  describe('isInteger', () => {
    it('should check the number is integer or not', () => {
      expect(pln('-1.20').isInteger()).toStrictEqual(plb(false))
      expect(pln('1e5').isInteger()).toStrictEqual(plb(true))
    })
  })

  describe('toJS', () => {
    it('should convert PLNumber to JS number', () => {
      expect(pln('-1.20').toJS()).toStrictEqual({ d: [1, 2000000], e: 0, s: -1 })
      expect(pln('1e5').toJS()).toStrictEqual({ d: [100_000], e: 5, s: 1 })
    })
  })
})
