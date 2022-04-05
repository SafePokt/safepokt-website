import { useState } from 'react'

// Components
import { HighlightedText } from 'components/highlightedText'

// Constants
import {
  SPLASH_LINKS,
  WHO_ARE_WE_FIST,
  WHO_ARE_WE_SECOND,
} from './whoAreWe.constants'

// Styles
import {
  ArrowIcon,
  CardHeader,
  LinkPill,
  LinkText,
  PillsContainer,
  PillWrapper,
  TextContent,
  Title,
  WhoAreWeCard,
} from './whoAreWe.styles'

export const WhoAreWe = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <WhoAreWeCard
      onClick={() => setIsOpen((current) => !current)}
      isOpen={isOpen}
    >
      <CardHeader>
        <Title>
          <HighlightedText>Discover how it works</HighlightedText>
        </Title>
        <ArrowIcon isOpen={isOpen} />
      </CardHeader>
      <TextContent>
        <p>{WHO_ARE_WE_FIST}</p>
        <p>{WHO_ARE_WE_SECOND}</p>
      </TextContent>
      <PillsContainer>
        {SPLASH_LINKS.map(({ name, icon: Icon, url }) => (
          <PillWrapper
            key={name}
            href={url}
            tabIndex={-1}
            target={'_blank'}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkPill>
              <LinkText>{name}</LinkText>
              <Icon />
            </LinkPill>
          </PillWrapper>
        ))}
      </PillsContainer>
    </WhoAreWeCard>
  )
}
