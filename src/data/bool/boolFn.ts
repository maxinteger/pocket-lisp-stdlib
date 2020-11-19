import { PLBool } from './PLBool'
import { plString } from '../string/stringFn'

export const plBool = (value: boolean): PLBool => new PLBool(value)

export const parseBool = (value: string): PLBool => PLBool.fromStr(plString(value))
