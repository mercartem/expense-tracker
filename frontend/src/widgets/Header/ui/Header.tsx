import { slide as Menu } from 'react-burger-menu';
import { NavbarProps } from '../../../shared/lib/types';
import LogoImg from '../../../shared/ui/LogoImg';
import Navbar from '../../Navbar/ui/Navbar';
import '../style/Header.scss';

function Header({ balance }: NavbarProps) {
  return (
    <>
      <Menu width='200px'>
        <Navbar balance={balance} />
      </Menu>
      <header className='header'>
        <div className='header__logo'>
          <LogoImg />
        </div>
      </header>
    </>
  );
}

export default Header;
