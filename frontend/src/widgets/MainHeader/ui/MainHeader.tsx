import { Link, NavLink } from 'react-router-dom';
import style from './Mainheader.module.scss';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import Navmain from '../../../shared/ui/Navmain/Navmain';
import matchCurrentUrl from '../utils/utils';
import LogoImg from '../../../shared/ui/LogoImg';

function MainHeader() {
  return (
    <header>
      <Navmain>
        <Link to='/'>
          <div className={style.logo}>
            <LogoImg />
          </div>
        </Link>
        <div className={style.buttonContainer}>
          <NavLink to='/login'>
            <ButtonRound text='Log In' isActive={matchCurrentUrl('/login')} />
          </NavLink>
          <NavLink to='/sign'>
            <ButtonRound text='Sign In' isActive={matchCurrentUrl('/sign')} />
          </NavLink>
        </div>
      </Navmain>
    </header>
  );
}

export default MainHeader;
