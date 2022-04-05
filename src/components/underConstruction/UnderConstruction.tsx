import { useNavigate } from 'react-router-dom'

// Constants
import { UNDER_CONSTRUCTION_TEXT } from './underConstruction.constants'

// Components
import { Icon } from 'components/icon'

// Styles
import {
  ReturnContainer,
  UnderConstructionContainer,
  UnderConstructionIcon,
  UnderConstructionText,
} from './underConstruction.styles'

export const UnderConstruction = () => {
  const navigate = useNavigate()
  return (
    <>
      <ReturnContainer onClick={() => navigate('/')}>
        <Icon icon={'arrow_back'} />
        Return to the application
      </ReturnContainer>
      <UnderConstructionContainer>
        <UnderConstructionIcon icon='construction' />
        <UnderConstructionText>{UNDER_CONSTRUCTION_TEXT}</UnderConstructionText>
      </UnderConstructionContainer>
    </>
  )
}
