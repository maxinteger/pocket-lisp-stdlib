import { PLNumber } from '../number/PLNumber'
import { PLSet } from './PLSet'
import { plString } from '../string/stringFn'
import { plNumber } from '../number/numberFn'
import { difference, intersection, plSet, symmetricDifference, union } from './setFn'
import { plVector } from '../vector/vectorFn'
import { contains } from '../../typeClasses'
import { plBool } from '../bool/boolFn'

const createSet = (arr: number[]): PLSet<any> => plSet(plVector(...arr.map((x) => plNumber(x))))

describe('stdlib/data/PLSet', () => {
  describe('creation', () => {
    it('should create empty set', () => {
      expect(plSet(plVector())).toEqual({ _value: [] })
    })

    it('should have same result as the factory function', () => {
      expect(new PLSet<PLNumber>(plVector(plNumber(1), plNumber(2), plNumber(3)))).toEqual(createSet([1, 2, 3]))
    })
    it('should not allow different types in it', () => {
      expect(
        // @ts-expect-error: check exception
        () => new PLSet<PLNumber>(plVector(plNumber(1), plNumber(2), plString('hello world'))),
      ).toThrow(`Type Error! Expected 'Number', but got 'String'`)
    })

    it('should keep only unique values', () => {
      expect(new PLSet<PLNumber>(plVector(plNumber(1), plNumber(2), plNumber(1), plNumber(2), plNumber(3)))).toEqual(
        createSet([1, 2, 3]),
      )
    })
  })

  describe('count', () => {
    it('should work', () => {
      expect(createSet([]).count()).toEqual(plNumber(0))
      expect(createSet([1, 2, 2, 3]).count()).toEqual(plNumber(3))
    })
  })

  describe('contains', () => {
    it('should returns with true/false when the item contains or not the item', () => {
      expect(contains(plNumber(1), createSet([1, 2, 3]))).toEqual(plBool(true))
      expect(contains(plNumber(5), createSet([1, 2, 3]))).toEqual(plBool(false))
    })
  })

  describe('union', () => {
    it('should get union of 2 sets', () => {
      expect(union(createSet([1, 2, 3]), createSet([3, 4, 5]))).toEqual(createSet([1, 2, 3, 4, 5]))
    })
  })

  describe('difference', () => {
    it('should get difference of 2 sets', () => {
      expect(difference(createSet([1, 2, 3]), createSet([3, 4, 5]))).toEqual(createSet([1, 2]))
    })
  })

  describe('intersection', () => {
    it('should get intersection of 2 set', () => {
      expect(intersection(createSet([1, 2, 3]), createSet([3, 4, 5]))).toEqual(createSet([3]))
    })
  })
  describe('symmetricDifference', () => {
    it('should get symmetric difference of 2 set', () => {
      expect(symmetricDifference(createSet([1, 2, 3]), createSet([3, 4, 5]))).toEqual(createSet([1, 2, 4, 5]))
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(createSet([1]).debugTypeOf()).toEqual(plString(PLSet.kind))
    })
  })

  describe('map', () => {
    it('should exec a function on all set item', () => {
      const actual = createSet([1, 2, 3]).map((a) => plNumber(a.value * 10))
      expect(actual).toEqual(createSet([10, 20, 30]))
    })

    it('should work with empty input', () => {
      const actual = createSet([]).map(() => plNumber(10))
      expect(actual).toEqual(createSet([]))
    })
  })

  describe('filter', () => {
    it('should should filter out items', () => {
      const actual = createSet([1, 2, 3]).filter((a) => a.equals(plNumber(2)))
      expect(actual).toEqual(createSet([2]))
    })

    it('should work with empty input', () => {
      const actual = createSet([]).map(() => plBool(true))
      expect(actual).toEqual(createSet([]))
    })
  })

  it('should have proper toString', () => {
    expect(createSet([]).toString()).toEqual('[]')
    expect(createSet([1, 2, 3]).toString()).toEqual('[1,2,3]')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(createSet([1, 2, 3]).toJS()).toEqual([1, 2, 3])
    })
  })
})
