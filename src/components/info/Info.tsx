import { useState } from 'react'
import { useTransition } from 'react-spring'

// Constants
import { INFO_TOP_MARGIN, INFO_WIDTH } from './info.constants'

// Styles
import {
  FullScreenContainer,
  IconContainer,
  IconInfo,
  TextContainer,
} from './info.styles'

interface InfoProps {
  text: string
}

export const Info = ({ text }: InfoProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [width, setWidth] = useState(INFO_WIDTH)

  const [hoverPosition, setHoverPosition] = useState<[number, number]>([0, 0])

  const transitions = useTransition(isHovering, {
    config: { duration: 150 },
    from: { opacity: 0, transform: 'scaleY(0.95)' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0.95)' },
  })

  return (
    <IconContainer
      onMouseEnter={(e) => {
        const innerWidth = window.innerWidth
        let targetWidth = INFO_WIDTH

        const { left, top } = e.currentTarget.getBoundingClientRect()

        const hoverPosition: [number, number] = [
          left - INFO_WIDTH / 2,
          top + INFO_TOP_MARGIN,
        ]

        if (INFO_WIDTH > innerWidth) {
          targetWidth = innerWidth
          hoverPosition[0] = 0
        } else {
          if (hoverPosition[0] < 0) {
            hoverPosition[0] = 0
          }

          if (hoverPosition[0] + INFO_WIDTH > innerWidth) {
            hoverPosition[0] = window.innerWidth - INFO_WIDTH
          }
        }

        setWidth(targetWidth)
        setIsHovering(true)
        setHoverPosition(hoverPosition)
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      <IconInfo />

      {transitions(
        (styles, isHovering) =>
          isHovering && (
            <FullScreenContainer style={styles}>
              <TextContainer hoverPosition={hoverPosition} width={width}>
                {text}
              </TextContainer>
            </FullScreenContainer>
          )
      )}
    </IconContainer>
  )
}
