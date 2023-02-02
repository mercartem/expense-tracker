import { FormControl} from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../entities/User/lib/types/user';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/TextInput';
import { mailInputProps, passwordInputProps, handleSubmit, validateUserInput } from '../model/authByMail';
import { isValidForm, validatePassword, validateMail } from '../utils/utils';
import style from './AuthByMail.module.scss'

function AuthByMail() {
  const [userData, setUserData] = useState<User>({email: '', password: ''})
  const [formValid, setFormValid] = useState({ isValidMail: false, isValidPass:false});

  function handleOnchange (e: React.ChangeEvent<HTMLInputElement>, name:string) {
    setUserData({...userData, [name]: e.target.value});
    validateUserInput(name, e.target.value, formValid, setFormValid)
  }

  return (
      <form name='loginform' className={style.form} noValidate
        onSubmit= {(e) => handleSubmit(e, userData)}>
        <FormControl>
          <TextInput
            { ...mailInputProps }
            value={userData.email}
            onChange={(e)=> handleOnchange(e, 'email')}
            helperText = {formValid.isValidMail? '' : 'Enter a valid Email'}
            />
        </FormControl>
        <FormControl>
          <TextInput
            { ...passwordInputProps }
            value={userData.password}
            onChange={(e) => handleOnchange(e, 'password')}
            helperText = {formValid.isValidPass? '' : 'Password should be longer than 5 letters'}
          />
        </FormControl>
        <ButtonRound type='submit' text='Login' disabled={!(isValidForm(formValid))} isActive/>
        <p className={style.formtext}>Forgot your password?</p>
        <p className={style.formtext}>Do not have an account? <Link to='/sign'>Register</Link></p>
      </form> 
  )
}

export default AuthByMail

