import { plNumber } from '../number/numberFn'
import { plString } from '../string/stringFn'
import { plVector } from '../vector/vectorFn'
import { keys, values, plHashMap } from './hashMapFn'
import { PLHashMap } from './PLHashMap'

const plh = plHashMap
const pls = plString
const pln = plNumber
const plv = plVector

describe('stdlib/data/number/hashMapFn', () => {
  describe('plHashMap', () => {
    it('should construct properly', () => {
      expect(plh(pls('key'), pls('value'))).toEqual(new PLHashMap([pls('key'), pls('value')]))
      expect(plh(pls('key'), pln(1))).toEqual(new PLHashMap([pls('key'), pln(1)]))
    })
  })

  describe('keys', () => {
    const fn = keys
    it('should get keys', () => {
      expect(fn(plh(pls('k1'), pls('v1'), pls('k2'), pls('v2')))).toEqual(plv(pls('k1'), pls('k2')))
    })
  })

  describe('values', () => {
    const fn = values
    it('should get alues', () => {
      expect(fn(plh(pls('k1'), pls('v1'), pls('k2'), pls('v2')))).toEqual(plv(pls('v1'), pls('v2')))
    })
  })
})
