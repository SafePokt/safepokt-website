import { useMemo } from 'react'

// Styles
import { AccountPillContainer } from './accountPill.styles'

interface AccountPillProps {
  account: string
  hiddeable?: boolean
}

export const AccountPill = ({
  account,
  hiddeable,
  ...rest
}: AccountPillProps) => {
  const formattedAccount = useMemo(() => {
    const length = account.length

    return `${account.slice(0, 4)}...${account.slice(length - 4, length)}`
  }, [account])

  return (
    <AccountPillContainer hiddeable={hiddeable} {...rest}>
      {formattedAccount}
    </AccountPillContainer>
  )
}
