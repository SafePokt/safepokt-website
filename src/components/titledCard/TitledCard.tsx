// Components
import { Card } from 'components/card'
import { Info } from 'components/info'

// Styles
import { CardContent, CardTitle } from './titledCard.styles'

interface TitledCardProps {
  title: string
  children: React.ReactNode
  info?: string
}

export const TitledCard = ({
  title,
  children,
  info,
  ...rest
}: TitledCardProps) => {
  return (
    <Card {...rest}>
      <CardTitle>
        {title} {info && <Info text={info} />}
      </CardTitle>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
