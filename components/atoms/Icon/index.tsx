import * as Phosphor from "phosphor-react";

import { IIcon } from './types';

const Icon: React.FC<IIcon> = ({ name, size, color = '#000' }) => {

  switch (name) {
    case 'CaretLeft':
      return <Phosphor.CaretLeft size={size} color={color} weight="regular" />
    case 'CaretRight':
      return <Phosphor.CaretRight size={size} color={color} weight="regular" />
    case 'CaretUp':
      return <Phosphor.CaretUp size={size} color={color} weight="regular" />
    case 'CaretDown':
      return <Phosphor.CaretDown size={size} color={color} weight="regular" />
    case 'Copy':
      return <Phosphor.Copy size={size} color={color} weight="regular" />
    case 'Delete':
      return <Phosphor.X size={size} color={color} weight="regular" />
    case 'Plus':
      return <Phosphor.Plus size={size} color={color} weight="regular" />
    case 'DotsThree':
      return <Phosphor.DotsThree size={size} color={color} weight="regular" />
    case 'Backspace':
      return <Phosphor.Backspace size={size} color={color} weight="regular" />
    case 'ArrowLeft':
      return <Phosphor.ArrowLeft size={size} color={color} weight="regular" />
    case 'Eye':
      return <Phosphor.Eye size={size} color={color} weight="regular" />
    case 'EyeSlash':
      return <Phosphor.EyeSlash size={size} color={color} weight="regular" />
    case 'ArrowCounterClockwise':
      return <Phosphor.ArrowCounterClockwise size={size} color={color} weight="regular" />
    case 'NotePencil':
      return <Phosphor.NotePencil size={size} color={color} weight="regular" />
    case 'Check':
      return <Phosphor.Check size={size} color={color} weight="regular" />
    case 'ArrowsOut':
      return <Phosphor.ArrowsOut size={size} color={color} weight="regular" />
    case 'FadersHorizontal':
      return <Phosphor.FadersHorizontal size={size} color={color} weight="regular" />
    case 'MagnifyingGlass':
      return <Phosphor.MagnifyingGlass size={size} color={color} weight="regular" />
    case 'Share':
      return <Phosphor.Share size={size} color={color} weight="regular" />
    case 'Heart':
      return <Phosphor.Heart size={size} color={color} weight="regular" />
    case 'Info':
      return <Phosphor.Info size={size} color={color} weight="regular" />
    case 'Warning':
      return <Phosphor.Warning size={size} color={color} weight="regular" />
    default:
      return <Phosphor.Question size={size} color={color} weight="regular" />
  }
}

export default Icon;