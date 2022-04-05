import { BigNumber } from 'ethers'

export const toBigNumber = (amount: number, decimals: number) =>
  BigNumber.from(amount).mul(BigNumber.from(10).pow(BigNumber.from(decimals)))

export const toNormalNumber = (amount: number, decimals: number) =>
  amount / Math.pow(10, decimals)
