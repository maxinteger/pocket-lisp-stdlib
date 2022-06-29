import { plNumber } from '../data/number/numberFn'
import { copy, debugTypeOf, deepCopy, str, toJSON } from './base'
import { Debug } from './baseType'
import { plString } from '../data/string/stringFn'
import { plVector } from '../data/vector/vectorFn'

describe('type classes base', () => {
  describe('str', () => {
    it('should call toString method', () => {
      expect(str(plNumber(42)).toJS()).toBe('42')
    })
  })

  describe('debugTypeOf', () => {
    it('should call debugTypeOf method', () => {
      expect(debugTypeOf(plNumber(42)).toJS()).toBe('Number')
      expect(debugTypeOf({} as Debug).toJS()).toBe('<unknown>')
    })
  })

  describe('toJSON', () => {
    it('should convert value to JSON formatted data', () => {
      expect(toJSON(plNumber(42))).toStrictEqual(plString('{"s":1,"d":[42],"e":1}'))
    })
  })

  describe('copy', () => {
    it('should call copy method', () => {
      const num = plNumber(42)
      const copyNum = copy(num)
      expect(copyNum).not.toBe(num)
      expect(copyNum.toJS()).toStrictEqual(num.toJS())
    })
  })

  describe('deepCopy', () => {
    it('should call deepCopy method', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = deepCopy(originalValue)
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).not.toBe(copiedValue.value)
      expect(originalItem).not.toBe(copiedValue.index(plNumber(0)))
      expect(originalItem.value).toBe(copiedValue.index(plNumber(0)).value)
    })
  })
})
