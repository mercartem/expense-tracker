import style from './Navmain.module.scss';

interface INavmainprops {
  children: React.ReactNode;
}

function Navmain({ children }: INavmainprops) {
  return <nav className={style.navigation}>{children}</nav>;
}

export default Navmain;
