import { PLBase } from '../PLBase'
import { PLVector } from '../vector/PLVector'
import { typeCheck } from '../../utils/assert'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'
import { PLHashMap } from './PLHashMap'
import { plVector } from '../vector/vectorFn'

export const plHashMap: <T extends PLBase>(...list: unknown[]) => PLHashMap<T> = (...list) => new PLHashMap(list)

export const keys: (map: PLHashMap<any>) => PLVector<PLString> = (map) => {
  typeCheck(PLHashMap, map)
  return plVector(...Array.from(map.value.keys()).map((k) => plString(k)))
}

export const values: (map: PLHashMap<any>) => PLVector<any> = (map) => {
  typeCheck(PLHashMap, map)
  return plVector(...Array.from(map.value.values()))
}

export default {
  keys,
  values,
}
