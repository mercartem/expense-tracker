import { NavbarProps } from '../../../shared/lib/types';

function Balance({ balance }: NavbarProps) {
  return <span>{balance} ₽</span>;
}

export default Balance;
