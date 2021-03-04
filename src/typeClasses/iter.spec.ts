import { plString } from '../data/string/stringFn'
import { plNumber } from '../data/number/numberFn'
import { contains, count, slice } from './iter'
import { plBool } from '../data/bool/boolFn'
import { plVector } from '../data/vector/vectorFn'

const pln = plNumber

describe('type classes operations', () => {
  describe('count', () => {
    it('should call count method', () => {
      expect(count(plString('hello'))).toEqual(pln(5))
    })
  })

  describe('contains', () => {
    it('should call contains method', () => {
      expect(contains(plString('o'), plString('hello'))).toEqual(plBool(true))
    })
  })

  describe('slice', () => {
    it('should call slice method', () => {
      const v = plVector(pln(1), pln(2), pln(3), pln(4), pln(5), pln(6))

      expect(slice(pln(0), pln(2), v)).toEqual(plVector(pln(1), pln(2)))
    })
  })
})
