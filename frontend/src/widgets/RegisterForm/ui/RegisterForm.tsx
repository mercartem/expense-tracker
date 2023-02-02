import { Link } from 'react-router-dom';
import RegisterByMail from '../../../features/Registration/index';


import style from './RegisterForm.module.scss'

function RegisterForm() {

  return (
    <div className={style.container}>
      <h2 className={style.title}>Enter your data to register</h2>
      <RegisterByMail/>
    </div>
  )
}

export default RegisterForm