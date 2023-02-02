import { FormControl} from '@mui/material'
import { Link } from 'react-router-dom';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/TextInput';
import { mailInputProps, passwordInputProps } from '../model/inputProps';

import style from './RegisterByMail.module.scss'

function RegisterByMail() {

  return (
      <form name='registerform' className={style.form}>
        <FormControl>
          <TextInput
            { ...mailInputProps }
            />
          </FormControl>
          <FormControl>
          <TextInput
             { ...passwordInputProps }
          />
          </FormControl>
          <ButtonRound type='submit' text='Sign in' isActive/>
          <p className={style.formtext}>Have an account? <Link to='/login'>Log in</Link></p>
      </form> 
  )
}

export default RegisterByMail