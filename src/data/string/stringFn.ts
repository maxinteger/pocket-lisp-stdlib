import { PLString } from './PLString'
import { typeCheck } from '../../utils/assert'

export const plString = (value = ''): PLString => new PLString(value)

export const plStringConstructor = (value: PLString): PLString => {
  typeCheck(PLString, value)
  return value
}
