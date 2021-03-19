import { PLBool } from './PLBool'
import { plString } from '../string/stringFn'
import { typeCheck } from '../../utils/assert'

export const plBool = (value: boolean): PLBool => new PLBool(value)

export const plBoolConstructor = (value: PLBool): PLBool => {
  typeCheck(PLBool, value)
  return value
}

export const parseBool = (value: string): PLBool => PLBool.fromStr(plString(value))
