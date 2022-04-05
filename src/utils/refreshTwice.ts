const SECOND_REFRESH_DELAY = 5000

export const refreshTwice = (fetch: () => void): void => {
  fetch()

  setTimeout(() => {
    fetch()
  }, SECOND_REFRESH_DELAY)
}
