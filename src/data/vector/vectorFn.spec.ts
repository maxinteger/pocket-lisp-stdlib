import { head, intersperse, join, joinWith, plVector, sum, tail } from './vectorFn'
import { plNumber } from '../number/numberFn'
import { plString } from '../string/stringFn'

describe('stdlib/data/vectorFn', () => {
  describe('sum', () => {
    it('should sum number list', () => {
      expect(sum(plVector())).toEqual(plNumber(0))
      expect(sum(plVector(plNumber(1), plNumber(2), plNumber(3)))).toEqual(plNumber(6))
    })
  })

  describe('intersperse', () => {
    it('should inject separator item between the existing items', () => {
      expect(intersperse(plNumber(0), plVector())).toEqual(plVector())
      expect(intersperse(plNumber(0), plVector(plNumber(1), plNumber(2), plNumber(3)))).toEqual(
        plVector(plNumber(1), plNumber(0), plNumber(2), plNumber(0), plNumber(3)),
      )
    })
  })

  describe('join', () => {
    it('should join list items into a string', () => {
      expect(join(plVector())).toEqual(plString(''))
      expect(join(plVector(plString('a'), plString('b'), plString('c')))).toEqual(plString('abc'))
    })
  })

  describe('join-with', () => {
    it('should join list items with separator', () => {
      expect(joinWith(plString('<|>'), plVector())).toEqual(plString(''))
      expect(joinWith(plString('<|>'), plVector(plString('a'), plString('b'), plString('c')))).toEqual(
        plString('a<|>b<|>c'),
      )
    })
  })

  describe('head', () => {
    it('should return with the first item of the list', () => {
      expect(() => head(plVector())).toThrow('Vector is empty')
      expect(head(plVector(plString('a'), plString('b'), plString('c')))).toEqual(plString('a'))
    })
  })

  describe('tail', () => {
    it('should return with the first item of the list', () => {
      expect(tail(plVector())).toEqual(plVector())
      expect(tail(plVector(plString('a'), plString('b'), plString('c')))).toEqual(
        plVector(plString('b'), plString('c')),
      )
    })
  })
})
