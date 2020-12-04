import { PLVector } from './PLVector'
import { PLNumber } from '../number/PLNumber'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { plNumber } from '../number/numberFn'
import { plVector } from './vectorFn'
import { contains, slice } from '../../typeClasses'

describe('stdlib/data/PLVector', () => {
  describe('creation', () => {
    it('should create empty Vector', () => {
      expect(plVector()).toEqual({ _value: [] })
    })
    describe('with of', () => {
      it('should have same result as the factory function', () => {
        expect(
          new PLVector<PLNumber>([plNumber(1), plNumber(2), plNumber(3)]),
        ).toEqual(plVector(plNumber(1), plNumber(2), plNumber(3)))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      expect(plVector().value).toEqual([])
      expect(plVector(plNumber(1), plNumber(2), plNumber(3)).value).toEqual([plNumber(1), plNumber(2), plNumber(3)])
    })
  })

  describe('count', () => {
    it('should work', () => {
      expect(plVector().count()).toEqual(plNumber(0))
      expect(plVector(plNumber(1), plNumber(2), plNumber(3)).count()).toEqual(plNumber(3))
    })
  })

  describe('concat', () => {
    it('should concatenate 2 vectors', () => {
      const actual = plVector(plNumber(1))
        .add(plVector(plNumber(2)))
        .add(plVector(plNumber(3)))
      expect(actual).toEqual(plVector(plNumber(1), plNumber(2), plNumber(3)))
    })
  })

  describe('map', () => {
    it('should exec a function on all array item', () => {
      const actual = plVector(plNumber(1), plNumber(2), plNumber(3)).map((a) => plNumber(a.value * 10))
      expect(actual).toEqual(plVector(plNumber(10), plNumber(20), plNumber(30)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).map(() => plNumber(10))
      expect(actual).toEqual(plVector(...[]))
    })
  })

  describe('filter', () => {
    it('should should filter out items', () => {
      const actual = plVector(plNumber(1), plNumber(2), plNumber(3), plNumber(2)).filter((a) => a.equals(plNumber(2)))
      expect(actual).toEqual(plVector(plNumber(2), plNumber(2)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).filter(() => plBool(true))
      expect(actual).toEqual(plVector(...[]))
    })
  })

  it('should have proper toString', () => {
    expect(plVector().toString()).toEqual('[]')
    expect(plVector(plNumber(1), plNumber(2)).toString()).toEqual('[1,2]')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plVector(...[plNumber(1), plNumber(2), plNumber(3)]).toJS()).toEqual([1, 2, 3])
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plVector().debugTypeOf()).toEqual(plString(PLVector.kind))
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = originalValue.copy()
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).toEqual(copiedValue.value)
      expect(originalItem).toBe(copiedValue.index(plNumber(0)))
      expect(originalItem.value).toBe(copiedValue.index(plNumber(0)).value)
    })
  })

  describe('deepCopy function', () => {
    it('should deep copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = originalValue.deepCopy()
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).not.toBe(copiedValue.value)
      expect(originalItem).not.toBe(copiedValue.index(plNumber(0)))
      expect(originalItem.value).toBe(copiedValue.index(plNumber(0)).value)
    })
  })

  describe('contains', () => {
    it('should returns with true/false when the item contains or not the item', () => {
      expect(contains(plNumber(1), plVector(plNumber(1), plNumber(2)))).toEqual(plBool(true))
      expect(contains(plNumber(5), plVector(plNumber(1), plNumber(2)))).toEqual(plBool(false))
    })
  })

  describe('slice', () => {
    it('should return with a sub vector', () => {
      const v = plVector(plNumber(1), plNumber(2), plNumber(3), plNumber(4), plNumber(5), plNumber(6))

      expect(slice(plNumber(0), plNumber(2), v)).toEqual(plVector(plNumber(1), plNumber(2)))
      expect(slice(plNumber(2), plNumber(2), v)).toEqual(plVector())
      expect(slice(plNumber(2), plNumber(4), v)).toEqual(plVector(plNumber(3), plNumber(4)))
      expect(slice(plNumber(5), plNumber(10), v)).toEqual(plVector(plNumber(6)))
    })
  })
})
