import { InputHTMLAttributes } from 'react'
import { InputContainer, StyledInput, Unit } from './input.styles'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  unit?: string
}

export const Input = ({ unit, disabled, ...rest }: InputProps) => {
  return (
    <InputContainer>
      <StyledInput disabled={disabled} hasUnit={!!unit} {...rest} />
      {unit && <Unit disabled={disabled}>{unit}</Unit>}
    </InputContainer>
  )
}
