import AuthByMail from '../../../features/Auth';
import style from './LoginForm.module.scss';

function LoginForm() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Enter your data to log in</h2>
      <AuthByMail />
    </div>
  );
}

export default LoginForm;
