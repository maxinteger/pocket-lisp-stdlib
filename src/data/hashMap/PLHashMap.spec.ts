import { PLHashMap } from './PLHashMap'
import { plString } from '../string/stringFn'
import { plHashMap } from './hashMapFn'
import { plNumber } from '../number/numberFn'

describe('stdlib/data/PLHashMap', () => {
  describe('creation with of', () => {
    it('should have same result as the factory function', () => {
      expect(new PLHashMap([plString('a'), plNumber(1)])).toEqual(plHashMap(plString('a'), plNumber(1)))
    })
  })
  it('should create empty plHashMap', () => {
    expect(plHashMap().toString()).toEqual('{}')
  })
  it('should have proper toString', () => {
    expect(plHashMap(plString('a'), plNumber(1), plString('b'), plNumber(2)).toString()).toEqual('{a -> 1, b -> 2}')
  })

  describe('toJS', () => {
    it('should return with the JS representation', () => {
      const js = plHashMap(plString('a'), plNumber(1), plString('b'), plNumber(2)).toJS()
      expect(Array.from(js.keys())).toEqual(['a', 'b'])
      expect(Array.from(js.values())).toEqual([1, 2])
    })
  })

  describe('debugTypeOf', () => {
    it('should return with debug tag', () => {
      expect(plHashMap().debugTypeOf()).toEqual(plString(PLHashMap.kind))
    })
  })
})
