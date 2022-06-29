import { plString } from '../data/string/stringFn'
import { plNumber } from '../data/number/numberFn'
import { contains, count, filter, map, reduce, slice } from './iter'
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

  describe('map', () => {
    it('should call the map function of the type class', () => {
      const evalFn = jest.fn().mockImplementation(() => pln(1))
      const callbackFn = () => {
        /* noop */
      }
      const actual = map.call({ evalFn } as any, callbackFn as any, plVector(pln(1), pln(2), pln(3)))
      expect(actual).toEqual(plVector(pln(1), pln(1), pln(1)))
      expect(evalFn.mock.calls).toEqual([
        [callbackFn, [pln(1)]],
        [callbackFn, [pln(2)]],
        [callbackFn, [pln(3)]],
      ])
    })
  })

  describe('filter', () => {
    it('should call the filter function of the type class', () => {
      const evalFn = jest.fn().mockImplementation(() => plBool(false))
      const callbackFn = () => {
        /* noop */
      }
      const actual = filter.call({ evalFn } as any, callbackFn as any, plVector(pln(1), pln(2), pln(3)))
      expect(actual).toEqual(plVector())
      expect(evalFn.mock.calls).toEqual([
        [callbackFn, [pln(1)]],
        [callbackFn, [pln(2)]],
        [callbackFn, [pln(3)]],
      ])
    })
  })

  describe('reduce', () => {
    it('should call the reduce function of the type class', () => {
      const evalFn = jest.fn().mockImplementation(() => pln(1))
      const callbackFn = () => {
        /* noop */
      }
      const init = plVector()
      const actual = reduce.call({ evalFn } as any, init, callbackFn as any, plVector(pln(1), pln(2), pln(3)))
      expect(actual).toEqual(pln(1))
      expect(evalFn.mock.calls).toEqual([
        [callbackFn, [{ _value: [] }, pln(1)]],
        [callbackFn, [pln(1), pln(2)]],
        [callbackFn, [pln(1), pln(3)]],
      ])
    })
  })
})
