import { Link, Outlet } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <header>
        <nav>
          <Link to='/'>Logo</Link>
          <Link to='/login'>
            <button type='button'>LogIn</button>
          </Link>
          <Link to='/sign'>
            <button type='button'>SignIn</button>
          </Link>       
        </nav>
      </header>
      <Outlet/>
    </>
    
  )
}
export default MainPage
