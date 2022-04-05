import { StyledIcon } from './icon.styles'

interface IconProps {
  icon: string
  className?: string
}

export const Icon = ({ icon, className = '', ...rest }: IconProps) => (
  <StyledIcon {...rest} className={`material-icons ${className}`}>
    {icon}
  </StyledIcon>
)
