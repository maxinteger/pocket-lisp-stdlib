import { PLBase } from '../PLBase'
import { PLVector } from '../vector/PLVector'
import { assert, typeCheck } from '../../utils/assert'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'
import { PLHashMap } from './PLHashMap'
import { plVector } from '../vector/vectorFn'

export const plHashMap: <T extends PLBase>(...list: unknown[]) => PLHashMap<T> = (...list) => new PLHashMap(list)

export const plHashMapConstructor: <T extends PLBase>(keys: PLVector<PLString>, values: PLVector<T>) => PLHashMap<T> = (
  keys,
  values,
) => {
  typeCheck(PLVector, keys)
  typeCheck(PLVector, values)
  assert(keys.value.length !== values.value.length, 'Number of keys must be equal with the number of values')

  if (keys.value.length > 0) {
    typeCheck(PLString, keys.value[0])
  }

  const list = keys.value.reduce((list, key, idx) => {
    list.push(key, values.value[idx])
    return list
  }, [] as unknown[])

  return plHashMap(...list)
}

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
