import { Outlet } from 'react-router-dom';
import Footer from '../../../shared/ui/Footer/Footer';
import MainHeader from '../../../widgets/MainHeader/ui/MainHeader';
import style from './MainPage.module.scss'

function MainPage() {
  return (
    <div className={style.mainContainer}>
      <MainHeader/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default MainPage;
