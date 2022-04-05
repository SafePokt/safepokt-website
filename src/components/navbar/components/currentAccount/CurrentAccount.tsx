import { useMemo } from 'react'

// Components
import { AccountPill } from 'components/accountPill/AccountPill'
import { Skeleton } from 'components/skeleton/Skeleton'

// Constants
import { SPOOKY_USDC_LINK } from 'components/navbar/navbar.constants'

// Styles
import { AccountCountainer, Balance } from './currentAccount.styles'

// Utils
import { numberFormatter } from 'utils'

interface CurrentAccountProps {
  account: string
  isLoading: boolean
  currency?: string
  balance?: number
}

export const CurrentAccount = ({
  account,
  currency,
  balance = 0,
  isLoading,
}: CurrentAccountProps) => {
  const formattedBalance = useMemo(
    () =>
      numberFormatter({ number: balance, unit: currency, useGrouping: true }),
    [balance]
  )

  return (
    <AccountCountainer
      onClick={() => window.open(SPOOKY_USDC_LINK, '_blank')?.focus()}
    >
      {currency && (
        <Balance>{isLoading ? <Skeleton /> : formattedBalance}</Balance>
      )}
      <AccountPill account={account} hiddeable />
    </AccountCountainer>
  )
}
