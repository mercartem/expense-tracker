import { slide as Menu } from 'react-burger-menu';
import LogoImg from '../../../shared/ui/LogoImg';
import Navbar from '../../Navbar/ui/Navbar';
import '../style/Header.scss';

function Header() {
  return (
    <header className='header'>
      <Menu width='200px'>
        <Navbar />
      </Menu>
      <div className='header_logo'>
        <LogoImg />
      </div>
    </header>
  );
}

export default Header;
