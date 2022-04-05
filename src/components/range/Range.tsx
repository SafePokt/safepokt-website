import { getTrackBackground, Range as ReactRange } from 'react-range'

// Styles
import { Thumb, Track } from './range.styles'
interface RangeProps {
  onChange: (n: number) => void
  value: number
  disabled?: boolean
  min: number
  max: number
  step: number
}

export const Range = ({
  onChange,
  value,
  disabled,
  min,
  max,
  step,
}: RangeProps) => {
  return (
    <ReactRange
      min={min}
      max={max}
      disabled={disabled}
      onChange={(numbers) => onChange(numbers[0])}
      values={[value]}
      step={step}
      renderTrack={({ props, children }) => (
        <Track
          {...props}
          style={{
            ...props.style,
            background: getTrackBackground({
              values: [value],
              colors: [
                disabled ? 'var(--primary-darker)' : 'var(--primary)',
                'var(--input-background)',
              ],
              min,
              max,
            }),
          }}
        >
          {children}
        </Track>
      )}
      renderThumb={({ props }) => (
        <Thumb
          {...props}
          disabled={disabled}
          style={{
            ...props.style,
          }}
        />
      )}
    />
  )
}
