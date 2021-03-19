import { plBool, plBoolConstructor } from './boolFn'
import { plNumber } from '../number/numberFn'

describe('boolFn', () => {
  describe('plBoolConstructor', () => {
    it('should return with plBool', () => {
      expect(plBoolConstructor(plBool(true))).toEqual(plBool(true))
      expect(() => plBoolConstructor(plNumber(1) as any)).toThrowError(`Expected 'Bool', but got 'Number'.`)
    })
  })
})
