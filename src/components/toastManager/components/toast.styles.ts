import React from 'react'
import styled, { css } from 'styled-components'

// Components
import { Card } from 'components/card'
import { Icon } from 'components/icon'

// Types
import { ToastType } from 'types/toasts'
import { animated } from 'react-spring'

interface TypeProps {
  type: ToastType
}

interface CloseIconProps {
  onClick: (e: React.MouseEvent<Element>) => void
  type: ToastType
}

interface ToastWrapperProps {
  index: number
  $previousHeight: number
  $isCenter?: boolean
}

export const ToastCard = styled(Card)`
  min-width: min(var(--toast-min-width), calc(100% - 2 * var(--size-medium)));
  box-shadow: var(--toast-shadow);
  background: var(--toast-background);
  border: var(--toast-border);
  display: flex;
  padding: 0px;
  border-radius: 0px var(--border-radius-medium) var(--border-radius-medium) 0px;
  justify-content: space-between;
`

export const ToastSpringAnimations = styled(animated.div)`
  display: flex;
`

export const ToastWrapper = styled(animated.div)<ToastWrapperProps>`
  transition: transform var(--transition-longest);
  position: absolute;
  max-width: var(--toast-max-width);
  right: var(--size-large);

  ${({ $isCenter }) =>
    $isCenter &&
    css`
      left: 50%;

      @media (max-width: 768px) {
        left: 0;
      }
    `}

  ${({ index, $previousHeight, $isCenter }) => css`
    transform: translateY(
        calc(
          (var(--size-medium)) * ${index} + var(--size-medium) +
            ${$previousHeight}px
        )
      )
      ${$isCenter ? ' translateX(-50%)' : ''};

    @media (max-width: 768px) {
      transform: translateY(
        calc(
          (var(--size-medium)) * ${index} + var(--size-medium) +
            ${$previousHeight}px
        )
      );
    }
  `}

  @media (max-width: 576px) {
    right: 0px;
  }
`

export const Accent = styled.div<TypeProps>`
  display: flex;
  width: 12px;
  border-radius: var(--border-radius-medium) 0px 0px var(--border-radius-medium);

  ${({ type }) =>
    css`
      background: var(--${type});
    `};
`
export const ToastContentRow = styled.div`
  display: flex;
  align-items: center;
  padding: var(--size-medium);
`

export const ToastContent = styled.div`
  margin-left: var(--size-medium);
`

export const TransactionDetailsContainer = styled.div`
  margin-top: var(--size-small);
`

export const TransactionDetails = styled.a<TypeProps>`
  font-size: var(--font-extra-small);

  ${({ type }) =>
    css`
      color: var(--${type});
    `};
`

export const ToastTitle = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-medium);
  margin-bottom: var(--size-small);

  @media (max-width: 576px) {
    font-size: var(--font-small);
  }
`
export const ToastMessage = styled.div`
  font-size: var(--font-small);

  @media (max-width: 576px) {
    font-size: var(--font-extra-small);
  }
`

export const ToastIcon = styled(Icon)<TypeProps>`
  font-size: var(--icon-size-large);

  ${({ type }) =>
    css`
      color: var(--${type});
    `};
`

export const CloseIcon = styled(Icon).attrs(() => ({
  icon: 'close',
}))<CloseIconProps>`
  cursor: pointer;
  margin: var(--size-medium);
  margin-left: var(--size-extra-small);

  ${({ type }) =>
    css`
      color: var(--${type});

      &:hover {
        color: var(--${type}-light);
      }
    `};
`
