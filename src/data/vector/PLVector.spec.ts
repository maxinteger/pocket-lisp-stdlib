import { PLVector } from './PLVector'
import { PLNumber } from '../number/PLNumber'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { plNumber } from '../number/numberFn'
import { plVector } from './vectorFn'
import { contains, slice } from '../../typeClasses'

const pln = plNumber

describe('stdlib/data/PLVector', () => {
  describe('creation', () => {
    it('should create empty Vector', () => {
      expect(plVector()).toEqual({ _value: [] })
    })
    describe('with of', () => {
      it('should have same result as the factory function', () => {
        expect(
          new PLVector<PLNumber>([pln(1), pln(2), pln(3)]),
        ).toEqual(plVector(pln(1), pln(2), pln(3)))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      expect(plVector().value).toEqual([])
      expect(plVector(pln(1), pln(2), pln(3)).value).toEqual([pln(1), pln(2), pln(3)])
    })
  })

  describe('count', () => {
    it('should work', () => {
      expect(plVector().count()).toEqual(pln(0))
      expect(plVector(pln(1), pln(2), pln(3)).count()).toEqual(pln(3))
    })
  })

  describe('concat', () => {
    it('should concatenate 2 vectors', () => {
      const actual = plVector(pln(1))
        .add(plVector(pln(2)))
        .add(plVector(pln(3)))
      expect(actual).toEqual(plVector(pln(1), pln(2), pln(3)))
    })
  })

  describe('map', () => {
    it('should exec a function on all array item', () => {
      const actual = plVector(pln(1), pln(2), pln(3)).map((a) => pln(a.value * 10))
      expect(actual).toEqual(plVector(pln(10), pln(20), pln(30)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).map(() => pln(10))
      expect(actual).toEqual(plVector(...[]))
    })
  })

  describe('filter', () => {
    it('should should filter out items', () => {
      const actual = plVector(pln(1), pln(2), pln(3), pln(2)).filter((a) => a.equals(pln(2)))
      expect(actual).toEqual(plVector(pln(2), pln(2)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).filter(() => plBool(true))
      expect(actual).toEqual(plVector(...[]))
    })
  })

  it('should have proper toString', () => {
    expect(plVector().toString()).toEqual('[]')
    expect(plVector(pln(1), pln(2)).toString()).toEqual('[1,2]')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plVector(...[pln(1), pln(2), pln(3)]).toJS()).toEqual([
        { decimals: 0, intValue: 1 },
        { decimals: 0, intValue: 2 },
        { decimals: 0, intValue: 3 },
      ])
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
      expect(originalItem).toBe(copiedValue.index(pln(0)))
      expect(originalItem.value).toBe(copiedValue.index(pln(0)).value)
    })
  })

  describe('deepCopy function', () => {
    it('should deep copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = originalValue.deepCopy()
      expect(originalValue).not.toBe(copiedValue)
      expect(originalValue.value).not.toBe(copiedValue.value)
      expect(originalItem).not.toBe(copiedValue.index(pln(0)))
      expect(originalItem.value).toBe(copiedValue.index(pln(0)).value)
    })
  })

  describe('contains', () => {
    it('should returns with true/false when the item contains or not the item', () => {
      expect(contains(pln(1), plVector(pln(1), pln(2)))).toEqual(plBool(true))
      expect(contains(pln(5), plVector(pln(1), pln(2)))).toEqual(plBool(false))
    })
  })

  describe('slice', () => {
    it('should return with a sub vector', () => {
      const v = plVector(pln(1), pln(2), pln(3), pln(4), pln(5), pln(6))

      expect(slice(pln(0), pln(2), v)).toEqual(plVector(pln(1), pln(2)))
      expect(slice(pln(2), pln(2), v)).toEqual(plVector())
      expect(slice(pln(2), pln(4), v)).toEqual(plVector(pln(3), pln(4)))
      expect(slice(pln(5), pln(10), v)).toEqual(plVector(pln(6)))
    })
  })
})
