import { PLBool } from './PLBool'
import { plBool } from './boolFn'
import { plString } from '../string/stringFn'
import { Ordering } from '../../typeClasses/cmpType'

describe('stdlib/data/PLBool', () => {
  describe('getters', () => {
    it('should work', () => {
      expect(plBool(true).value).toBe(true)
      expect(plBool(false).value).toBe(false)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plBool(true).toJS()).toBe(true)
      expect(plBool(false).toJS()).toBe(false)
    })
  })

  describe('toJSON', () => {
    it('should return with the JSON representation', () => {
      expect(plBool(true).toJSON()).toBe(true)
      expect(plBool(false).toJSON()).toBe(false)
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plBool(true).debugTypeOf()).toEqual(plString(PLBool.kind))
    })
  })

  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', 'xyz', '_']

      tests.map((input) => {
        expect(() => PLBool.fromStr(plString(input))).toThrow(`Invalid boolean: "${input}".`)
      })
    })

    it('should parse proper boolean values', () => {
      const tests = [
        { input: 'true', out: 'true' },
        { input: 'false', out: 'false' },
      ]

      tests.map(({ input, out }) => {
        expect(PLBool.fromStr(plString(input)).toString()).toEqual(out)
      })
    })
  })

  describe('fromJS', () => {
    it('should convert string to PLBool', () => {
      expect(PLBool.fromJS(true)).toEqual(new PLBool(true))
    })
  })

  describe('equal operator', () => {
    it('should equal the bool', () => {
      expect(plBool(true).equals(plBool(true))).toEqual(plBool(true))
      expect(plBool(false).equals(plBool(false))).toEqual(plBool(true))
      expect(plBool(false).equals(plBool(true))).toEqual(plBool(false))
    })
  })

  describe('partial Order', () => {
    it('should lte the bool', () => {
      expect(plBool(true).partialCmp(plBool(false))).toEqual(Ordering.Greater)
      expect(plBool(false).partialCmp(plBool(false))).toEqual(Ordering.Equal)
      expect(plBool(true).partialCmp(plBool(true))).toEqual(Ordering.Equal)
      expect(plBool(false).partialCmp(plBool(true))).toEqual(Ordering.Less)
    })
  })

  describe('not function', () => {
    it('should check and evaluate the argument', () => {
      expect(plBool(true).not()).toEqual(plBool(false))
      expect(plBool(false).not()).toEqual(plBool(true))
    })
  })

  describe('and function', () => {
    it('should check and evaluate the arguments', () => {
      expect(plBool(true).and(plBool(true))).toEqual(plBool(true))
      expect(plBool(false).and(plBool(true))).toEqual(plBool(false))
    })
  })

  describe('or function', () => {
    it('should check and evaluate the arguments', () => {
      expect(plBool(false).or(plBool(false))).toEqual(plBool(false))
      expect(plBool(false).or(plBool(true))).toEqual(plBool(true))
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = new PLBool(true)
      const copiedValue = originalValue.copy()
      expect(originalValue.value).toBe(copiedValue.value)
      expect(originalValue).not.toBe(copiedValue)
    })
  })
})
