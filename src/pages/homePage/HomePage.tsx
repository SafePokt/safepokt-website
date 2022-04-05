// Components
import { Splash, BuyCrypto, OwnedCrypto, WhoAreWe } from './components'
import { StatField } from 'components/statField'
import { Icon } from 'components/icon'

// Styles
import {
  CardDuo,
  CardGrid,
  IconContainer,
  IconStatCard,
} from './homePage.styles'

// Constants
import { CARDS } from './homePage.constants'

// Providers
import { useSafePOKTContext } from 'providers/SafePOKTProvider'

// Hooks
import { useReady } from 'hooks/useReady'
import { SafePoktParams, SafePoktUserParams } from 'hooks/useSafePOKT'

// Utils
import { numberFormatter } from 'utils'

export const HomePage = () => {
  const state = useSafePOKTContext()
  const isReady = useReady()

  return (
    <>
      <Splash />
      <WhoAreWe />

      <CardGrid breakpoints={{ xs: 1, s: 2, m: 2, l: 2, xl: 5 }}>
        {CARDS.map(
          ({ label, key, subStat, icon, info, statConfig, subStatConfig }) => (
            <IconStatCard key={label}>
              <StatField
                label={label}
                stat={{
                  value: statConfig?.notANumber
                    ? state[key].toString()
                    : numberFormatter({
                        number: Number(state[key]),
                        unit: statConfig?.unit,
                        isPrefix: statConfig?.prefix,
                        maxFractionDigits: 1,
                      }),
                  token: statConfig?.token,
                }}
                subStat={
                  subStat &&
                  numberFormatter({
                    number: subStat(Number(state[key])),
                    unit: subStatConfig?.unit,
                    isPrefix: subStatConfig?.prefix,
                    maxFractionDigits: 2,
                  })
                }
                isLoading={state.isLoading}
                info={info}
              />
              {icon && (
                <IconContainer>
                  <Icon icon={icon} />
                </IconContainer>
              )}
            </IconStatCard>
          )
        )}
      </CardGrid>
      <CardDuo>
        <OwnedCrypto
          isDisabled={
            !(
              state[SafePoktUserParams.Exists] &&
              state[SafePoktParams.HolderActionsEnabled]
            )
          }
          isLoading={state.isLoading}
        />
        <BuyCrypto
          isDisabled={!isReady || !state[SafePoktParams.HolderActionsEnabled]}
        />
      </CardDuo>
    </>
  )
}
