import { plString } from '../string/stringFn'
import { maybe } from './maybeFn'
import { Just } from './Just'
import { Nothing } from './Nothing'
import { plNumber } from '../number/numberFn'

describe('stdlib/data/Maybe', () => {
  describe('maybe function', () => {
    it('should return with Nothing instance for invalid values', () => {
      expect(maybe(Nothing).value).toBe(Nothing)
      expect(maybe(Nothing)).toBe(Nothing)
      expect(maybe(undefined)).toBe(Nothing)
      expect(maybe(null)).toBe(Nothing)
    })
    it('should return with Just instance for all other values', () => {
      expect(maybe(0).value).toEqual(0)
      expect(maybe(0)).toEqual(new Just(0 as any))
      expect(maybe('hello world')).toEqual(new Just('hello world' as any))
      expect(maybe([1, 2, 3])).toEqual(new Just([1, 2, 3] as any))
    })
  })

  it('should have proper toString', () => {
    expect(maybe(plNumber(1)).toString()).toEqual('Just(1)')
    expect(maybe(plString('1')).toString()).toEqual('Just(1)')
    expect(maybe(undefined).toString()).toEqual('Nothing')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(maybe(plNumber(1)).toJS()).toBe(1)
      expect(maybe(undefined).toJS()).toBe(undefined)
      expect(maybe(Nothing).toJS()).toBe(undefined)
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(Nothing.debugTypeOf()).toEqual(plString('Nothing'))
      expect(maybe(1).debugTypeOf()).toEqual(plString(Just.kind))
    })
  })
})
