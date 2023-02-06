import { useContext } from 'react';
import AuthContext from '../../../app/context/AuthContext';
import UserPageLayout from '../../../shared/ui/UserPageLayout/UserPageLayout';
import { removeUserFromStorage } from '../../../shared/utils/utils';

function Settings() {
  const { setIsAuth } = useContext(AuthContext);
  return (
    <UserPageLayout>
      <div>
        Настройки
        <button
          type='button'
          onClick={() => {
            removeUserFromStorage();
            setIsAuth(false);
          }}
        >
          ВЫЙТИ
        </button>
      </div>
    </UserPageLayout>
  );
}

export default Settings;
