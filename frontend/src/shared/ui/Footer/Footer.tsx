import style from './Footer.module.scss';
import githubLogo from './assets/github.svg';
import rsschool from './assets/rsschool.svg';

function Footer() {
  return (
    <footer className={style.footer}>
      <div>
        <a href="https://github.com/mercartem" className={style.github}>
          <img src={githubLogo} alt='github logo' className={style.githubLogo}/>mercartem</a>
        <a href="https://github.com/criphood" className={style.github}>
          <img src={githubLogo} alt='github logo' className={style.githubLogo}/>criphood</a>
        <a href="https://github.com/marerma" className={style.github}>
          <img src={githubLogo} alt='github logo' className={style.githubLogo}/>marerma</a>
      </div>
      <p>Copyright 2023</p>
      <div>
        <a href="https://rs.school/js/">
         <img src={rsschool} alt='rs-school logo' className={style.rsschool}/>
        </a>
  </div>
    </footer>
  )
}



export default Footer
