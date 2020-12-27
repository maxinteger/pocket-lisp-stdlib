import { PLDecimal } from './PLDecimal'

export const plDecimal = (strValue: string): PLDecimal => {
  return new PLDecimal(strValue)
}
