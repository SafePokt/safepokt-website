export const numberFormatter = ({
  number,
  unit,
  maxFractionDigits = 2,
  useGrouping = true,
  isPrefix,
  compactDisplay = true,
}: {
  number: number | string
  maxFractionDigits?: number
  unit?: string
  useGrouping?: boolean
  isPrefix?: boolean
  compactDisplay?: boolean
}) => {
  let formatted = number.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
    useGrouping,
    ...{
      ...(compactDisplay && { compactDisplay: 'short', notation: 'compact' }),
    },
  })

  if (unit) {
    if (isPrefix) {
      formatted = `${unit} ` + formatted
    } else {
      formatted += ` ${unit}`
    }
  }

  return formatted
}
