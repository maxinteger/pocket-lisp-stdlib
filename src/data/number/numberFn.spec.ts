import { assertNumeric, modulo, plFloatConstructor, plIntegerConstructor, plNumber } from './numberFn'
import { PLNumber } from './PLNumber'
import { plString } from '../string/stringFn'

const pln = plNumber

describe('stdlib/data/number/numberFn', () => {
  describe('plNumber', () => {
    it('should work for floats', () => {
      expect(pln(2.1)).toEqual(new PLNumber(2.1))
      expect(pln(13.42)).toEqual(new PLNumber(13.42))
    })

    it('should work for integers', () => {
      expect(pln(2)).toEqual(new PLNumber(2))
      expect(pln(23)).toEqual(new PLNumber(23))
    })

    it('should construct decimal', () => {
      expect(pln(0.2)).toEqual(new PLNumber(0.2))
      expect(pln(0.013)).toEqual(new PLNumber(0.013))
    })

    it('should extract integer value and decimals from string', () => {
      expect(pln('1e5').toJSON()).toStrictEqual({ d: [100_000], e: 5, s: 1 })
      expect(pln('1e5').toJS()).toStrictEqual({ d: [100_000], e: 5, s: 1 })
      expect(pln('2e-3').toJSON()).toStrictEqual({ d: [20_000], e: -3, s: 1 })
      expect(pln('2e-3').toJS()).toStrictEqual({ d: [20_000], e: -3, s: 1 })
      expect(pln('1.2234E-2').toJSON()).toStrictEqual({ d: [12_2340], e: -2, s: 1 })
      expect(pln('1.2234E-2').toJS()).toStrictEqual({ d: [12_2340], e: -2, s: 1 })
      expect(pln('2.56E+3').toJSON()).toStrictEqual({ d: [2560], e: 3, s: 1 })
      expect(pln('2.56E+3').toJS()).toStrictEqual({ d: [2560], e: 3, s: 1 })
      expect(pln('.230').toJSON()).toStrictEqual({ d: [2_300_000], e: -1, s: 1 })
      expect(pln('.230').toJS()).toStrictEqual({ d: [2_300_000], e: -1, s: 1 })
      expect(pln('-0.3100').toJSON()).toStrictEqual({ d: [3_100_000], e: -1, s: -1 })
      expect(pln('-0.3100').toJS()).toStrictEqual({ d: [3_100_000], e: -1, s: -1 })
      expect(pln('320.0').toJSON()).toStrictEqual({ d: [320], e: 2, s: 1 })
      expect(pln('320.0').toJS()).toStrictEqual({ d: [320], e: 2, s: 1 })
      expect(pln('-20').toJSON()).toStrictEqual({ d: [20], e: 1, s: -1 })
      expect(pln('-20').toJS()).toStrictEqual({ d: [20], e: 1, s: -1 })

      // #706
      const num = pln('900289').divide(pln('100'))
      expect(num.toJSON()).toStrictEqual({ d: [9002, 8900000], e: 3, s: 1 })
    })

    it('should throw error if input string is not numeric', () => {
      expect(() => pln('')).toThrow('Invalid number: ""')
      expect(() => pln('hello world')).toThrow('Invalid number: "hello world"')
      expect(() => pln('0.2hello')).toThrow('Invalid number: "0.2hello"')
      expect(() => pln('0.1.2')).toThrow('Invalid number: "0.1.2"')
      expect(() => pln('1 234')).toThrow('Invalid number: "1 234')
    })
  })

  describe('plIntegerConstructor', () => {
    it('should return with plNumber', () => {
      expect(plIntegerConstructor(pln(1))).toEqual(pln(1))
      expect(() => plIntegerConstructor(plString('1') as any)).toThrow(`Expected 'Number', but got 'String'.`)
      expect(() => plIntegerConstructor(pln(1.5))).toThrow(`Expected integer, but got float number.`)
    })
  })

  describe('plFloatConstructor', () => {
    it('should return with plNumber', () => {
      expect(plFloatConstructor(pln(1))).toEqual(pln(1))
      expect(plFloatConstructor(pln(1.5))).toEqual(pln(1.5))
      expect(() => plFloatConstructor(plString('1') as any)).toThrowError(`Expected 'Number', but got 'String'.`)
    })
  })

  describe('assertNumeric', () => {
    const fn = assertNumeric
    it('should assert if string is numeric', () => {
      expect(() => fn('')).toThrow('Invalid number: ""')
      expect(() => fn('12,0')).toThrow('Invalid number: "12,0"')
      expect(() => fn('x12.0')).toThrow('Invalid number: "x12.0"')
      expect(() => fn('12 0')).toThrow('Invalid number: "12 0"')
      expect(fn('0')).toBe(true)
      expect(fn('.12')).toBe(true)
      expect(fn('1.2')).toBe(true)
      expect(fn('12.')).toBe(true)
      expect(fn('12.0')).toBe(true)
      expect(fn(' 12.0')).toBe(true)
      expect(fn('12.0 ')).toBe(true)
      expect(fn('1.20E23')).toBe(true)
      expect(fn('12E-23')).toBe(true)
      expect(fn('12e1')).toBe(true)
      expect(fn('12.0e2')).toBe(true)
    })
  })

  describe('modulo', () => {
    it('should calculate modulo correctly', () => {
      const tests = [
        { num: 3, mod: 3, res: 0 },
        { num: 4, mod: 3, res: 1 },
        { num: 14, mod: 4, res: 2 },
        { num: 11, mod: 4, res: 3 },
        { num: 17, mod: 6, res: 5 },
      ]
      tests.map(({ num, mod, res }) => {
        expect(modulo(pln(num), pln(mod))).toEqual(pln(res))
      })
    })
  })
})
