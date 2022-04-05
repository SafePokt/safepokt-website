import React from 'react'

export interface Link {
  url: string
  name: string
  icon: () => React.ReactElement
}
