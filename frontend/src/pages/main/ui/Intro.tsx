import { useTranslation } from 'react-i18next';
import introImg from './assets/introimg-transformed.png';
import style from './MainPage.module.scss';

function Intro() {
  const { t } = useTranslation();
  return (
    <div className={style.intro}>
      <div className={style.introText}>
        <h1 className={style.title}>{t('intro.title')}</h1>
        <h2 className={style.subtitle}>{t('intro.subtitle')}</h2>
      </div>
      <img src={introImg} alt='app screenshots' className={style.screenshot} />
    </div>
  );
}

export default Intro;
