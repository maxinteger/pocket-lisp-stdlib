import { expect } from 'chai'
import { PLVector, plVector } from './PLVector'
import { PLNumber, plNumber } from './PLNumber'
import { plString } from './PLString'
import { plBool } from './PLBool'

describe('stdlib/data/PLVector', () => {
  describe('creation', () => {
    it('should create empty Vector', () => {
      expect(plVector()).deep.equal({ _value: [] })
    })
    describe('with of', () => {
      it('should have same result as the factory function', () => {
        expect(
          new PLVector<PLNumber>([plNumber(1), plNumber(2), plNumber(3)])
        ).deep.equals(plVector(plNumber(1), plNumber(2), plNumber(3)))
      })
    })
  })

  describe('getters', () => {
    it('should work', () => {
      expect(plVector().value).deep.equal([])
      expect(plVector(plNumber(1), plNumber(2), plNumber(3)).value).deep.equal([
        plNumber(1),
        plNumber(2),
        plNumber(3)
      ])
    })
  })
  describe('count', () => {
    it('should work', () => {
      expect(plVector().count()).deep.equal(plNumber(0))
      expect(plVector(plNumber(1), plNumber(2), plNumber(3)).count()).deep.equal(plNumber(3))
    })
  })

  describe('concat', () => {
    it('should concatenate 2 vectors', () => {
      const actual = plVector(plNumber(1))
        .add(plVector(plNumber(2)))
        .add(plVector(plNumber(3)))
      expect(actual).deep.equal(plVector(plNumber(1), plNumber(2), plNumber(3)))
    })
  })

  describe('map', () => {
    it('should exec a function on all array item', () => {
      const actual = plVector(plNumber(1), plNumber(2), plNumber(3)).map((a) =>
        plNumber(a.value * 10)
      )
      expect(actual).deep.equal(plVector(plNumber(10), plNumber(20), plNumber(30)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).map(() => plNumber(10))
      expect(actual).deep.equal(plVector(...[]))
    })
  })
  describe('filter', () => {
    it('should should filter out items', () => {
      const actual = plVector(plNumber(1), plNumber(2), plNumber(3), plNumber(2)).filter((a) =>
        a.equals(plNumber(2))
      )
      expect(actual).deep.equal(plVector(plNumber(2), plNumber(2)))
    })

    it('should work with empty input', () => {
      const actual = plVector(...[]).filter(() => plBool(true))
      expect(actual).deep.equal(plVector(...[]))
    })
  })

  it('should have proper toString', () => {
    expect(plVector().toString()).deep.equal('[]')
    expect(plVector(plNumber(1), plNumber(2)).toString()).deep.equal('[1,2]')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      expect(plVector(...[plNumber(1), plNumber(2), plNumber(3)]).toJS()).deep.equal([1, 2, 3])
    })
  })

  describe('copy function', () => {
    it('should copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = originalValue.copy()
      expect(originalValue).not.equals(copiedValue)
      expect(originalValue.value).deep.equals(copiedValue.value)
      expect(originalItem).equals(copiedValue.index(plNumber(0)))
      expect(originalItem.value).equals(copiedValue.index(plNumber(0)).value)
    })
  })
  describe('deepCopy function', () => {
    it('should deep copy value', () => {
      const originalItem = plString('hello')
      const originalValue = plVector(originalItem)
      const copiedValue = originalValue.deepCopy()
      expect(originalValue).not.equals(copiedValue)
      expect(originalValue.value).not.equals(copiedValue.value)
      expect(originalItem).not.equals(copiedValue.index(plNumber(0)))
      expect(originalItem.value).equals(copiedValue.index(plNumber(0)).value)
    })
  })
})
