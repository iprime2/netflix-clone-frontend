import React, { useContext } from 'react'
import './navbar.scss'
import { Search, Notifications, ArrowDropDown } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext/AuthContext'
import { logout } from '../../context/authContext/AuthActions'
import Avatar from '../../images/noAvatar.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, dispatch } = useContext(AuthContext)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://static.vecteezy.com/system/resources/previews/017/396/804/non_2x/netflix-mobile-application-logo-free-png.png'
            alt=''
          />
          <Link to='/' className='link'>
            <span>Homepage</span>
          </Link>
          <Link to='/series' className='link'>
            <span className='navBarMainLinks'>Series</span>
          </Link>
          <Link to='/movies' className='link'>
            <span className='navBarMainLinks'>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className='right'>
          <Search />
          <span>KID</span>
          <Notifications className='icon' />
          <img
            src={user.profilePicture ? user.profilePicture : Avatar}
            alt=''
          />
          <div className='profileDropDown'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <div className='optionsItem'>
                <Link
                  to='/profile'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <span>Profile</span>
                </Link>
              </div>
              <div className='optionsItem'>
                <span>Settings</span>
              </div>
              <div className='optionsItem'>
                <Link
                  to='/logout'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <span
                    className='profileSpan'
                    onClick={() => dispatch(logout)}
                  >
                    Logout
                  </span>
                </Link>
              </div>

              {/*<span onClick={() => dispatch(logout)}>Logout</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
