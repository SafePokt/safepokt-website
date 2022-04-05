import styled, { css } from 'styled-components'

// Components
import { StatField } from 'components/statField'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Label } from 'components/label'
import { Input } from 'components/input'
import { AccountPill } from 'components/accountPill'
import { Pill } from 'components/pill'

export const SectionTitle = styled.div`
  margin-bottom: var(--size-large);
  font-size: var(--font-heading-extra-small);
  font-weight: var(--font-weight-semi-bold);
  display: flex;
  align-items: center;
  text-transform: uppercase;
`

export const UserAccount = styled(AccountPill)`
  padding: var(--size-extra-small) var(--size-small);
`

interface UserTitleProps {
  hasAccount: boolean
}

export const UserTitle = styled(SectionTitle)<UserTitleProps>`
  ${({ hasAccount }) =>
    hasAccount &&
    css`
      margin-bottom: 18px;
    `}
`

export const WillingToClaimContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const WillingToClaimValue = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: var(--size-medium);
  font-weight: var(--font-weight-bold);
`

export const UnholdingCard = styled.div`
  background: var(--neutral-light);
  border-radius: var(--border-radius-medium);
  border: solid 1px var(--neutral-lighter);
  box-shadow: var(--depth-shadow-medium);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--size-small);
`
export const UnholdingLabel = styled(Label)`
  font-size: var(--font-small);
`

export const UnholdForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const UnholdInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const UnholdInput = styled(Input)`
  margin-right: var(--size-small);
`

export const UnholdButton = styled(Button)`
  margin-top: var(--size-small);
`

export const OwnedContet = styled.div`
  display: flex;
`

export const Percentage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const UserStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Rewards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const OwnedCard = styled(Card)`
  flex-direction: column;
  display: flex;
`

export const Separator = styled.div`
  min-width: 2px;
  width: 2px;
  background-color: var(--neutral);
  margin: 0px var(--size-medium);
`

const horizontalSeparatorStyles = css`
  width: 100%;
  height: 2px;
  background-color: var(--neutral);
  margin: var(--size-medium) 0px;
`

export const RewardsSeparator = styled(Separator)`
  @media (max-width: 992px) {
    ${horizontalSeparatorStyles}
  }
`

export const RangeContainer = styled.div`
  margin: 0px 5%;
`

export const StatsSeparator = styled(Separator)`
  @media (max-width: 992px) {
    ${horizontalSeparatorStyles}
  }
`

export const UnholdSeparator = styled(Separator)`
  background: none;
  @media (max-width: 992px) {
    ${horizontalSeparatorStyles}
  }
`

export const RewardsSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const DualSection = styled.div`
  display: flex;
  height: 100%;

  ${Rewards} {
    width: 55%;
  }

  ${UnholdForm} {
    width: 45%;
  }

  @media (max-width: 576px) {
    flex-direction: column-reverse;

    ${Rewards} {
      width: 100%;
      margin-left: 0px;
    }

    ${UnholdForm} {
      width: 100%;
      margin-top: var(--size-medium);
      margin-right: 0px;
    }
  }
`

export const RateWarning = styled.div`
  font-size: var(--font-extra-small);
  font-weight: var(--font-weight-medium);

  p {
    margin-top: var(--size-small);
  }
`

export const OwnedContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  ${UserStats} {
    width: 25%;
  }

  ${Percentage} {
    width: 20%;
  }

  ${RewardsSection} {
    width: 55%;
  }

  @media (max-width: 992px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;

    ${UserStats} {
      width: 100%;
    }

    ${Percentage} {
      width: 100%;
    }

    ${RewardsSection} {
      width: 100%;
    }
  }
`

export const OwnedStats = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
interface StatFieldProps {
  disabled?: boolean
}

export const InputSectionLabel = styled(Label)`
  margin-top: var(--size-medium);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
`

const cardStyles = css`
  background: var(--neutral-light);
  border-radius: var(--border-radius-medium);
  border: solid 1px var(--neutral-lighter);
  box-shadow: var(--depth-shadow-medium);
  display: flex;
  flex-direction: column;
  padding: var(--size-small);
`

export const StatFieldCard = styled(StatField)<StatFieldProps>`
  ${cardStyles}

  ${({ disabled }) =>
    disabled &&
    css`
      * {
        -webkit-text-fill-color: unset;
        color: var(--disabled);
      }
    `}
`

export const CustomStatPill = styled(Pill)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: var(--size-medium);
  margin-left: 0px;
  padding: var(--size-extra-small) var(--size-small);
`

export const CustomStatCardTitle = styled.div`
  font-size: var(--font-small);
`

export const PillContainer = styled.div`
  width: 50%;

  &:last-child {
    margin-left: var(--size-medium);
  }
`

export const CustomStatCardContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  overflow: hidden;
`

export const CustomStatCardAmount = styled.div`
  font-weight: var(--font-weight-bold);
  margin-left: var(--size-small);
`

export const CustomStatCard = styled.div<StatFieldProps>`
  ${cardStyles}

  ${({ disabled }) =>
    disabled &&
    css`
      * {
        -webkit-text-fill-color: unset;
        color: var(--disabled);
      }
    `}
`

export const ClaimableFieldCard = styled(StatFieldCard)`
  margin-top: var(--size-medium);
`

export const OwnedWithdraw = styled.div`
  display: flex;
  justify-content: space-between;

  ${StatFieldCard} {
    margin-right: var(--size-medium);
  }
`

export const BottomRightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;

  & > * {
    &:first-child {
      margin-right: var(--size-small);
    }
    &:last-child {
      margin-left: var(--size-small);
    }
  }
`

export const SectionButton = styled(Button)`
  width: 100%;
  margin-top: var(--size-medium);
`

export const ButtonContainer = styled.div`
  margin-top: var(--size-medium);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
