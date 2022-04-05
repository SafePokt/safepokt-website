import { useCallback } from 'react'

// Components
import { TradeInput } from './components/TradeInput'

// Styles
import {
  TradePairContainer,
  TradePairSeparator,
  TradePairSeparatorIcon,
} from './tradePair.styles'

// Types
import { CoinImage } from 'components/coinIcon/coinIcon.types'

interface Coin {
  name: string
  image: CoinImage
  value: string
  min?: string
}

interface TradePairProps {
  coins: [Coin, Coin]
  rate: number
  onChange: (name: string, value: string) => void
  disabled?: boolean
}

export const TradePair = ({
  coins,
  disabled,
  rate,
  onChange,
}: TradePairProps) => {
  const internalOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.target.name === coins[0].name) {
          onChange(coins[0].name, e.target.value)
          onChange(coins[1].name, (Number(e.target.value) / rate).toString())
        } else {
          onChange(coins[0].name, (Number(e.target.value) * rate).toString())
          onChange(coins[1].name, e.target.value)
        }
      },
      [onChange, coins]
    )

  return (
    <TradePairContainer>
      <TradeInput
        disabled={disabled}
        onChange={internalOnChange}
        value={coins[0].value}
        coinImage={coins[0].image}
        coinName={coins[0].name}
        min={coins[0].min}
      />
      <TradePairSeparator>
        <TradePairSeparatorIcon />
      </TradePairSeparator>
      <TradeInput
        disabled={disabled}
        onChange={internalOnChange}
        value={coins[1].value}
        coinImage={coins[1].image}
        coinName={coins[1].name}
        min={coins[1].min}
      />
    </TradePairContainer>
  )
}
