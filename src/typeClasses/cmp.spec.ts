import { equals, greaterOrEqual, greaterThen, lessOrEqual, lessThen, notEquals } from './cmp'
import { plBool, plNumber } from '..'

describe('type classes cmp', () => {
  describe('equals', () => {
    it('should compare equal values', () => {
      expect(equals(plNumber(1), plNumber(1))).toEqual(plBool(true))
      expect(equals(plNumber(1), plNumber(2))).toEqual(plBool(false))
      expect(equals(plNumber(2), plNumber(1))).toEqual(plBool(false))
    })
  })

  describe('notEquals', () => {
    it('should compare not equal values', () => {
      expect(notEquals(plNumber(1), plNumber(1))).toEqual(plBool(false))
      expect(notEquals(plNumber(1), plNumber(2))).toEqual(plBool(true))
      expect(notEquals(plNumber(2), plNumber(1))).toEqual(plBool(true))
    })
  })

  describe('lessThen', () => {
    it('should compare not equal values', () => {
      expect(lessThen(plNumber(1), plNumber(1))).toEqual(plBool(false))
      expect(lessThen(plNumber(2), plNumber(1))).toEqual(plBool(false))
      expect(lessThen(plNumber(1), plNumber(2))).toEqual(plBool(true))
    })
  })

  describe('lessOrEqual', () => {
    it('should compare not equal values', () => {
      expect(lessOrEqual(plNumber(1), plNumber(1))).toEqual(plBool(true))
      expect(lessOrEqual(plNumber(1), plNumber(2))).toEqual(plBool(true))
      expect(lessOrEqual(plNumber(2), plNumber(1))).toEqual(plBool(false))
    })
  })

  describe('greaterThen', () => {
    it('should compare not equal values', () => {
      expect(greaterThen(plNumber(1), plNumber(1))).toEqual(plBool(false))
      expect(greaterThen(plNumber(2), plNumber(1))).toEqual(plBool(true))
      expect(greaterThen(plNumber(1), plNumber(2))).toEqual(plBool(false))
    })
  })

  describe('greaterOrEqual', () => {
    it('should compare not equal values', () => {
      expect(greaterOrEqual(plNumber(1), plNumber(1))).toEqual(plBool(true))
      expect(greaterOrEqual(plNumber(1), plNumber(2))).toEqual(plBool(false))
      expect(greaterOrEqual(plNumber(2), plNumber(1))).toEqual(plBool(true))
    })
  })
})
