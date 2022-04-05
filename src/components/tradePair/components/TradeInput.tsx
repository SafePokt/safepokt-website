import { InputHTMLAttributes, useCallback, useRef, useState } from 'react'

// Components
import { CoinIcon } from 'components/coinIcon'

// Styles
import {
  TradePairCurrencyPill,
  TradePairInput,
  TradePairInputContainer,
} from './tradeInput.styles'

// Types
import { CoinImage } from 'components/coinIcon/coinIcon.types'

interface TradeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  coinName: string
  coinImage: CoinImage
  disabled?: boolean
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const TradeInput = ({
  coinName,
  coinImage,
  disabled,
  value,
  onChange,
  ...rest
}: TradeInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const focus = useCallback(() => {
    setIsFocused(true)
  }, [])
  const unfocus = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <TradePairInputContainer
      isFocused={isFocused}
      disabled={disabled}
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      <TradePairInput
        {...rest}
        name={coinName}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => {
          focus()
        }}
        onBlur={() => {
          unfocus()
        }}
        ref={inputRef}
        type={'number'}
      />
      <TradePairCurrencyPill>
        <CoinIcon coinImage={coinImage} />
        {coinName}
      </TradePairCurrencyPill>
    </TradePairInputContainer>
  )
}
