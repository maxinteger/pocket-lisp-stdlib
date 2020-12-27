import { plDecimal } from './decimalFn'
import { PLDecimal } from './PLDecimal'

describe('stdlib/data/decimal/decimalFn', () => {
  describe('construction', () => {
    it('should work', () => {
      expect(plDecimal('0')).toEqual(new PLDecimal('0'))
    })
  })
})
