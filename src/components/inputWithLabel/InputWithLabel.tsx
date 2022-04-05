// Components
import { Label } from 'components/label'
import { Input, InputProps } from 'components/input'

// Styles
import { InputContainer } from './inputWithLabel.styles'

interface InputWithLabelProps extends InputProps {
  label: string
}

export const InputWithLabel = ({
  label,
  disabled,
  ...rest
}: InputWithLabelProps) => {
  return (
    <InputContainer>
      <Label disabled={disabled}>{label}</Label>
      <Input disabled={disabled} {...rest} />
    </InputContainer>
  )
}
