import { expect } from 'chai'
import { PLHashMap, plHashMap } from './PLHashMap'
import { plString } from './PLString'
import { plNumber } from './PLNumber'

describe('stdlib/data/PLHashMap', () => {
  describe('creation with of', () => {
    it('should have same result as the factory function', () => {
      expect(new PLHashMap([plString('a'), plNumber(1)])).deep.equals(
        plHashMap(plString('a'), plNumber(1))
      )
    })
  })
  it('should create empty plHashMap', () => {
    expect(plHashMap().toString()).deep.equal('{}')
  })
  it('should have proper toString', () => {
    expect(plHashMap(plString('a'), plNumber(1), plString('b'), plNumber(2)).toString()).deep.equal(
      '{a -> 1, b -> 2}'
    )
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      const js = plHashMap(plString('a'), plNumber(1), plString('b'), plNumber(2)).toJS()
      expect(Array.from(js.keys())).deep.equal(['a', 'b'])
      expect(Array.from(js.values())).deep.equal([plNumber(1), plNumber(2)])
    })
  })
})
