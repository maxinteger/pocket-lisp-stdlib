import { PLBase } from '../PLBase'
import { Just } from './Just'
import { Nothing } from './Nothing'

export type Maybe<T extends PLBase> = Just<T> | typeof Nothing
