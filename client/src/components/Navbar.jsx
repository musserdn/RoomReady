import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>RoomReady</Link>
      </div>
      <ul>
      {
        !loginCheck ? (
          <div className='nav-item'>
            <button type='button'>
              <Link to='/'>Login</Link>
            </button>
          </div>
        ) : (
          <div className='nav-item'>
            <button type='button' onClick={() => {
              auth.logout();
            }}>Logout</button>
          </div>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
