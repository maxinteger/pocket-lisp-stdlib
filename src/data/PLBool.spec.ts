import { expect } from 'chai'
import { plBool, PLBool } from './PLBool'
import { plString } from './PLString'
import { copy, fromJS, fromStr, toJS, toString } from '../typeClasses/base-types'
import { equals, Ordering, partialCmp } from '../typeClasses/cmp-types'
import { and, not, or } from '../typeClasses/ops-types'

describe('stdlib/data/PLBool', () => {
  describe('getters', () => {
    it('should work', () => {
      expect(plBool(true).value).equal(true)
      expect(plBool(false).value).equal(false)
    })
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plBool(true)[toJS]()).equals(true)
      expect(plBool(false)[toJS]()).equals(false)
    })
  })

  describe('parser', () => {
    it('should throw error if the input is invalid', () => {
      const tests = ['', 'xyz', '_']

      tests.map((input) => {
        expect(() => PLBool[fromStr](plString(input))).throw(`Invalid boolean: "${input}".`)
      })
    })

    it('should parse proper boolean values', () => {
      const tests = [
        { input: 'true', out: 'true' },
        { input: 'false', out: 'false' }
      ]

      tests.map(({ input, out }) => {
        expect(PLBool[fromStr](plString(input))[toString]()).deep.equals(out)
      })
    })
  })

  describe('fromJS', () => {
    it('should convert string to PLBool', () => {
      expect(PLBool[fromJS](true)).deep.equals(new PLBool(true))
    })
  })

  describe('equal operator', () => {
    it('should equal the bool', () => {
      expect(plBool(true)[equals](plBool(true))).deep.equals(plBool(true))
      expect(plBool(false)[equals](plBool(false))).deep.equals(plBool(true))
      expect(plBool(false)[equals](plBool(true))).deep.equals(plBool(false))
    })
  })

  describe('partial Order', () => {
    it('should lte the bool', () => {
      expect(plBool(true)[partialCmp](plBool(false))).deep.equals(Ordering.Greater)
      expect(plBool(false)[partialCmp](plBool(false))).deep.equals(Ordering.Equal)
      expect(plBool(true)[partialCmp](plBool(true))).deep.equals(Ordering.Equal)
      expect(plBool(false)[partialCmp](plBool(true))).deep.equals(Ordering.Less)
    })
  })

  describe('not function', () => {
    it('should check and evaluate the argument', () => {
      expect(plBool(true)[not]()).deep.equal(plBool(false))
      expect(plBool(false)[not]()).deep.equal(plBool(true))
    })
  })

  describe('and function', () => {
    it('should check and evaluate the arguments', () => {
      expect(plBool(true)[and](plBool(true))).deep.equal(plBool(true))
      expect(plBool(false)[and](plBool(true))).deep.equal(plBool(false))
    })
  })

  describe('or function', () => {
    it('should check and evaluate the arguments', () => {
      expect(plBool(false)[or](plBool(false))).deep.equal(plBool(false))
      expect(plBool(false)[or](plBool(true))).deep.equal(plBool(true))
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalValue = new PLBool(true)
      const copiedValue = originalValue[copy]()
      expect(originalValue.value).equals(copiedValue.value)
      expect(originalValue).not.equals(copiedValue)
    })
  })
})
