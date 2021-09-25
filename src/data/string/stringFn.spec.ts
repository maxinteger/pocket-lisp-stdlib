import { plString, plStringConstructor, replace, replaceRegexp } from './stringFn'
import { plNumber } from '../number/numberFn'

describe('stringFn', () => {
  describe('plStringConstructor', () => {
    it('should return with plBool', () => {
      expect(plStringConstructor(plString('Hello'))).toEqual(plString('Hello'))
      expect(() => plStringConstructor(plNumber(1) as any)).toThrowError(`Expected 'String', but got 'Number'.`)
    })
  })

  describe('replace', () => {
    it('should replace string', () => {
      expect(replace(plString('H'), plString('B'), plString('Hello'))).toEqual(plString('Bello'))
    })
  })

  describe('replace-regexp', () => {
    it('should replace regexp string', () => {
      expect(replaceRegexp(plString('Dog'), plString('i'), plString('monkey'), plString('dog'))).toEqual(plString('monkey'))
      expect(replaceRegexp(plString('apples'), plString('gi'), plString('oranges'), plString('Apples are round, and apples are juicy.'))).toEqual(plString('oranges are round, and oranges are juicy.'))
      expect(replaceRegexp(plString('(\\w+)\\s(\\w+)'), plString(''), plString('$2, $1'), plString('John Smith'))).toEqual(plString('Smith, John'))
    })
  })
})
