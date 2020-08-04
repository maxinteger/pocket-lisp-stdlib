import { expect } from 'chai'
import { parseNumber, PLNumber, plNumber } from './PLNumber'
import { plBool } from './PLBool'
import { Ordering, partialCmp } from '../typeClasses/cmp'

describe('stdlib/data/PLNumber', () => {
  describe('fromJS', () => {
    it('should create PLNumber from number', () => {
      expect(PLNumber.fromJS(42)).deep.equals(plNumber(42))
    })
  })
  describe('creation', () => {
    describe('with new', () => {
      it('should have same result as the factory function', () => {
        expect(new PLNumber(42)).deep.equals(plNumber(42))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = plNumber(1)
      expect(actual.value).equal(1)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plNumber(42).toJS()).equal(42)
    })
  })

  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', 'xyz', '_']

      tests.map((input) => {
        expect(() => parseNumber(input)).throw(`Invalid number: "${input}".`)
      })
    })

    it('should parse proper fraction numbers', () => {
      const tests = [
        { input: '0', out: '0' },
        { input: '10', out: '10' },
        { input: '1.5', out: '1.5' },
        { input: '-1', out: '-1' },
        { input: '-1.5', out: '-1.5' }
      ]

      tests.map(({ input, out }) => {
        expect(parseNumber(input).toString()).equal(out)
      })
    })
  })

  describe('equals operator', () => {
    it('should compare numbers', () => {
      expect(plNumber(2).equals(plNumber(2))).deep.equals(plBool(true))
      expect(plNumber(2).equals(plNumber(1))).deep.equals(plBool(false))
    })
  })

  describe('negate operator', () => {
    it('should negate the number', () => {
      expect(plNumber(-2).negate()).deep.equals(plNumber(2))
      expect(plNumber(2).negate()).deep.equals(plNumber(-2))
    })
  })

  describe('add operator', () => {
    it('should add two number', () => {
      const actual = plNumber(3).add(plNumber(5))
      const expected = plNumber(8)
      expect(actual).deep.equals(expected)
    })
  })

  describe('subtract operator', () => {
    it('should subtract two number', () => {
      const actual = plNumber(2).subtract(plNumber(6))
      const expected = plNumber(-4)
      expect(actual).deep.equals(expected)
    })
  })

  describe('multiple operator', () => {
    it('should multiple two number', () => {
      const actual = plNumber(2).multiple(plNumber(5))
      const expected = plNumber(10)
      expect(actual).deep.equals(expected)
    })
  })

  describe('divide operator', () => {
    it('should divide two number', () => {
      const actual = plNumber(8).divide(plNumber(4))
      const expected = plNumber(2)
      expect(actual).deep.equals(expected)
    })
  })

  describe('partialCmp', () => {
    it('should compare values', () => {
      expect(plNumber(1).partialCmp(plNumber(1))).equals(Ordering.Equal)
      expect(plNumber(1).partialCmp(plNumber(2))).equals(Ordering.Less)
      expect(plNumber(1).partialCmp(plNumber(0.9))).equals(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plNumber(42)
      const copiedValue = originalValue.copy()
      expect(originalValue.value).equals(copiedValue.value)
      expect(originalValue).not.equals(copiedValue)
    })
  })
})
