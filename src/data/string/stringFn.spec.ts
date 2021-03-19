import { plString, plStringConstructor } from './stringFn'
import { plNumber } from '../number/numberFn'

describe('stringFn', () => {
  describe('plStringConstructor', () => {
    it('should return with plBool', () => {
      expect(plStringConstructor(plString('Hello'))).toEqual(plString('Hello'))
      expect(() => plStringConstructor(plNumber(1) as any)).toThrowError(`Expected 'String', but got 'Number'.`)
    })
  })
})
