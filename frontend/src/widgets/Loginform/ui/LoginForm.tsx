import { FormControl} from '@mui/material'
import { Link } from 'react-router-dom';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import Textinput from '../../../shared/ui/Textinput/Textinput';
import { mailInputProps, passwordInputProps } from '../utils/utils';

import style from './LoginForm.module.scss'

function LoginForm() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Enter your data to log in</h2>
      <form name='loginform' className={style.loginform}>
        <FormControl>
          <Textinput
            {...mailInputProps}
            />
          </FormControl>
          <FormControl>
          <Textinput
           {...passwordInputProps}
          />
          </FormControl>
          <p className={style.formtext}>Forgot your password?</p>
          <ButtonRound type='submit' text='Login' isActive/>
          <p className={style.formtext}>Do not have an account? <Link to='/sign'>Register</Link></p>
      </form> 
    </div>
  )
}

export default LoginForm