import { useTranslation } from 'react-i18next';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FormControl } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/Textinput';
import { IUserAccess } from '../../Registration/lib/types';
import {
  balanceInputProps,
  handleOnChange,
  handleSubmitBalance,
  handleValidationError,
} from '../model/setBalance';
import style from './SetBalance.module.scss';
import AuthContext from '../../../app/context/AuthContext';

function SetBalance(accessData: IUserAccess) {
  const {t} = useTranslation();
  const [balance, setBalance] = useState('0');
  const [isValid, setIsValid] = useState(true);
  const [userApproved, setUserApproved] = useState(false);
  const { setIsAuth } = useContext(AuthContext);

  return userApproved ? (
    <Navigate to='/dashboard' />
  ) : (
    <div>
      <div className={style.icon}>
        <CheckCircleOutlinedIcon
          fontSize='large'
          htmlColor='#5886F6'
          sx={{ width: 150, height: 150 }}
        />
      </div>
      <p className={style.title}>{t('register.success')}</p>
      <p className={style.title}>{t('register.enterBalance')}</p>
      <form
        noValidate
        name='setBalanceForm'
        className={style.form}
        onSubmit={(e) => {
          handleSubmitBalance(e, balance, accessData, setUserApproved, isValid, setIsAuth);
        }}
      >
        <FormControl>
          <TextInput
            {...balanceInputProps}
            label={t('balancePlaceholder')}
            error={!isValid}
            value={balance}
            onChange={(e) => handleOnChange(e.target.value, setBalance, setIsValid)}
            onBlur={(e) => handleValidationError(e.target.value, setIsValid)}
            helperText={isValid ? '' : `${t('register.errorBalance')}`}
          />
        </FormControl>
        <ButtonRound text={t('button.confirm')} isActive disabled={!isValid} />
      </form>
    </div>
  );
}

export default SetBalance;
