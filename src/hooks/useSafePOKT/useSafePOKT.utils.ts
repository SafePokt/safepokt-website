import { DAY_MS } from './useSafePOKT.constants'

export const getRemainingDays = (targetDate: Date) => {
  const remainingDays = Math.ceil((targetDate.getTime() - Date.now()) / DAY_MS)

  if (remainingDays > 0) {
    return `${remainingDays} Days`
  } else {
    return 'Today'
  }
}
