import { useContext } from 'react';
import AuthContext from '../../../app/context/AuthContext';
import { removeUserFromStorage } from '../../../shared/utils/utils';

function Settings() {
  const { setIsAuth } = useContext(AuthContext);
  return (
    <div style={{ marginTop: 50 }}>
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
  );
}

export default Settings;
