import * as op from '../types'

export const unboxing = (x: op.SerializeToJS<unknown>): unknown => x[op.toJS]()
