import { PLNumber } from '../number/PLNumber'
import { PLSet } from './PLSet'
import { plString } from '../string/stringFn'
import { plNumber } from '../number/numberFn'
import { difference, intersection, plSet, symmetricDifference, union } from './setFn'
import { plVector } from '../vector/vectorFn'
import { contains } from '../../typeClasses'
import { plBool } from '../bool/boolFn'

const createSet = (arr: number[]): PLSet<any> => plSet(plVector(...arr.map((x) => pln(x))))
const pln = plNumber

describe('stdlib/data/PLSet', () => {
  describe('creation', () => {
    it('should create empty set', () => {
      expect(plSet(plVector())).toEqual({ _value: [] })
    })

    it('should have same result as the factory function', () => {
      expect(new PLSet<PLNumber>(plVector(pln(1), pln(2), pln(3)))).toEqual(createSet([1, 2, 3]))
    })
    it('should not allow different types in it', () => {
      expect(
        // @ts-expect-error: check exception
        () => new PLSet<PLNumber>(plVector(pln(1), pln(2), plString('hello world'))),
      ).toThrow(`Type Error! Expected 'Number', but got 'String'`)
    })

    it('should keep only unique values', () => {
      expect(new PLSet<PLNumber>(plVector(pln(1), pln(2), pln(1), pln(2), pln(3)))).toEqual(createSet([1, 2, 3]))
    })
  })

  describe('count', () => {
    it('should work', () => {
      expect(createSet([]).count()).toEqual(pln(0))
      expect(createSet([1, 2, 2, 3]).count()).toEqual(pln(3))
    })
  })

  describe('contains', () => {
    it('should returns with true/false when the item contains or not the item', () => {
      expect(contains(pln(1), createSet([1, 2, 3]))).toEqual(plBool(true))
      expect(contains(pln(5), createSet([1, 2, 3]))).toEqual(plBool(false))
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
      const actual = createSet([1, 2, 3]).map((a) => pln(a.value * 10))
      expect(actual).toEqual(createSet([10, 20, 30]))
    })

    it('should work with empty input', () => {
      const actual = createSet([]).map(() => pln(10))
      expect(actual).toEqual(createSet([]))
    })
  })

  describe('filter', () => {
    it('should should filter out items', () => {
      const actual = createSet([1, 2, 3]).filter((a) => a.equals(pln(2)))
      expect(actual).toEqual(createSet([2]))
    })

    it('should work with empty input', () => {
      const actual = createSet([]).map(() => plBool(true))
      expect(actual).toEqual(createSet([]))
    })
  })

  describe('set2list', () => {
    it('should convert set to vector', () => {
      expect(createSet([1, 2, 3, 3, 4, 1])).toEqual(plVector(pln(1), pln(2), pln(3), pln(4)))
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

  describe('toJSON', () => {
    it('should return with the JSON representation', () => {
      expect(createSet([1, 2, 3]).toJSON()).toEqual([
        {
          decimals: 0,
          intValue: 1,
        },
        {
          decimals: 0,
          intValue: 2,
        },
        {
          decimals: 0,
          intValue: 3,
        },
      ])
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plSet(plVector(originalItem))
      const copiedValue = originalValue.copy()
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).toEqual(copiedValue.value)
      expect(originalItem).toBe(copiedValue.value[0])
      expect(originalItem.value).toBe(copiedValue.value[0].value)
    })
  })

  describe('deepCopy function', () => {
    it('should deep copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plSet(plVector(originalItem))
      const copiedValue = originalValue.deepCopy()
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).toEqual(copiedValue.value)
      expect(originalItem).not.toBe(copiedValue.value[0])
      expect(originalItem).toEqual(copiedValue.value[0])
      expect(originalItem.value).toBe(copiedValue.value[0].value)
    })
  })
})
