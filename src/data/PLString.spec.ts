import { expect } from 'chai'
import { PLString, plString } from './PLString'
import { Ordering } from '../typeClasses/cmp'
import { plNumber } from './PLNumber'
import { plBool } from './PLBool'

describe('stdlib/data/PLString', () => {
  describe('creation', () => {
    describe('with new', () => {
      it('should have same result as the factory function', () => {
        expect(new PLString('hello world')).deep.equals(plString('hello world'))
      })
    })
  })

  it('should create empty String', () => {
    expect(plString().value).equal('')
  })

  describe('fromJS', () => {
    it('should create PLString', () => {
      expect(PLString.fromJS('hello').value).equals('hello')
    })
  })

  describe('fromStr function', () => {
    it('should crate new string', () => {
      const originalValue = plString('hello')
      const copiedValue = PLString.fromStr(originalValue)
      expect(originalValue.value).equals(copiedValue.value)
      expect(originalValue).not.equals(copiedValue)
    })
  })

  describe('getters', () => {
    it('should work', () => {
      const actual = plString('OK')
      expect(actual.value).equal('OK')
    })
  })

  describe('concat', () => {
    it('should concatenate 2 strings', () => {
      const actual = plString('hello').add(plString(' ')).add(plString('world'))
      expect(actual.value).equal('hello world')
    })
  })

  it('should have proper toString', () => {
    expect(plString().toString()).equal('')
    expect(plString('hello world').toString()).equal('hello world')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plString('hello world').toJS()).equal('hello world')
    })
  })

  describe('index', () => {
    it('should return with the selected character or empty string', () => {
      expect(plString('abc').index(plNumber(1))).deep.equals(plString('b'))
      expect(plString('abc').index(plNumber(10))).deep.equals(plString(''))
      expect(plString('abc').index(plNumber(1.1))).deep.equals(plString(''))
    })
  })

  describe('equals', () => {
    it('should check if two strings equals', () => {
      expect(plString('hello').equals(plString('hello'))).deep.equals(plBool(true))
      expect(plString('Hello').equals(plString('Hello'))).deep.equals(plBool(true))
      expect(plString('hello').equals(plString('world'))).deep.equals(plBool(false))
    })
  })

  describe('partialCmp', () => {
    it('should compare two strings', () => {
      expect(plString('aa').partialCmp(plString('aa'))).equals(Ordering.Equal)
      expect(plString('aa').partialCmp(plString('ab'))).equals(Ordering.Less)
      expect(plString('ab').partialCmp(plString('aa'))).equals(Ordering.Greater)
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = plString('hello')
      const copiedValue = originalValue.copy()
      expect(originalValue.value).equals(copiedValue.value)
      expect(originalValue).not.equals(copiedValue)
    })
  })
})
