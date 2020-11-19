export const isValid = (n: number, d: number): boolean => {
  return Number.isInteger(n) && Number.isInteger(d) && d !== 0
}
