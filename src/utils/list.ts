export const chunk = (ary: any[], chunkSize = 2): any[] => {
  const newAry = []
  const end = ary.length
  for (let i = 0; i < end; i += chunkSize) {
    newAry.push(ary.slice(i, i + chunkSize))
  }
  return newAry
}
