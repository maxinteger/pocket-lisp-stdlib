import { PLString } from './PLString'
import { plBool } from '../bool/boolFn'
import { plString } from './stringFn'
import { plFloat, plNumber } from '../number/numberFn'
import { Ordering } from '../../typeClasses/cmpType'
import { contains, slice } from '../../typeClasses'

describe('stdlib/data/PLString', () => {
  describe('creation', () => {
    describe('with new', () => {
      it('should have same result as the factory function', () => {
        expect(new PLString('hello world')).toEqual(plString('hello world'))
      })
    })
  })

  it('should create empty String', () => {
    expect(plString().value).toBe('')
  })

  describe('fromJS', () => {
    it('should create PLString', () => {
      expect(PLString.fromJS('hello').value).toBe('hello')
    })
  })

  describe('fromStr function', () => {
    it('should crate new string', () => {
      const originalValue = plString('hello')
      const copiedValue = PLString.fromStr(originalValue)
      expect(originalValue.value).toBe(copiedValue.value)
      expect(originalValue).not.toBe(copiedValue)
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = plString('OK')
      expect(actual.value).toBe('OK')
    })
  })

  describe('concat', () => {
    it('should concatenate 2 strings', () => {
      const actual = plString('hello').add(plString(' ')).add(plString('world'))
      expect(actual.value).toBe('hello world')
    })
  })

  it('should have proper toString', () => {
    expect(plString().toString()).toBe('')
    expect(plString('hello world').toString()).toBe('hello world')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plString('hello world').toJS()).toBe('hello world')
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plString('a').debugTypeOf()).toEqual(plString(PLString.kind))
    })
  })

  describe('index', () => {
    it('should return with the selected character or empty string', () => {
      expect(plString('abc').index(plNumber(1))).toEqual(plString('b'))
      expect(plString('abc').index(plNumber(10))).toEqual(plString(''))
      expect(plString('abc').index(plFloat(1.1))).toEqual(plString(''))
    })
  })

  describe('equals', () => {
    it('should check if two strings equals', () => {
      expect(plString('hello').equals(plString('hello'))).toEqual(plBool(true))
      expect(plString('Hello').equals(plString('Hello'))).toEqual(plBool(true))
      expect(plString('hello').equals(plString('world'))).toEqual(plBool(false))
    })
  })

  describe('partialCmp', () => {
    it('should compare two strings', () => {
      expect(plString('aa').partialCmp(plString('aa'))).toBe(Ordering.Equal)
      expect(plString('aa').partialCmp(plString('ab'))).toBe(Ordering.Less)
      expect(plString('ab').partialCmp(plString('aa'))).toBe(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plString('hello')
      const copiedValue = originalValue.copy()
      expect(originalValue.value).toBe(copiedValue.value)
      expect(originalValue).not.toBe(copiedValue)
    })
  })

  describe('count', () => {
    it('should work', () => {
      expect(plString().count()).toEqual(plNumber(0))
      expect(plString('hello').count()).toEqual(plNumber(5))
    })
  })

  describe('contains', () => {
    it('should returns with true/false when the item contains or not the item', () => {
      expect(contains(plString('h'), plString('hello'))).toEqual(plBool(true))
      expect(contains(plString('a'), plString('hello'))).toEqual(plBool(false))
    })
  })

  describe('slice', () => {
    it('should return with sub string', () => {
      expect(slice(plNumber(0), plNumber(2), plString('hello!'))).toEqual(plString('he'))
      expect(slice(plNumber(2), plNumber(2), plString('hello!'))).toEqual(plString(''))
      expect(slice(plNumber(2), plNumber(4), plString('hello!'))).toEqual(plString('ll'))
      expect(slice(plNumber(5), plNumber(10), plString('hello!'))).toEqual(plString('!'))
    })
  })
})
