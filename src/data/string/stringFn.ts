import { PLString } from './PLString'
import { typeCheck } from '../../utils/assert'

export const plString = (value = ''): PLString => new PLString(value)

export const plStringConstructor = (value: PLString): PLString => {
  typeCheck(PLString, value)
  return value
}

export const replace = (from: PLString, to: PLString, str: PLString): PLString => {
  return new PLString(str.value.replace(from.value, to.value))
} 

export default {
  replace
}