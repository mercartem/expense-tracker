import { useTranslation } from 'react-i18next';
import AuthByMail from '../../../features/Auth';
import style from './LoginForm.module.scss';

function LoginForm() {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h2 className={style.title}>{t('login.title')}</h2>
      <AuthByMail />
    </div>
  );
}

export default LoginForm;
