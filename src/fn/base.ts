export const constFn = (fn: unknown) => (): unknown => fn

export default { const: constFn }
