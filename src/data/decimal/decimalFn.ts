import { PLDecimal } from './PLDecimal'

export const plDecimal = (strValue: string): PLDecimal => {
  return new PLDecimal(strValue)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isNumeric = (strValue: any): boolean => {
  return strValue !== '' && !isNaN(strValue)
}
