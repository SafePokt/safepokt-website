import BookIcon from 'components/icon/icons/BookIcon'
import DiscordIcon from 'components/icon/icons/DiscordIcon'
import QuestionIcon from 'components/icon/icons/QuestionIcon'

// Type
import { Link } from 'components/footer/components/links/links.types'

// URLS
import { DISCORD_LINK, DOCS_LINK, FAQ_LINK } from 'constants/links'

export const SPLASH_LINKS: Link[] = [
  { name: 'Docs', icon: BookIcon, url: DOCS_LINK },
  { name: 'FAQ', icon: QuestionIcon, url: FAQ_LINK },
  { name: 'Discord', icon: DiscordIcon, url: DISCORD_LINK },
]

export const WHO_ARE_WE_FIST = `SafePOKT is a protocol that will be running in Fantom Network. 
Allows investors of any kind to invest in Pocket Network Validator Nodes to earn rewards. 
The reward distribution is based on each holder share representation among all POKT Shares (there is no ERC token).
`
export const WHO_ARE_WE_SECOND = `The amount generated from share sales is converted to $POKT, bridged to Pocket Network and staked to validator nodes. Revenue generated from those nodes is bridged back to Fantom at the end of each protocol epoch, adding shareholders rewards to their total accumulated claimable balance.`
