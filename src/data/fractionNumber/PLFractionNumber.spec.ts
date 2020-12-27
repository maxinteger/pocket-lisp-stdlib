import { PLFractionNumber, createSimplifiedFraction } from './PLFractionNumber'
import { plBool } from '../bool/boolFn'
import { plFractionNumber, str2plFractionNumber } from './fractionNumberFn'
import { Ordering } from '../../typeClasses/cmpType'
import { plString } from '../string/stringFn'

describe('stdlib/data/PLFractionNumber', () => {
  describe('createSimplifiedFraction', () => {
    const fn = createSimplifiedFraction

    it('should create fractions', () => {
      expect(fn(1, 2).toString()).toBe('1/2')
      expect(fn(-1, 3).toString()).toBe('-1/3')
    })

    it('should handle negative signs', () => {
      expect(fn(-1, -2).toString()).toBe('1/2')
      expect(fn(1, -3).toString()).toBe('-1/3')
    })

    it('should simplify fractions', () => {
      expect(fn(-2, -4).toString()).toBe('1/2')
      expect(fn(2, -6).toString()).toBe('-1/3')
    })
  })

  describe('creation', () => {
    it('should throw error if the parameters are invalid', () => {
      const tests = [
        { n: '1', d: 1 },
        { n: null, d: 1 },
        { n: undefined, d: 1 },
        { n: 1.1, d: 1 },
        { n: 1, d: 0 },
      ] as { n: any; d: any }[]

      tests.map(({ n, d }) => {
        expect(() => plFractionNumber(n, d)).toThrow('Invalid fraction number parameters!')
      })
    })

    it('should accept valid inputs', () => {
      const tests = [
        { n: 1, d: 1, res: '1/1' },
        { n: 1, d: 2, res: '1/2' },
      ] as {
        n: any
        d: any
        res: string
      }[]

      tests.map(({ n, d, res }) => {
        expect(plFractionNumber(n, d).toString()).toBe(res)
      })
    })

    it('should not simplify the fraction upon construction', () => {
      const tests = [
        { n: 10, d: 10, res: '10/10' },
        { n: 10, d: 20, res: '10/20' },
        { n: 1, d: -2, res: '1/-2' },
        { n: -1, d: -2, res: '-1/-2' },
        { n: -1, d: 2, res: '-1/2' },
      ] as { n: any; d: any; res: string }[]

      tests.map(({ n, d, res }) => {
        expect(plFractionNumber(n, d).toString()).toBe(res)
      })
    })

    describe('with new', () => {
      it('should have same result as the factory function', () => {
        expect(new PLFractionNumber(1, 2)).toEqual(plFractionNumber(1, 2))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = plFractionNumber(1, 2)
      expect(actual.numerator).toBe(1)
      expect(actual.denominator).toBe(2)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plFractionNumber(1, 2).toJS()).toEqual({ numerator: 1, denominator: 2 })
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plFractionNumber(1, 2).debugTypeOf()).toEqual(plString(PLFractionNumber.kind))
    })
  })

  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', 'xyz', '1', '1/', '1.1/1', '1/1.1', '1/0']

      tests.map((input) => {
        expect(() => str2plFractionNumber(input)).toThrow(`Invalid fraction number: ${input}.`)
      })
    })

    it('should parse proper fraction numbers without simplification', () => {
      const tests = [
        { input: '1/1', out: '1/1' },
        { input: '10/10', out: '10/10' },
        { input: '1/2', out: '1/2' },
        { input: '1/-1', out: '1/-1' },
        { input: '-1/-1', out: '-1/-1' },
      ]

      tests.map(({ input, out }) => {
        expect(str2plFractionNumber(input).toString()).toBe(out)
      })
    })
  })

  describe('equal operator', () => {
    it('should compare two number', () => {
      expect(plFractionNumber(1, 2).equals(plFractionNumber(1, 2))).toEqual(plBool(true))
      expect(plFractionNumber(1, 2).equals(plFractionNumber(5, 10))).toEqual(plBool(true))
      expect(plFractionNumber(1, 2).equals(plFractionNumber(6, 10))).toEqual(plBool(false))
      expect(plFractionNumber(1, 2).equals(plFractionNumber(-1, 2))).toEqual(plBool(false))
    })
  })

  describe('negate operator', () => {
    it('should negate the number', () => {
      expect(plFractionNumber(1, 2).negate()).toEqual(plFractionNumber(-1, 2))
      expect(plFractionNumber(-1, 2).negate()).toEqual(plFractionNumber(1, 2))
    })
  })

  describe('add operator', () => {
    it('should add two fraction number', () => {
      const actual = plFractionNumber(2, 3).add(plFractionNumber(1, 5))
      const expected = plFractionNumber(13, 15)
      expect(actual).toEqual(expected)
    })
  })

  describe('subtract operator', () => {
    it('should subtract two fraction number', () => {
      const actual = plFractionNumber(1, 2).subtract(plFractionNumber(1, 6))
      const expected = plFractionNumber(1, 3)
      expect(actual).toEqual(expected)
    })
  })

  describe('multiple operator', () => {
    it('should multiple two fraction number', () => {
      const actual = plFractionNumber(1, 2).multiple(plFractionNumber(2, 5))
      const expected = plFractionNumber(1, 5)
      expect(actual).toEqual(expected)
    })
  })

  describe('divide operator', () => {
    it('should divide two fraction number', () => {
      const actual = plFractionNumber(1, 8).divide(plFractionNumber(1, 4))
      const expected = plFractionNumber(1, 2)
      expect(actual).toEqual(expected)
    })
  })

  describe('partialCmp', () => {
    it('should compare numbers', () => {
      expect(plFractionNumber(1, 2).partialCmp(plFractionNumber(1, 2))).toBe(Ordering.Equal)
      expect(plFractionNumber(1, 2).partialCmp(plFractionNumber(4, 5))).toBe(Ordering.Less)
      expect(plFractionNumber(1, 2).partialCmp(plFractionNumber(2, 11))).toBe(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plFractionNumber(1, 2)
      const copiedValue = originalValue.copy()
      expect(originalValue.numerator).toBe(copiedValue.numerator)
      expect(originalValue.denominator).toBe(copiedValue.denominator)
      expect(originalValue).not.toBe(copiedValue)
    })
  })
})
