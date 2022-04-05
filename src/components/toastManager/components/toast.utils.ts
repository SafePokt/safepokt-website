export const getScan = (tHash: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `https://ftmscan.com/tx/${tHash}`
  }
  return `https://testnet.ftmscan.com/tx/${tHash}`
}
