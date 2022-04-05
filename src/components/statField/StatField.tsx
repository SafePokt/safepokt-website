// Components
import { HighlightedStat } from 'components/stat'
import { Label } from 'components/label'
import { Stat } from 'components/stat'
import { Info } from 'components/info'
import { Skeleton } from 'components/skeleton'
import { CoinIcon } from 'components/coinIcon'

// Styles
import {
  Content,
  ExtraValue,
  Field,
  LabelRow,
  StatRow,
  StatValueRow,
  TokenImage,
  TokenPill,
  Unit,
} from './statField.styles'

// Types
import { CoinImage } from 'components/coinIcon/coinIcon.types'

type StatType = {
  value: string
  extraValue?: string
  token?: {
    image?: CoinImage
    unit?: string
  }
}

interface StatFieldProps {
  label?: string
  stat?: StatType
  subStat?: string
  info?: string
  isHighlighted?: boolean
  isLoading?: boolean
}

export const StatField = ({
  label,
  stat,
  subStat,
  info,
  isHighlighted,
  isLoading,
  ...rest
}: StatFieldProps) => {
  return (
    <Field {...rest}>
      <LabelRow isHighlighted={isHighlighted}>
        {label && <Label>{label}</Label>}
        {info && <Info text={info} />}
      </LabelRow>
      <Content>
        {isLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            {stat && (
              <StatRow>
                {stat.token && !isHighlighted && (
                  <TokenImage>
                    {stat.token.image && (
                      <CoinIcon coinImage={stat.token.image} />
                    )}
                  </TokenImage>
                )}
                {isHighlighted ? (
                  <HighlightedStat>{stat.value}</HighlightedStat>
                ) : (
                  <StatValueRow>
                    <Stat>{stat.value}</Stat>
                    {subStat && <ExtraValue>{subStat}</ExtraValue>}
                  </StatValueRow>
                )}
                {stat.token && isHighlighted && (
                  <TokenPill>
                    {stat.token.image && (
                      <CoinIcon coinImage={stat.token.image} />
                    )}
                    {stat.token.unit && <Unit>{stat.token.unit}</Unit>}
                  </TokenPill>
                )}
              </StatRow>
            )}
          </>
        )}
      </Content>
    </Field>
  )
}
