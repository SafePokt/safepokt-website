// Constants
import { LINKS } from './links.constants'

// Styles
import { LinkAnchor, LinksRow } from './links.styles'

export const Links = () => {
  return (
    <LinksRow>
      {LINKS.map(({ icon, name, url }) => {
        const Icon = icon
        return (
          <LinkAnchor key={name} href={url} target={'_blank'} aria-label={name}>
            <Icon />
          </LinkAnchor>
        )
      })}
    </LinksRow>
  )
}
