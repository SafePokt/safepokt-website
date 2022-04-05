import { useCallback } from 'react'
import { ContractInterface } from 'ethers'

// Types
import { MetamaskState } from 'hooks/useMetamask'

// Hooks
import { useContract } from 'hooks/useContract/useContract'

// Utils
import { toBigNumber, toNormalNumber } from 'utils/bigNumber'

/**
 * Hook used to interact with ERC20 tokens.
 * @param state Metamask state.
 * @param abi Contract abi.
 * @param address Contract address.
 * @param decimals Token decimals.
 */
export const useERC20 = (
  state: MetamaskState,
  abi: ContractInterface,
  address: string,
  decimals: number
) => {
  const { callGetter, callSetter, setEvent, cleanEvents } = useContract(
    state,
    abi,
    address
  )

  const approve = useCallback(
    (addressToApprove: string, amount: number) => {
      return callSetter('approve', [
        addressToApprove,
        toBigNumber(amount, decimals),
      ])
    },
    [callSetter]
  )

  const allowance = useCallback(
    (owner: string, spender: string) => {
      return callGetter('allowance', [owner, spender]).then((allowance) =>
        toNormalNumber(allowance as number, decimals)
      )
    },
    [callGetter]
  )

  const balanceOf = useCallback(
    (address: string) => {
      return callGetter('balanceOf', [address]).then((balance) =>
        toNormalNumber(balance as number, decimals)
      )
    },
    [callGetter]
  )

  return { balanceOf, approve, allowance, setEvent, cleanEvents }
}
