import { FormControl} from '@mui/material'
import { Link } from 'react-router-dom';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import Textinput from '../../../shared/ui/Textinput/Textinput';
import { mailInputProps, passwordInputProps } from '../utils/utils';

import style from './RegisterForm.module.scss'

function RegisterForm() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Enter your data to register</h2>
      <form name='registerform' className={style.loginform}>
        <FormControl>
          <Textinput
            { ...mailInputProps }
            />
          </FormControl>
          <FormControl>
          <Textinput
             { ...passwordInputProps }
          />
          </FormControl>
          <ButtonRound type='submit' text='Sign in' isActive/>
          <p className={style.formtext}>Have an account? <Link to='/login'>Log in</Link></p>
      </form> 
    </div>
  )
}

export default RegisterForm