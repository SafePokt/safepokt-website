import { Icon } from 'components/icon'
import React from 'react'

// Styles
import { IconButtonContainer } from './iconButton.styles'

interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon: string
}

export const IconButton = ({ onClick, icon }: IconButtonProps) => {
  return (
    <IconButtonContainer onClick={onClick}>
      <Icon icon={icon} />
    </IconButtonContainer>
  )
}
