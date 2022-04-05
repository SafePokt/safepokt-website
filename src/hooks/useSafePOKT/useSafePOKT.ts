import { useCallback, useEffect, useMemo, useState } from 'react'
import { BigNumber } from 'ethers'

// Hooks
import { useContract } from 'hooks/useContract/useContract'
import { useToasts } from 'providers/ToastProvider'

// Types
import { MetamaskState } from 'hooks/useMetamask'

// Contract
import safePOKT from 'contracts/safePOKT.json'

// Constants
import {
  TESTNET_USDC_ADDRESS,
  TESTNET_USDC_DECIMALS,
  USDC_ADDRESS,
  USDC_DECIMALS,
} from 'hooks/useSpendableToken/useSpendableToken.constants'
import {
  CONTRACT_GETS,
  EPOCH_ESTIMATE_MS,
  FIRST_EPOCH_DATE,
  GetParam,
  SUCCESS_EPOCH_TOAST,
  USER_PARAMS_DECIMALS,
  useSafePoktDefaultParams,
} from './useSafePOKT.constants'

// Types
import {
  UseSafePoktReturnType,
  SafePoktParams,
  UseSafePoktParams,
  SafePoktEvents,
  SafePoktUserParams,
  KeyValue,
} from './useSafePOKT.types'

// Utils
import { toBigNumber, toNormalNumber } from 'utils/bigNumber'
import { getRemainingDays } from './useSafePOKT.utils'
import { refreshTwice } from 'utils/refreshTwice'

export const useSafePOKT = (state: MetamaskState): UseSafePoktReturnType => {
  const [isLoading, setIsLoading] = useState(true)
  const [tokenAddress, decimals] = useMemo(() => {
    return state.isTestNetwork
      ? [TESTNET_USDC_ADDRESS, TESTNET_USDC_DECIMALS]
      : [USDC_ADDRESS, USDC_DECIMALS]
  }, [state.isTestNetwork])

  const [params, setParams] = useState<UseSafePoktParams>(
    useSafePoktDefaultParams
  )

  const { newToast } = useToasts()

  const hasAddress = useMemo(() => !!process.env.REACT_APP_PROXY_ADDRESS, [])

  const formatParam = useCallback(
    (
      key: SafePoktParams | SafePoktUserParams,
      value: unknown,
      hasDecimals = false,
      notNumber = false
    ) => {
      const keyValue: KeyValue = { key, value }

      if (hasDecimals) {
        keyValue.value = toNormalNumber(Number(value as string), decimals)
      } else if (!notNumber) {
        keyValue.value = Number(value as string)
      }
      return keyValue
    },
    []
  )

  const setParam = useCallback(<V>(statKey: string, value: V) => {
    setParams((current) => ({ ...current, [statKey]: value }))
  }, [])

  const { callGetter, callSetter, setEvent, cleanEvents } = useContract(
    state,
    safePOKT,
    process.env.REACT_APP_PROXY_ADDRESS
  )

  const getNextEpochTime = useCallback(
    async (currentEpoch: number) => {
      if (currentEpoch === 0) {
        return getRemainingDays(new Date(FIRST_EPOCH_DATE))
      }
      return callGetter('safePoktHistory', [currentEpoch]).then(
        async (snapshot) => {
          const snapshotWithTime = snapshot as { time: BigNumber }

          return state.ethersProvider
            ?.getBlock(snapshotWithTime.time.toNumber())
            .then((block) => Number(block.timestamp) * 1000)
            .then((nextEpochTime) => {
              if (nextEpochTime) {
                return getRemainingDays(
                  new Date(nextEpochTime + EPOCH_ESTIMATE_MS)
                )
              }
            })
        }
      )
    },
    [callGetter, state.ethersProvider]
  )

  const formattedGet = useCallback(
    (param: GetParam) => {
      return callGetter(param.key, []).then((result) => {
        return formatParam(param.key, result, param.decimals, param.notNumber)
      })
    },
    [callGetter]
  )

  const holderInfo = useCallback(
    async (
      currentAccount: string
    ): Promise<Record<SafePoktUserParams, unknown>> => {
      const holderInfoPromise = callGetter('holders', [
        currentAccount,
      ]) as Promise<Record<SafePoktUserParams, unknown>>

      const canClaimPromise = callGetter('canClaimReward', [
        currentAccount,
      ]) as Promise<boolean>

      const unholdValuePromise = callGetter('holderUnHoldValue', [
        currentAccount,
      ]) as Promise<number>

      const holderRewardsPromise = callGetter('holderReward', [
        currentAccount,
      ]) as Promise<[number, number]>

      const [holderInfo, canClaim, holderRewards, unholdValue] =
        await Promise.all([
          holderInfoPromise,
          canClaimPromise,
          holderRewardsPromise,
          unholdValuePromise,
        ])

      return {
        ...holderInfo,
        [SafePoktUserParams.CanClaimRewards]: canClaim,
        [SafePoktUserParams.CanUpdatePercent]: true,
        [SafePoktUserParams.PoktReward]: holderRewards[0],
        [SafePoktUserParams.RewardClaimable]:
          Number(holderRewards[1]) + Number(unholdValue),
      }
    },
    [callGetter]
  )

  const initializeParams = useCallback(
    async (currentAccount: string) => {
      const promises: Promise<KeyValue>[] = []

      CONTRACT_GETS.forEach((param) => {
        promises.push(formattedGet(param))
      })

      const userParamsPromise = currentAccount && holderInfo(currentAccount)

      try {
        const paramsObject: Record<string, unknown> = {}

        const promisedParams = await Promise.all(promises)

        if (userParamsPromise) {
          const userParams = await userParamsPromise

          Object.entries(userParams).forEach(([key, value]) => {
            const pramKey = key as SafePoktUserParams
            const paramConfig = USER_PARAMS_DECIMALS[pramKey]

            if (paramConfig) {
              const formattedParam = formatParam(
                pramKey,
                value,
                paramConfig.decimals,
                paramConfig.notNumber
              )
              paramsObject[formattedParam.key] = formattedParam.value
            }
          })
        }

        promisedParams.forEach((param) => {
          paramsObject[param.key] = param.value
        })

        if (
          paramsObject[SafePoktParams.CurrentEpoch] ||
          paramsObject[SafePoktParams.CurrentEpoch] === 0
        ) {
          const nextEpochTime = await getNextEpochTime(
            paramsObject[SafePoktParams.CurrentEpoch] as number
          )

          if (nextEpochTime) {
            paramsObject[SafePoktParams.NextEpochTime] = nextEpochTime
          }

          paramsObject[SafePoktUserParams.PoktUnHoldClaimable] =
            (paramsObject[SafePoktUserParams.PoktUnHoldEpoch] as number) <=
            (paramsObject[SafePoktParams.CurrentEpoch] as number)

          paramsObject[SafePoktUserParams.NoRewardThisEpoch] =
            (paramsObject[SafePoktUserParams.LatestSnapshotIndex] as number) >
            (paramsObject[SafePoktParams.CurrentEpoch] as number)
        }

        if (!paramsObject[SafePoktUserParams.Exists]) {
          paramsObject[SafePoktUserParams.WillingToClaim] = 100
        }
        setParams((currentParams) => ({ ...currentParams, ...paramsObject }))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    },
    [holderInfo, getNextEpochTime, formattedGet, formatParam, setParams]
  )

  const initializeEvents = useCallback(
    (currentAccount: string) => {
      try {
        // Events
        setEvent(
          SafePoktEvents.WillingToClaim,
          (holder: string, percentage: string) => {
            setParam(SafePoktUserParams.WillingToClaim, Number(percentage))
          },
          [currentAccount]
        )

        setEvent(SafePoktEvents.HolderActionsToggled, (enabled: boolean) => {
          setParam(SafePoktParams.HolderActionsEnabled, enabled)
        })

        setEvent(
          SafePoktEvents.NodeAdded,
          (oldCount: number, newCount: string) => {
            setParam(SafePoktParams.NodeCount, Number(newCount))
          }
        )

        setEvent(SafePoktEvents.BuyPriceUpdate, (newPrice: string) => {
          setParam(
            SafePoktParams.BuyPrice,
            toNormalNumber(Number(newPrice), decimals)
          )
        })

        setEvent(
          SafePoktEvents.Deposited,
          (
            address: string,
            amountPOKT: number,
            amountUSD: number,
            holderAmount: number
          ) => {
            const [newShares, newUsd, holderCount] = [
              Number(amountPOKT),
              toNormalNumber(amountUSD, decimals),
              Number(holderAmount),
            ]

            setParams((current) => ({
              ...current,
              [SafePoktParams.NewInvestments]:
                current[SafePoktParams.NewInvestments] + newUsd,
              [SafePoktParams.TotalInvestmentsInUSDC]:
                current[SafePoktParams.TotalInvestmentsInUSDC] + newUsd,
              [SafePoktParams.TotalShares]:
                current[SafePoktParams.TotalShares] + newShares,
              [SafePoktParams.HolderCount]: holderCount,
            }))

            if (currentAccount && address === currentAccount) {
              setParams((current) => ({
                ...current,
                [SafePoktUserParams.PoktShareCount]:
                  current[SafePoktUserParams.PoktShareCount] + newShares,
                [SafePoktUserParams.Exists]: true,
              }))
            }
          }
        )

        setEvent(
          SafePoktEvents.RewardPaid,
          (address: string, rewardBig: number) => {
            const reward = toNormalNumber(rewardBig, decimals)

            setParams((current) => ({
              ...current,
              [SafePoktParams.TotalClaimableRewards]:
                current[SafePoktParams.TotalClaimableRewards] - reward,
            }))

            if (currentAccount && address === currentAccount) {
              setParams((current) => ({
                ...current,
                [SafePoktUserParams.RewardClaimable]: 0,
                [SafePoktUserParams.TotalClaimedUSDC]:
                  current[SafePoktUserParams.TotalClaimedUSDC] + reward,
              }))
            }
          }
        )

        setEvent(SafePoktEvents.RewardAdded, () => {
          newToast(SUCCESS_EPOCH_TOAST, undefined, true)
          initializeParams(currentAccount)
        })

        setEvent(
          SafePoktEvents.UnHold,
          (address: string, poktUnhold: string, poktUnHoldEpoch: string) => {
            const [deltaUnhold, newEpoch] = [
              toNormalNumber(Number(poktUnhold), decimals),
              Number(poktUnHoldEpoch),
            ]

            setParams((current) => ({
              ...current,
              [SafePoktUserParams.PoktReward]:
                current[SafePoktUserParams.PoktReward] - deltaUnhold,
              [SafePoktUserParams.PoktUnHold]:
                current[SafePoktUserParams.PoktUnHold] + deltaUnhold,
              [SafePoktUserParams.PoktUnHoldEpoch]: newEpoch,
              [SafePoktUserParams.PoktUnHoldClaimable]:
                newEpoch <= current[SafePoktParams.CurrentEpoch],
            }))
          },
          [currentAccount]
        )
      } catch (error) {
        console.log(error)
      }
    },
    [setEvent, setParam, setParams, initializeParams]
  )

  const refreshParams = useCallback(() => {
    refreshTwice(() => initializeParams(state.currentAccount))
  }, [state.currentAccount, initializeParams])

  const buyPokt = useCallback(
    (amount: number) => {
      return callSetter('buyPoktShares', [tokenAddress, amount]).then(
        (result) => {
          refreshParams()
          return result
        }
      )
    },
    [callSetter, tokenAddress, refreshParams]
  )

  const unHoldPoktOrder = useCallback(
    (amount: number) => {
      return callSetter('unHoldPoktOrder', [
        toBigNumber(amount * 1000000, 0),
      ]).then((result) => {
        refreshParams()
        return result
      })
    },
    [callSetter, refreshParams]
  )

  const claimReward = useCallback(() => {
    return callSetter('claimReward', []).then((result) => {
      refreshParams()
      return result
    })
  }, [callSetter, refreshParams])

  const changeClaimPercent = useCallback(
    (amount: number) => {
      return callSetter('changeClaimPercent', [amount]).then((result) => {
        refreshParams()
        return result
      })
    },
    [callSetter, refreshParams]
  )

  useEffect(() => {
    if (hasAddress) {
      initializeParams(state.currentAccount)
    }
  }, [initializeParams, state.currentAccount, hasAddress])

  // useEffect(() => {
  //   if (state.currentAccount && hasAddress) {
  //     initializeEvents(state.currentAccount)
  //   }
  //   return () => {
  //     if (state.currentAccount && hasAddress) {
  //       cleanEvents()
  //     }
  //   }
  // }, [initializeEvents, cleanEvents, state.currentAccount, hasAddress])

  return {
    buyPokt,
    claimReward,
    changeClaimPercent,
    unHoldPoktOrder,
    address: process.env.REACT_APP_PROXY_ADDRESS,
    isLoading,
    ...params,
  }
}
