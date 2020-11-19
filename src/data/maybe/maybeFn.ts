import { PLBase } from '../PLBase'
import { isNothing } from '../../utils/convert'
import { Maybe } from './Maybe'
import { Just } from './Just'
import { Nothing } from './Nothing'

export const maybe: <T extends PLBase>(v: any) => Maybe<T> = (value) => {
  if (isNothing(value)) {
    return Nothing
  } else {
    return new Just(value)
  }
}
