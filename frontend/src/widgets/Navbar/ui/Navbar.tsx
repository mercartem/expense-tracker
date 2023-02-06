import '../style/Navbar.scss';
import LogoImg from '../../../shared/ui/LogoImg';
import MoneyImg from '../../../shared/ui/MoneyImg';
import WalletImg from '../../../shared/ui/WalletImg';
import UserName from '../../../entities/User/ui/UserName';
import Balance from '../../../entities/Balance/ui/Balance';
import NavTabs from '../../../features/Navigation/ui/NavTabs';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>
        <LogoImg />
      </div>
      <div className='navbar__user'>
        <div>
          <MoneyImg />
        </div>
        <UserName />
        <div className='navbar__balance'>
          <span>
            <WalletImg />
          </span>
          <Balance />
        </div>
      </div>
      <NavTabs />
    </div>
  );
}

export default Navbar;
