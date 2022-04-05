import { useCallback, useEffect, useMemo, useState } from 'react'

// Components
import { Grid } from 'components/grid'
import { Range } from 'components/range'
import { Info } from 'components/info'
import { TradeInput } from 'components/tradePair'
import { Warning } from 'components/warning'
import { CoinIcon } from 'components/coinIcon'
import { Skeleton } from 'components/skeleton'

// Styles
import {
  OwnedCard,
  OwnedContent,
  SectionButton,
  StatFieldCard,
  Percentage,
  Rewards,
  SectionTitle,
  WillingToClaimContainer,
  WillingToClaimValue,
  UserStats,
  RewardsSeparator,
  StatsSeparator,
  UserTitle,
  UserAccount,
  InputSectionLabel,
  UnholdForm,
  RangeContainer,
  DualSection,
  RewardsSection,
  CustomStatCard,
  CustomStatCardTitle,
  CustomStatPill,
  CustomStatCardContent,
  CustomStatCardAmount,
  ButtonContainer,
  PillContainer,
  Separator,
} from './ownedCrypto.styled'

// Utils
import { numberFormatter } from 'utils'

// Hooks
import { SafePoktParams, SafePoktUserParams } from 'hooks/useSafePOKT'
import { useSafePOKTContext } from 'providers/SafePOKTProvider'
import { useToasts } from 'providers/ToastProvider'
import { useReady } from 'hooks/useReady'
import { useMetamaskContext } from 'providers/MetaMaskProvider'

// Constants
import {
  CLAIMABLE_INFO,
  CLAIM_RATE_TITLE_INFO,
  ERROR_CLAIM_RATE_TOAST,
  ERROR_CLAIM_TOAST,
  ERROR_UNHOLD_TOAST,
  HOLDINGS_RELEASED_INFO,
  POKT_HOLDINGS_INFO,
  SUCCESS_CLAIM_RATE_TOAST,
  SUCCESS_CLAIM_TOAST,
  SUCCESS_UNHOLD_TOAST,
  UNHOLDING_INFO,
} from './ownedCrypto.constants'

// Type
import { TransactionResponse } from '@ethersproject/abstract-provider'

// Utils
import {
  getClaimRateInfo,
  getClaimWarningToast,
  getDisabledInfo,
} from './ownedCrypto.utils'
import { useSpendableTokenContext } from 'providers/SpendableTokenProvider'

interface OwnedCryproProps {
  isDisabled: boolean
  isLoading: boolean
}

export const OwnedCrypto = ({ isDisabled, isLoading }: OwnedCryproProps) => {
  const [willingToClaim, setWillingToClaim] = useState(100)
  const [unholdings, setUnholdings] = useState('0')

  const [isTransacting, setIsTransacting] = useState<
    'none' | 'claiming' | 'updating' | 'unholding'
  >('none')

  const isReady = useReady()
  const { newToast, popToast } = useToasts()
  const safePoktState = useSafePOKTContext()
  const { currentAccount } = useMetamaskContext()
  const { refreshParams } = useSpendableTokenContext()

  useEffect(() => {
    setWillingToClaim(safePoktState[SafePoktUserParams.WillingToClaim])
  }, [safePoktState[SafePoktUserParams.WillingToClaim]])

  const onPercentageSubmit = useCallback(async () => {
    if (isReady) {
      try {
        newToast(
          getClaimWarningToast(willingToClaim, 100 - willingToClaim),
          undefined,
          true
        )
        setIsTransacting('updating')
        const claimTransaction = await safePoktState.changeClaimPercent(
          willingToClaim
        )
        popToast()
        newToast(SUCCESS_CLAIM_RATE_TOAST, claimTransaction.hash)

        setIsTransacting('none')
      } catch (error) {
        console.error(error)
        setIsTransacting('none')
        popToast()
        newToast(ERROR_CLAIM_RATE_TOAST, (error as TransactionResponse).hash)
      }
    }
  }, [safePoktState, isReady, willingToClaim])

  const onClaim = useCallback(async () => {
    try {
      setIsTransacting('claiming')
      const claimTransaction = await safePoktState.claimReward()
      refreshParams()
      newToast(SUCCESS_CLAIM_TOAST, claimTransaction.hash)
      setIsTransacting('none')
    } catch (error) {
      console.error(error)
      newToast(ERROR_CLAIM_TOAST, (error as TransactionResponse).hash)
      setIsTransacting('none')
    }
  }, [isReady, safePoktState, refreshParams])

  const onUnholdSubmit = useCallback(
    async (amount: string) => {
      try {
        setIsTransacting('unholding')
        const unHoldTransaction = await safePoktState.unHoldPoktOrder(
          Math.min(
            Number(safePoktState[SafePoktUserParams.PoktReward]),
            Number(amount)
          )
        )
        newToast(SUCCESS_UNHOLD_TOAST, unHoldTransaction.hash)
        setIsTransacting('none')
        setUnholdings('0')
      } catch (error) {
        console.error(error)
        newToast(ERROR_UNHOLD_TOAST, (error as TransactionResponse).hash)
        setIsTransacting('none')
      }
    },
    [isReady, safePoktState]
  )

  const rateDisabledInfo = useMemo(
    () =>
      !isLoading &&
      getDisabledInfo(
        safePoktState[SafePoktUserParams.Exists],
        !safePoktState[SafePoktParams.HolderActionsEnabled]
      ),
    [
      isLoading,
      safePoktState[SafePoktUserParams.Exists],
      safePoktState[SafePoktParams.HolderActionsEnabled],
    ]
  )

  const unholdDisabledInfo = useMemo(
    () =>
      !isLoading &&
      getDisabledInfo(
        safePoktState[SafePoktUserParams.Exists],
        !safePoktState[SafePoktParams.HolderActionsEnabled]
      ),
    [
      isLoading,
      safePoktState[SafePoktUserParams.Exists],
      safePoktState[SafePoktParams.HolderActionsEnabled],
    ]
  )

  const claimDisabledInfo = useMemo(
    () =>
      !isLoading &&
      getDisabledInfo(
        safePoktState[SafePoktUserParams.Exists],
        !safePoktState[SafePoktParams.HolderActionsEnabled],
        safePoktState[SafePoktUserParams.NoRewardThisEpoch],
        !safePoktState[SafePoktUserParams.CanClaimRewards]
      ),
    [
      isLoading,
      safePoktState[SafePoktUserParams.Exists],
      safePoktState[SafePoktParams.HolderActionsEnabled],
      safePoktState[SafePoktUserParams.NoRewardThisEpoch],
      safePoktState[SafePoktUserParams.CanClaimRewards],
    ]
  )

  return (
    <OwnedCard>
      <OwnedContent>
        <Percentage>
          <div>
            <SectionTitle>
              Claim Rate
              <Info text={CLAIM_RATE_TITLE_INFO} />
            </SectionTitle>
            <WillingToClaimContainer>
              <StatFieldCard
                disabled={isDisabled}
                isLoading={isLoading}
                label='Current Rate'
                info={getClaimRateInfo(
                  safePoktState[SafePoktUserParams.WillingToClaim],
                  100 - safePoktState[SafePoktUserParams.WillingToClaim]
                )}
                stat={{
                  value: numberFormatter({
                    number: safePoktState[SafePoktUserParams.WillingToClaim],
                    unit: '%',
                  }),
                }}
              />

              <InputSectionLabel>Update Rate</InputSectionLabel>
              <WillingToClaimValue>{willingToClaim}%</WillingToClaimValue>

              <RangeContainer>
                <Range
                  min={0}
                  max={100}
                  step={1}
                  disabled={
                    isDisabled ||
                    isTransacting !== 'none' ||
                    !safePoktState[SafePoktUserParams.CanUpdatePercent]
                  }
                  value={willingToClaim}
                  onChange={(e) => setWillingToClaim(e)}
                />
              </RangeContainer>
            </WillingToClaimContainer>
          </div>
          <ButtonContainer>
            {rateDisabledInfo && <Warning>{rateDisabledInfo}</Warning>}
            <SectionButton
              disabled={
                isDisabled ||
                safePoktState[SafePoktUserParams.WillingToClaim] ===
                  willingToClaim ||
                isTransacting !== 'none' ||
                !safePoktState[SafePoktUserParams.CanUpdatePercent]
              }
              onClick={onPercentageSubmit}
            >
              {isTransacting === 'updating'
                ? 'Setting Claim Rate...'
                : 'Set Claim Rate'}
            </SectionButton>
          </ButtonContainer>
        </Percentage>
        <RewardsSeparator />
        <UserStats>
          <div>
            <UserTitle hasAccount={!!currentAccount}>
              Holder{' '}
              {currentAccount && <UserAccount account={currentAccount} />}
            </UserTitle>
            <Grid breakpoints={{ xs: 1, s: 1, l: 1, xll: 1 }}>
              <StatFieldCard
                disabled={isDisabled}
                isLoading={isLoading}
                label='Shares Owned'
                stat={{
                  value: numberFormatter({
                    number: safePoktState[SafePoktUserParams.PoktShareCount],
                    unit: 'Shares',
                  }),
                }}
              />
              <StatFieldCard
                disabled={isDisabled}
                isLoading={isLoading}
                label='Revenue'
                stat={{
                  token: { image: 'USDC', unit: '' },
                  value: numberFormatter({
                    number: safePoktState[SafePoktUserParams.TotalClaimedUSDC],
                  }),
                }}
              />
              <CustomStatCard>
                <CustomStatCardTitle>Rewards</CustomStatCardTitle>
                <CustomStatCardContent>
                  <PillContainer>
                    <CustomStatPill>
                      <CoinIcon coinImage='POKT' />
                      <CustomStatCardAmount>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          numberFormatter({
                            number: parseInt(
                              safePoktState[
                                SafePoktUserParams.PoktReward
                              ].toString()
                            ),
                          })
                        )}
                      </CustomStatCardAmount>
                    </CustomStatPill>
                  </PillContainer>
                  <PillContainer>
                    <CustomStatPill>
                      <CoinIcon coinImage='USDC' />
                      <CustomStatCardAmount>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          numberFormatter({
                            number: parseInt(
                              safePoktState[
                                SafePoktUserParams.RewardClaimable
                              ].toString()
                            ),
                          })
                        )}
                      </CustomStatCardAmount>
                    </CustomStatPill>
                  </PillContainer>
                </CustomStatCardContent>
              </CustomStatCard>
            </Grid>
          </div>
        </UserStats>
        <StatsSeparator />
        <RewardsSection>
          <SectionTitle>Your Rewards</SectionTitle>
          <DualSection>
            <UnholdForm
              onSubmit={(e) => {
                e.preventDefault()
                onUnholdSubmit(unholdings)
              }}
            >
              <div>
                <Grid breakpoints={{ xs: 1, s: 1, l: 1, xll: 1 }}>
                  <StatFieldCard
                    disabled={isDisabled}
                    label='POKT Holdings'
                    info={POKT_HOLDINGS_INFO}
                    isLoading={isLoading}
                    stat={{
                      value: numberFormatter({
                        number: safePoktState[SafePoktUserParams.PoktReward],
                      }),
                      token: { image: 'POKT', unit: '' },
                    }}
                  />
                </Grid>

                <InputSectionLabel>
                  Unhold Amount <Info text={UNHOLDING_INFO} />
                </InputSectionLabel>
                <TradeInput
                  step={0.01}
                  disabled={isDisabled}
                  coinImage='POKT'
                  coinName='POKT'
                  min={0}
                  value={unholdings}
                  onChange={(e) => {
                    setUnholdings(e.target.value)
                  }}
                />
              </div>
              <ButtonContainer>
                {unholdDisabledInfo && <Warning>{unholdDisabledInfo}</Warning>}
                <SectionButton
                  type='submit'
                  disabled={
                    isDisabled ||
                    !unholdings ||
                    unholdings === '0' ||
                    isTransacting !== 'none' ||
                    safePoktState[SafePoktUserParams.PoktReward] === 0
                  }
                >
                  {isTransacting === 'unholding'
                    ? 'Harvesting Order...'
                    : 'Harvest Order'}
                </SectionButton>
              </ButtonContainer>
            </UnholdForm>
            <Separator />
            <Rewards>
              <div>
                <Grid breakpoints={{ xs: 1, s: 1, l: 1, xll: 1 }}>
                  <StatFieldCard
                    disabled={
                      isDisabled ||
                      safePoktState[SafePoktUserParams.PoktUnHold] === 0
                    }
                    label='Holdings Released'
                    info={HOLDINGS_RELEASED_INFO}
                    isLoading={isLoading}
                    stat={{
                      value: numberFormatter({
                        number: safePoktState[SafePoktUserParams.PoktUnHold],
                      }),
                      token: { image: 'POKT', unit: '' },
                    }}
                    subStat={
                      safePoktState[SafePoktUserParams.PoktUnHold] === 0
                        ? ''
                        : safePoktState[SafePoktUserParams.PoktUnHoldClaimable]
                        ? 'Claimable!'
                        : 'Claim: Next epoch'
                    }
                  />
                  <StatFieldCard
                    disabled={isDisabled}
                    isHighlighted={true}
                    isLoading={isLoading}
                    label='Claimable Rewards'
                    info={CLAIMABLE_INFO}
                    stat={{
                      value: numberFormatter({
                        number:
                          safePoktState[SafePoktUserParams.RewardClaimable],
                      }),
                      token: { image: 'USDC', unit: 'USDC' },
                    }}
                  />
                </Grid>
              </div>
              <ButtonContainer>
                {claimDisabledInfo && <Warning>{claimDisabledInfo}</Warning>}
                <SectionButton
                  onClick={onClaim}
                  disabled={
                    isDisabled ||
                    safePoktState[SafePoktUserParams.RewardClaimable] === 0 ||
                    !safePoktState[SafePoktUserParams.CanClaimRewards] ||
                    safePoktState[SafePoktUserParams.NoRewardThisEpoch] ||
                    isTransacting !== 'none'
                  }
                >
                  {isTransacting === 'claiming'
                    ? 'Claiming Rewards...'
                    : 'Claim Rewards'}
                </SectionButton>
              </ButtonContainer>
            </Rewards>
          </DualSection>
        </RewardsSection>
      </OwnedContent>
    </OwnedCard>
  )
}
