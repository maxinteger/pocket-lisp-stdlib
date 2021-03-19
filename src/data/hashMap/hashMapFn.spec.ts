import { plNumber } from '../number/numberFn'
import { plHashMap, plHashMapConstructor } from './hashMapFn'
import { plVector } from '../vector/vectorFn'
import { plString } from '../string/stringFn'

const pln = plNumber
const pls = plString
const plv = plVector

describe('hashMapFn', () => {
  describe('plHashMapConstructor', () => {
    it('should fail if called with wrong parameters', () => {
      expect(() => plHashMapConstructor(pln(1) as any, plv())).toThrowError(`Expected 'Vector', but got 'Number'.`)
      expect(() => plHashMapConstructor(plv(), pln(1) as any)).toThrowError(`Expected 'Vector', but got 'Number'.`)
      expect(() => plHashMapConstructor(plv(pln(1)) as any, plv())).toThrowError(
        `Number of keys must be equal with the number of values`,
      )
      expect(() => plHashMapConstructor(plv(), plv(pln(1)) as any)).toThrowError(
        `Number of keys must be equal with the number of values`,
      )
      expect(() => plHashMapConstructor(plv(pln(1) as any), plv(pln(1)))).toThrowError(
        `Expected 'String', but got 'Number'.`,
      )
    })

    it('should return with plHashMap', () => {
      expect(plHashMapConstructor(plv(), plv())).toEqual(plHashMap())
      expect(plHashMapConstructor(plv(pls('key')), plv(pln(42)))).toEqual(plHashMap(pls('key'), pln(42)))
    })
  })
})
