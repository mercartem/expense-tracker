function Settings() {
  return (
      <div>Настройки
        <button type='button' onClick={()=> localStorage.removeItem('token')}>ВЫЙТИ</button>
      </div>
  )  
}

export default Settings;
