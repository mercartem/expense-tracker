import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import style from './Mainheader.module.scss';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import Navmain from '../../../shared/ui/Navmain/Navmain';
import matchCurrentUrl from '../utils/utils';
import LogoImg from '../../../shared/ui/LogoImg';

function MainHeader() {
  const { t } = useTranslation();
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
            <ButtonRound text={t('button.login')} isActive={matchCurrentUrl('/login')} />
          </NavLink>
          <NavLink to='/sign'>
            <ButtonRound text={t('button.sign')} isActive={matchCurrentUrl('/sign')} />
          </NavLink>
        </div>
      </Navmain>
    </header>
  );
}

export default MainHeader;
