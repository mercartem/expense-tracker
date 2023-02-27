import RegisterByMail from '../../../features/Registration/index';

import style from './RegisterForm.module.scss';

function RegisterForm() {
  return (
    <div className={style.container}>
      <RegisterByMail />
    </div>
  );
}

export default RegisterForm;
