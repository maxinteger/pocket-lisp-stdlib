import { expect } from 'chai'
import { head, intersperse, join, joinWith, PLVector, plVector, sum, tail } from './PLVector'
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

  describe('sum', () => {
    it('should sum number list', () => {
      expect(sum(plVector())).deep.equals(plNumber(0))
      expect(sum(plVector(plNumber(1), plNumber(2), plNumber(3)))).deep.equals(plNumber(6))
    })
  })

  describe('intersperse', () => {
    it('should inject separator item between the existing items', () => {
      expect(intersperse(plVector(), plNumber(0))).deep.equals(plVector())
      expect(intersperse(plVector(plNumber(1), plNumber(2), plNumber(3)), plNumber(0))).deep.equals(
        plVector(plNumber(1), plNumber(0), plNumber(2), plNumber(0), plNumber(3))
      )
    })
  })

  describe('join', () => {
    it('should join list items into a string', () => {
      expect(join(plVector())).deep.equals(plString(''))
      expect(join(plVector(plString('a'), plString('b'), plString('c')))).deep.equals(
        plString('abc')
      )
    })
  })

  describe('join-with', () => {
    it('should join list items with separator', () => {
      expect(joinWith(plVector(), plString('<|>'))).deep.equals(plString(''))
      expect(
        joinWith(plVector(plString('a'), plString('b'), plString('c')), plString('<|>'))
      ).deep.equals(plString('a<|>b<|>c'))
    })
  })

  describe('head', () => {
    it('should return with the first item of the list', () => {
      expect(() => head(plVector())).throws('Vector is empty')
      expect(head(plVector(plString('a'), plString('b'), plString('c')))).deep.equals(plString('a'))
    })
  })

  describe('tail', () => {
    it('should return with the first item of the list', () => {
      expect(tail(plVector())).deep.equals(plVector())
      expect(tail(plVector(plString('a'), plString('b'), plString('c')))).deep.equals(
        plVector(plString('b'), plString('c'))
      )
    })
  })
})
