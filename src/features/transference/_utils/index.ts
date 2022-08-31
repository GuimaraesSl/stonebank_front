export const compareTransferDates = (a: Date, b: Date): -1 | 0 | 1 => {
  const timelessA = new Date(a.getTime())
  timelessA.setHours(0, 0, 0, 0)
  const timelessB = new Date(b.getTime())
  timelessB.setHours(0, 0, 0, 0)

  if (timelessA.getTime() < timelessB.getTime()) return -1
  else if (timelessA.getTime() === timelessB.getTime()) return 0
  else return 1
}
