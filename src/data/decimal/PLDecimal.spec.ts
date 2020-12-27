import { plDecimal } from './decimalFn'

describe('stdlib/data/PLDecimal', () => {
  describe('creation', () => {
    it('should throw error if the parameters are invalid', () => {
      expect(() => plDecimal('')).toThrow('Invalid decimal number parameters!')
    })
  })
})
