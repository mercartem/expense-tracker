import { Link, NavLink } from 'react-router-dom'
import style from './Mainheader.module.scss'
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound'
import Navmain from '../../../shared/ui/Navmain/Navmain'
import AppLogo from '../../../shared/ui/Logo/AppLogo'
import matchCurrentUrl from '../utils/utils'



function MainHeader(){
  return (
    <header>
      <Navmain>
        <Link to='/'>
          <AppLogo />
        </Link>
        <div className={style.buttonContainer}>
          <NavLink to='/login'>
            <ButtonRound text='Log In' type='button' isActive={matchCurrentUrl('/login')}/>
          </NavLink>
          <NavLink to='/sign'>
            <ButtonRound text='Sign In' type='button' isActive={matchCurrentUrl('/sign')}/>
          </NavLink>
        </div>
      </Navmain>
    </header>
  )
}

export default MainHeader