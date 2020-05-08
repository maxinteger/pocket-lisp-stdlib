import { expect } from 'chai'
import { assertType } from './assert'
import { plBool } from '../data/PLBool'

describe('stdlib utils', () => {
  describe('assertType', () => {
    it('should throws error if the params have different constructors', () => {
      expect(() => assertType(plBool(true), Boolean(false))).throws(
        `Type Error! Expected 'PLBool', but got 'Boolean'`
      )
    })
    it('should does nothing if the params have the same constructors', () => {
      expect(() => assertType(plBool(true), plBool(false))).not.throw()
    })
  })
})
