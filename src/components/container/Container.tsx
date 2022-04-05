import { ActualContainer } from './container.styles'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}
export const Container = ({ children, className }: ContainerProps) => {
  return <ActualContainer className={className}>{children}</ActualContainer>
}
