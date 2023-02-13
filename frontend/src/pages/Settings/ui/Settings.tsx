import { useContext } from 'react';
import { Button } from '@mui/material';
import AuthContext from '../../../app/context/AuthContext';
import { removeUserFromStorage } from '../../../shared/utils/utils';
import '../style/Settings.scss';
import AddAvatar from '../../../widgets/AddAvatar/ui/AddAvatar';
import ChangePassword from '../../../widgets/ChangePassword/ChangePassword';
import ChooseLanguage from '../../../widgets/ChooseLanguage/ChooseLanguage';

function Settings() {
  const { setIsAuth } = useContext(AuthContext);
  return (
    <div className='settings'>
      <div className='settings__header'>
        <p className='settings__title'>Settings</p>
        <Button
          variant='text'
          sx={{ fontSize: 12, padding: 0 }}
          onClick={() => {
            removeUserFromStorage();
            setIsAuth(false);
          }}
        >
          Exit
        </Button>
      </div>
      <div className='settings__item'>
        <h5 className="settings__item-title">Upload your photo</h5>
        <AddAvatar />
      </div>
      <div className='settings__item'>
        <h5 className="settings__item-title">Change Password</h5>
        <ChangePassword />
      </div>
      <div className='settings__item'>
        <h5 className="settings__item-title">Choose language</h5>
        <ChooseLanguage />
      </div>
    </div>
  );
}

export default Settings;
