import { IButton } from './types'

const primary: IButton = {
  text: 'Hello World!',
  icon:'ArrowSquareOut',
  iconSize:24,
  iconColor:'white',
  reversed:true,
  size: 'large',
  type: 'primary',
  disabled: false
}

const secondary: IButton = {
  text: 'Hello World!',
  icon:'ArrowSquareOut',
  iconSize:24,
  iconColor:'black',
  reversed:true,
  size: 'large',
  type: 'secondary',
  disabled: false
}

const danger: IButton = {
  text: 'Hello World!',
  icon:'ArrowSquareOut',
  iconColor:'red',
  iconSize:24,
  reversed:true,
  size: 'large',
  type: 'danger',
  disabled: false
}

const tertiary: IButton = {
  text: 'Hello World!',
  icon:'ArrowSquareOut',
  iconSize:24,
  iconColor:'black',
  reversed:false,
  size: 'large',
  type: 'tertiary',
  disabled: false
}

export const mockButtonProps = {
  primary,
  secondary,
  danger,
  tertiary
}