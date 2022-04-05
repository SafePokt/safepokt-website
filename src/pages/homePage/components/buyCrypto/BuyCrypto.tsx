import { useCallback, useEffect, useMemo, useState } from 'react'

// Utils
import { numberFormatter } from 'utils'

// Components
import { Skeleton } from 'components/skeleton'
import { TradePair } from 'components/tradePair'
import { Warning } from 'components/warning'

// Constants
import {
  APPROVE_ERROR_TOAST,
  APPROVE_SUCCESS_TOAST,
  ERROR_TOAST,
  SUCCESS_TOAST,
} from './buyCrypto.constants'

// Styles
import {
  ButtonContainer,
  BuyButton,
  BuyCard,
  BuyForm,
  ExchangeRate,
  RateIcon,
} from './buyCrypto.styled'

// Hooks
import { useSafePOKTContext } from 'providers/SafePOKTProvider'
import { useToasts } from 'providers/ToastProvider'
import { useReady } from 'hooks/useReady'
import { useMetamaskContext } from 'providers/MetaMaskProvider'
import { useSpendableTokenContext } from 'providers/SpendableTokenProvider'

// Types
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { SafePoktParams } from 'hooks/useSafePOKT'

// Uti;s
import { getDisabledInfo } from './buyCrypto.utils'

interface BuyCryproProps {
  isDisabled: boolean
}

export const BuyCrypto = ({ isDisabled }: BuyCryproProps) => {
  const [isTransacting, setIsTransacting] = useState(false)
  const [currentAllowance, setAllowance] = useState(0)
  const [buyInputs, setBuyInputs] = useState({ USDC: '0', SHARES: '0' })
  const { currentAccount } = useMetamaskContext()

  const { approve, allowance, balance, refreshParams } =
    useSpendableTokenContext()
  const safePokt = useSafePOKTContext()
  const isReady = useReady()

  const { newToast } = useToasts()

  const getAllowance = useCallback(() => {
    if (isReady && currentAccount && safePokt.address) {
      allowance(currentAccount, safePokt.address).then((newAllowance) => {
        setAllowance(Number(newAllowance))
      })
    }
  }, [isReady, currentAccount, safePokt.address, allowance])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  const hasEnoughAllowance = useMemo(
    () => currentAllowance > Number(buyInputs.USDC),
    [currentAllowance, buyInputs]
  )

  const hasEnoughBalance = useMemo(
    () => balance >= Number(buyInputs.USDC),
    [balance, buyInputs]
  )

  const disabledInfo = useMemo(
    () =>
      !safePokt.isLoading &&
      getDisabledInfo(
        !isReady,
        !safePokt[SafePoktParams.HolderActionsEnabled],
        hasEnoughBalance
      ),
    [
      isReady,
      safePokt[SafePoktParams.HolderActionsEnabled],
      hasEnoughBalance,
      safePokt.isLoading,
    ]
  )

  const setBuyInputValue = useCallback((name: string, newValue: string) => {
    setBuyInputs((current) => ({ ...current, [name]: newValue }))
  }, [])

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (safePokt && hasEnoughBalance) {
        if (hasEnoughAllowance) {
          try {
            setIsTransacting(true)
            const transaction = await safePokt.buyPokt(Number(buyInputs.SHARES))
            refreshParams()
            newToast(SUCCESS_TOAST, transaction.hash)
            setIsTransacting(false)
            setBuyInputValue('SHARES', '0')
            setBuyInputValue('USDC', '0')
          } catch (error) {
            console.error(error)
            newToast(ERROR_TOAST, (error as TransactionResponse).hash)
            setIsTransacting(false)
          }
        }
      }
    },
    [safePokt, buyInputs.SHARES, newToast, refreshParams]
  )

  const onApprove = useCallback(async () => {
    if (safePokt.address) {
      try {
        setIsTransacting(true)
        const approveTransaction = await approve(
          safePokt.address,
          99999999999999
        )
        getAllowance()
        newToast(APPROVE_SUCCESS_TOAST, approveTransaction.hash)
        setIsTransacting(false)
      } catch (error) {
        console.error(error)
        newToast(APPROVE_ERROR_TOAST, (error as TransactionResponse).hash)
        setIsTransacting(false)
      }
    } else {
      newToast(APPROVE_ERROR_TOAST)
    }
  }, [safePokt.address, approve, newToast, getAllowance])

  return (
    <BuyCard title={'Buy Shares'}>
      <BuyForm onSubmit={onSubmit}>
        <TradePair
          disabled={isDisabled}
          onChange={setBuyInputValue}
          rate={1 / (safePokt[SafePoktParams.BuyPrice] * 10)}
          coins={[
            {
              image: 'POKT',
              name: 'SHARES',
              value: buyInputs.SHARES,
              min: '1',
            },
            { image: 'USDC', name: 'USDC', value: buyInputs.USDC },
          ]}
        />

        <ExchangeRate disabled={isDisabled}>
          <RateIcon />
          {'1 Share = '}
          {safePokt.isLoading ? (
            <Skeleton />
          ) : (
            numberFormatter({
              number: safePokt[SafePoktParams.BuyPrice] * 10,
            })
          )}
          {` USDC`}
        </ExchangeRate>

        <ButtonContainer>
          {disabledInfo && <Warning>{disabledInfo}</Warning>}
          {hasEnoughAllowance ? (
            <BuyButton
              type={'submit'}
              disabled={isDisabled || isTransacting || !hasEnoughBalance}
            >
              {isTransacting ? 'Buying Shares...' : 'Buy Shares'}
            </BuyButton>
          ) : (
            <BuyButton disabled={!isReady || isTransacting} onClick={onApprove}>
              {isTransacting ? 'Approving...' : 'Approve'}
            </BuyButton>
          )}
        </ButtonContainer>
      </BuyForm>
    </BuyCard>
  )
}
