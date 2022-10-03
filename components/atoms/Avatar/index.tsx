import Identicon from '@polkadot/react-identicon';
import { IAvatar } from './types';

const Avatar: React.FC<IAvatar> = ({ pubKey, size, theme = 'substrate' }) => {

  return (
    <Identicon
      value={pubKey}
      size={size}
      theme={theme}
    />
  )
}

export default Avatar;