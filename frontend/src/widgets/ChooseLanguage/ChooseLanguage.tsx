import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import style from './ChooseLanguage.module.scss';

function ChooseLanguage() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng')?? '');

  const handleSelect = (e: SelectChangeEvent) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  }
  return (
    <div className={style.settings__language}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>{t('langLabel')}</InputLabel>
        <Select
          value = {lang}
          onChange = {handleSelect}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Language'
        >
          <MenuItem value='en-US'>{t('langEn')}</MenuItem>
          <MenuItem value='ru-RU'>{t('langRu')}</MenuItem>
        </Select>
      </FormControl>
      {/* <Button variant='contained' sx={{ fontSize: 12, padding: 1, width: 100 }}>
      {t('button.confirm')}
      </Button> */}
    </div>
  );
}

export default ChooseLanguage;
