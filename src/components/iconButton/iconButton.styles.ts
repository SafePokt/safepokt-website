import styled from 'styled-components'

// TODO: Move some vars to app.styles
export const IconButtonContainer = styled.button`
  align-items: center;
  background: var(--neutral-light);
  border-radius: var(--border-radius-pill);
  border: solid 1px var(--neutral-lighter);
  box-shadow: var(--depth-shadow-medium);
  cursor: pointer;
  display: flex;
  height: var(--icon-button-size);
  justify-content: center;
  outline: none;
  padding: var(--size-medium);
  width: var(--icon-button-size);

  .material-icons {
    font-size: var(--icon-button-font-size);
  }

  &:hover {
    background: var(--neutral-lighter);
  }

  &:active {
    background: var(--neutral-light);
  }

  &:focus {
    box-shadow: var(--focus-shadow);
  }
`
