import { PLNumber } from './PLNumber'
import { plBool } from '../bool/boolFn'
import { parseNumber, plNumber } from './numberFn'
import { Ordering } from '../../typeClasses/cmpType'
import { plString } from '../string/stringFn'

describe('stdlib/data/PLNumber', () => {
  describe('fromJS', () => {
    it('should create PLNumber from number', () => {
      expect(PLNumber.fromJS(42)).toEqual(plNumber(42))
    })
  })
  describe('creation', () => {
    describe('with new', () => {
      it('should have same result as the factory function', () => {
        expect(new PLNumber(42)).toEqual(plNumber(42))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = plNumber(1)
      expect(actual.value).toBe(1)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plNumber(42).toJS()).toBe(42)
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plNumber(1).debugTypeOf()).toEqual(plString(PLNumber.kind))
    })
  })

  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', 'xyz', '_']

      tests.map((input) => {
        expect(() => parseNumber(input)).toThrow(`Invalid number: "${input}".`)
      })
    })

    it('should parse proper fraction numbers', () => {
      const tests = [
        { input: '0', out: '0' },
        { input: '10', out: '10' },
        { input: '1.5', out: '1.5' },
        { input: '-1', out: '-1' },
        { input: '-1.5', out: '-1.5' },
      ]

      tests.map(({ input, out }) => {
        expect(parseNumber(input).toString()).toBe(out)
      })
    })
  })

  describe('equals operator', () => {
    it('should compare numbers', () => {
      expect(plNumber(2).equals(plNumber(2))).toEqual(plBool(true))
      expect(plNumber(2).equals(plNumber(1))).toEqual(plBool(false))
    })
  })

  describe('negate operator', () => {
    it('should negate the number', () => {
      expect(plNumber(-2).negate()).toEqual(plNumber(2))
      expect(plNumber(2).negate()).toEqual(plNumber(-2))
    })
  })

  describe('add operator', () => {
    it('should add two number', () => {
      const actual = plNumber(3).add(plNumber(5))
      const expected = plNumber(8)
      expect(actual).toEqual(expected)
    })
  })

  describe('subtract operator', () => {
    it('should subtract two number', () => {
      const actual = plNumber(2).subtract(plNumber(6))
      const expected = plNumber(-4)
      expect(actual).toEqual(expected)
    })
  })

  describe('multiple operator', () => {
    it('should multiple two number', () => {
      const actual = plNumber(2).multiple(plNumber(5))
      const expected = plNumber(10)
      expect(actual).toEqual(expected)
    })
  })

  describe('divide operator', () => {
    it('should divide two number', () => {
      const actual = plNumber(8).divide(plNumber(4))
      const expected = plNumber(2)
      expect(actual).toEqual(expected)
    })
  })

  describe('partialCmp', () => {
    it('should compare values', () => {
      expect(plNumber(1).partialCmp(plNumber(1))).toBe(Ordering.Equal)
      expect(plNumber(1).partialCmp(plNumber(2))).toBe(Ordering.Less)
      expect(plNumber(1).partialCmp(plNumber(0.9))).toBe(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plNumber(42)
      const copiedValue = originalValue.copy()
      expect(originalValue.value).toBe(copiedValue.value)
      expect(originalValue).not.toBe(copiedValue)
    })
  })
})