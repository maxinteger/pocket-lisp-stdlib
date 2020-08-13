import { expect } from 'chai'
import { Just, maybe, Nothing } from './Maybe'
import { plNumber } from './PLNumber'
import { plString } from './PLString'

describe('stdlib/data/Maybe', () => {
  describe('maybe function', () => {
    it('should return with Nothing instance for invalid values', () => {
      expect(maybe(Nothing).value).equals(Nothing)
      expect(maybe(Nothing)).equals(Nothing)
      expect(maybe(undefined)).equals(Nothing)
      expect(maybe(null)).equals(Nothing)
    })
    it('should return with Just instance for all other values', () => {
      expect(maybe(0).value).deep.equals(0)
      expect(maybe(0)).deep.equals(new Just(0 as any))
      expect(maybe('hello world')).deep.equals(new Just('hello world' as any))
      expect(maybe([1, 2, 3])).deep.equals(new Just([1, 2, 3] as any))
    })
  })

  it('should have proper toString', () => {
    expect(maybe(plNumber(1)).toString()).deep.equal('Just(1)')
    expect(maybe(plString('1')).toString()).deep.equal('Just(1)')
    expect(maybe(undefined).toString()).deep.equal('Nothing')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(maybe(plNumber(1)).toJS()).equals(1)
      expect(maybe(undefined).toJS()).equals(undefined)
      expect(maybe(Nothing).toJS()).equals(undefined)
    })
  })
})
