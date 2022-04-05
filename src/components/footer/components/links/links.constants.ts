import { Link } from './links.types'

// Icons
import BookIcon from '../../../icon/icons/BookIcon'
import DiscordIcon from '../../../icon/icons/DiscordIcon'
import GithubIcon from '../../../icon/icons/GithubIcon'
import QuestionIcon from '../../../icon/icons/QuestionIcon'
import TwitterIcon from '../../../icon/icons/TwitterIcon'

// URLS
import {
  DISCORD_LINK,
  DOCS_LINK,
  FAQ_LINK,
  GITHUB_LINK,
  TWITTER_LINK,
} from 'constants/links'

export const LINKS: Link[] = [
  { url: FAQ_LINK, name: 'FAQ', icon: QuestionIcon },
  { url: DOCS_LINK, name: 'Docs', icon: BookIcon },
  { url: DISCORD_LINK, name: 'discord', icon: DiscordIcon },
  { url: TWITTER_LINK, name: 'twitter', icon: TwitterIcon },
  { url: GITHUB_LINK, name: 'github', icon: GithubIcon },
]
