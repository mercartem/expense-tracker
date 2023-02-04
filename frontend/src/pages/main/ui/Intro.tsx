import introImg from './assets/introimg-transformed.png';
import style from './MainPage.module.scss';

function Intro() {
  return (
    <div className={style.intro}>
      <div className={style.introText}>
        <h1 className={style.title}>Your Finances in One Place</h1>
        <h2 className={style.subtitle}>Track yor expenses smart and easy</h2>
      </div>
      <img src={introImg} alt='app screenshots' className={style.screenshot} />
    </div>
  );
}

export default Intro;
