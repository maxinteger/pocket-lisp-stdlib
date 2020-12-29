import { plBool } from '../bool/boolFn'
import { plDecimal } from './decimalFn'

const pld = plDecimal
const plb = plBool

describe('stdlib/data/PLDecimal', () => {
  describe('creation', () => {
    it('should throw error if the parameters are invalid', () => {
      expect(() => pld('')).toThrow('Invalid decimal number parameters!')
    })

    it('construction', () => {
      const tests = [
        { input: '0', result: ['0', 0, 0] },
        { input: '1', result: ['1', 1, 0] },
        { input: '1.0', result: ['1.0', 10, 1] },
        { input: '1.2', result: ['1.2', 12, 1] },
        { input: '0.03', result: ['0.03', 3, 2] },
        { input: '-0.00013', result: ['-0.00013', -13, 5] },
        { input: '-10.560000', result: ['-10.560000', -10_560_000, 6] },
      ] as { input: string; result: Array<string | number> }[]

      tests.map(({ input, result }) => {
        const d = pld(input)
        expect([d.strValue, d.intValue, d.decimals]).toStrictEqual(result)
      })
    })
  })

  describe('equals', () => {
    it('should compare two decimals', () => {
      expect(pld('0').equals(pld('0.0000'))).toStrictEqual(plb(true))
      expect(pld('10').equals(pld('10.0'))).toStrictEqual(plb(true))
      expect(pld('10').equals(pld('1.0'))).toStrictEqual(plb(false))
      expect(pld('-120.80').equals(pld('-120.8'))).toStrictEqual(plb(true))
    })
  })

  describe('negate', () => {
    it('should negate decimals', () => {
      expect(pld('0').negate().equals(pld('-0'))).toStrictEqual(plb(true))
      expect(pld('10').negate().equals(pld('-10'))).toStrictEqual(plb(true))
      expect(pld('-1.0').negate().equals(pld('1.0'))).toStrictEqual(plb(true))
      expect(pld('-120.80').negate().equals(pld('120.80'))).toStrictEqual(plb(true))
    })
  })

  describe('add', () => {
    it('should add two decimals', () => {
      expect(pld('0').add(pld('0.0000'))).toStrictEqual(pld('0'))
      expect(pld('12.0020').add(pld('-3.12000'))).toStrictEqual(pld('8.882'))
      expect(pld('0.0020').add(pld('30000.1'))).toStrictEqual(pld('30000.102'))
    })
  })

  describe('subtract', () => {
    it('should subtract two decimals', () => {
      expect(pld('0').subtract(pld('0.0000'))).toStrictEqual(pld('0'))
      expect(pld('12.0020').subtract(pld('-3.12000'))).toStrictEqual(pld('15.122'))
      expect(pld('0.0020').subtract(pld('30000.1'))).toStrictEqual(pld('-30000.098'))
    })
  })
})
