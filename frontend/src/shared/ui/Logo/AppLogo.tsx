import LogoSVG from './assets/logo.svg';
import style from './AppLogo.module.scss';

function AppLogo() {
  return <img src={LogoSVG} alt='app logo' className={style.default} />;
}

export default AppLogo;
