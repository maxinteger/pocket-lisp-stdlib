/**
 * Greatest common divisor - Euclid's algorithm
 */
export const gcd = (a: number, b: number): number => {
  return a === b || !a || !b ? a : gcd(b, a % b)
}

export const isBelowEpsilon = (x: number): boolean => {
  return Math.abs(x) <= Number.EPSILON
}

export const floatEq = (a: number, b: number): boolean => {
  return isBelowEpsilon(a - b)
}
