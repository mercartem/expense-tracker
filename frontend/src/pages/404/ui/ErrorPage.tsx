import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../../shared/ui/Footer/Footer';
import MainHeader from '../../../widgets/MainHeader/ui/MainHeader';
import style from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <div className={style.wrapper}>
      <MainHeader />
      <Box className={style.textWrapper}>
        <p className={style.title}>404</p>
        <hr />
        <p className={style.subtitle}>THE PAGE</p>
        <p className={style.text}>WAS NOT FOUND</p>
        <p className={style.link}>
          Return to{' '}
          <Link to='/' replace>
            homepage?
          </Link>
        </p>
      </Box>
      <Footer />
    </div>
  );
}

export default ErrorPage;
