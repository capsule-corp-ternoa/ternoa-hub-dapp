import { IButton } from './types'

const primary: IButton = {
  text: 'Hello World!',
  size: 'large',
  type: 'primary',
  disabled: false
}

const secondary: IButton = {
  text: 'Hello World!',
  size: 'large',
  type: 'secondary',
  disabled: false
}

const danger: IButton = {
  text: 'Hello World!',
  size: 'large',
  type: 'danger',
  disabled: false
}

export const mockButtonProps = {
  primary,
  secondary,
  danger
}